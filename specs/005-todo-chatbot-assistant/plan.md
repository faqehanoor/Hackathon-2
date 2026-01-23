# Implementation Plan: Todo Assistant Chatbot

**Branch**: `005-todo-chatbot-assistant` | **Date**: 2026-01-01 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `/specs/005-todo-chatbot-assistant/spec.md`

## Summary

Frontend-only chatbot assistant for the Todo application that helps users understand and use the app features. The chatbot provides rule-based responses to Todo-related queries using keyword matching, displays predefined help content via quick topics, and maintains conversation history within the current session. All responses are deterministic and generated client-side with no external APIs or AI models.

## Technical Context

**Language/Version**: TypeScript 5.x
**Primary Dependencies**: React 18+, Next.js 16+ (App Router), Tailwind CSS 3.4+, Framer Motion, Lucide React
**Storage**: localStorage (optional for chat history, session-only by default)
**Testing**: React Testing Library, Vitest
**Target Platform**: Web (modern browsers)
**Project Type**: Single web application
**Performance Goals**: Chatbot button visible immediately, panel animation < 300ms, response time < 500ms
**Constraints**: No external APIs, no AI models, frontend-only, deterministic responses only
**Scale/Scope**: Single user session scope, max 50 messages per session

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Requirement | Compliance |
|-----------|-------------|------------|
| XI. Todo Assistant Chatbot | Scope: Todo app help only | ✅ Spec defines Todo-only responses |
| XI. Todo Assistant Chatbot | Visibility: /dashboard, /dashboard/todos only | ✅ FR-001, FR-002 define visibility rules |
| XI. Todo Assistant Chatbot | Refusal: "I can help only with Todo app features" | ✅ FR-008 defines refusal message |
| XI. Todo Assistant Chatbot | No external APIs | ✅ FR-007, SC-007 confirm no APIs |
| V. Type Safety | Full TypeScript, no `any` type | ✅ Will use explicit interfaces |
| IV. State Management | React Context or localStorage | ✅ Using React state + optional localStorage |
| VIII. Visual Design | Glassmorphism, Framer Motion animations | ✅ FR-005, FR-6 define UI requirements |
| III. Component Isolation | Isolated component per feature | ✅ Chatbot as standalone component |

All gates pass. No violations requiring complexity tracking.

## Project Structure

### Documentation (this feature)

```text
specs/005-todo-chatbot-assistant/
├── plan.md              # This file (/sp.plan command output)
├── research.md          # Phase 0 output (N/A - no clarifications needed)
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output (UI contracts)
└── tasks.md             # Phase 2 output (/sp.tasks command - NOT created by /sp.plan)
```

### Source Code (repository root)

```text
frontend/
├── src/
│   ├── components/
│   │   └── Chatbot/
│   │       ├── Chatbot.tsx         # Main component (container)
│   │       ├── ChatbotButton.tsx   # Floating FAB
│   │       ├── ChatbotPanel.tsx    # Slide-in panel
│   │       ├── ChatMessage.tsx     # Message bubble
│   │       ├── ChatInput.tsx       # Text input area
│   │       └── QuickTopics.tsx     # Quick help topic buttons
│   ├── context/
│   │   └── ChatbotContext.tsx      # Chatbot state management
│   ├── lib/
│   │   ├── chatbot/
│   │   │   ├── knowledgeBase.ts    # Predefined responses
│   │   │   └── intentMatcher.ts    # Keyword matching logic
│   │   └── utils.ts                # Existing utilities
│   ├── types/
│   │   └── index.ts                # Chatbot types
│   └── app/
│       └── layout.tsx              # Already includes providers
└── tests/
    └── Chatbot/                    # Component and integration tests
```

**Structure Decision**: Chatbot feature implemented as isolated component module under `components/Chatbot/` with dedicated context for state management. Knowledge base and intent matching logic in `lib/chatbot/` for separation of concerns.

## Phase 0: Research (Completed)

No research needed - all technical decisions are defined in the constitution and specification:
- Frontend-only (no backend/API)
- React Context for state management
- Keyword-based intent matching (no NLP)
- Framer Motion for animations
- Tailwind CSS + glassmorphism for UI

## Phase 1: Design & Contracts

### Data Model (data-model.md)

**ChatbotState**
```typescript
interface ChatbotState {
  isOpen: boolean;           // Panel visibility
  messages: ChatMessage[];   // Conversation history
  isTyping: boolean;         // Bot response in progress
}

interface ChatMessage {
  id: string;
  content: string;
  role: 'user' | 'bot';
  timestamp: number;
}

interface QuickTopic {
  id: string;
  label: string;
  keywords: string[];
  response: string;
}

interface IntentRule {
  id: string;
  patterns: string[];        // Keywords to match
  responseId: string;        // Maps to knowledge base
}
```

**Knowledge Base Structure**
```typescript
interface KnowledgeEntry {
  id: string;
  category: 'create' | 'edit' | 'delete' | 'filter' | 'dashboard' | 'auth' | 'general';
  keywords: string[];
  response: string;
}
```

### UI Contracts

**Component: ChatbotButton**
- Position: fixed bottom-right, 16px from edges
- Size: 56x56px rounded-full
- Style: gradient background, shadow glow
- Animation: scale on hover, rotate when open (X icon)

**Component: ChatbotPanel**
- Position: fixed bottom-right, above button
- Size: 400px width, 500px max-height
- Animation: slide up + fade in (Framer Motion)
- Structure: Header, Messages, Input, QuickTopics

**Component: ChatMessage**
- User: aligned right, primary gradient background
- Bot: aligned left, glassmorphism background
- Animation: fade in + slide up

### Quickstart (quickstart.md)

**Adding a New Help Topic**

1. Add keyword patterns to `lib/chatbot/knowledgeBase.ts`:
```typescript
{
  id: 'new-topic',
  category: 'general',
  keywords: ['keyword1', 'keyword2', 'related term'],
  response: 'Your predefined response here.'
}
```

2. Test matching by asking questions containing the keywords.

**Customizing Refusal Message**

Edit the `OFF_TOPIC_RESPONSE` constant in `lib/chatbot/intentMatcher.ts`.

**Styling Adjustments**

- Button: `components/Chatbot/ChatbotButton.tsx`
- Panel: `components/Chatbot/ChatbotPanel.tsx`
- Colors: Match existing Tailwind color palette

---

## Next Steps

Run `/sp.tasks` to generate implementation tasks from this plan.

**PHR**: `history/prompts/todo-chatbot-assistant/002-todo-chatbot-plan.plan.prompt.md`
