from datetime import datetime, timedelta
from typing import Optional
from jose import jwt, JWTError
from passlib.context import CryptContext
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from database.database import SessionLocal
from database.models import User
import os

# Retrieve the secret key and algorithm from environment variables
SECRET_KEY = os.getenv("AUTH_SECRET_KEY")
ALGORITHM = os.getenv("AUTH_ALGORITHM")

# Initialize CryptContext for password hashing
bcrypt_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Define the OAuth2 password bearer scheme for token authentication
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/token")

def get_db() -> Session:
    """
    Dependency to get a database session.

    This function is used to provide a new database session for each request. 
    It ensures that the session is properly closed after use.

    Returns:
        Session: A new SQLAlchemy database session.
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def hash_password(password: str) -> str:
    """
    Hash a plain text password using bcrypt.

    Args:
        password (str): The plain text password.

    Returns:
        str: The hashed password.
    """
    return bcrypt_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """
    Verify a plain text password against a hashed password.

    Args:
        plain_password (str): The plain text password.
        hashed_password (str): The hashed password to compare against.

    Returns:
        bool: True if the passwords match, False otherwise.
    """
    return bcrypt_context.verify(plain_password, hashed_password)

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    """
    Create a JWT with the specified data and optional expiration time.

    Args:
        data (dict): The data to encode in the JWT.
        expires_delta (Optional[timedelta]): The token expiration time. Defaults to 15 minutes.

    Returns:
        str: The encoded JWT.
    """
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=15))
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def get_user_by_username(username: str, db: Session) -> Optional[User]:
    """
    Retrieve a user from the database by username.

    Args:
        username (str): The username of the user to retrieve.
        db (Session): The database session.

    Returns:
        Optional[User]: The user object if found, otherwise None.
    """
    return db.query(User).filter(User.username == username).first()

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)) -> Optional[User]:
    """
    Retrieve the current user based on the provided JWT token.

    Args:
        token (str): The JWT token.
        db (Session): The database session.

    Returns:
        Optional[User]: The user object if the token is valid and the user is found.
        
    Raises:
        HTTPException: If the token is invalid or the user is not found.
    """
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        # Decode the JWT token
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        
        # Ensure the username is present in the payload
        if username is None:
            raise credentials_exception
        
        # Retrieve the user from the database
        user = get_user_by_username(username, db)
        if user is None:
            raise credentials_exception
    except JWTError:
        # Handle token decoding errors
        raise credentials_exception
    
    return user
