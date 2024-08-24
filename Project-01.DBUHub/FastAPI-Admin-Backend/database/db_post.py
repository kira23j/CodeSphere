from sqlalchemy.orm import Session
from sqlalchemy.exc import NoResultFound
from database.models import DbPost
from routers.schemas import PostBase
from fastapi import HTTPException

def create(db: Session, request: PostBase, creator_id: int) -> DbPost:
    """
    Create a new post in the database.
    
    Args:
    - db: The database session.
    - request: The post data.
    - creator_id: The ID of the user creating the post.
    
    Returns:
    - The newly created DbPost object.
    """
    new_post = DbPost(
        title=request.title,
        content=request.content,
        creator_id=creator_id
    )
    db.add(new_post)
    db.commit()
    db.refresh(new_post)
    return new_post

def get_all(db: Session):
    """
    Retrieve all posts from the database.
    
    Args:
    - db: The database session.
    
    Returns:
    - A list of all DbPost objects.
    """
    return db.query(DbPost).all()

def get_by_id(id: int, db: Session) -> DbPost:
    """
    Retrieve a post by its ID.
    
    Args:
    - id: The ID of the post to retrieve.
    - db: The database session.
    
    Returns:
    - The DbPost object with the given ID.
    
    Raises:
    - HTTPException: If no post is found with the given ID.
    """
    try:
        return db.query(DbPost).filter(DbPost.id == id).one()
    except NoResultFound:
        raise HTTPException(
            status_code=404,
            detail=f'Post with id {id} not found'
        )

def update(db: Session, post_id: int, request: PostBase) -> DbPost:
    """
    Update an existing post.
    
    Args:
    - db: The database session.
    - post_id: The ID of the post to update.
    - request: The new post data.
    
    Returns:
    - The updated DbPost object.
    
    Raises:
    - HTTPException: If the post is not found.
    """
    post = db.query(DbPost).filter(DbPost.id == post_id).first()

    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    
    # Update post fields
    post.title = request.title
    post.content = request.content

    db.commit()
    db.refresh(post)

    return post

def delete(id: int, db: Session, creator_id: int):
    """
    Delete a post by its ID.
    
    Args:
    - id: The ID of the post to delete.
    - db: The database session.
    - creator_id: The ID of the user attempting to delete the post.
    
    Returns:
    - A success message.
    
    Raises:
    - HTTPException: If the post is not found or if the user is not authorized to delete the post.
    """
    post = get_by_id(id, db)
    
    if post.creator_id != creator_id:
        raise HTTPException(
            status_code=403,
            detail="Not authorized to delete this post"
        )
    
    db.delete(post)
    db.commit()
    return {'detail': 'Post deleted successfully'}
