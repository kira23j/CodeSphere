from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from database.database import Base
from datetime import datetime

class DbPost(Base):
    """
    Represents a blog post in the database.
    """
    __tablename__ = "post"  # Table name in the database

    # Unique identifier for the post
    id = Column(Integer, primary_key=True, index=True)

    # Title of the post
    title = Column(String(255), nullable=False)

    # Content of the post
    content = Column(String, nullable=False)

    # Foreign key linking to the User table
    creator_id = Column(Integer, ForeignKey('users.id'), nullable=False)

    # Timestamp for when the post was created
    timestamp = Column(DateTime, default=datetime.utcnow, index=True)

    # Relationship to the User model
    creator = relationship("User", back_populates="posts")

class User(Base):
    """
    Represents a user in the database.
    """
    __tablename__ = "users"  # Table name in the database

    # Unique identifier for the user
    id = Column(Integer, primary_key=True, index=True)

    # Username of the user, must be unique
    username = Column(String(255), unique=True, index=True, nullable=False)

    # Hashed password for the user
    hashed_password = Column(String, nullable=False)

    # Relationship to the DbPost model
    posts = relationship("DbPost", back_populates="creator")
