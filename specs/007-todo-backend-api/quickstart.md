# Quickstart Guide: Todo Backend API

**Feature**: 007-todo-backend-api
**Created**: 2026-01-19

## Overview

This guide provides instructions to quickly set up, run, and test the Todo Backend API. Follow these steps to get the API running locally and verify its functionality.

## Prerequisites

- Python 3.11 or higher
- pip package manager
- Access to Neon Serverless PostgreSQL (connection URL)
- JWT token with valid user_id claim (from your authentication system)

## Setup Instructions

### 1. Clone or Create Project Directory

```bash
mkdir todo-backend-api
cd todo-backend-api
```

### 2. Create Virtual Environment

```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

### 3. Install Dependencies

Create a `requirements.txt` file:

```txt
fastapi==0.109.0
uvicorn[standard]==0.25.0
sqlmodel==0.0.16
psycopg2-binary==2.9.9
python-jose[cryptography]==3.3.0
python-dotenv==1.0.0
pydantic==2.5.0
```

Install the dependencies:

```bash
pip install -r requirements.txt
```

### 4. Create Environment File

Create a `.env` file in the project root:

```env
NEON_DB_URL=postgresql://neondb_owner:npg_Xt7ibGs5JFgS@ep-hidden-art-ahyr2t6j-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
BETTER_AUTH_SECRET=nBDkqVBxXFKOKINGhQWrhE3JWmYwboLJ
```

### 5. Create Project Structure

```bash
mkdir -p src/models src/api src/auth src/services src/lib
```

## Running the Application

### 1. Start the Development Server

```bash
uvicorn src.main:app --reload
```

The API will be available at `http://localhost:8000`.

### 2. Access API Documentation

Visit `http://localhost:8000/docs` to access the interactive API documentation (Swagger UI).

## Testing the API

### 1. Prepare Test Data

You'll need a valid JWT token with a user_id claim. For testing purposes, you can create a test token or use your authentication system to generate one.

### 2. Test Endpoints

#### Get User's Tasks

```bash
curl -H "Authorization: Bearer YOUR_JWT_TOKEN" \
     http://localhost:8000/api/user123/tasks
```

#### Create a Task

```bash
curl -X POST http://localhost:8000/api/user123/tasks \
     -H "Authorization: Bearer YOUR_JWT_TOKEN" \
     -H "Content-Type: application/json" \
     -d '{"title": "Test Task", "description": "This is a test task"}'
```

#### Get Specific Task

```bash
curl -H "Authorization: Bearer YOUR_JWT_TOKEN" \
     http://localhost:8000/api/user123/tasks/1
```

#### Update a Task

```bash
curl -X PUT http://localhost:8000/api/user123/tasks/1 \
     -H "Authorization: Bearer YOUR_JWT_TOKEN" \
     -H "Content-Type: application/json" \
     -d '{"title": "Updated Test Task", "completed": true}'
```

#### Toggle Task Completion

```bash
curl -X PATCH http://localhost:8000/api/user123/tasks/1/complete \
     -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

#### Delete a Task

```bash
curl -X DELETE http://localhost:8000/api/user123/tasks/1 \
     -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### 3. Test Security Features

#### Test Unauthorized Access

Try accessing an endpoint without a token:

```bash
curl http://localhost:8000/api/user123/tasks
# Should return 401 Unauthorized
```

#### Test User Isolation

Try accessing another user's tasks with your token:

```bash
curl -H "Authorization: Bearer YOUR_JWT_TOKEN" \
     http://localhost:8000/api/different_user/tasks
# Should return 403 Forbidden
```

## Verification Checklist

- [ ] API starts without errors
- [ ] Swagger documentation is accessible at `/docs`
- [ ] Creating a task returns 201 with the created task
- [ ] Retrieving tasks returns 200 with a list of tasks
- [ ] Updating a task returns 200 with the updated task
- [ ] Deleting a task returns 204
- [ ] Toggling completion returns 200 with the updated task
- [ ] Accessing without a token returns 401
- [ ] Accessing another user's resources returns 403
- [ ] Invalid request data returns 422 with validation errors

## Troubleshooting

### Common Issues

1. **Database Connection Error**: Verify your NEON_DB_URL in the .env file is correct
2. **JWT Validation Error**: Ensure your JWT token is valid and contains the required claims
3. **Import Errors**: Make sure all dependencies are installed correctly
4. **Port Already in Use**: Change the port with `--port` option in uvicorn command

### Enable Logging

Add logging to your main application file to troubleshoot issues:

```python
import logging
logging.basicConfig(level=logging.INFO)
```

## Next Steps

1. Implement proper error handling and logging
2. Add comprehensive unit and integration tests
3. Set up CI/CD pipeline
4. Deploy to your preferred hosting platform
5. Implement monitoring and alerting