# Implementation Plan: TodoFlow Frontend Web App

**Branch**: `004-todoflow-frontend` | **Date**: 2026-01-01 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/004-todoflow-frontend/spec.md`

## Summary

TodoFlow is a frontend-only Todo web application with mock authentication and a dark futuristic UI. The implementation follows a 6-phase approach: Design System → Routing & Layout → Auth UI Flow → Dashboard UI → Todo UI → Polish. Built with Next.js App Router, TypeScript, Tailwind CSS, Framer Motion, and localStorage for data persistence.

## Technical Context

**Language/Version**: TypeScript 5.x, Next.js 16+ (App Router), React 18+
**Primary Dependencies**: Tailwind CSS 3.4+, Framer Motion, Lucide React, Zustand (or React Context)
**Storage**: localStorage for auth state and todos (no backend)
**Testing**: Manual validation, component testing with React Testing Library (optional)
**Target Platform**: Web browsers (desktop and mobile)
**Project Type**: Single-page web application (Next.js)
**Performance Goals**: Instant state changes (<50ms), smooth animations (60fps), fast page transitions
**Constraints**: Frontend-only, no backend APIs, localStorage persistence, dark futuristic theme, glassmorphism design
**Scale/Scope**: 5 pages, ~15 components, localStorage-only data (no server scaling concerns)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|-----------|--------|-------|
| I. Spec-Driven Development | PASS | Feature specification exists at specs/004-todoflow-frontend/spec.md |
| II. Local-First Authentication | PASS | Mock auth via localStorage per constitution |
| III. Component Isolation | PASS | Each page is isolated route with reusable shared components |
| IV. State Management | PASS | React Context/Zustand for auth, localStorage for todos |
| V. Type Safety | PASS | TypeScript with explicit interfaces for all entities |
| VI. Monorepo Organization | PASS | Frontend structure follows constitution guidelines |
| VII. Responsive UI | PASS | Tailwind CSS mobile-first approach |
| VIII. Visual Design | PASS | Dark futuristic theme with glassmorphism and gradients |
| IX. Error Handling | PASS | Error boundaries and user-friendly messages |
| X. Client-Side Filtering | PASS | All filtering done in-memory without API calls |

**Result**: All gates pass - ready to proceed.

## Project Structure

### Documentation (this feature)

```text
specs/004-todoflow-frontend/
├── plan.md              # This file (/sp.plan command output)
├── research.md          # Phase 0 output (this file - inline)
├── data-model.md        # Phase 1 output (inline)
├── quickstart.md        # Phase 1 output (inline)
├── contracts/           # Phase 1 output (inline - UI contracts)
└── tasks.md             # Phase 2 output (/sp.tasks command - NOT created by /sp.plan)
```

### Source Code (repository root)

```text
frontend/
├── src/
│   ├── app/
│   │   ├── layout.tsx           # Root layout with providers
│   │   ├── page.tsx             # Landing page (/)
│   │   ├── signin/
│   │   │   └── page.tsx         # Sign in page
│   │   ├── signup/
│   │   │   └── page.tsx         # Sign up page
│   │   └── dashboard/
│   │       ├── layout.tsx       # Dashboard layout with navbar
│   │       ├── page.tsx         # Dashboard overview
│   │       └── todos/
│   │           └── page.tsx     # Todo management
│   ├── components/
│   │   ├── ui/                  # Reusable UI components
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Input.tsx
│   │   │   └── Modal.tsx
│   │   ├── Navbar.tsx           # Auth-aware navigation
│   │   ├── TodoCard.tsx         # Individual todo display
│   │   ├── TodoForm.tsx         # Add/edit todo form
│   │   ├── FilterBar.tsx        # Filter controls
│   │   └── StatsCard.tsx        # Dashboard statistics
│   ├── context/
│   │   └── AuthContext.tsx      # Authentication state
│   ├── hooks/
│   │   └── useTodos.ts          # Todo state management
│   ├── lib/
│   │   ├── storage.ts           # localStorage utilities
│   │   └── utils.ts             # Helper functions
│   ├── types/
│   │   └── index.ts             # TypeScript interfaces
│   └── styles/
│       └── globals.css          # Global styles & Tailwind
├── public/
│   └── images/                  # Static assets
└── package.json
```

**Structure Decision**: Following constitution guidelines with Next.js App Router structure. Components are isolated by feature with shared UI components in a dedicated `ui/` folder.

## Phase 0: Research & Technical Decisions

### Color Palette Decisions

| Element | Color | Tailwind Reference |
|---------|-------|-------------------|
| Background | #0a0a0a | `bg-[#0a0a0a]` |
| Primary (Brand) | Teal #14b8a6 | `text-teal-500`, `border-teal-500` |
| Secondary (Accent) | Cyan #06b6d4 | `text-cyan-400`, `bg-cyan-500/20` |
| Tertiary (Highlight) | Violet #8b5cf6 | `text-violet-400`, `bg-violet-500/20` |
| Card Background | Glass | `bg-white/5 backdrop-blur-lg` |
| Text Primary | #f8fafc | `text-slate-50` |
| Text Secondary | #94a3b8 | `text-slate-400` |

### Animation Strategy (Framer Motion)

| Interaction | Animation | Duration |
|-------------|-----------|----------|
| Page transition | fade + slide | 300ms |
| Card hover | scale + glow | 200ms |
| Todo toggle | checkmark + fade | 300ms |
| Filter change | layout animation | 200ms |
| Modal appear | scale + fade | 250ms |

### State Management Decision

**Choice**: React Context for auth + custom hooks for todos

**Rationale**:
- Auth is simple (boolean + user object) - Context is sufficient
- Todo operations are isolated - custom hook keeps logic organized
- Avoids Zustand dependency for simple use case
- Follows constitution preference for React Context or Zustand

### localStorage Schema

```typescript
interface StorageSchema {
  // Auth key: 'todoflow_auth'
  auth: {
    isAuthenticated: boolean;
    user: {
      name: string;
      email: string;
    } | null;
  };

  // Todos key: 'todoflow_todos'
  todos: Array<{
    id: string;
    title: string;
    completed: boolean;
    createdAt: string;
  }>;

  // Settings key: 'todoflow_settings'
  settings: {
    filter: 'all' | 'active' | 'completed';
  };
}
```

## Phase 1: Design & Contracts

### Data Model (data-model.md)

**Entities**

| Entity | Fields | Type | Notes |
|--------|--------|------|-------|
| User | id | string | Auto-generated UUID |
| | name | string | Display name |
| | email | string | Unique identifier |
| | password | string | Hashed (mock only) |
| Todo | id | string | Auto-generated UUID |
| | title | string | Task description |
| | completed | boolean | Completion status |
| | createdAt | string | ISO timestamp |

**Validation Rules**

| Field | Rule | Error Message |
|-------|------|---------------|
| Email | HTML5 pattern | "Please enter a valid email" |
| Password | Min 8 chars | "Password must be at least 8 characters" |
| Todo Title | Min 1 char | "Todo cannot be empty" |

### UI Contracts (contracts/)

**Component Contracts**

| Component | Props | State | Events |
|-----------|-------|-------|--------|
| Button | variant, size, disabled, onClick | - | click |
| Input | type, placeholder, value, error, onChange | - | change, blur |
| Card | children, hoverEffect, onClick | - | click |
| Navbar | authState, onLogout | - | logout |
| TodoCard | todo, onEdit, onDelete, onToggle | editing | edit, delete, toggle |
| TodoForm | existingTodo?, onSubmit | - | submit |
| FilterBar | currentFilter, onFilterChange | - | filterChange |
| StatsCard | label, value, icon | - | click |

### Quickstart Guide (quickstart.md)

**Setup Commands**

```bash
# Clone and install
git clone <repo>
cd frontend
npm install

# Install additional dependencies
npm install framer-motion lucide-react clsx tailwind-merge

# Run development server
npm run dev
```

**Environment Variables**

None required - frontend-only with localStorage.

**Key Files**

| File | Purpose |
|------|---------|
| `src/context/AuthContext.tsx` | Authentication state provider |
| `src/hooks/useTodos.ts` | Todo CRUD operations |
| `src/lib/storage.ts` | localStorage abstraction |
| `src/app/layout.tsx` | Root layout with providers |

**Development Workflow**

1. Run `npm run dev` for hot-reload development
2. Changes to `src/app/**` auto-reload
3. TypeScript errors shown in console
4. Run `npm run build` before committing

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| None | N/A | N/A |

No constitutional violations detected. All requirements align with principles.

## Execution Phases (from User Input)

### Phase 1: Design System
- Define color palette (see Research section)
- Create reusable UI components (Button, Card, Input, Modal)
- Setup animations & layout rules (Framer Motion + Tailwind)

### Phase 2: Routing & Layout
- App Router setup (Next.js 16+ App Router)
- Public layout vs dashboard layout (separate layouts for auth state)
- Navbar logic based on auth state (conditional rendering)

### Phase 3: Auth UI Flow
- Sign In form (email, password, validation)
- Sign Up form (name, email, password, validation)
- Store mock user in localStorage
- Redirect to dashboard (on success)

### Phase 4: Dashboard UI
- Overview cards (stats display)
- Stats (total, completed, pending) - computed from todos
- Welcome header (user name from auth context)

### Phase 5: Todo UI
- Todo list UI (card-based list)
- Create / update / delete (CRUD operations)
- Filters & empty states (All/Active/Completed + empty UI)
- Smooth animations (Framer Motion transitions)

### Phase 6: Polish
- Loading states (no loading - instant state)
- Hover effects (glow + scale animations)
- Mobile responsiveness (Tailwind breakpoints)
