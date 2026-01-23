# API Contract: Todo Backend API

**Feature**: 007-todo-backend-api
**Created**: 2026-01-19
**Version**: 1.0

## Overview

This document defines the API contracts for the Todo Backend API, specifying endpoints, request/response formats, authentication, and error handling.

## Base URL

```
https://api.example.com/api
```

## Authentication

All endpoints require JWT authentication using the Authorization header:

```
Authorization: Bearer <jwt_token>
```

The JWT token must be obtained separately through the authentication system and contain the user_id in the payload.

## Common Headers

- `Content-Type: application/json` (for requests with body)
- `Authorization: Bearer <token>` (for authenticated requests)

## Common Error Responses

All error responses follow this format:

```json
{
  "detail": "Error message describing the issue"
}
```

### HTTP Status Codes

- `200 OK`: Request successful
- `201 Created`: Resource created successfully
- `204 No Content`: Request successful, no content to return
- `400 Bad Request`: Invalid request format
- `401 Unauthorized`: Missing or invalid authentication token
- `403 Forbidden`: Valid token but insufficient permissions
- `404 Not Found`: Requested resource does not exist
- `422 Unprocessable Entity`: Request validation failed
- `500 Internal Server Error`: Unexpected server error

## Endpoints

### 1. Get User's Tasks

**Endpoint**: `GET /{user_id}/tasks`

**Description**: Retrieve all tasks for the specified user

**Authentication Required**: Yes

**Parameters**:
- Path: `user_id` (string) - The ID of the user whose tasks to retrieve
- Query (optional): `completed` (string) - Filter by completion status ("true", "false", or omit for all)

**Request Example**:
```
GET /123/tasks HTTP/1.1
Authorization: Bearer <valid_jwt_token>
```

**Response**:
- Success: `200 OK`
- Body:
```json
[
  {
    "id": 1,
    "user_id": "123",
    "title": "Complete project proposal",
    "description": "Finish the project proposal document",
    "completed": false,
    "created_at": "2026-01-19T10:00:00Z",
    "updated_at": "2026-01-19T10:00:00Z"
  },
  {
    "id": 2,
    "user_id": "123",
    "title": "Schedule team meeting",
    "description": null,
    "completed": true,
    "created_at": "2026-01-19T09:30:00Z",
    "updated_at": "2026-01-19T10:15:00Z"
  }
]
```

**Errors**:
- `401 Unauthorized`: Missing or invalid JWT token
- `403 Forbidden`: Token user_id does not match the requested user_id
- `404 Not Found`: User does not exist

---

### 2. Create Task

**Endpoint**: `POST /{user_id}/tasks`

**Description**: Create a new task for the specified user

**Authentication Required**: Yes

**Parameters**:
- Path: `user_id` (string) - The ID of the user creating the task

**Request Body**:
```json
{
  "title": "string (required, max 255 chars)",
  "description": "string (optional, max 1000 chars)",
  "completed": "boolean (optional, default false)"
}
```

**Request Example**:
```
POST /123/tasks HTTP/1.1
Authorization: Bearer <valid_jwt_token>
Content-Type: application/json

{
  "title": "Review pull request",
  "description": "Review the authentication module pull request",
  "completed": false
}
```

**Response**:
- Success: `201 Created`
- Body:
```json
{
  "id": 3,
  "user_id": "123",
  "title": "Review pull request",
  "description": "Review the authentication module pull request",
  "completed": false,
  "created_at": "2026-01-19T11:00:00Z",
  "updated_at": "2026-01-19T11:00:00Z"
}
```

**Errors**:
- `400 Bad Request`: Invalid request body format
- `401 Unauthorized`: Missing or invalid JWT token
- `403 Forbidden`: Token user_id does not match the requested user_id
- `422 Unprocessable Entity`: Validation errors (e.g., title too long)

---

### 3. Get Specific Task

**Endpoint**: `GET /{user_id}/tasks/{id}`

**Description**: Retrieve details of a specific task

**Authentication Required**: Yes

**Parameters**:
- Path: `user_id` (string) - The ID of the user
- Path: `id` (integer) - The ID of the task to retrieve

**Request Example**:
```
GET /123/tasks/1 HTTP/1.1
Authorization: Bearer <valid_jwt_token>
```

**Response**:
- Success: `200 OK`
- Body:
```json
{
  "id": 1,
  "user_id": "123",
  "title": "Complete project proposal",
  "description": "Finish the project proposal document",
  "completed": false,
  "created_at": "2026-01-19T10:00:00Z",
  "updated_at": "2026-01-19T10:00:00Z"
}
```

**Errors**:
- `401 Unauthorized`: Missing or invalid JWT token
- `403 Forbidden`: Token user_id does not match the requested user_id
- `404 Not Found`: Task does not exist

---

### 4. Update Task

**Endpoint**: `PUT /{user_id}/tasks/{id}`

**Description**: Update an existing task

**Authentication Required**: Yes

**Parameters**:
- Path: `user_id` (string) - The ID of the user
- Path: `id` (integer) - The ID of the task to update

**Request Body**:
```json
{
  "title": "string (optional, max 255 chars)",
  "description": "string (optional, max 1000 chars)",
  "completed": "boolean (optional)"
}
```

**Request Example**:
```
PUT /123/tasks/1 HTTP/1.1
Authorization: Bearer <valid_jwt_token>
Content-Type: application/json

{
  "title": "Complete project proposal",
  "description": "Finish the project proposal document with budget estimates",
  "completed": true
}
```

**Response**:
- Success: `200 OK`
- Body:
```json
{
  "id": 1,
  "user_id": "123",
  "title": "Complete project proposal",
  "description": "Finish the project proposal document with budget estimates",
  "completed": true,
  "created_at": "2026-01-19T10:00:00Z",
  "updated_at": "2026-01-19T12:00:00Z"
}
```

**Errors**:
- `400 Bad Request`: Invalid request body format
- `401 Unauthorized`: Missing or invalid JWT token
- `403 Forbidden`: Token user_id does not match the requested user_id
- `404 Not Found`: Task does not exist
- `422 Unprocessable Entity`: Validation errors

---

### 5. Delete Task

**Endpoint**: `DELETE /{user_id}/tasks/{id}`

**Description**: Delete a specific task

**Authentication Required**: Yes

**Parameters**:
- Path: `user_id` (string) - The ID of the user
- Path: `id` (integer) - The ID of the task to delete

**Request Example**:
```
DELETE /123/tasks/1 HTTP/1.1
Authorization: Bearer <valid_jwt_token>
```

**Response**:
- Success: `204 No Content`
- Body: Empty

**Errors**:
- `401 Unauthorized`: Missing or invalid JWT token
- `403 Forbidden`: Token user_id does not match the requested user_id
- `404 Not Found`: Task does not exist

---

### 6. Toggle Task Completion

**Endpoint**: `PATCH /{user_id}/tasks/{id}/complete`

**Description**: Toggle the completion status of a task

**Authentication Required**: Yes

**Parameters**:
- Path: `user_id` (string) - The ID of the user
- Path: `id` (integer) - The ID of the task to update

**Request Example**:
```
PATCH /123/tasks/1/complete HTTP/1.1
Authorization: Bearer <valid_jwt_token>
```

**Response**:
- Success: `200 OK`
- Body:
```json
{
  "id": 1,
  "user_id": "123",
  "title": "Complete project proposal",
  "description": "Finish the project proposal document",
  "completed": true,
  "created_at": "2026-01-19T10:00:00Z",
  "updated_at": "2026-01-19T13:00:00Z"
}
```

**Errors**:
- `401 Unauthorized`: Missing or invalid JWT token
- `403 Forbidden`: Token user_id does not match the requested user_id
- `404 Not Found`: Task does not exist

## Security Considerations

1. All endpoints require valid JWT authentication
2. User ID in the token must match the user_id in the URL path
3. Users can only access their own tasks
4. Input validation is performed on all request bodies
5. Error messages do not expose internal system details