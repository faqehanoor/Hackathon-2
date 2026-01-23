---
id: "003"
title: "Create dark theme frontend plan"
stage: "plan"
date: "2025-12-31"
surface: "agent"
model: "claude-sonnet-4-5-20250929"
feature: "dark-theme-frontend"
branch: "004-dark-theme-frontend"
user: "user"
command: "/sp.plan"
labels: ["frontend", "dark-theme", "planning", "architecture"]
links:
  spec: "specs/004-dark-theme-frontend/spec.md"
  ticket: "null"
  adr: "null"
  pr: "null"
files:
  - specs/004-dark-theme-frontend/plan.md
  - specs/004-dark-theme-frontend/research.md
  - specs/004-dark-theme-frontend/data-model.md
  - specs/004-dark-theme-frontend/quickstart.md
  - specs/004-dark-theme-frontend/contracts/auth.yaml
  - specs/004-dark-theme-frontend/contracts/tasks.yaml
tests:
  - "null"
---

## Prompt

Frontend Engineer (Phase II Todo Web App, Dark Theme)

Goal: Implement professional, dark-themed (blue + black) frontend UI with full CRUD and JWT integration.

Task 1: Project Setup

Initialize Next.js 16+ project in /frontend.

Install Tailwind CSS and configure dark mode.

Create folder structure: /app/pages, /app/components, /app/layouts, /utils, /services.

Set up JWT token utilities.

Task 2: Global Layout & Theme

Create Layout component:

Dark background (#0a0a0a)

Blue highlights eaders

Handle loading & error states

Task 7: State Management

Use React Context or Zustand for:

Auth state (JWT, user info)

Task state (list, filter, updates)

Ensure real-time UI updates after CRUD actions

Task 8: Responsive Design

Mobile-first design

Task cards stack vertically on small screens

Navbar collapses to hamburger menu

Modals scale on mobile devices

Task 9: UX & Validation

Form validation: required fields, email format

Success/error feedback

Smooth transitions & hover effects

Dark theme consistency

Task 10: Testing & Handoff

Manual testing: CRUD, auth, responsiveness

Verify dark theme styling & UI polish

Ready for backend integration & full-stack tests

## Response snapshot

Created comprehensive implementation plan with:
- Technical context: Next.js 16+, TypeScript, Zustand, React Query, Tailwind CSS 4.x
- Constitution check: ALL GATES PASS (7 principles validated)
- Project structure: Next.js App Router with route groups for auth/dashboard
- Research findings: JWT storage, state management, dark theme implementation, form validation
- Data model: TypeScript interfaces for User, Task, AuthState, TaskState
- API contracts: auth.yaml and tasks.yaml with full endpoint definitions
- Quickstart guide: Setup, commands, verification checklist

## Outcome

- ✅ Impact: Complete implementation plan for dark theme frontend
- 🧪 Tests: N/A - planning phase
- 📁 Files: plan.md, research.md, data-model.md, quickstart.md, contracts/
- 🔁 Next prompts: /sp.tasks to generate implementation tasks
- 🧠 Reflection: Well-defined architecture, no clarifications needed, all decisions made

## Evaluation notes (flywheel)

- Failure modes observed: "null"
- Graders run and results (PASS/FAIL): "null"
- Prompt variant (if applicable): "null"
- Next experiment (smallest change to try): "null"
