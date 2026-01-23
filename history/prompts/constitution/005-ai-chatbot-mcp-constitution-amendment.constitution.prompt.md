---
id: "005"
title: "AI Chatbot MCP + Agents Constitution Amendment"
stage: "constitution"
date: "2026-01-01"
surface: "agent"
model: "sonnet-4-5"
feature: "none"
branch: "003-todo-web-app"
user: "pc"
command: "/sp.constitution"
labels: ["constitution","ai","mcp","architecture"]
links:
  spec: "null"
  ticket: "null"
  adr: "null"
  pr: "null"
files:
  - ".specify/memory/constitution.md"
tests:
  - "None"
---

## Prompt

Phase III: Todo AI Chatbot (MCP + Agents)
Role Definition

You are Claude Code operating under Spec-Kit Plus and the Agentic Dev Stack.

Your responsibility is to design and implement a Todo AI Chatbot using a stateless MCP-based architecture.

Core Objective

Build an AI-powered conversational Todo assistant that allows users to manage todos via natural language.

All task operations must be executed through MCP tools.

Non-Negotiable Constraints

No manual coding outside agent-generated output

Follow Spec → Plan → Tasks → Implement

Backend must remain stateless

Conversation state must persist in database

AI logic must use OpenAI Agents SDK

All task operations must go through MCP tools

No direct database access by the AI agent

Conversation resumes after server restart

AI response must be persisted before returning

Stateless request cycle enforced

Disallowed Actions

No frontend logic in backend

No direct SQL from agent

No global variables or memory stores

No non-Todo related responses

No skipping Spec-Kit phases

Success Criteria

Users can manage todos using natural language

AI uses MCP tools correctly

Conversations persist across requests

Server is horizontally scalable

Project follows Spec-Kit Plus rigor

## Response snapshot

Updated constitution from v2.1.0 to v2.2.0, adding Principle XII: Todo AI Chatbot (MCP + Agents) with:
- MCP-Based Architecture requirements
- AI Agent Constraints (OpenAI Agents SDK, stateless cycles)
- Conversation State Management (DB persistence, resume after restart)
- Horizontal Scalability (stateless backend)
- Backend Directory Structure (FastAPI + SQLModel + MCP + Agents SDK)
- Updated Monorepo Organization to include /backend directory
- Added Technology Stack - Backend section
- Updated Development Workflow to include Backend Engineer and AI Engineer phases
- Updated Quality Gates for backend statelessness and MCP tool usage

All templates remain compatible (no changes needed).

## Outcome

- ✅ Impact: Constitution updated with new AI chatbot architecture principle
- 🧪 Tests: None required for constitution updates
- 📁 Files: .specify/memory/constitution.md (v2.1.0 → v2.2.0)
- 🔁 Next prompts: /sp.specify for AI chatbot feature specification
- 🧠 Reflection: Major architectural evolution from frontend-only to full-stack MCP-based AI architecture

## Evaluation notes (flywheel)

- Failure modes observed: "None"
- Graders run and results (PASS/FAIL): "N/A"
- Prompt variant (if applicable): "N/A"
- Next experiment (smallest change to try): "N/A"
