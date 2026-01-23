---
id: "002"
title: "Todo AI Chatbot Implementation Plan"
stage: "plan"
date: "2026-01-01"
surface: "agent"
model: "sonnet-4-5"
feature: "todo-ai-chatbot"
branch: "006-todo-ai-chatbot"
user: "pc"
command: "/sp.plan"
labels: ["planning","fastapi","mcp","openai-agents"]
links:
  spec: "null"
  ticket: "null"
  adr: "null"
  pr: "null"
files:
  - "specs/006-todo-ai-chatbot/plan.md"
  - "specs/006-todo-ai-chatbot/data-model.md"
  - "specs/006-todo-ai-chatbot/quickstart.md"
  - "specs/006-todo-ai-chatbot/contracts/openapi.yaml"
tests:
  - "None"
---

## Prompt

Project Plan: Todo AI Chatbot

Objective:
Enable users to manage Todo tasks via natural language using an AI agent with MCP tools. Backend is stateless; all conversation and task data persist in the database.

1. Architecture Overview

Frontend: Next.js + OpenAI ChatKit

Backend: FastAPI (Python) + MCP tool integration

Database: PostgreSQL (Neon Serverless)

Auth & Security: JWT-based, user-scoped

Styling: Minimal, Chat UI-focused

2. Key Modules / Features

Frontend:

Chat UI with streaming responses

Conversation ID maintained on client

Inline error messages

Stateless request handling

Backend:

Chat Endpoint: POST /api/{user_id}/chat

MCP Tool Integration: add_task, list_tasks, complete_task, delete_task, update_task

Database Models: User, Task, Conversation, Message

Stateless Conversation Handling: Fetch → Append → Run Agent → Persist → Return

Error Handling: Task not found, invalid ID, empty list, tool failure

3. Workflow / Task Breakdown

Phase I – Backend Setup:

Define DB models for tasks, conversations, messages

Implement MCP tools for CRUD operations

Create chat endpoint with stateless request handling

Phase II – Agent Implementation:

Integrate OpenAI Agents SDK

Map user intents to MCP tools

Implement conversation retrieval and message persistence

Phase III – Frontend Implementation:

Setup ChatKit UI

Handle streaming and full responses

Maintain conversation ID in client

Phase IV – Integration & Testing:

Test AI-agent to tool mapping

Validate stateless backend cycle

Test error handling and edge c

## Response snapshot

Created comprehensive implementation plan at specs/006-todo-ai-chatbot/plan.md with:
- Technical Context: Python 3.11+, FastAPI, SQLModel, OpenAI Agents SDK, PostgreSQL
- Constitution Check: All 8 gates pass (including new Principle XII)
- Project Structure: Full backend/frontend layout per constitution
- Resolved Unknowns: All technology decisions made
- Key Design Decisions: 4 decisions with rationale

Created data-model.md with:
- 4 entities: User, Todo, Conversation, Message
- Field definitions with constraints and indexes
- SQLModel schema preview
- Database migration strategy

Created contracts/openapi.yaml with:
- REST API specification for chat endpoint
- Conversation management endpoints
- MCP tool definitions (5 tools: todo_add, todo_list, todo_complete, todo_update, todo_delete)
- Request/response schemas

Created quickstart.md with:
- Environment setup instructions
- API endpoint examples
- Testing instructions
- Configuration reference
- Troubleshooting guide

Updated agent context: CLAUDE.md with new Python/FastAPI/SQLModel/MCP technologies

## Outcome

- ✅ Impact: Complete implementation plan for AI chatbot feature
- 🧪 Tests: None required for planning phase
- 📁 Files: plan.md, data-model.md, quickstart.md, contracts/openapi.yaml
- 🔁 Next prompts: /sp.tasks for task breakdown
- 🧠 Reflection: Plan builds on spec with concrete technical decisions

## Evaluation notes (flywheel)

- Failure modes observed: "None"
- Graders run and results (PASS/FAIL): "N/A"
- Prompt variant (if applicable): "N/A"
- Next experiment (smallest change to try): "N/A"
