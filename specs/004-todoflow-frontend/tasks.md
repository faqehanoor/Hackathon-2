# Tasks: TodoFlow Frontend Web App

**Input**: Design documents from `/specs/004-todoflow-frontend/`
**Prerequisites**: plan.md (required), spec.md (required for user stories)

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [X] T001 Create frontend directory structure per plan.md in frontend/src/
- [X] T002 Initialize package.json with Next.js 16+, TypeScript 5.x, React 18+ dependencies
- [X] T003 [P] Install Tailwind CSS 3.4+, Framer Motion, Lucide React, clsx, tailwind-merge
- [X] T004 [P] Configure tailwind.config.ts with custom color palette (see Phase 0 research)
- [X] T005 [P] Configure tsconfig.json with strict mode and path aliases
- [X] T006 Create globals.css with dark theme base styles (#0B0F14 background)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**CRITICAL**: No user story work can begin until this phase is complete

### TypeScript Types

- [X] T007 Create Todo interface in frontend/src/types/index.ts
- [X] T008 [P] Create User interface in frontend/src/types/index.ts
- [X] T009 [P] Create AuthState interface in frontend/src/types/index.ts

### Shared Utilities

- [X] T010 Create localStorage utilities in frontend/src/lib/storage.ts (get, set, remove, clear)
- [X] T011 [P] Create helper functions in frontend/src/lib/utils.ts (cn for clsx, uuid generator, isValidEmail)

### UI Design System

- [X] T012 Define CSS custom properties for gradient color system in globals.css
- [X] T013 [P] Create glass card component in frontend/src/components/ui/Card.tsx
- [X] T014 [P] Create Button component with variants (primary, ghost, danger) in frontend/src/components/ui/Button.tsx
- [X] T015 [P] Create Input component with validation support in frontend/src/components/ui/Input.tsx

### Auth Foundation

- [X] T016 Create AuthContext provider in frontend/src/context/AuthContext.tsx
- [X] T017 [P] Implement useAuth hook in frontend/src/context/AuthContext.tsx
- [X] T018 Create protected route hook in frontend/src/hooks/useAuth.ts

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Landing Page Discovery (Priority: P1) 🎯 MVP

**Goal**: Display landing page with hero section, tagline, CTA buttons, feature cards, and footer

**Independent Test**: Can be tested by accessing `/` as a guest and verifying all landing page elements are visible

### Implementation for User Story 1

- [X] T019 [US1] Create landing page layout in frontend/src/app/layout.tsx
- [X] T020 [US1] Add providers wrapper for AuthContext in frontend/src/app/layout.tsx
- [X] T021 [US1] Create Navbar component with public navigation in frontend/src/components/Navbar.tsx
- [X] T022 [US1] Create landing page hero section in frontend/src/app/page.tsx
- [X] T023 [US1] [P] Add feature cards section in frontend/src/app/page.tsx
- [X] T024 [US1] [P] Add footer section in frontend/src/app/page.tsx
- [X] T025 [US1] Implement Framer Motion page transitions in frontend/src/app/page.tsx

**Checkpoint**: Landing page is fully functional and testable independently

---

## Phase 4: User Story 2 - User Registration (Priority: P1)

**Goal**: Display signup form with name, email, password fields, save user to localStorage, redirect to dashboard

**Independent Test**: Can be tested by navigating to `/signup`, filling form, submitting, and verifying redirect

### Implementation for User Story 2

- [X] T026 [US2] Create signup page container in frontend/src/app/signup/page.tsx
- [X] T027 [US2] Create signup form component in frontend/src/app/signup/page.tsx (inline form)
- [X] T028 [US2] [P] Add form validation (name required, email format, 8+ char password) in frontend/src/app/signup/page.tsx
- [X] T029 [US2] Implement signup handler in AuthContext (save user to localStorage) in frontend/src/context/AuthContext.tsx
- [X] T030 [US2] Add redirect to dashboard on successful signup in frontend/src/app/signup/page.tsx
- [X] T031 [US2] Add redirect to dashboard if already authenticated in frontend/src/app/signup/page.tsx
- [X] T032 [US2] Style glassmorphism card for signup form in frontend/src/app/signup/page.tsx
- [X] T033 [US2] Add gradient submit button with hover glow in frontend/src/components/ui/Button.tsx

**Checkpoint**: User registration is fully functional and testable independently

---

## Phase 5: User Story 3 - User Login (Priority: P1)

**Goal**: Display signin form with email and password, validate against stored user, redirect or show error

**Independent Test**: Can be tested by navigating to `/signin`, entering valid credentials, and verifying redirect

### Implementation for User Story 3

- [X] T034 [US3] Create signin page container in frontend/src/app/signin/page.tsx
- [X] T035 [US3] Create signin form component in frontend/src/app/signin/page.tsx (inline form)
- [X] T036 [US3] [P] Add form validation in frontend/src/app/signin/page.tsx
- [X] T037 [US3] Implement signin handler in AuthContext (validate against localStorage) in frontend/src/context/AuthContext.tsx
- [X] T038 [US3] Add error message display for invalid credentials in frontend/src/app/signin/page.tsx
- [X] T039 [US3] Add redirect to dashboard on successful signin in frontend/src/app/signin/page.tsx
- [X] T040 [US3] Add redirect to dashboard if already authenticated in frontend/src/app/signin/page.tsx
- [X] T041 [US3] Style glassmorphism card for signin form in frontend/src/app/signin/page.tsx

**Checkpoint**: User login is fully functional and testable independently

---

## Phase 6: User Story 4 - Dashboard Overview (Priority: P1)

**Goal**: Display welcome message, stats cards (total, completed, pending), quick action to add todo

**Independent Test**: Can be tested by accessing `/dashboard` as authenticated user and verifying all elements

### Implementation for User Story 4

- [X] T042 [US4] Create dashboard layout with auth-aware Navbar in frontend/src/app/dashboard/layout.tsx
- [X] T043 [US4] Update Navbar to show Dashboard/Todos/Logout when authenticated in frontend/src/components/Navbar.tsx
- [X] T044 [US4] Create dashboard overview page in frontend/src/app/dashboard/page.tsx
- [X] T045 [US4] [P] Create StatsCard component in frontend/src/app/dashboard/page.tsx (inline)
- [X] T046 [US4] [P] Implement stats calculation (total, completed, pending) from todos in frontend/src/hooks/useTodos.ts
- [X] T047 [US4] Add welcome header with user name in frontend/src/app/dashboard/page.tsx
- [X] T048 [US4] Add "Add Todo" quick action button linking to /dashboard/todos in frontend/src/app/dashboard/page.tsx
- [X] T049 [US4] Add auth protection redirect to /signin for unauthenticated access in frontend/src/app/dashboard/layout.tsx

**Checkpoint**: Dashboard overview is fully functional and testable independently

---

## Phase 7: User Story 5 - Todo Management (Priority: P1)

**Goal**: Display todo list, add/edit/delete/toggle todos with animations

**Independent Test**: Can be tested by accessing `/dashboard/todos`, adding a todo, editing, toggling, and deleting

### Implementation for User Story 5

- [X] T050 [US5] Create todos page container in frontend/src/app/dashboard/todos/page.tsx
- [X] T051 [US5] Create useTodos hook for CRUD operations in frontend/src/hooks/useTodos.ts
- [X] T052 [US5] [P] Create TodoForm inline in frontend/src/app/dashboard/todos/page.tsx
- [X] T053 [US5] [P] Create todo card UI inline in frontend/src/app/dashboard/todos/page.tsx
- [X] T054 [US5] Implement inline edit functionality in frontend/src/app/dashboard/todos/page.tsx
- [X] T055 [US5] Implement toggle complete functionality in frontend/src/app/dashboard/todos/page.tsx
- [X] T056 [US5] Implement delete with confirmation prompt in frontend/src/app/dashboard/todos/page.tsx
- [X] T057 [US5] Create empty state UI when no todos exist in frontend/src/app/dashboard/todos/page.tsx
- [X] T058 [US5] Add Framer Motion animations for todo operations in frontend/src/app/dashboard/todos/page.tsx
- [X] T059 [US5] Add auth protection redirect to /signin for unauthenticated access in frontend/src/app/dashboard/todos/page.tsx

**Checkpoint**: Todo management is fully functional and testable independently

---

## Phase 8: User Story 6 - Todo Filtering (Priority: P2)

**Goal**: Filter todos by status (All/Active/Completed) with client-side processing

**Independent Test**: Can be tested by selecting filter options and verifying list updates correctly

### Implementation for User Story 6

- [X] T060 [US6] Create FilterBar component with All/Active/Completed tabs in frontend/src/app/dashboard/todos/page.tsx
- [X] T061 [US6] Implement filter state persistence to localStorage in frontend/src/hooks/useTodos.ts
- [X] T062 [US6] Add filter logic to display filtered todos in frontend/src/app/dashboard/todos/page.tsx
- [X] T063 [US6] Add Framer Motion layout animation for filter transitions in frontend/src/app/dashboard/todos/page.tsx
- [X] T064 [US6] Style active filter tab with gradient accent in frontend/src/app/dashboard/todos/page.tsx

**Checkpoint**: Todo filtering is fully functional and testable independently

---

## Phase 9: User Story 7 - User Logout (Priority: P2)

**Goal**: Logout clears localStorage auth data and redirects to landing page

**Independent Test**: Can be tested by clicking logout and verifying redirect with cleared state

### Implementation for User Story 7

- [X] T065 [US7] Implement logout function in AuthContext (clear localStorage, set auth false) in frontend/src/context/AuthContext.tsx
- [X] T066 [US7] Add logout handler to Navbar in frontend/src/components/Navbar.tsx
- [X] T067 [US7] Add redirect to landing page after logout in frontend/src/components/Navbar.tsx
- [X] T068 [US7] Add exit animation on logout redirect in frontend/src/app/dashboard/layout.tsx

**Checkpoint**: User logout is fully functional and testable independently

---

## Phase 10: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

### Animations & Transitions

- [X] T069 [P] Add page transition animations between routes in frontend/src/app/layout.tsx
- [X] T070 [P] Add button hover micro-interactions (scale + glow) in frontend/src/components/ui/Button.tsx
- [X] T071 [P] Add card hover glow effects in frontend/src/components/ui/Card.tsx
- [X] T072 Add loading states (instant - no network calls needed)

### Empty States & Illustrations

- [X] T073 [P] Design empty state for todos when list is empty in frontend/src/app/dashboard/todos/page.tsx
- [X] T074 [P] Add empty state for dashboard when no todos exist in frontend/src/app/dashboard/page.tsx

### Mobile Responsiveness

- [X] T075 [P] Verify mobile layout for landing page in frontend/src/app/page.tsx
- [X] T076 [P] Verify mobile layout for auth forms in frontend/src/app/signup/page.tsx and signin/page.tsx
- [X] T077 [P] Verify mobile layout for dashboard in frontend/src/app/dashboard/page.tsx
- [X] T078 [P] Verify mobile layout for todos page in frontend/src/app/dashboard/todos/page.tsx

### Error Handling & Accessibility

- [X] T079 [P] Add error boundaries for unexpected errors in frontend/src/app/layout.tsx
- [X] T080 [P] Ensure keyboard navigation for all interactive elements
- [X] T081 [P] Add ARIA labels to buttons, inputs, and interactive components

### Final Validation

- [ ] T082 Run TypeScript compilation - no errors
- [ ] T083 Run npm build - successful
- [ ] T084 Verify all success criteria from spec.md are met

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3-9)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2)
- **Polish (Phase 10)**: Depends on all desired user stories being complete

### User Story Dependencies

| Story | Priority | Can Start After | Dependencies |
|-------|----------|-----------------|--------------|
| US1: Landing Page | P1 | Phase 2 | None |
| US2: Registration | P1 | Phase 2 | None (uses foundation) |
| US3: Login | P1 | Phase 2 | None (uses foundation) |
| US4: Dashboard | P1 | Phase 2 | US2 or US3 (auth state) |
| US5: Todo CRUD | P1 | Phase 2 | US4 (dashboard context) |
| US6: Filtering | P2 | Phase 2 | US5 (depends on todos) |
| US7: Logout | P2 | Phase 2 | US4 (navbar context) |

### Within Each User Story

- Types before components
- Components before pages
- Core implementation before styling
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- Once Foundational phase completes:
  - US1, US2, US3 can start in parallel (independent pages)
  - US4 depends on auth - can start after US2/US3
  - US5 depends on todos state - can start after US4
  - US6 depends on US5
  - US7 can start after US4 (navbar update)
- Components within a story marked [P] can run in parallel

---

## Parallel Example: Foundational Phase

```bash
# Launch these tasks in parallel (different files, no dependencies):
Task: "Create Todo interface in frontend/src/types/index.ts"
Task: "Create User interface in frontend/src/types/index.ts"
Task: "Create AuthState interface in frontend/src/types/index.ts"

# Launch UI components in parallel:
Task: "Create glass card component in frontend/src/components/ui/Card.tsx"
Task: "Create Button component with variants in frontend/src/components/ui/Button.tsx"
Task: "Create Input component with validation in frontend/src/components/ui/Input.tsx"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1 (Landing Page)
4. **STOP and VALIDATE**: Test landing page independently
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add US1 → Test independently → Deploy/Demo
3. Add US2 + US3 → Test independently → Deploy/Demo (Auth complete)
4. Add US4 → Test independently → Deploy/Demo (Dashboard)
5. Add US5 → Test independently → Deploy/Demo (Core todo features)
6. Add US6 + US7 → Test independently → Deploy/Demo (Full features)
7. Complete Polish → Final deployment

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: US1 (Landing)
   - Developer B: US2 + US3 (Auth forms)
   - Developer C: US4 (Dashboard)
3. Then continue:
   - Developer A: US5 (Todo CRUD)
   - Developer B: US6 (Filtering)
   - Developer C: US7 (Logout) + Polish

---

## Color Palette Reference

| Element | Color | Tailwind Reference |
|---------|-------|-------------------|
| Background | #0B0F14 | `bg-[#0B0F14]` |
| Panels | #111827 | `bg-[#111827]` |
| Primary Gradient | Teal → Cyan | `from-teal-400 to-cyan-400` |
| Accent Violet | #8B5CF6 | `text-violet-500` |
| Accent Blue | #3B82F6 | `text-blue-500` |
| Text Primary | #E5E7EB | `text-gray-200` |
| Text Secondary | #9CA3AF | `text-gray-400` |

### Effects

- Glass blur: `backdrop-blur-lg bg-white/5`
- Neon hover glow: `hover:shadow-[0_0_20px_rgba(20,184,166,0.5)]`
- Soft inner shadows: `shadow-inner`

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence
