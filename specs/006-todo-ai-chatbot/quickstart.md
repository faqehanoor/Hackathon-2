# Quickstart: Todo AI Chatbot

**Feature**: Todo AI Chatbot | **Created**: 2026-01-01

## Prerequisites

- Python 3.11+
- PostgreSQL (Neon Serverless or local)
- Node.js 18+ (for frontend)
- OpenAI API key

## Environment Setup

### Backend

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -e ".[dev]"

# Create .env file
cat > .env << EOF
DATABASE_URL=postgresql://user:password@localhost:5432/todoflow
OPENAI_API_KEY=sk-your-openai-api-key
JWT_SECRET=your-jwt-secret-key-min-32-chars
EOF

# Run database migrations
alembic upgrade head

# Start development server
uvicorn src.main:app --reload
```

The backend will be available at `http://localhost:8000`.

### Frontend

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Create .env.local
echo "NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1" > .env.local

# Start development server
npm run dev
```

The frontend will be available at `http://localhost:3000`.

## API Endpoints

### Chat Endpoint

```bash
# Send a chat message
curl -X POST http://localhost:8000/api/v1/chat \
  -H "Authorization: Bearer <JWT_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{"message": "Add buy groceries"}'
```

### Conversation Management

```bash
# List conversations
curl http://localhost:8000/api/v1/conversations \
  -H "Authorization: Bearer <JWT_TOKEN>"

# Get conversation with messages
curl http://localhost:8000/api/v1/conversations/<conversation_id> \
  -H "Authorization: Bearer <JWT_TOKEN>"
```

## Testing

### Backend Tests

```bash
cd backend

# Run all tests
pytest

# Run with coverage
pytest --cov=src --cov-report=html

# Run specific test file
pytest tests/unit/test_todo_tools.py -v
```

### Integration Tests

```bash
# Start the server in background
uvicorn src.main:app --host 0.0.0.0 &

# Run integration tests
pytest tests/integration/

# Stop the server
pkill -f uvicorn
```

## Project Structure

```
backend/
├── src/
│   ├── main.py           # FastAPI application entry
│   ├── models/
│   │   ├── entities.py   # SQLModel entities
│   │   └── database.py   # DB connection
│   ├── mcp/
│   │   ├── tools/
│   │   │   └── todo_tools.py  # MCP tool implementations
│   │   └── server.py     # MCP server setup
│   ├── api/
│   │   └── routes.py     # HTTP endpoints
│   ├── agents/
│   │   └── todo_agent.py # OpenAI Agents SDK logic
│   └── lib/
│       └── config.py     # Configuration
├── alembic/              # Database migrations
├── tests/
│   ├── unit/
│   ├── integration/
│   └── conftest.py
└── pyproject.toml
```

## Configuration

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | Yes |
| `OPENAI_API_KEY` | OpenAI API key for Agents SDK | Yes |
| `JWT_SECRET` | Secret for JWT token signing | Yes |
| `LOG_LEVEL` | Logging level (default: INFO) | No |

## Development Notes

### Adding New MCP Tools

1. Define the tool function in `src/mcp/tools/todo_tools.py`
2. Register it in the MCP server configuration
3. Update `contracts/openapi.yaml` with the new tool schema
4. Add tests for the new tool

### Conversation Flow

```
1. User sends message via ChatKit UI
2. Frontend calls POST /api/v1/chat with JWT
3. Backend validates JWT, extracts user_id
4. Load conversation history from DB (or create new)
5. Pass history + message to AI agent
6. Agent may invoke MCP tools → DB updates
7. Agent generates response
8. Persist user message + tool calls + response + tool results
9. Return response to frontend
10. Frontend renders response in ChatKit
```

### Stateless Request Cycle

Each request:
1. Loads user context from JWT
2. Loads conversation history from DB
3. Processes with AI agent
4. Persists new messages to DB
5. Returns response

No in-memory state between requests - enables horizontal scaling.

## Troubleshooting

### Database Connection Issues

```bash
# Verify PostgreSQL is running
pg_isready -h localhost -p 5432

# Check connection string format
# postgresql://username:password@host:port/database
```

### OpenAI API Errors

- Verify API key is valid and has sufficient credits
- Check rate limits in OpenAI dashboard
- Ensure correct model is specified in agent configuration

### JWT Token Issues

- Token expires after 24 hours (configurable)
- Verify JWT_SECRET matches between services
- Check token payload includes required claims
