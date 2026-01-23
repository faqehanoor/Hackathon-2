# Implementation Tasks: Todo AI Chatbot

**Feature Branch**: `006-todo-ai-chatbot` | **Created**: 2026-01-01
**Spec**: [spec.md](spec.md) | **Plan**: [plan.md](plan.md)

## Task Summary

| Metric | Count |
|--------|-------|
| Total Tasks | 59 |
| Setup Phase | 8 |
| Foundational Phase | 12 |
| User Story Tasks | 35 |
| Polish Phase | 4 |

## Dependencies

### Story Completion Order

```
Phase 1 (Setup) → Phase 2 (Foundational) → US1 → US2 → US3 → US4 → US5 → Phase 8 (Polish)
                              ↓
                    All stories share foundational components
```

### Parallel Execution Opportunities

| Stories | Can Run In Parallel Because |
|---------|----------------------------|
| US1, US2, US3 | All share Todo model and todo MCP tools |
| US2, US4 | All use list/delete operations on todos |
| US3, US5 | Both require conversation context loading |

### MVP Scope

**Recommended MVP**: Phases 1-4 (Setup through US2: List Tasks)

This delivers basic chat functionality where users can:
1. Send messages to AI chatbot
2. Create todos via conversation
3. List their current todos

US3-US5 and Polish phase can be added incrementally.

---

## Phase 1: Setup

**Goal**: Initialize backend project structure and dependencies

**Independent Test Criteria**: Backend server starts successfully, pytest runs without configuration errors

### Implementation Tasks

- [ ] T001 Initialize Python project with pyproject.toml including dependencies: fastapi, uvicorn, sqlmodel, alembic, openai, httpx, pytest
- [ ] T002 Create backend directory structure per plan: src/models/, src/mcp/tools/, src/api/, src/agents/, src/lib/
- [ ] T003 Create config.py in backend/src/lib/ with pydantic settings for DATABASE_URL, OPENAI_API_KEY, JWT_SECRET
- [ ] T004 Create .env.example in backend/ with required environment variables
- [ ] T005 Initialize Alembic for database migrations in backend/alembic/
- [ ] T006 Create tests directory structure: tests/unit/, tests/integration/, and conftest.py
- [ ] T007 Add pytest configuration in pyproject.toml with test paths and coverage settings
- [ ] T008 Create requirements-dev.txt for development dependencies (pytest, pytest-cov, httpx, pytest-asyncio)

---

## Phase 2: Foundational

**Goal**: Create database models, MCP tools, and agent infrastructure required by all user stories

**Independent Test Criteria**: All models can be instantiated, MCP tools execute without errors, agent can process basic messages

### Implementation Tasks

- [ ] T010 Create database connection in backend/src/models/database.py with async SQLModel engine setup
- [ ] T011 Create SQLModel entities in backend/src/models/entities.py: User, Todo, Conversation, Message with relationships
- [ ] T012 Create Alembic migration script in backend/alembic/versions/001_initial.py for initial schema
- [ ] T013 Run alembic upgrade head to create all tables in PostgreSQL database
- [ ] T014 [P] Implement todo_add MCP tool in backend/src/mcp/tools/todo_tools.py for creating todos with user_id, title, description
- [ ] T015 [P] Implement todo_list MCP tool in backend/src/mcp/tools/todo_tools.py for listing todos with optional completed filter
- [ ] T016 [P] Implement todo_complete MCP tool in backend/src/mcp/tools/todo_tools.py for marking todos as complete
- [ ] T017 [P] Implement todo_update MCP tool in backend/src/mcp/tools/todo_tools.py for updating todo title/description
- [ ] T018 [P] Implement todo_delete MCP tool in backend/src/mcp/tools/todo_tools.py for deleting todos by ID
- [ ] T019 Create conversation repository in backend/src/services/conversation_repo.py with CRUD operations for Conversation and Message
- [ ] T020 Create todo repository in backend/src/services/todo_repo.py with user-scoped CRUD operations
- [ ] T021 Create todo_agent.py in backend/src/agents/ with OpenAI Agents SDK initialization and MCP tool integration

---

## Phase 3: US1 - Create Tasks via Conversation

**Goal**: Enable users to create todos by sending natural language messages

**Independent Test Criteria**: Sending "Add buy groceries" creates a new incomplete todo with that title for the authenticated user

**Test Scenarios**:
1. User sends "Create a task to call mom tomorrow" → New todo with title "call mom tomorrow" created
2. User sends "Add task: quarterly report due Friday" → New todo added without affecting existing
3. User sends empty message → AI returns clarification request

### Implementation Tasks

- [ ] T030 [P] [US1] Create JWT authentication middleware in backend/src/api/middleware/auth.py for extracting user_id from token
- [ ] T031 [P] [US1] Create ChatRequest and ChatResponse schemas in backend/src/api/schemas.py
- [ ] T032 [P] [US1] Implement chat API route in backend/src/api/routes.py: POST /chat accepting message and conversation_id
- [ ] T033 [P] [US1] Create stateless request handler in backend/src/api/handlers.py: fetch history → process with agent → persist → return
- [ ] T034 [US1] Implement conversation loading in chat handler that loads messages for conversation_id from database
- [ ] T035 [US1] Implement message persistence in chat handler that saves user message before agent processing
- [ ] T036 [US1] Implement response persistence in chat handler that saves assistant message after agent processing
- [ ] T037 [US1] Test US1 with pytest: test_create_task_via_conversation in tests/integration/test_chat.py

---

## Phase 4: US2 - List and View Tasks

**Goal**: Enable users to see their current todos by asking the AI

**Independent Test Criteria**: Sending "Show my tasks" returns a formatted list of all incomplete todos for the user

**Test Scenarios**:
1. User asks "What are my tasks?" with existing todos → Returns list with titles and creation dates
2. User asks "Show my todos" with no todos → Returns message suggesting to create one
3. User asks "What tasks do I have?" → Only incomplete todos listed by default

### Implementation Tasks

- [ ] T040 [P] [US2] Implement conversation list endpoint in backend/src/api/routes.py: GET /conversations with pagination
- [ ] T041 [P] [US2] Create ConversationDetailResponse schema in backend/src/api/schemas.py
- [ ] T042 [US2] Implement conversation retrieval endpoint: GET /conversations/{conversation_id} with messages
- [ ] T043 [US2] Update todo_list MCP tool to format output with titles and creation dates
- [ ] T044 [US2] Update chat handler to use todo_list tool when user asks about tasks
- [ ] T045 [US2] Test US2 with pytest: test_list_tasks_via_conversation in tests/integration/test_chat.py

---

## Phase 5: US3 - Update and Complete Tasks

**Goal**: Enable users to mark tasks complete or update content via conversation

**Independent Test Criteria**: Sending "Mark buy groceries as done" changes the todo's completed status to true

**Test Scenarios**:
1. User says "Mark buy groceries as complete" → Todo completed status changes to true
2. User says "Complete all tasks" → All incomplete todos marked complete
3. User says "Change meeting to 3pm" → Todo title updated

### Implementation Tasks

- [ ] T050 [P] [US3] Update todo_complete MCP tool to handle single ID completion
- [ ] T051 [P] [US3] Implement complete_all functionality in todo_complete tool
- [ ] T052 [P] [US3] Update todo_update MCP tool to handle title and description changes
- [ ] T053 [US3] Update chat handler to route completion/update intents to appropriate MCP tools
- [ ] T054 [US3] Test US3 with pytest: test_complete_task, test_update_task, test_complete_all in tests/integration/test_chat.py

---

## Phase 6: US4 - Delete Tasks

**Goal**: Enable users to remove unwanted tasks via conversation

**Independent Test Criteria**: Sending "Delete buy groceries" removes the todo from the user's list

**Test Scenarios**:
1. User says "Delete temporary task" → Todo permanently removed
2. User tries to delete non-existent task → Helpful error message returned

### Implementation Tasks

- [ ] T060 [P] [US4] Implement hard delete in todo_delete MCP tool with ownership verification
- [ ] T061 [US4] Update chat handler to route delete intents to todo_delete tool
- [ ] T062 [US4] Test US4 with pytest: test_delete_task, test_delete_nonexistent in tests/integration/test_chat.py

---

## Phase 7: US5 - Conversation Context

**Goal**: Enable users to reference previous messages in conversation

**Independent Test Criteria**: After "Create task to email John", sending "Now mark that as done" completes the just-created task

**Test Scenarios**:
1. User refers to "that task" after creating one → AI identifies and acts on most recent task
2. User asks "When was that created?" → AI provides creation date of referenced task

### Implementation Tasks

- [ ] T070 [P] [US5] Implement conversation context loader that retrieves last 20 messages for agent context
- [ ] T071 [P] [US5] Update chat handler to pass conversation history to AI agent
- [ ] T072 [US5] Update AI agent system prompt to reference previous tasks in conversation
- [ ] T073 [US5] Test US5 with pytest: test_conversation_context_reference in tests/integration/test_chat.py

---

## Phase 8: Polish & Integration

**Goal**: Finalize integration, add error handling, and ensure statelessness

**Independent Test Criteria**: All user stories work end-to-end, server restart preserves conversations, error messages are user-friendly

### Implementation Tasks

- [ ] T080 Add comprehensive error handling in chat handler for: empty messages, tool failures, database errors
- [ ] T081 Implement rollback on partial failure to ensure no partial message persistence
- [ ] T082 Add refusal response for non-Todo queries per Constitution Principle XII
- [ ] T083 Test statelessness: verify concurrent requests work and state loads from DB each time
- [ ] T084 Run full integration test suite: pytest tests/integration/ -v --tb=short
- [ ] T085 Verify TypeScript compilation in frontend/ (if changes made)
- [ ] T086 Test conversation persistence after server restart

---

## Test Suite Summary

| Test File | Coverage | Description |
|-----------|----------|-------------|
| tests/unit/test_todo_tools.py | MCP tools | Unit tests for todo_add, todo_list, todo_complete, todo_update, todo_delete |
| tests/integration/test_chat.py | Chat API | End-to-end tests for all 5 user stories |
| tests/integration/test_api.py | REST API | Tests for conversation list and detail endpoints |
| tests/conftest.py | Fixtures | Shared fixtures for user, conversation, todo |

---

## Implementation Strategy

### MVP First (Recommended)

1. **Complete Phases 1-2** (Setup + Foundational) - 20 tasks
2. **Complete Phase 3** (US1: Create Tasks) - 8 tasks
3. **Complete Phase 4** (US2: List Tasks) - 6 tasks
4. **Test MVP**: Verify basic chat works, todos can be created and listed

### Incremental Delivery

After MVP:
- Phase 5: US3 (Complete/Update) - 5 tasks
- Phase 6: US4 (Delete) - 3 tasks
- Phase 7: US5 (Context) - 4 tasks
- Phase 8: Polish - 7 tasks

### Total Tasks by Story

| Story | Tasks | Priority |
|-------|-------|----------|
| US1: Create Tasks | 8 | P1 |
| US2: List Tasks | 6 | P1 |
| US3: Complete/Update | 5 | P1 |
| US4: Delete | 3 | P2 |
| US5: Context | 4 | P2 |
| Shared (Setup + Foundational + Polish) | 33 | - |
