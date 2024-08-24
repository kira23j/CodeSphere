# DBUHub Admin API

The DBUHub Admin API, built with FastAPI, provides backend support for admin tasks related to posts in the DBUHub system, designed for use with a React Native app.

## Technologies

- **Backend**: FastAPI
- **Database**: PostgreSQL
- **ORM**: SQLAlchemy
- **Authentication**: JWT
- **Environment Management**: `dotenv`

## Features

- **Admin Endpoints**: Manage posts efficiently
- **CRUD Operations**: Create, Read, Update, Delete posts
- **Secure API**: JWT authentication for admin access

## Installation

1. **Clone the repository**:

    ```bash
    git clone specific repo section
    cd dbuhub-admin-api
    ```

2. **Set up a virtual environment and install dependencies**:

    ```bash
    python -m venv venv
    source venv/bin/activate  # or venv\Scripts\activate on Windows
    pip install -r requirements.txt
    ```

3. **Configure environment variables** in a `.env` file:

    ```env
    DATABASE_URL=put your url
    AUTH_SECRET_KEY=your_secret_key
    AUTH_ALGORITHM=HS256
    ```

4. **Run the server**:

    ```bash
    uvicorn main:app --reload
    ```

    Access the API at `http://localhost:8000`.

## API Endpoints

- **POST /auth/**: Register a new admin user
- **POST /auth/token**: Obtain a JWT token
- **POST /post**: Create a new post
- **GET /post/all**: Retrieve all posts
- **PUT /post/{id}**: Update a specific post
- **DELETE /post/{id}**: Remove a specific post

