from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv
import os

# Load environment variables from a .env file
load_dotenv()

# Retrieve the database URL from environment variables
DATABASE_URL = os.getenv('DATABASE_URL')

# Create the SQLAlchemy engine for connecting to the database
engine = create_engine(DATABASE_URL)

# Create a configured "Session" class
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Create a base class for SQLAlchemy models to inherit from
Base = declarative_base()

# Dependency for getting a database session
def get_db():
    """
    Provides a database session for dependency injection.
    
    Yields:
        Session: A SQLAlchemy session.
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
