# Implementation Tasks: FastAPI Backend for Todo App

**Feature**: FastAPI Backend for Todo App
**Branch**: `004-fastapi-backend`
**Date**: 2025-12-31
**Spec**: [spec.md](spec.md) | **Plan**: [plan.md](plan.md) | **Data Model**: [data-model.md](data-model.md)

## Summary

This document contains 27 implementation tasks organized into 6 phases. Tasks are organized by user story to enable independent implementation and testing. The MVP is User Story 1 (Registration and Login).

## Dependencies Graph

```
Phase 1 (Setup) → Phase 2 (Foundational) → Phase 3 (US1: Auth) → Phase 4 (US2: CRUD)
                                                              ↓
                                          Phase 5 (US3: Filter/Search)
                                          Phase 6 (US4: Toggle)
                                          Phase 7 (Polish)
```

**Parallel Opportunities**:
- T002, T003, T004 can run in parallel (project initialization)
- T006, T007, T008 can run in parallel (dependency installation)
- T014 [P], T015 [P], T016 [P] can run in parallel (auth components for US1)
- T019 [P], T020 [P], T021 [P] can run in parallel (task CRUD for US2)

## Implementation Strategy

**MVP Scope**: Phase 3 (User Story 1: Registration and Login)
- After completing Phases 1-3, the system supports user registration and login
- This delivers value by enabling authentication for the frontend

**Incremental Delivery**:
1. Complete Phases 1-2 (infrastructure)
2. Complete Phase 3 (auth) → working login/registration
3. Complete Phase 4 (task CRUD) → core task management
4. Complete Phase 5-6 (filtering/toggling) → enhanced UX
5. Complete Phase 7 (polish) → production readiness

---

## Phase 1: Project Setup

**Goal**: Initialize backend project structure and configuration files

**Independent Test**: Can be verified by checking all files exist and `pip install -r requirements.txt` succeeds without errors.

### Tasks

- [ ] T001 Create backend directory structure per implementation plan in `backend/`
- [ ] T002 [P] Create `backend/requirements.txt` with FastAPI, SQLModel, psycopg, python-jose, passlib[bcrypt], python-dotenv, uvicorn
- [ ] T003 [P] Create `backend/.env.example` with DATABASE_URL, JWT_SECRET, JWT_ALGORITHM, ACCESS_TOKEN_EXPIRE_MINUTES, REFRESH_TOKEN_EXPIRE_DAYS
- [ ] T004 [P] Create `backend/README.md` with project overview and quick setup instructions

---

## Phase 2: Foundational Infrastructure

**Goal**: Set up database connection, core models, and shared utilities (blocking for all user stories)

**Independent Test**: Can be verified by running `python -c "from app.database import engine; from app.models import User, Task; print('Models loaded successfully')"`

### Tasks

- [ ] T005 Create `backend/app/__init__.py` empty file
- [ ] T006 [P] Create `backend/app/database.py` with SQLModel engine, session local, and init_db() function for Neon PostgreSQL connection
- [ ] T007 [P] Create `backend/app/models.py` with SQLModel User and Task models per data-model.md
- [ ] T008 [P] Create `backend/app/schemas.py` with Pydantic models for UserCreate, UserResponse, TaskCreate, TaskUpdate, TaskResponse, Token, AuthResponse
- [ ] T009 [P] Create `backend/app/auth.py` with JWT token creation, verification, password hashing using passlib[bcrypt], and get_current_user dependency

---

## Phase 3: User Story 1 - Registration and Login

**Goal**: Implement user authentication (register and login endpoints)

**Independent Test**: Can be fully tested by:
1. Registering a new user with POST `/api/auth/register`
2. Logging in with POST `/api/auth/login`
3. Verifying JWT tokens are returned
4. Attempting duplicate registration and verifying error

**Related Requirements**: FR-001, FR-002, FR-003, FR-004, FR-013

### Tasks

- [ ] T010 Create `backend/app/routers/__init__.py` empty file
- [ ] T011 [P] [US1] Create `backend/app/routers/auth.py` with POST `/api/auth/register` endpoint implementing user creation with email validation and password hashing
- [ ] T012 [P] [US1] Create `backend/app/routers/auth.py` with POST `/api/auth/login` endpoint implementing credential verification and JWT token generation
- [ ] T013 [US1] Create `backend/app/main.py` FastAPI app entry point with CORS middleware and router inclusion for auth endpoints
- [ ] T014 [P] [US1] Create `backend/tests/__init__.py` empty file
- [ ] T015 [P] [US1] Create `backend/tests/conftest.py` with pytest fixtures for test database and auth tokens
- [ ] T016 [P] [US1] Create `backend/tests/test_auth.py` with tests for registration (success, duplicate email) and login (success, invalid credentials)

---

## Phase 4: User Story 2 - Task CRUD Operations

**Goal**: Implement create, read, update, delete for tasks with user isolation

**Independent Test**: Can be fully tested by:
1. Creating a task with POST `/api/tasks`
2. Retrieving all tasks with GET `/api/tasks`
3. Updating a task with PUT `/api/tasks/{id}`
4. Deleting a task with DELETE `/api/tasks/{id}`
5. Verifying tasks are isolated per user (other user's tasks not returned)

**Related Requirements**: FR-005, FR-006, FR-007, FR-010, FR-012, FR-014

### Tasks

- [ ] T017 [P] [US2] Create `backend/app/crud.py` with create_task, get_tasks, get_task, update_task, delete_task functions enforcing user_id isolation
- [ ] T018 [P] [US2] Create `backend/app/routers/tasks.py` with GET `/api/tasks` endpoint returning user's tasks
- [ ] T019 [P] [US2] Create `backend/app/routers/tasks.py` with POST `/api/tasks` endpoint for creating tasks
- [ ] T020 [P] [US2] Create `backend/app/routers/tasks.py` with GET `/api/tasks/{task_id}` endpoint for single task
- [ ] T021 [P] [US2] Create `backend/app/routers/tasks.py` with PUT `/api/tasks/{task_id}` endpoint for full task update
- [ ] T022 [P] [US2] Create `backend/app/routers/tasks.py` with DELETE `/api/tasks/{task_id}` endpoint for task deletion
- [ ] T023 [US2] Update `backend/app/main.py` to include tasks router with `/api` prefix
- [ ] T024 [P] [US2] Create `backend/tests/test_tasks.py` with tests for CRUD operations and user isolation verification

---

## Phase 5: User Story 3 - Filter and Search Tasks

**Goal**: Add filtering by status and search functionality to task list endpoint

**Independent Test**: Can be tested by:
1. Creating tasks with different statuses (active/completed)
2. Calling GET `/api/tasks?status=active` and verifying completed tasks are filtered
3. Calling GET `/api/tasks?search=keyword` and verifying matching tasks are returned

**Related Requirements**: FR-008, FR-009

### Tasks

- [ ] T025 [US3] Update `backend/app/crud.py` get_tasks function to accept status filter and search query parameters with ILIKE matching
- [ ] T026 [US3] Update `backend/app/routers/tasks.py` GET `/api/tasks` endpoint to accept query parameters: status (all/active/completed), search, page, limit
- [ ] T027 [US3] Add tests in `backend/tests/test_tasks.py` for filtering by status and searching by keyword

---

## Phase 6: User Story 4 - Toggle Task Completion

**Goal**: Add partial update endpoint for toggling task completion status

**Independent Test**: Can be tested by:
1. Creating a task
2. Calling PATCH `/api/tasks/{id}` with completed=true
3. Verifying task.completed is true
4. Calling PATCH with completed=false
5. Verifying task.completed is false

**Related Requirements**: FR-011

### Tasks

- [ ] T028 [US4] Create `backend/app/crud.py` toggle_task_completion function for partial update
- [ ] T029 [US4] Create `backend/app/routers/tasks.py` with PATCH `/api/tasks/{task_id}` endpoint for partial update (toggle completion)
- [ ] T030 [US4] Add tests in `backend/tests/test_tasks.py` for toggling completion status

---

## Phase 7: Polish and Cross-Cutting Concerns

**Goal**: Error handling, validation, and production readiness

**Independent Test**: Can be verified by testing invalid inputs and checking error responses match expected format.

### Tasks

- [ ] T031 Create `backend/app/exceptions.py` with custom exception classes (AuthenticationError, NotFoundError, ValidationError)
- [ ] T032 [P] Update `backend/app/main.py` to add exception handlers for uniform error responses with proper HTTP status codes
- [ ] T033 [P] Create `backend/.env` file template validation in `backend/app/config.py` settings class using pydantic-settings or python-dotenv
- [ ] T034 [P] Update `backend/tests/test_auth.py` and `backend/tests/test_tasks.py` to verify error response formats

---

## Task Summary

| Phase | User Story | Task Count | Description |
|-------|------------|------------|-------------|
| 1 | - | 4 | Project setup |
| 2 | - | 5 | Foundational infrastructure |
| 3 | US1 | 7 | Authentication (register/login) |
| 4 | US2 | 8 | Task CRUD operations |
| 5 | US3 | 3 | Filter and search |
| 6 | US4 | 3 | Toggle completion |
| 7 | - | 4 | Polish and error handling |
| **Total** | - | **34** | All implementation tasks |

**MVP (User Story 1)**: Tasks T001-T016 (16 tasks, Phases 1-3)
- After completion: Working user registration and login with JWT

**Suggested Execution Order**:
1. Complete Phases 1-2 (T001-T009)
2. Complete Phase 3 (T010-T016) → MVP achieved
3. Complete Phase 4 (T017-T024) → Full task CRUD
4. Complete Phase 5 (T025-T027) → Filter/search
5. Complete Phase 6 (T028-T030) → Toggle
6. Complete Phase 7 (T031-T034) → Production polish
