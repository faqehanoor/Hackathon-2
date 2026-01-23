# Research: Todo Backend API

**Feature**: 007-todo-backend-api
**Created**: 2026-01-19

## Overview

This research document addresses the technical decisions and best practices for implementing the Todo Backend API with FastAPI, SQLModel, Neon PostgreSQL, and JWT authentication.

## Decision Log

### 1. Framework Choice: FastAPI
- **Decision**: Use FastAPI for the backend API
- **Rationale**: FastAPI provides excellent performance, automatic API documentation (OpenAPI/Swagger), built-in validation with Pydantic, and strong async support. It's ideal for API development with great developer experience.
- **Alternatives considered**: Flask, Django REST Framework, Starlette
- **Alternative reasons for rejection**: Flask requires more boilerplate for validation; Django is heavier than needed for this API-focused project; Starlette is lower-level than needed.

### 2. ORM Selection: SQLModel
- **Decision**: Use SQLModel as the ORM
- **Rationale**: SQLModel is created by the same author as FastAPI and combines SQLAlchemy and Pydantic. It provides type hints, validation, and is designed to work seamlessly with FastAPI. It's perfect for this project's requirements.
- **Alternatives considered**: SQLAlchemy, Tortoise ORM, Peewee
- **Alternative reasons for rejection**: Pure SQLAlchemy lacks Pydantic integration; Tortoise ORM is async-focused but doesn't integrate as well with FastAPI; Peewee is simpler but lacks advanced features needed.

### 3. Database: Neon Serverless PostgreSQL
- **Decision**: Use Neon Serverless PostgreSQL
- **Rationale**: Neon provides serverless PostgreSQL with smart caching, instant branching, and pay-per-use pricing. It integrates well with SQLModel and provides the scalability needed for the application.
- **Alternatives considered**: Regular PostgreSQL, SQLite, MongoDB
- **Alternative reasons for rejection**: Regular PostgreSQL requires more infrastructure management; SQLite isn't suitable for multi-user applications; MongoDB doesn't fit the relational nature of tasks and users.

### 4. Authentication: JWT Tokens
- **Decision**: Implement JWT-based authentication
- **Rationale**: JWT tokens are stateless, scalable, and perfect for API authentication. They work well with FastAPI's dependency injection system and provide a clean separation between authentication and business logic.
- **Alternatives considered**: Session-based authentication, OAuth2 with password flow, API keys
- **Alternative reasons for rejection**: Session-based requires server-side storage; OAuth2 is more complex than needed; API keys are less secure for user-specific data.

### 5. JWT Library: python-jose
- **Decision**: Use python-jose for JWT handling
- **Rationale**: python-jose is well-maintained, supports all JWT standards, and integrates well with Python applications. It provides encryption and decryption capabilities needed for secure token handling.
- **Alternatives considered**: PyJWT, authlib
- **Alternative reasons for rejection**: PyJWT is more basic; authlib is more complex than needed for simple JWT handling.

### 6. Environment Management: python-dotenv
- **Decision**: Use python-dotenv for environment variable management
- **Rationale**: python-dotenv provides simple and reliable loading of environment variables from .env files, which is essential for managing secrets like the JWT signing key.
- **Alternatives considered**: Built-in os.environ, environs library
- **Alternative reasons for rejection**: os.environ alone doesn't load from .env files; environs is more complex than needed.

### 7. Database Driver: psycopg2-binary
- **Decision**: Use psycopg2-binary as the PostgreSQL adapter
- **Rationale**: psycopg2-binary is the most popular and well-supported PostgreSQL adapter for Python. It's required for SQLModel to connect to PostgreSQL.
- **Alternatives considered**: asyncpg
- **Alternative reasons for rejection**: asyncpg is asyncio-only and doesn't work with all SQLModel features.

## Best Practices Applied

### Security Best Practices
- Store JWT secret in environment variables, never in code
- Validate JWT tokens on every authenticated endpoint
- Sanitize and validate all user inputs
- Use parameterized queries through SQLModel to prevent SQL injection
- Implement proper error handling without exposing internal details

### Performance Best Practices
- Use database connection pooling
- Implement proper indexing on user_id and other frequently queried fields
- Use async/await for I/O-bound operations
- Cache JWT public keys if using asymmetric cryptography

### Development Best Practices
- Use type hints throughout the application
- Implement comprehensive logging
- Write unit and integration tests
- Follow REST API design principles
- Use dependency injection for better testability

## Architecture Patterns

### Layered Architecture
- Presentation Layer: FastAPI routes
- Business Logic Layer: Service classes
- Data Access Layer: SQLModel models and queries
- Data Layer: Neon PostgreSQL database

### Dependency Injection
- Use FastAPI's built-in dependency injection for authentication
- Inject database sessions into route handlers
- Separate authentication concerns from business logic

### Error Handling
- Use HTTP status codes appropriately (401, 403, 404, 422)
- Return consistent error response format
- Log errors appropriately without exposing sensitive information