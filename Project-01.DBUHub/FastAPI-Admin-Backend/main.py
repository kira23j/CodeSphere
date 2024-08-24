from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import models
from database.database import engine
from routers import post, auth

# Initialize the FastAPI application
app = FastAPI()

# Create database tables
models.Base.metadata.create_all(engine)

# Define allowed origins for CORS
origins = [
    'http://localhost:3000',
    'http://localhost:3001'
]

# Configure CORS middleware to allow requests from specified origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Origins that are allowed to make requests
    allow_credentials=True,  # Allow cookies and other credentials
    allow_methods=['*'],  # Allow all HTTP methods
    allow_headers=['*']  # Allow all headers
)

# Define a health check endpoint
@app.get("/")
def is_working():
    """Health check endpoint to verify the API is running."""
    return {"message": "It works well"}

# Include routers for different API endpoints
app.include_router(auth.router)  # Authentication routes
app.include_router(post.router)  # Post-related routes
