# Implementation Plan: FastAPI Backend for Todo App

**Branch**: `004-fastapi-backend` | **Date**: 2025-12-31 | **Spec**: [link](spec.md)
**Input**: Feature specification from `/specs/004-fastapi-backend/spec.md`

## Summary

Build a secure, multi-user FastAPI backend with PostgreSQL (Neon), JWT authentication, and full task CRUD operations. The backend serves a Next.js frontend using Better Auth for client-side session management. Key technical decisions: SQLModel for ORM with PostgreSQL, bcrypt for password hashing, python-jose for JWT, and FastAPI's dependency injection for auth middleware.

## Technical Context

**Language/Version**: Python 3.11+
**Primary Dependencies**: FastAPI 0.109+, SQLModel, psycopg (PostgreSQL), python-jose (JWT), passlib[bcrypt], python-dotenv, uvicorn
**Storage**: Neon PostgreSQL (connection via DATABASE_URL env var)
**Testing**: pytest (placeholder in /tests)
**Target Platform**: Linux server (production), localhost development
**Project Type**: Web API backend
**Performance Goals**: 100 concurrent users, <500ms API response for task list, <200ms for auth
**Constraints**: JWT tokens expire in 15min (access) / 7 days (refresh), user isolation enforced on all task routes
**Scale/Scope**: Multi-tenant with per-user data isolation, ~10 tables (Users, Tasks)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|-----------|--------|-------|
| I. Spec-Driven Development | ✅ PASS | Spec exists at specs/004-fastapi-backend/spec.md |
| II. JWT Authentication Bridge | ✅ PASS | JWT tokens compatible with Better Auth frontend |
| III. User Isolation (NON-NEGOTIABLE) | ✅ PASS | All task routes filter by user_id from JWT |
| IV. REST API Standards | ✅ PASS | Standard HTTP methods with proper status codes |
| V. Type Safety | ✅ PASS | SQLModel + Pydantic for full type safety |
| VIII. Secure Password Storage | ✅ PASS | bcrypt via passlib |
| IX. API Input Validation | ✅ PASS | Pydantic models with clear error messages |
| X. Error Handling | ✅ PASS | Consistent HTTP status codes (401, 404, 422) |
| XI. Task Filtering & Search | ✅ PASS | Status filter and search query params supported |
| XII. Database Design | ✅ PASS | SQLModel with priority field, timestamps |

## Project Structure

### Documentation (this feature)

```text
specs/004-fastapi-backend/
├── plan.md              # This file (/sp.plan command output)
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output
└── tasks.md             # Phase 2 output (/sp.tasks command)
```

### Source Code (repository root)

```text
backend/
├── app/
│   ├── __init__.py
│   ├── main.py                    # FastAPI app entry point
│   ├── database.py                # DB engine, session, tables creation
│   ├── models.py                  # SQLModel models (Users, Tasks)
│   ├── schemas.py                 # Pydantic schemas for requests/responses
│   ├── crud.py                    # CRUD operations for tasks and users
│   ├── auth.py                    # JWT auth utilities, password hashing
│   └── routers/
│       ├── __init__.py
│       ├── auth.py                # /api/auth endpoints
│       └── tasks.py               # /api/tasks endpoints
├── tests/
│   ├── __init__.py
│   ├── conftest.py
│   ├── test_auth.py
│   └── test_tasks.py
├── .env.example                   # DATABASE_URL, JWT_SECRET
├── requirements.txt               # Python dependencies
└── README.md                      # Setup instructions

frontend/                          # Existing Next.js frontend
```

**Structure Decision**: Backend follows FastAPI best practices with separation of concerns (models, schemas, crud, routers). Frontend and backend are sibling directories in the monorepo, following Spec-Kit Plus conventions.

## Complexity Tracking

> Not applicable - no constitution violations requiring justification.

## Phase 0: Research Required

No NEEDS CLARIFICATION markers remain. All technical decisions are based on:
- FastAPI official documentation and best practices
- SQLModel integration with FastAPI
- JWT implementation patterns with python-jose
- Neon PostgreSQL connection patterns

## Phase 1: Design Artifacts

Generated artifacts from this plan:
- `data-model.md` - Entity definitions and relationships
- `contracts/openapi.yaml` - OpenAPI specification for all endpoints
- `quickstart.md` - Setup and running instructions
- Agent context updated for Backend Engineer
