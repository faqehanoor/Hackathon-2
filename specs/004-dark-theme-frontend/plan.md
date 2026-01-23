# Implementation Plan: Dark Theme Frontend for Todo Web App

**Branch**: `004-dark-theme-frontend` | **Date**: 2025-12-31 | **Spec**: [spec.md](../spec.md)
**Input**: Feature specification from `/specs/004-dark-theme-frontend/spec.md`

## Summary

Build a professional, modern, dark-themed UI (blue + black) for the Phase II Todo Web App using Next.js 16+ and Tailwind CSS. The frontend will integrate JWT authentication and implement full CRUD operations for tasks via REST API endpoints. Key focus areas include responsive design, smooth transitions, form validation, and real-time UI updates.

## Technical Context

**Language/Version**: TypeScript 5.x (Next.js 16+ requirement)
**Primary Dependencies**: Next.js 16+, React 19, Tailwind CSS 4.x, Zustand (state management)
**Storage**: Client-side JWT token storage (cookies/localStorage), no local database
**Testing**: Jest + React Testing Library, Playwright (E2E)
**Target Platform**: Web browser (modern browsers: Chrome, Firefox, Safari, Edge)
**Project Type**: web (Next.js frontend with API integration)
**Performance Goals**: Task list loads within 2 seconds, UI updates within 1 second of user action
**Constraints**: Dark theme only (no light mode toggle), JWT auth required, mobile-first responsive design
**Scale/Scope**: Single-user authenticated experience, typical usage 10-100 tasks per user

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Compliance | Notes |
|-----------|------------|-------|
| I. Spec-Driven Development | ✅ PASS | Following Spec → Plan → Tasks → Implementation workflow |
| II. JWT Authentication Bridge | ✅ PASS | Token storage, inclusion in API requests, refresh handling |
| III. User Isolation | ✅ PASS | Tasks filtered by authenticated user ID (enforced by backend) |
| IV. REST API Standards | ✅ PASS | Standard HTTP methods, JWT-protected endpoints |
| V. Type Safety | ✅ PASS | TypeScript interfaces for all data contracts |
| VI. Monorepo Organization | ✅ PASS | Following Spec-Kit Plus `/frontend` structure |
| VII. Responsive UI | ✅ PASS | Mobile-first Tailwind CSS design |

**Result**: ✅ ALL GATES PASS - Ready to proceed

## Project Structure

### Documentation (this feature)

```text
specs/004-dark-theme-frontend/
├── plan.md              # This file (/sp.plan command output)
├── research.md          # Phase 0 output (/sp.plan command)
├── data-model.md        # Phase 1 output (/sp.plan command)
├── quickstart.md        # Phase 1 output (/sp.plan command)
├── contracts/           # Phase 1 output (/sp.plan command)
│   ├── auth.yaml
│   └── tasks.yaml
└── tasks.md             # Phase 2 output (/sp.tasks command)
```

### Source Code (repository root)

```text
frontend/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Auth route group
│   │   ├── login/
│   │   │   ├── page.tsx
│   │   │   └── components/
│   │   └── signup/
│   │       ├── page.tsx
│   │       └── components/
│   ├── (dashboard)/              # Protected route group
│   │   ├── layout.tsx            # Dashboard layout with nav
│   │   ├── page.tsx              # Task list (home)
│   │   ├── tasks/
│   │   │   ├── [id]/
│   │   │   │   └── page.tsx      # Task detail/edit
│   │   │   └── new/
│   │   │       └── page.tsx      # Create task
│   │   └── components/           # Dashboard-specific components
│   ├── api/                      # API routes (if needed for proxy)
│   ├── layout.tsx                # Root layout
│   └── globals.css               # Tailwind + dark theme
├── components/
│   ├── ui/                       # Reusable UI primitives
│   │   ├── Button/
│   │   ├── Input/
│   │   ├── Modal/
│   │   ├── Card/
│   │   ├── Form/
│   │   └── Toast/
│   ├── auth/
│   │   ├── LoginForm/
│   │   └── SignupForm/
│   └── tasks/
│       ├── TaskCard/
│       ├── TaskList/
│       ├── TaskForm/
│       ├── TaskFilter/
│       └── TaskItem/
├── lib/
│   ├── auth/                     # Auth utilities
│   │   ├── token.ts              # JWT token management
│   │   ├── api.ts                # Auth API calls
│   │   └── context.tsx           # Auth provider
│   ├── api/                      # API client
│   │   ├── client.ts             # Axios/fetch wrapper
│   │   ├── endpoints.ts          # API endpoint definitions
│   │   └── types.ts              # Shared TypeScript types
│   └── utils/
│       ├── formatters.ts
│       └── validators.ts
├── store/
│   ├── authStore.ts              # Zustand auth state
│   └── taskStore.ts              # Zustand task state
├── hooks/
│   ├── useAuth.ts
│   ├── useTasks.ts
│   └── useDebounce.ts
├── types/
│   └── index.ts                  # TypeScript type definitions
├── tailwind.config.js
├── next.config.js
└── package.json
```

**Structure Decision**: Using Next.js App Router with route groups for auth/dashboard separation. Zustand for state management. Atomic component organization (ui/ for primitives, domain-specific folders for features).

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

No constitution violations detected. Feature scope aligns with all principles.

---

## Phase 0: Research Findings

### JWT Token Storage Decision

**Decision**: Store JWT in httpOnly cookies for security (preferred) with localStorage fallback

**Rationale**: httpOnly cookies prevent XSS attacks stealing tokens. LocalStorage fallback needed for scenarios where httpOnly is not feasible.

**Alternatives considered**:
- localStorage only: Vulnerable to XSS
- SessionStorage: Lost on tab close
- Memory only: Lost on refresh

### State Management Selection

**Decision**: Zustand for global state, React Query for server state

**Rationale**: Zustand provides minimal boilerplate for auth/task state. React Query handles caching, refetching, and optimistic updates.

**Alternatives considered**:
- Redux: Too much boilerplate
- Context API: Re-render issues with frequent updates
- Recoil: Less mature ecosystem

### Dark Theme Implementation

**Decision**: Tailwind CSS with CSS variables for theme colors

**Rationale**: Tailwind 4.x native CSS variable support enables easy theme customization. Blue/black palette defined as CSS custom properties.

**Color Palette**:
- Background: #0a0a0a (near-black)
- Surface: #171717 (dark gray)
- Primary Blue: #3b82f6 (blue-500)
- Secondary Blue: #60a5fa (blue-400)
- Accent Blue: #2563eb (blue-600)
- Text Primary: #f3f4f6 (gray-100)
- Text Secondary: #9ca3af (gray-400)

### Responsive Breakpoints

**Decision**: Mobile-first with Tailwind breakpoints (sm: 640px, md: 768px, lg: 1024px, xl: 1280px)

**Rationale**: Standard Tailwind breakpoints cover all target devices. Mobile-first ensures core experience works on smallest screens.

---

## Phase 1: Data Model

### Frontend Entity Definitions

#### User

```typescript
interface User {
  id: string;
  email: string;
  name: string;
  created_at: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
```

#### Task

```typescript
interface Task {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  completed: boolean;
  created_at: string;
  updated_at: string;
}

interface TaskFilters {
  status: 'all' | 'active' | 'completed';
  search?: string;
}

interface TaskState {
  tasks: Task[];
  filters: TaskFilters;
  isLoading: boolean;
  error: string | null;
}
```

#### API Response Types

```typescript
interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

interface ErrorResponse {
  detail: string;
  status_code: number;
}
```

---

## Phase 1: API Contracts

### Authentication Endpoints

```yaml
# contracts/auth.yaml
paths:
  /api/auth/register:
    post:
      summary: Register new user
      requestBody:
        content:
          application/json:
            schema:
              type: object
              required: [email, name, password]
              properties:
                email: { type: string, format: email }
                name: { type: string, minLength: 1 }
                password: { type: string, minLength: 8 }
      responses:
        201:
          description: User created successfully
          content:
            application/json:
              schema:
                type: object
                properties:
                  user: { $ref: '#/components/schemas/User' }
                  token: { type: string }
        400:
          description: Validation error

  /api/auth/login:
    post:
      summary: Login and get JWT
      requestBody:
        content:
          application/json:
            schema:
              type: object
              required: [email, password]
              properties:
                email: { type: string, format: email }
                password: type: string
      responses:
        200:
          description: Login successful
          content:
            application/json:
              schema:
                type: object
                properties:
                  user: { $ref: '#/components/schemas/User' }
                  token: { type: string }
        401:
          description: Invalid credentials
```

### Task Endpoints

```yaml
# contracts/tasks.yaml
paths:
  /api/tasks:
    get:
      summary: List user's tasks
      parameters:
        - in: query
          name: status
          schema:
            type: string
            enum: [all, active, completed]
      responses:
        200:
          description: List of tasks
          content:
            application/json:
              schema:
                type: array
                items: { $ref: '#/components/schemas/Task' }
        401:
          description: Unauthorized

    post:
      summary: Create new task
      requestBody:
        content:
          application/json:
            schema:
              type: object
              required: [title]
              properties:
                title: { type: string, minLength: 1, maxLength: 255 }
                description: { type: string, maxLength: 10000 }
      responses:
        201:
          description: Task created
        401:
          description: Unauthorized

  /api/tasks/{id}:
    get:
      summary: Get specific task
      responses:
        200:
          description: Task found
        404:
          description: Task not found

    put:
      summary: Replace task
      requestBody:
        content:
          application/json:
            schema:
              type: object
              required: [title]
              properties:
                title: { type: string }
                description: { type: string }
                completed: { type: boolean }
      responses:
        200:
          description: Task replaced
        404:
          description: Task not found

    patch:
      summary: Update task
      requestBody:
        content:
          application/json:
            schema:
              type: object
              properties:
                title: { type: string }
                description: { type: string }
                completed: { type: boolean }
      responses:
        200:
          description: Task updated
        404:
          description: Task not found

    delete:
      summary: Delete task
      responses:
        204:
          description: Task deleted
        404:
          description: Task not found

components:
  schemas:
    Task:
      type: object
      properties:
        id: { type: string }
        user_id: { type: string }
        title: { type: string }
        description: { type: string, nullable: true }
        completed: { type: boolean }
        created_at: { type: string, format: date-time }
        updated_at: { type: string, format: date-time }
```

---

## Quickstart

### Development Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with API endpoint

# Start development server
npm run dev
```

### Environment Variables

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

### Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run test` | Run Jest tests |
| `npm run test:watch` | Watch mode for tests |
| `npm run test:e2e` | Run Playwright E2E tests |

### Build Requirements

- Node.js 18+
- npm or yarn
- Access to backend API at NEXT_PUBLIC_API_URL

### Verification Steps

1. Confirm dark theme renders with black background (#0a0a0a)
2. Test login flow with valid credentials
3. Verify task list loads within 2 seconds
4. Test CRUD operations
5. Verify responsive layout on mobile (375px) and desktop (1920px)
