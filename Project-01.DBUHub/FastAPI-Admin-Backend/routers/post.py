import os
from fastapi import APIRouter, Depends, Form, HTTPException
from sqlalchemy.orm import Session
from .schemas import PostBase, PostDisplay
from database.database import get_db
from database import db_post
from auth_utils import get_current_user
from database.models import User
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)

# Create an APIRouter instance for the post-related endpoints
router = APIRouter(
    prefix='/post',  # Prefix for all routes in this router
    tags=['post']    # Tag for grouping endpoints in the OpenAPI documentation
)

@router.post('', response_model=PostDisplay)
async def create_post(
    title: str = Form(...),  # Form field for the post title
    content: str = Form(...),  # Form field for the post content
    db: Session = Depends(get_db),  # Dependency to get the database session
    current_user: User = Depends(get_current_user)  # Dependency to get the current authenticated user
):
    """
    Endpoint to create a new post.

    Args:
        title (str): The title of the post.
        content (str): The content of the post.
        db (Session): The database session.
        current_user (User): The currently authenticated user.

    Returns:
        PostDisplay: The created post.
    
    Raises:
        HTTPException: If there is an error creating the post.
    """
    try:
        logging.info(f"Creating post for user ID: {current_user.id}")

        # Create a new post using the database utility function
        post = db_post.create(
            db,
            PostBase(title=title, content=content),
            current_user.id
        )

        return post
    except Exception as e:
        logging.error(f"Error in creating post: {e}", exc_info=True)
        raise HTTPException(status_code=500, detail=str(e))

@router.get('/all', response_model=list[PostDisplay])
def get_all_posts(db: Session = Depends(get_db)):
    """
    Endpoint to fetch all posts.

    Args:
        db (Session): The database session.

    Returns:
        List[PostDisplay]: A list of all posts.

    Raises:
        HTTPException: If there is an error fetching the posts.
    """
    try:
        logging.info("Fetching all posts")
        # Fetch all posts using the database utility function
        posts = db_post.get_all(db)
        logging.info(f"Number of posts retrieved: {len(posts)}")
        return posts
    except Exception as e:
        logging.error(f"Error in fetching posts: {e}", exc_info=True)
        raise HTTPException(status_code=500, detail=str(e))

@router.put('/{id}', response_model=PostDisplay)
async def update_post(
    id: int,  # Path parameter for the post ID
    title: str = Form(...),  # Form field for the new post title
    content: str = Form(...),  # Form field for the new post content
    db: Session = Depends(get_db),  # Dependency to get the database session
    current_user: User = Depends(get_current_user)  # Dependency to get the current authenticated user
):
    """
    Endpoint to update an existing post.

    Args:
        id (int): The ID of the post to be updated.
        title (str): The new title of the post.
        content (str): The new content of the post.
        db (Session): The database session.
        current_user (User): The currently authenticated user.

    Returns:
        PostDisplay: The updated post.

    Raises:
        HTTPException: If the post is not found or if the user is not authorized to update the post.
    """
    try:
        logging.info(f"Updating post with ID: {id} for user ID: {current_user.id}")

        # Get the post by ID
        post = db_post.get_by_id(id, db)
        if not post:
            raise HTTPException(status_code=404, detail=f"Post with ID {id} not found")
        
        # Check if the current user is the creator of the post
        if post.creator_id != current_user.id:
            logging.warning(f"Unauthorized access attempt by user ID: {current_user.id} on post ID: {id}")
            raise HTTPException(status_code=403, detail="Not authorized to update this post")
        
        # Update the post using the database utility function
        updated_post = db_post.update(
            db,
            id,
            PostBase(title=title, content=content)
        )

        return updated_post
    except Exception as e:
        logging.error(f"Error in updating post: {e}", exc_info=True)
        raise HTTPException(status_code=500, detail=str(e))

@router.delete('/{id}')
async def delete(
    id: int,  # Path parameter for the post ID
    db: Session = Depends(get_db),  # Dependency to get the database session
    current_user: User = Depends(get_current_user)  # Dependency to get the current authenticated user
):
    """
    Endpoint to delete a post.

    Args:
        id (int): The ID of the post to be deleted.
        db (Session): The database session.
        current_user (User): The currently authenticated user.

    Returns:
        dict: Confirmation message.

    Raises:
        HTTPException: If the post is not found or if the user is not authorized to delete the post.
    """
    try:
        logging.info(f"Attempting to delete post with ID: {id} for user ID: {current_user.id}")

        # Get the post by ID
        post = db_post.get_by_id(id, db)
        if not post:
            raise HTTPException(status_code=404, detail=f"Post with ID {id} not found")
        
        # Check if the current user is the creator of the post
        if post.creator_id != current_user.id:
            logging.warning(f"Unauthorized access attempt by user ID: {current_user.id} on post ID: {id}")
            raise HTTPException(status_code=403, detail="Not authorized to delete this post")
        
        # Delete the post using the database utility function
        db_post.delete(id, db, current_user.id)
        return {"detail": "Post deleted successfully"}
    except Exception as e:
        logging.error(f"Error in deleting post: {e}", exc_info=True)
        raise HTTPException(status_code=500, detail=str(e))
