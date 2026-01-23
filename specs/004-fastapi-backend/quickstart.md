# Quickstart: FastAPI Backend

## Prerequisites

- Python 3.11 or higher
- PostgreSQL database (Neon or local)
- pip or uv for package management

## Installation

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Create virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # Linux/macOS
   # or
   .\venv\Scripts\activate   # Windows
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure environment**
   ```bash
   cp .env.example .env
   # Edit .env with your DATABASE_URL and JWT_SECRET
   ```

   Example `.env`:
   ```env
   DATABASE_URL=postgresql://user:password@host:5432/database
   JWT_SECRET=your-super-secret-jwt-key-change-in-production
   JWT_ALGORITHM=HS256
   ACCESS_TOKEN_EXPIRE_MINUTES=15
   REFRESH_TOKEN_EXPIRE_DAYS=7
   ```

5. **Initialize database**
   ```bash
   python -c "from app.database import init_db; init_db()"
   ```

## Running the Server

### Development Mode
```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### Production Mode
```bash
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

Server runs at: http://localhost:8000

## API Documentation

- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## Testing

```bash
# Run all tests
pytest tests/ -v

# Run with coverage
pytest tests/ --cov=app --cov-report=html
```

## Project Structure

```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py              # FastAPI app
│   ├── database.py          # DB connection & tables
│   ├── models.py            # SQLModel tables
│   ├── schemas.py           # Pydantic schemas
│   ├── crud.py              # Database operations
│   ├── auth.py              # JWT & password utilities
│   └── routers/
│       ├── __init__.py
│       ├── auth.py          # Auth endpoints
│       └── tasks.py         # Task endpoints
├── tests/
│   ├── __init__.py
│   ├── conftest.py
│   ├── test_auth.py
│   └── test_tasks.py
├── .env.example
├── requirements.txt
└── README.md
```

## Example API Usage

### Register User
```bash
curl -X POST http://localhost:8000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","name":"John","password":"secure123"}'
```

### Login
```bash
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"secure123"}'
```

### Create Task (with token)
```bash
curl -X POST http://localhost:8000/api/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <access_token>" \
  -d '{"title":"Buy groceries","description":"Milk and eggs","priority":"Medium"}'
```

### List Tasks
```bash
curl http://localhost:8000/api/tasks?status=all&search=groceries \
  -H "Authorization: Bearer <access_token>"
```

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Connection refused | Check PostgreSQL is running and DATABASE_URL is correct |
| Import errors | Ensure venv is activated and requirements installed |
| JWT errors | Verify JWT_SECRET matches between auth and verification |
| Migration errors | Run `init_db()` to create tables |
