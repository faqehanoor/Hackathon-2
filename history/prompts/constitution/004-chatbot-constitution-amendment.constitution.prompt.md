---
id: "004"
title: "Chatbot Constitution Amendment"
stage: "constitution"
date: "2026-01-01"
surface: "agent"
model: "claude-sonnet-4-5-20250929"
feature: "none"
branch: "003-todo-web-app"
user: "User"
command: "/sp.constitution"
labels: ["constitution","chatbot","frontend"]
links:
  spec: "null"
  ticket: "null"
  adr: "null"
  pr: "null"
files:
  - ".specify/memory/constitution.md"
tests:
  - "null"
---

## Prompt

sp.constitution with arguments:

Todo Assistant Chatbot (Frontend)

You are Claude Code following Spec-Kit Plus and the Agentic Dev Stack.

Core Objective

Add a frontend-only chatbot that assists users with Todo application–related information only.

Scope Limits

Frontend UI + logic only

Rule-based responses

No external APIs

No AI models

No backend communication

Hard Constraints

Chatbot must answer ONLY Todo app–related queries

Must refuse unrelated questions

Responses must be deterministic

No persistence beyond session (optional localStorage for chat history)

Tech Lock

Framework: Next.js (App Router)

Language: TypeScript

Styling: Tailwind CSS

Animation: Framer Motion

State: React Context or Zustand

Visibility Rules

Chatbot visible only on:

/dashboard

/dashboard/todos

Hidden on:

/

/signin

/signup

UI Rules

Floating action button (bottom-right)

Glassmorphism chat panel

Dark theme with gradient accents

Smooth open/close animations

Behavior Rules

Instant response (simulated delay allowed)

Keyword-based intent matching

Predefined knowledge base

Clear fallback for unknown queries

Allowed Knowledge Domain

Todo app purpose

Todo creation, editing, deletion

Filters & dashboard info

Auth flow (UI-only)

Navigation guidance

LocalStorage explanation

Forbidden

Backend explanations

Coding tutorials

General AI answers

Personal questions

External topics

Failure Response

If query is outside scope:

"I can help only with Todo app features 🙂"

Success Criteria

Chatbot is intuitive and fast

UI matches app design system

Users can understand app usage without leaving dashboard

No scope leakage beyond Todo app

## Response snapshot

Updated constitution to v2.1.0 by adding Principle XI: Todo Assistant Chatbot. Added new section with scope boundaries, visibility rules, allowed knowledge domain, forbidden topics, and technical requirements. Version bumped from 2.0.0 to 2.1.0 (MINOR) as this adds new feature guidance without changing existing principles.

## Outcome

- ✅ Impact: Constitution amended to include chatbot feature guidelines
- 📁 Files: .specify/memory/constitution.md (updated)
- 🔁 Next prompts: /sp.specify for chatbot feature spec
- 🧠 Reflection: New chatbot feature requires separate specification and implementation tasks

## Evaluation notes (flywheel)

- Failure modes observed: "null"
- Graders run and results (PASS/FAIL): "null"
- Prompt variant (if applicable): "null"
- Next experiment (smallest change to try): "null"
