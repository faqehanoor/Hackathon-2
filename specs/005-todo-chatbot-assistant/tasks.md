# Tasks: Todo Assistant Chatbot

**Input**: Design documents from `/specs/005-todo-chatbot-assistant/`
**Prerequisites**: plan.md (required), spec.md (required for user stories)

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [ ] T001 Create Chatbot directory structure per plan.md in frontend/src/components/Chatbot/
- [ ] T002 Create lib/chatbot/ directory in frontend/src/lib/
- [ ] T003 [P] Verify all dependencies are installed (framer-motion, lucide-react)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**CRITICAL**: No user story work can begin until this phase is complete

### TypeScript Types

- [ ] T004 Create ChatMessage interface in frontend/src/types/index.ts
- [ ] T005 [P] Create ChatbotState interface in frontend/src/types/index.ts
- [ ] T006 [P] Create QuickTopic interface in frontend/src/types/index.ts
- [ ] T007 [P] Create KnowledgeEntry interface in frontend/src/types/index.ts

### Chatbot Logic Library

- [ ] T008 Create knowledge base with predefined responses in frontend/src/lib/chatbot/knowledgeBase.ts
- [ ] T009 [P] Create intent matcher function in frontend/src/lib/chatbot/intentMatcher.ts
- [ ] T010 [P] Create getBotResponse function handling keyword matching and off-topic in frontend/src/lib/chatbot/intentMatcher.ts

### Chatbot State Management

- [ ] T011 Create ChatbotContext provider in frontend/src/context/ChatbotContext.tsx
- [ ] T012 [P] Implement useChatbot hook in frontend/src/context/ChatbotContext.tsx

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Chatbot UI & Panel (Priority: P1) 🎯 MVP

**Goal**: Display floating button and open/close panel with animations

**Independent Test**: Can be tested by accessing `/dashboard` as authenticated user, clicking button, and verifying panel opens/closes

### Implementation for User Story 1

- [ ] T013 [US1] Create Chatbot container component in frontend/src/components/Chatbot/Chatbot.tsx
- [ ] T014 [US1] Create ChatbotButton component (FAB, bottom-right) in frontend/src/components/Chatbot/ChatbotButton.tsx
- [ ] T015 [US1] Add hover & pulse animation to ChatbotButton in frontend/src/components/Chatbot/ChatbotButton.tsx
- [ ] T016 [US1] Create ChatbotPanel component with slide-in animation in frontend/src/components/Chatbot/ChatbotPanel.tsx
- [ ] T017 [US1] Implement header section with title and close button in frontend/src/components/Chatbot/ChatbotPanel.tsx
- [ ] T018 [US1] Implement messages scroll area container in frontend/src/components/Chatbot/ChatbotPanel.tsx
- [ ] T019 [US1] Implement input section container in frontend/src/components/Chatbot/ChatbotPanel.tsx
- [ ] T020 [US1] Add Framer Motion open/close animations in frontend/src/components/Chatbot/ChatbotPanel.tsx
- [ ] T021 [US1] Handle click outside to close panel in frontend/src/components/Chatbot/ChatbotPanel.tsx
- [ ] T022 [US1] Integrate Chatbot into dashboard layout in frontend/src/app/dashboard/layout.tsx
- [ ] T023 [US1] Implement visibility rules (show on /dashboard, /dashboard/todos only) in frontend/src/components/Chatbot/Chatbot.tsx

**Checkpoint**: Chatbot UI is fully functional and testable independently

---

## Phase 4: User Story 2 - Bot Response Engine (Priority: P1)

**Goal**: Respond to Todo-related questions with predefined answers

**Independent Test**: Can be tested by opening chatbot and typing "How do I create a todo?" and verifying response

### Implementation for User Story 2

- [ ] T024 [US2] Create ChatMessage component for rendering messages in frontend/src/components/Chatbot/ChatMessage.tsx
- [ ] T025 [US2] [P] Render user messages (right aligned, gradient bg) in frontend/src/components/Chatbot/ChatMessage.tsx
- [ ] T026 [US2] [P] Render bot messages (left aligned, glassmorphism) in frontend/src/components/Chatbot/ChatMessage.tsx
- [ ] T027 [US2] Create ChatInput component in frontend/src/components/Chatbot/ChatInput.tsx
- [ ] T028 [US2] Handle text input capture and submission in frontend/src/components/Chatbot/ChatInput.tsx
- [ ] T029 [US2] Handle Enter key submission in frontend/src/components/Chatbot/ChatInput.tsx
- [ ] T030 [US2] Clear input after send in frontend/src/components/Chatbot/ChatInput.tsx
- [ ] T031 [US2] Prevent empty submissions in frontend/src/components/Chatbot/ChatInput.tsx
- [ ] T032 [US2] Connect sendMessage to ChatbotContext in frontend/src/components/Chatbot/Chatbot.tsx
- [ ] T033 [US2] Display messages from state in ChatbotPanel in frontend/src/components/Chatbot/ChatbotPanel.tsx
- [ ] T034 [US2] Add auto-scroll to latest message in frontend/src/components/Chatbot/ChatbotPanel.tsx

**Checkpoint**: Bot response engine is fully functional and testable independently

---

## Phase 5: User Story 3 - Off-Topic Refusal (Priority: P1)

**Goal**: Refuse questions outside Todo app scope

**Independent Test**: Can be tested by asking "What's the weather?" and verifying refusal message

### Implementation for User Story 3

- [ ] T035 [US3] Define OFF_TOPIC_RESPONSE constant in frontend/src/lib/chatbot/intentMatcher.ts
- [ ] T036 [US3] [P] Update intent matcher to return off-topic response for non-matching queries in frontend/src/lib/chatbot/intentMatcher.ts
- [ ] T037 [US3] [P] Add knowledge base entries for all Todo app topics (create, edit, delete, filter, dashboard, auth) in frontend/src/lib/chatbot/knowledgeBase.ts

**Checkpoint**: Off-topic refusal is fully functional and testable independently

---

## Phase 6: User Story 4 - Quick Help Topics (Priority: P2)

**Goal**: Display clickable quick help topics

**Independent Test**: Can be tested by opening chatbot and verifying quick topic buttons are displayed and functional

### Implementation for User Story 4

- [ ] T038 [US4] Create QuickTopics component in frontend/src/components/Chatbot/QuickTopics.tsx
- [ ] T039 [US4] [P] Define QUICK_TOPICS array with 3-4 topics in frontend/src/lib/chatbot/knowledgeBase.ts
- [ ] T040 [US4] [P] Render quick topic buttons with styling in frontend/src/components/Chatbot/QuickTopics.tsx
- [ ] T041 [US4] Handle quick topic click to display response in frontend/src/components/Chatbot/QuickTopics.tsx
- [ ] T042 [US4] Integrate QuickTopics into ChatbotPanel in frontend/src/components/Chatbot/ChatbotPanel.tsx

**Checkpoint**: Quick help topics are fully functional and testable independently

---

## Phase 7: User Story 5 - Chat History & Typing Simulation (Priority: P3)

**Goal**: Display conversation history and typing indicator

**Independent Test**: Can be tested by asking multiple questions and verifying history persists within session

### Implementation for User Story 7

- [ ] T043 [US5] Implement bot typing state in ChatbotContext in frontend/src/context/ChatbotContext.tsx
- [ ] T044 [US5] [P] Add typing indicator UI component in frontend/src/components/Chatbot/ChatMessage.tsx
- [ ] T045 [US5] [P] Add delay (300-600ms) before bot response in frontend/src/context/ChatbotContext.tsx
- [ ] T046 [US5] Disable input while bot is typing in frontend/src/components/Chatbot/ChatInput.tsx
- [ ] T047 [US5] Limit chat history to 50 messages in frontend/src/context/ChatbotContext.tsx
- [ ] T048 [US5] Clear chat history on page refresh (session-only) in frontend/src/context/ChatbotContext.tsx

**Checkpoint**: Chat history and typing simulation are fully functional and testable independently

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

### Animations & Transitions

- [ ] T049 [P] Add smooth message fade-in animations in frontend/src/components/Chatbot/ChatMessage.tsx
- [ ] T050 [P] Add button press scale animation in frontend/src/components/Chatbot/ChatbotButton.tsx
- [ ] T051 [P] Enhance panel open/close with spring physics in frontend/src/components/Chatbot/ChatbotPanel.tsx

### Empty States & UX

- [ ] T052 [P] Add welcome message when chat is empty in frontend/src/components/Chatbot/ChatbotPanel.tsx
- [ ] T053 [P] Add loading state for initial render in frontend/src/components/Chatbot/Chatbot.tsx

### Accessibility

- [ ] T054 [P] Add ARIA labels to all interactive elements in frontend/src/components/Chatbot/
- [ ] T055 [P] Ensure keyboard navigation works for chatbot in frontend/src/components/Chatbot/
- [ ] T056 [P] Add focus management on panel open/close in frontend/src/components/Chatbot/ChatbotPanel.tsx

### Final Validation

- [ ] T057 Run TypeScript compilation - no errors
- [ ] T058 Run npm build - successful
- [ ] T059 Verify all success criteria from spec.md are met

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3-7)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3)
- **Polish (Phase 8)**: Depends on all desired user stories being complete

### User Story Dependencies

| Story | Priority | Can Start After | Dependencies |
|-------|----------|-----------------|--------------|
| US1: Chatbot UI | P1 | Phase 2 | None (uses foundation) |
| US2: Bot Response | P1 | Phase 2 | None (uses foundation) |
| US3: Off-Topic | P1 | Phase 2 | None (uses foundation) |
| US4: Quick Topics | P2 | Phase 2 | US2 (knowledge base) |
| US5: Chat History | P3 | Phase 2 | US1, US2 (UI + messaging) |

### Within Each User Story

- Types before components
- Components before pages
- Core implementation before styling
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- Once Foundational phase completes:
  - US1 and US2 and US3 can start in parallel (independent implementations)
  - US4 depends on US2 (needs knowledge base)
  - US5 depends on US1 and US2 (needs UI + messaging)
- Components within a story marked [P] can run in parallel

---

## Parallel Example: Foundational Phase

```bash
# Launch these tasks in parallel (different files, no dependencies):
Task: "Create ChatMessage interface in frontend/src/types/index.ts"
Task: "Create ChatbotState interface in frontend/src/types/index.ts"
Task: "Create QuickTopic interface in frontend/src/types/index.ts"
Task: "Create KnowledgeEntry interface in frontend/src/types/index.ts"

# Launch library tasks in parallel:
Task: "Create knowledge base with predefined responses in frontend/src/lib/chatbot/knowledgeBase.ts"
Task: "Create intent matcher function in frontend/src/lib/chatbot/intentMatcher.ts"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1 (Chatbot UI - button, panel, animations)
4. **STOP and VALIDATE**: Test chatbot open/close independently
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add US1 → Test independently → Deploy/Demo (basic UI)
3. Add US2 + US3 → Test independently → Deploy/Demo (core Q&A)
4. Add US4 → Test independently → Deploy/Demo (quick topics)
5. Add US5 → Test independently → Deploy/Demo (full features)
6. Complete Polish → Final deployment

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: US1 (Chatbot UI - button, panel)
   - Developer B: US2 (Message rendering, input)
   - Developer C: US3 (Bot response engine, knowledge base)
3. Then continue:
   - Developer A: US4 (Quick topics)
   - Developer B: US5 (Chat history, typing indicator)
   - Developer C: Polish

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
