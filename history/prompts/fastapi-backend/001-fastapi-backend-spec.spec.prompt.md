---
id: '001'
title: FastAPI backend specification
stage: spec
date: 2025-12-31
surface: agent
model: claude-sonnet-4-5-20250929
feature: fastapi-backend
branch: 004-fastapi-backend
user: pc
command: /sp.specify
labels: [backend, fastapi, specification]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - specs/004-fastapi-backend/spec.md
  - specs/004-fastapi-backend/checklists/requirements.md
tests:
  - none
---

## Prompt

You are the Backend Engineer Agent for the Todo Full-Stack Web App Phase II.

Objective:
Generate a complete FastAPI backend with SQLModel and Neon PostgreSQL for a multi-user Todo app. Must fully follow Spec-Kit Plus guidelines.

Requirements:

1. **Project Structure** (in /backend):
- /app
  - main.py → FastAPI app entry
  - database.py → DB engine, session, tables creation
  - models.py → SQLModel models (Users, Tasks)
  - schemas.py → Pydantic schemas for requests/responses
  - crud.py → CRUD operations for tasks and users
  - auth.py → JWT auth utilities, login, register
  - routers/
    - auth.py → /api/auth endpoints (login/register)
    - tasks.py → /api/tasks endpoints (CRUD + filters)
- /tests → placeholder for unit & integration tests
- .env.example → DATABASE_URL, JWT_SECRET
- requirements.txt → FastAPI, SQLModel, psycopg, python-jose, passlib, etc.

2. **Authentication & Security**
- JWT-based, compatible with Better Auth frontend
- Password hashing (bcrypt via passlib)
- User isolation on all task routes
- Token validation middleware

3. **API Endpoints**
- **Auth**
  - POST /api/auth/register → register user
  - POST /api/auth/login → return JWT
- **Tasks**
  - GET /api/tasks → list user tasks (optional filter: status=all|active|completed, search query)

## Response snapshot

Created feature specification for FastAPI backend at `specs/004-fastapi-backend/spec.md`:

**User Stories**:
1. User Registration and Login (P1) - 4 acceptance scenarios
2. Create and Manage Personal Tasks (P1) - 4 acceptance scenarios
3. Filter and Search Tasks (P2) - 3 acceptance scenarios
4. Toggle Task Completion (P2) - 2 acceptance scenarios

**15 Functional Requirements** covering:
- User registration with email validation
- Password hashing with bcrypt
- JWT token generation (access 15min, refresh 7day)
- User isolation on all task operations
- Full CRUD for tasks
- Filtering by status and search

**Success Criteria**:
- Registration < 5s, Login < 2s, Task list < 500ms
- 100% user isolation verified by tests
- 100 concurrent users supported
- Consistent error responses

**Out of Scope**: Profile management, email verification, OAuth, task sharing, due dates, bulk ops.

## Outcome

- ✅ Impact: Complete specification ready for planning phase
- 🧪 Tests: none
- 📁 Files: specs/004-fastapi-backend/spec.md, checklists/requirements.md
- 🔁 Next prompts: /sp.plan for architecture decisions
- 🧠 Reflection: Specification covers all required endpoints with clear user isolation requirements

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): N/A
- Next experiment: N/A
