from datetime import timedelta, datetime, timezone
from typing import Annotated
from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from fastapi.security import OAuth2PasswordRequestForm
from jose import jwt
from dotenv import load_dotenv
import os
from sqlalchemy.orm import Session
from database.models import User
from auth_utils import get_db, hash_password, verify_password, create_access_token, get_user_by_username, oauth2_scheme

# Load environment variables from .env file
load_dotenv()

# Create an APIRouter instance for authentication-related endpoints
router = APIRouter(
    prefix='/auth',  # Prefix for all routes in this router
    tags=['auth']    # Tag for grouping endpoints in the OpenAPI documentation
)

# Retrieve secret key and algorithm from environment variables
SECRET_KEY = os.getenv("AUTH_SECRET_KEY")
ALGORITHM = os.getenv("AUTH_ALGORITHM")

class UserCreateRequest(BaseModel):
    """
    Schema for user creation request.
    """
    username: str
    password: str

class Token(BaseModel):
    """
    Schema for the authentication token response.
    """
    access_token: str
    token_type: str

def authenticate_user(username: str, password: str, db: Session):
    """
    Authenticate user by verifying username and password.

    Args:
        username (str): The username of the user.
        password (str): The password of the user.
        db (Session): The database session.

    Returns:
        User: The authenticated user, or None if authentication fails.
    """
    user = get_user_by_username(username, db)
    if not user or not verify_password(password, user.hashed_password):
        return None
    return user

def create_access_token(username: str, user_id: int, expires_delta: timedelta):
    """
    Create a JWT access token for the user.

    Args:
        username (str): The username of the user.
        user_id (int): The ID of the user.
        expires_delta (timedelta): The expiration time of the token.

    Returns:
        str: The encoded JWT access token.
    """
    payload = {
        'sub': username,
        'id': user_id,
        'exp': datetime.now(timezone.utc) + expires_delta
    }
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)

@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_user(create_user_request: UserCreateRequest, db: Session = Depends(get_db)):
    """
    Create a new user in the system.

    Args:
        create_user_request (UserCreateRequest): The request body containing the username and password.
        db (Session): The database session.

    Returns:
        User: The created user.

    Raises:
        HTTPException: If the username is already registered.
    """
    existing_user = get_user_by_username(create_user_request.username, db)
    if existing_user:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Username already registered")
    
    # Create and save the new user
    create_user_model = User(
        username=create_user_request.username,
        hashed_password=hash_password(create_user_request.password)
    )
    db.add(create_user_model)
    db.commit()
    db.refresh(create_user_model)
    return create_user_model

@router.post('/token', response_model=Token)
async def login_for_access_token(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
    db: Session = Depends(get_db)
):
    """
    Log in a user and return an access token.

    Args:
        form_data (OAuth2PasswordRequestForm): The form data containing the username and password.
        db (Session): The database session.

    Returns:
        Token: The access token and token type.

    Raises:
        HTTPException: If the credentials are invalid.
    """
    user = authenticate_user(form_data.username, form_data.password, db)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    
    # Create an access token for the authenticated user
    access_token = create_access_token(user.username, user.id, timedelta(minutes=20))
    return {'access_token': access_token, 'token_type': 'bearer'}
