# Implementation Plan: Todo AI Chatbot

**Branch**: `006-todo-ai-chatbot` | **Date**: 2026-01-01 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification for AI-powered conversational Todo assistant using MCP tools and OpenAI Agents SDK.

## Summary

Enable users to manage Todo tasks via natural language conversation using an AI agent powered by OpenAI Agents SDK, with all task operations executed via MCP tools. The system must be fully stateless at the server level while persisting all conversation and task state in PostgreSQL.

The chatbot integrates with the existing frontend (Next.js + ChatKit) and adds a FastAPI backend that exposes a stateless chat endpoint. The AI agent processes user messages, invokes MCP tools for Todo CRUD operations, and generates conversational responses. All conversation history persists in the database, enabling resumption after server restart.

## Technical Context

**Language/Version**: Python 3.11+
**Primary Dependencies**: FastAPI 0.109+, SQLModel, OpenAI Agents SDK, MCP (Model Context Protocol)
**Storage**: PostgreSQL (Neon Serverless or local) with SQLModel ORM
**Testing**: pytest, httpx for async HTTP testing
**Target Platform**: Linux server (container-ready)
**Project Type**: Web application with separate frontend/backend
**Performance Goals**: <500ms p95 response time for chat endpoint, stateless scaling
**Constraints**: No in-memory state, all operations through MCP tools, user-scoped data access
**Scale/Scope**: Single-tenant initially, 10k+ conversations, 100 concurrent users expected

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|-----------|--------|-------|
| I. Spec-Driven Development | ✅ PASS | Follows Spec → Plan → Tasks → Implement |
| VI. Monorepo Organization | ✅ PASS | Uses /backend for server, /frontend for UI |
| XII. Todo AI Chatbot (MCP + Agents) | ✅ PASS | MCP tools required, stateless enforced, OpenAI Agents SDK used |
| MCP-Based Architecture | ✅ PASS | All operations through MCP tools, no direct DB access |
| AI Agent Constraints | ✅ PASS | Stateless request cycle, no global variables |
| Conversation State Management | ✅ PASS | Full DB persistence, resume after restart |
| Horizontal Scalability | ✅ PASS | Stateless design enables multi-instance deployment |
| Forbidden Actions | ✅ PASS | No frontend logic in backend, no direct SQL |

**Result**: All gates pass. Proceed to Phase 0.

## Project Structure

### Documentation (this feature)

```text
specs/006-todo-ai-chatbot/
├── plan.md              # This file (/sp.plan command output)
├── research.md          # Phase 0 output (resolved unknowns)
├── data-model.md        # Phase 1 output (entity definitions)
├── quickstart.md        # Phase 1 output (setup guide)
├── contracts/           # Phase 1 output (API schemas)
│   └── openapi.yaml
└── tasks.md             # Phase 2 output (/sp.tasks command - NOT created by /sp.plan)
```

### Source Code (repository root)

```text
backend/
├── src/
│   ├── main.py                 # FastAPI application entry point
│   ├── models/                 # SQLModel database models
│   │   ├── entities.py         # Todo, User, Conversation, Message
│   │   └── database.py         # Database connection and session
│   ├── mcp/
│   │   ├── tools/              # MCP tool definitions
│   │   │   ├── todo_tools.py   # CRUD operations for todos
│   │   │   └── __init__.py
│   │   └── server.py           # MCP server implementation
│   ├── api/
│   │   └── routes.py           # HTTP endpoints
│   ├── agents/
│   │   └── todo_agent.py       # OpenAI Agents SDK implementation
│   └── lib/
│       └── config.py           # Configuration management
├── alembic/                    # Database migrations
├── tests/
│   ├── unit/
│   ├── integration/
│   └── conftest.py
└── pyproject.toml

frontend/
├── app/
│   └── dashboard/
│       └── chat/               # ChatKit integration
├── components/
│   └── Chatbot/                # Updated chatbot components
└── services/
    └── api.ts                  # Backend API client
```

**Structure Decision**: Full-stack web application with FastAPI backend exposing REST endpoints for chat, integrated with OpenAI Agents SDK for AI processing. MCP tools handle all Todo CRUD operations. Frontend uses ChatKit for chat UI, communicating with backend via HTTP.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| None | N/A | N/A |

No constitution violations. Design follows all principles.

## Phase 0: Research

### Resolved Unknowns

All technical decisions have been made based on user input and constitution requirements:

- **Backend Framework**: FastAPI (Python 3.11+) - specified by user, compatible with constitution
- **Database**: PostgreSQL via SQLModel - matches constitution, supports Neon deployment
- **AI Agent**: OpenAI Agents SDK - explicitly required by constitution
- **Protocol**: MCP (Model Context Protocol) - explicitly required for tool execution
- **Frontend**: OpenAI ChatKit - specified by user
- **Auth**: JWT-based with user scoping - matches constitution requirements
- **Statelessness**: All state in DB, no in-memory storage - matches constitution

### Best Practices Applied

- FastAPI async endpoints with httpx for testing
- SQLModel for type-safe ORM with Pydantic validation
- MCP tool pattern for controlled AI → DB operations
- Stateless request cycle with explicit state loading from DB
- User-scoped queries with explicit owner checks

## Phase 1: Design Artifacts

### Generated Files

- `data-model.md` - Entity definitions with SQLModel schemas
- `contracts/openapi.yaml` - REST API specification
- `quickstart.md` - Development setup guide

### Key Design Decisions

| Decision | Rationale | Alternatives Considered |
|----------|-----------|------------------------|
| Separate chat endpoint per user | Enables stateless scaling, user-scoped access | Global endpoint with auth header |
| MCP tool pattern for all CRUD | Enforces controlled operations, matches constitution | Direct agent → DB access |
| Conversation persistence per request | Guarantees state survive restart | In-memory with periodic save |
| PostgreSQL for all state | Matches constitution, supports Neon | SQLite (rejected - no production use) |

## Quick Links

- **Spec**: [spec.md](spec.md)
- **Data Model**: [data-model.md](data-model.md)
- **API Contracts**: [contracts/openapi.yaml](contracts/openapi.yaml)
- **Quickstart**: [quickstart.md](quickstart.md)
- **Tasks**: (generated by `/sp.tasks` command)
