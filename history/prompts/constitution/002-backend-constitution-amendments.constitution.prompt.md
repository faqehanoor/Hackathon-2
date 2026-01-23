---
id: '002'
title: Backend constitution amendments
stage: constitution
date: 2025-12-31
surface: agent
model: claude-sonnet-4-5-20250929
feature: none
branch: 003-todo-web-app
user: pc
command: /sp.constitution
labels: [backend, constitution, security, auth]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - .specify/memory/constitution.md
tests:
  - none
---

## Prompt

You are the Backend Engineer Agent following Spec-Kit Plus for the Todo Full-Stack Web App Phase II.

Objective:
Build a secure, scalable, and multi-user backend using FastAPI + SQLModel + Neon PostgreSQL for a dark-themed professional Todo app.

Core Responsibilities:
- Implement JWT authentication compatible with Better Auth frontend.
- Ensure user isolation: each user can access only their tasks.
- Provide REST API endpoints for CRUD operations on tasks:
  - GET /api/tasks → list user tasks
  - POST /api/tasks → create new task
  - PUT /api/tasks/{id} → update task
  - PATCH /api/tasks/{id} → partial update (e.g., toggle completion)
  - DELETE /api/tasks/{id} → delete task
- Include validation, error handling, and proper HTTP status codes.
- Implement secure password storage, JWT token verification, and role handling (if applicable).
- Add filters for task status (all, active, completed).
- Optional: support task priority (High, Medium, Low) and search query via query params.

Database Schema:
- Users: id (UUID), email (unique), name, password_hash, timestamps
- Tasks: id (UUID), user_id, title, description, priority, completed, timestamps

Deliverables:
- README.md with setup instructions
- .env.example with DATABASE_URL, JWT_SECRET

Begin by writing the **full backend constitution spec** based on the above requirements.

## Response snapshot

Constitution updated from v1.0.0 to v1.1.0 with 5 new backend-focused principles:
- VIII. Secure Password Storage (bcrypt hashing requirements)
- IX. API Input Validation (Pydantic models, SQL injection prevention)
- X. Error Handling (consistent error responses with proper HTTP status codes)
- XI. Task Filtering & Search (status, priority, search, pagination query params)
- XII. Database Design (SQLModel ORM with priority field)

Updated sections:
- Technology Stack split into Frontend and Backend specifications
- Database Schema expanded with detailed field definitions
- API Endpoints added refresh token and user endpoints
- Added Query Parameters section for GET /api/tasks
- Added JWT Token Structure specification

## Outcome

- ✅ Impact: Constitution now includes comprehensive backend architecture requirements
- 🧪 Tests: none
- 📁 Files: .specify/memory/constitution.md
- 🔁 Next prompts: /sp.specify for backend feature, /sp.plan for backend architecture
- 🧠 Reflection: Constitution amendments establish security-first backend development principles

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): N/A
- Next experiment: N/A
