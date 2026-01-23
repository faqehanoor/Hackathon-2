---
id: "0003"
title: "Frontend-only constitution amendment"
stage: "constitution"
date: "2026-01-01"
surface: "agent"
model: "sonnet-4-5-20250929"
feature: "none"
branch: "003-todo-web-app"
user: "user"
command: "/sp.constitution"
labels: ["constitution","frontend","architecture"]
links:
  spec: "null"
  ticket: "null"
  adr: "null"
  pr: "null"
files:
  - ".specify/memory/constitution.md"
tests:
  - "none"
---

## Prompt

```text
$ARGUMENTS

Scope

Build a frontend-only Todo web application with authentication UI and dashboard navigation.

Core Constraints

Frontend ONLY (no backend, no APIs)

UI-focused implementation

Authentication is mocked (local state / localStorage)

Navigation-based auth flow

No business logic beyond Todo UI

Tech Lock

Framework: Next.js (App Router)

Language: TypeScript

Styling: Tailwind CSS

Icons: Lucide / FontAwesome

Animations: Framer Motion

State: React Context / Zustand

Auth Simulation: localStorage

Pages Required

/ → Landing page

/signin

/signup

/dashboard

/dashboard/todos

UI Requirements

Dark futuristic theme

Gradient accents (teal, cyan, violet)

Glassmorphism cards

Soft shadows & hover glow

Smooth transitions

Fully responsive

Navbar Rules

Public navbar: Sign In | Sign Up

Auth navbar: Dashboard | Todos | Logout

Auto-redirect after auth

Todo Features (UI Only)

Add todo

Edit todo

Delete todo

Toggle complete

Filter (All / Active / Completed)

Prohibited

No backend calls

No real authentication

No extra features outside Todo scope
```

## Response snapshot

Updated project constitution from v1.1.0 (full-stack) to v2.0.0 (frontend-only):

- Removed: JWT auth, REST APIs, database schema, backend technology stack
- Added: Local-first authentication, component isolation, state management principles
- Updated: Monorepo organization (no backend), visual design requirements
- Preserved: Spec-driven development, type safety, responsive UI

Sync Impact Report included with version change details and template alignment notes.

## Outcome

- ✅ Impact: Complete architectural shift from full-stack to frontend-only
- 🧪 Tests: None required for constitution
- 📁 Files: Modified .specify/memory/constitution.md
- 🔁 Next prompts: /sp.specify to create feature spec
- 🧠 Reflection: Major version bump justified by removal of backend-specific principles

## Evaluation notes (flywheel)

- Failure modes observed: "none"
- Graders run and results (PASS/FAIL): "N/A"
- Prompt variant (if applicable): "none"
- Next experiment (smallest change to try): "none"
