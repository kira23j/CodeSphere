from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class UserBase(BaseModel):
    """
    Base model for representing a user with minimal attributes.

    Attributes:
        id (int): Unique identifier for the user.
    """
    id: int

class PostBase(BaseModel):
    """
    Base model for representing a post with essential attributes.

    Attributes:
        title (str): Title of the post.
        content (str): Content of the post.
    """
    title: str
    content: str

class PostDisplay(BaseModel):
    """
    Model for displaying a post with additional information.

    Attributes:
        id (int): Unique identifier for the post.
        title (str): Title of the post.
        content (str): Content of the post.
        creator (UserBase): Information about the user who created the post.
        timestamp (datetime): The timestamp when the post was created.
    
    Config:
        orm_mode (bool): Allows Pydantic models to work with ORM models.
    """
    id: int
    title: str
    content: str
    creator: UserBase
    timestamp: datetime

    class Config:
        orm_mode = True
