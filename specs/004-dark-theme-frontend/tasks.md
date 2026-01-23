# Tasks: Dark Theme Frontend for Todo Web App

**Input**: Design documents from `/specs/004-dark-theme-frontend/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), data-model.md, contracts/
**Tests**: Tests are OPTIONAL for this feature - not explicitly requested in spec

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Frontend project**: `frontend/`
- **Pages**: `frontend/app/`
- **Components**: `frontend/components/`
- **Lib/utils**: `frontend/lib/`
- **Store**: `frontend/store/`
- **Hooks**: `frontend/hooks/`
- **Types**: `frontend/types/`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 Create frontend directory structure per plan.md (app, components, lib, store, hooks, types)
- [x] T002 Initialize Next.js 16+ project with TypeScript in frontend/
- [ ] T003 [P] Install dependencies: tailwindcss, @tailwindcss/forms, zustand, @tanstack/react-query, axios, react-hook-form, zod, clsx, tailwind-merge
- [x] T004 [P] Configure tailwind.config.js with dark theme colors (#0a0a0a bg, #3b82f6 primary blue)
- [x] T005 [P] Configure next.config.js for TypeScript and React compiler
- [x] T006 [P] Set up ESLint and Prettier configuration
- [x] T007 Create .env.example with NEXT_PUBLIC_API_URL variable
- [x] T008 Create frontend/app/globals.css with Tailwind directives and dark theme base styles

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T009 Create TypeScript type definitions in frontend/types/index.ts (User, Task, AuthState, TaskState, ApiResponse, ErrorResponse, Form types)
- [x] T010 [P] Implement API client in frontend/lib/api/client.ts (Axios instance with interceptors for JWT)
- [x] T011 [P] Create API endpoint definitions in frontend/lib/api/endpoints.ts
- [x] T012 [P] Implement JWT token utilities in frontend/lib/auth/token.ts (getToken, setToken, removeToken, isTokenExpired)
- [x] T013 Create Auth Provider in frontend/lib/auth/AuthContext.tsx (Zustand store for auth state)
- [x] T014 [P] Implement useAuth hook in frontend/hooks/useAuth.ts
- [x] T015 Create Task Store in frontend/store/taskStore.ts (Zustand for task state management)
- [x] T016 [P] Implement useTasks hook in frontend/hooks/useTasks.ts (React Query integration)
- [x] T017 Create Toast notification system in frontend/components/ui/Toast/Toast.tsx
- [x] T018 [P] Create Button component in frontend/components/ui/Button/Button.tsx
- [x] T019 [P] Create Input component in frontend/components/ui/Input/Input.tsx
- [x] T020 [P] Create Card component in frontend/components/ui/Card/Card.tsx
- [x] T021 [P] Create Modal component in frontend/components/ui/Modal/Modal.tsx

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - User Authentication (Priority: P1) 🎯 MVP

**Goal**: Users can register new accounts, log in, and log out with JWT authentication

**Independent Test**: Can be fully tested by attempting user registration and login flows, verifying JWT tokens are stored and included in subsequent API requests

### Implementation for User Story 1

- [x] T022 [P] [US1] Create login page in frontend/app/(auth)/login/page.tsx
- [x] T023 [P] [US1] Create LoginForm component in frontend/components/auth/LoginForm/LoginForm.tsx
- [x] T024 [US1] Implement login form validation with React Hook Form + Zod in LoginForm
- [x] T025 [US1] Connect LoginForm to authStore login action and handle API call
- [x] T026 [P] [US1] Create signup page in frontend/app/(auth)/signup/page.tsx
- [x] T027 [P] [US1] Create SignupForm component in frontend/components/auth/SignupForm/SignupForm.tsx
- [x] T028 [US1] Implement signup form validation with React Hook Form + Zod in SignupForm
- [x] T029 [US1] Connect SignupForm to authStore register action and handle API call
- [x] T030 [US1] Create protected route wrapper in frontend/lib/auth/ProtectedRoute.tsx
- [x] T031 [US1] Implement auth layout in frontend/app/(auth)/layout.tsx
- [ ] T032 [US1] Add loading states and error handling for auth forms

**Checkpoint**: User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - View and Filter Tasks (Priority: P1)

**Goal**: Users can view all their tasks and filter by status (All, Active, Completed)

**Independent Test**: Can be fully tested by logging in and verifying the task list displays tasks with filtering working correctly

### Implementation for User Story 2

- [x] T033 [P] [US2] Create dashboard layout in frontend/app/(dashboard)/layout.tsx (navbar with logout)
- [x] T034 [P] [US2] Create Navbar component in frontend/components/layout/Navbar/Navbar.tsx
- [x] T035 [US2] Create task list page in frontend/app/(dashboard)/page.tsx
- [x] T036 [P] [US2] Create TaskCard component in frontend/components/tasks/TaskCard/TaskCard.tsx
- [x] T037 [P] [US2] Create TaskItem component in frontend/components/tasks/TaskItem/TaskItem.tsx
- [x] T038 [P] [US2] Create TaskList component in frontend/components/tasks/TaskList/TaskList.tsx
- [x] T039 [US2] Create TaskFilter component in frontend/components/tasks/TaskFilter/TaskFilter.tsx
- [x] T040 [US2] Implement filter logic (All, Active, Completed) in taskStore
- [x] T041 [US2] Connect TaskList to useTasks hook for data fetching
- [x] T042 [US2] Add loading skeleton for task list
- [x] T043 [US2] Implement empty state when no tasks exist

**Checkpoint**: User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - Create New Tasks (Priority: P1)

**Goal**: Users can create new tasks with title (required) and optional description

**Independent Test**: Can be fully tested by creating a new task and verifying it appears in the task list immediately

### Implementation for User Story 3

- [x] T044 [P] [US3] Create TaskForm component in frontend/components/tasks/TaskForm/TaskForm.tsx
- [x] T045 [US3] Implement task form validation (title required, max 255 chars) with React Hook Form + Zod
- [ ] T046 [US3] Create "Add Task" button in TaskList header
- [x] T047 [US3] Implement create task modal using existing Modal component
- [x] T048 [US3] Connect TaskForm to useTasks createTask mutation
- [ ] T049 [US3] Add optimistic UI update after task creation
- [ ] T050 [US3] Show success toast on task creation

**Checkpoint**: User Stories 1, 2, AND 3 should all work independently

---

## Phase 6: User Story 4 - Update and Delete Tasks (Priority: P1)

**Goal**: Users can edit task title/description and delete tasks with confirmation

**Independent Test**: Can be fully tested by editing a task and verifying changes, then deleting a task and verifying removal

### Implementation for User Story 4

- [ ] T051 [P] [US4] Implement edit task modal using existing Modal component
- [ ] T052 [US4] Create EditTaskForm in frontend/components/tasks/TaskForm/EditTaskForm.tsx
- [ ] T053 [US4] Connect EditTaskForm to useTasks updateTask mutation
- [ ] T054 [US4] Add optimistic UI update after task edit
- [ ] T055 [P] [US4] Implement delete confirmation dialog
- [ ] T056 [US4] Connect delete action to useTasks deleteTask mutation
- [ ] T057 [US4] Add success/error toast notifications
- [ ] T058 [US4] Handle 404 errors (task not found) gracefully
- [ ] T059 [US4] Handle 403 errors (unauthorized access) gracefully

**Checkpoint**: All core CRUD stories (1-4) should be functional

---

## Phase 7: User Story 5 - Toggle Task Completion (Priority: P2)

**Goal**: Users can mark tasks as done/undone with immediate visual feedback

**Independent Test**: Can be fully tested by toggling completion and verifying visual state changes

### Implementation for User Story 5

- [ ] T060 [US5] Add completion checkbox to TaskItem component
- [ ] T061 [US5] Implement toggle completion in TaskItem
- [ ] T062 [US5] Connect toggle to useTasks updateTask mutation
- [ ] T063 [US5] Add optimistic UI update for completion toggle
- [ ] T064 [US5] Implement visual strikethrough for completed tasks
- [ ] T065 [US5] Add smooth transition animation for completion state

**Checkpoint**: All user stories should now be independently functional

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] T066 [P] Add responsive design optimizations for mobile (375px) and tablet (768px)
- [ ] T067 [P] Implement error boundaries for graceful error handling
- [ ] T068 Add loading states for all async operations
- [ ] T069 [P] Add hover and active state transitions (minimum 150ms animation)
- [ ] T070 Ensure dark theme consistency across all components
- [ ] T071 Add aria-labels for accessibility
- [ ] T072 Implement keyboard navigation support
- [ ] T073 Add debouncing for filter operations
- [ ] T074 Run quickstart.md validation checklist
- [ ] T075 [P] Final visual polish and UI consistency review

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3-7)**: All depend on Foundational phase completion
  - User stories can proceed in parallel (if staffed)
  - Or sequentially in priority order (US1 → US2 → US3 → US4 → US5)
- **Polish (Phase 8)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (Auth)**: Can start after Foundational - No dependencies on other stories (BLOCKS all other stories)
- **User Story 2 (View/Filter)**: Can start after Foundational + User Story 1 - Uses auth context
- **User Story 3 (Create)**: Can start after Foundational + User Story 1 - Uses auth + task list
- **User Story 4 (Update/Delete)**: Can start after Foundational + User Story 1 - Uses auth + task list
- **User Story 5 (Toggle)**: Can start after Foundational + User Story 1 - Uses auth + task list

### Within Each User Story

- Core implementation before integration
- Story complete before moving to next priority
- Each story should be independently testable

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- Once Foundational phase completes, all user stories can start in parallel
- All components within a story marked [P] can run in parallel

---

## Parallel Example: User Story 1

```bash
# Launch all UI components for User Story 1 together:
Task: "Create login page in frontend/app/(auth)/login/page.tsx"
Task: "Create signup page in frontend/app/(auth)/signup/page.tsx"

# Launch all form components together:
Task: "Create LoginForm component in frontend/components/auth/LoginForm/LoginForm.tsx"
Task: "Create SignupForm component in frontend/components/auth/SignupForm/SignupForm.tsx"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1 (Authentication)
4. **STOP and VALIDATE**: Test authentication independently
5. Deploy/demo if ready (MVP achieved - users can log in)

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 → Test independently → Deploy/Demo
4. Add User Story 3 → Test independently → Deploy/Demo
5. Add User Story 4 → Test independently → Deploy/Demo
6. Add User Story 5 → Test independently → Deploy/Demo
7. Add Polish → Final deployment

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1 (Authentication)
   - Developer B: User Story 2 (View/Filter)
   - Developer C: User Story 3 (Create)
3. Stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence

## Task Summary

| Phase | Description | Tasks | Completed |
|-------|-------------|-------|-----------|
| Phase 1 | Setup | 8 | 7 |
| Phase 2 | Foundational | 13 | 13 |
| Phase 3 | User Story 1 (Auth) | 11 | 10 |
| Phase 4 | User Story 2 (View/Filter) | 11 | 11 |
| Phase 5 | User Story 3 (Create) | 7 | 5 |
| Phase 6 | User Story 4 (Update/Delete) | 9 | 0 |
| Phase 7 | User Story 5 (Toggle) | 6 | 0 |
| Phase 8 | Polish | 10 | 0 |
| **Total** | | **75** | **46** |
