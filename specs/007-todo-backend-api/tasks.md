---

description: "Task list for Todo Backend API implementation"
---

# Tasks: Todo Backend API

**Input**: Design documents from `/specs/007-todo-backend-api/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: The examples below include test tasks. Tests are OPTIONAL - only include them if explicitly requested in the feature specification.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Backend project**: `backend/src/`, `backend/tests/` at repository root
- Paths shown below follow the backend structure from plan.md

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [X] T001 Create project directory structure at backend/
- [X] T002 [P] Initialize Python project with pyproject.toml including FastAPI, SQLModel, python-jose, python-dotenv, psycopg2-binary
- [X] T003 [P] Create .env file with NEON_DB_URL and BETTER_AUTH_SECRET environment variables

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T004 Setup database connection and session in backend/src/models/database.py
- [X] T005 [P] Create Task model in backend/src/models/entities.py based on data-model.md
- [X] T006 [P] Implement JWT authentication utilities in backend/src/auth/jwt_handler.py
- [X] T007 [P] Create authentication middleware in backend/src/auth/middleware.py
- [X] T008 Create Task service with CRUD operations in backend/src/services/task_service.py
- [X] T009 Setup main FastAPI application in backend/src/main.py with proper configuration

**Checkpoint**: Foundation ready - user story implementation can now begin

---

## Phase 3: User Story 1 - Create and Manage Personal Tasks (Priority: P1) 🎯 MVP

**Goal**: Enable users to create, view, update, and delete their personal tasks through an API interface

**Independent Test**: Can be fully tested by authenticating as a user, creating a task via POST request, retrieving all tasks via GET request, updating a task via PUT request, and deleting a task via DELETE request. Each operation should only affect the authenticated user's own tasks.

### Tests for User Story 1 (OPTIONAL - only if tests requested) ⚠️

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [ ] T010 [P] [US1] Contract test for GET /api/{user_id}/tasks in backend/tests/contract/test_tasks.py
- [ ] T011 [P] [US1] Contract test for POST /api/{user_id}/tasks in backend/tests/contract/test_tasks.py
- [ ] T012 [P] [US1] Contract test for PUT /api/{user_id}/tasks/{id} in backend/tests/contract/test_tasks.py
- [ ] T013 [P] [US1] Contract test for DELETE /api/{user_id}/tasks/{id} in backend/tests/contract/test_tasks.py
- [ ] T014 [P] [US1] Integration test for user task management flow in backend/tests/integration/test_task_management.py

### Implementation for User Story 1

- [X] T015 [P] [US1] Implement GET /api/{user_id}/tasks endpoint in backend/src/api/routes.py
- [X] T016 [P] [US1] Implement POST /api/{user_id}/tasks endpoint in backend/src/api/routes.py
- [X] T017 [US1] Implement DELETE /api/{user_id}/tasks/{id} endpoint in backend/src/api/routes.py
- [X] T018 [US1] Implement PUT /api/{user_id}/tasks/{id} endpoint in backend/src/api/routes.py
- [X] T019 [US1] Add user_id validation to ensure authenticated user matches requested user_id
- [X] T020 [US1] Add logging for task operations in backend/src/services/task_service.py

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Authenticate and Access Tasks Securely (Priority: P1)

**Goal**: Allow users to securely access their tasks using JWT authentication to ensure privacy and data isolation

**Independent Test**: Can be fully tested by obtaining a valid JWT token, using it in the Authorization header for API requests, and verifying that users can only access their own tasks and receive appropriate error responses when attempting to access others' data.

### Tests for User Story 2 (OPTIONAL - only if tests requested) ⚠️

- [ ] T021 [P] [US2] Contract test for JWT authentication in backend/tests/contract/test_auth.py
- [ ] T022 [P] [US2] Integration test for authentication flow in backend/tests/integration/test_auth.py

### Implementation for User Story 2

- [X] T023 [P] [US2] Implement JWT verification dependency in backend/src/auth/middleware.py
- [X] T024 [P] [US2] Apply authentication to all task endpoints in backend/src/api/routes.py
- [X] T025 [US2] Add 401 Unauthorized response handling for invalid/missing JWT
- [X] T026 [US2] Add 403 Forbidden response handling for unauthorized access attempts
- [X] T027 [US2] Implement user_id extraction from JWT payload and comparison with URL parameter

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - Toggle Task Completion Status (Priority: P2)

**Goal**: Allow users to mark tasks as complete or incomplete to track their progress

**Independent Test**: Can be tested by toggling a task's completion status using the PATCH /api/{user_id}/tasks/{id}/complete endpoint and verifying the change persists in the database.

### Tests for User Story 3 (OPTIONAL - only if tests requested) ⚠️

- [ ] T028 [P] [US3] Contract test for PATCH /api/{user_id}/tasks/{id}/complete in backend/tests/contract/test_completion.py
- [ ] T029 [P] [US3] Integration test for task completion flow in backend/tests/integration/test_completion.py

### Implementation for User Story 3

- [X] T030 [P] [US3] Add toggle completion function to Task service in backend/src/services/task_service.py
- [X] T031 [US3] Implement PATCH /api/{user_id}/tasks/{id}/complete endpoint in backend/src/api/routes.py
- [X] T032 [US3] Add authentication and authorization to completion endpoint
- [X] T033 [US3] Add logging for completion operations

**Checkpoint**: At this point, User Stories 1, 2, AND 3 should all work independently

---

## Phase 6: User Story 4 - View Individual Task Details (Priority: P2)

**Goal**: Allow users to view detailed information about a specific task

**Independent Test**: Can be tested by calling GET /api/{user_id}/tasks/{id} and verifying that complete task details are returned.

### Tests for User Story 4 (OPTIONAL - only if tests requested) ⚠️

- [ ] T034 [P] [US4] Contract test for GET /api/{user_id}/tasks/{id} in backend/tests/contract/test_task_details.py
- [ ] T035 [P] [US4] Integration test for task details retrieval in backend/tests/integration/test_task_details.py

### Implementation for User Story 4

- [X] T036 [P] [US4] Add get task by ID function to Task service in backend/src/services/task_service.py
- [X] T037 [US4] Implement GET /api/{user_id}/tasks/{id} endpoint in backend/src/api/routes.py
- [X] T038 [US4] Add authentication and authorization to task details endpoint
- [X] T039 [US4] Add 404 handling for non-existent tasks

**Checkpoint**: All user stories should now be independently functional

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [X] T040 [P] Add comprehensive error handling with proper HTTP status codes throughout the application
- [X] T041 Add input validation using Pydantic models for all request bodies
- [X] T042 [P] Add database migration setup with Alembic in backend/alembic/
- [X] T043 [P] Add configuration management in backend/src/lib/config.py
- [X] T044 Add logging configuration for production use
- [X] T045 Run quickstart.md validation to ensure all functionality works as expected

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3)
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P1)**: Can start after Foundational (Phase 2) - Builds on US1 endpoints
- **User Story 3 (P2)**: Can start after Foundational (Phase 2) - May integrate with US1/US2 but should be independently testable
- **User Story 4 (P2)**: Can start after Foundational (Phase 2) - May integrate with US1/US2/US3 but should be independently testable

### Within Each User Story

- Tests (if included) MUST be written and FAIL before implementation
- Models before services (completed in foundational phase)
- Services before endpoints
- Core implementation before integration
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- Once Foundational phase completes, all user stories can start in parallel (if team capacity allows)
- All tests for a user story marked [P] can run in parallel
- Different user stories can be worked on in parallel by different team members

---

## Parallel Example: User Story 1

```bash
# Launch all endpoints for User Story 1 together:
Task: "Implement GET /api/{user_id}/tasks endpoint in backend/src/api/routes.py"
Task: "Implement POST /api/{user_id}/tasks endpoint in backend/src/api/routes.py"
Task: "Implement DELETE /api/{user_id}/tasks/{id} endpoint in backend/src/api/routes.py"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test User Story 1 independently
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 → Test independently → Deploy/Demo
4. Add User Story 3 → Test independently → Deploy/Demo
5. Add User Story 4 → Test independently → Deploy/Demo
6. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1
   - Developer B: User Story 2
   - Developer C: User Story 3
3. Stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Verify tests fail before implementing
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence