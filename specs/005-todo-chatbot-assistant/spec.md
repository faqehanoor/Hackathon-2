# Feature Specification: Todo Assistant Chatbot

**Feature Branch**: `005-todo-chatbot-assistant`
**Created**: 2026-01-01
**Status**: Draft
**Input**: User description: "Todo Assistant Chatbot (Frontend) - Add a frontend-only chatbot that assists users with Todo application-related information only. Rule-based responses, no external APIs, no AI models. Visible only on /dashboard and /dashboard/todos. Floating action button (bottom-right), glassmorphism chat panel, dark theme with gradient accents, smooth animations."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Open and Close Chatbot Panel (Priority: P1)

As an authenticated user, I want to open and close the chatbot panel so that I can access help when needed and minimize it when not in use.

**Why this priority**: This is the foundational interaction - without being able to open the chatbot, users cannot access any of its features. This delivers immediate value by providing on-demand help.

**Independent Test**: Can be tested by clicking the floating button and verifying the panel opens, then closing it via button or outside click.

**Acceptance Scenarios**:

1. **Given** the user is on `/dashboard` or `/dashboard/todos`, **When** they click the floating chatbot button (bottom-right), **Then** the chatbot panel opens smoothly with animation.
2. **Given** the chatbot panel is open, **When** the user clicks the close button, **Then** the panel closes smoothly.
3. **Given** the chatbot panel is open, **When** the user clicks outside the panel area, **Then** the panel closes.
4. **Given** the user is on `/`, `/signin`, or `/signup`, **When** the page loads, **Then** no chatbot button is visible.

---

### User Story 2 - Ask Todo-Related Questions (Priority: P1)

As an authenticated user, I want to ask questions about the Todo application and receive accurate, helpful answers so that I can understand how to use the app effectively.

**Why this priority**: This is the core value proposition - users get answers to their questions about creating, editing, deleting, and managing todos, as well as understanding dashboard features and authentication flow.

**Independent Test**: Can be tested by typing questions like "How do I create a todo?" and verifying the response provides relevant guidance.

**Acceptance Scenarios**:

1. **Given** the chatbot is open, **When** the user types "How do I create a todo?", **Then** the system responds with instructions about adding todos via the input field at the top of the todos page.
2. **Given** the chatbot is open, **When** the user types "What can the dashboard show me?", **Then** the system responds with information about stats cards, recent todos, and quick actions.
3. **Given** the chatbot is open, **When** the user types a question about filters, **Then** the system explains All/Active/Completed filtering functionality.
4. **Given** the chatbot is open, **When** the user asks about authentication, **Then** the system explains the sign-up/sign-in flow and localStorage persistence.

---

### User Story 3 - Receive Off-Topic Question Refusal (Priority: P1)

As an authenticated user, when I ask a question outside the Todo application domain, I receive a clear, polite refusal so that I understand the chatbot's boundaries.

**Why this priority**: This maintains scope boundaries and ensures users don't waste time asking questions the chatbot cannot answer. It sets clear expectations about what the chatbot can help with.

**Independent Test**: Can be tested by asking questions like "What's the weather?" or "How do I code a website?" and verifying the refusal response.

**Acceptance Scenarios**:

1. **Given** the chatbot is open, **When** the user types "What's the weather today?", **Then** the system responds with "I can help only with Todo app features 🙂".
2. **Given** the chatbot is open, **When** the user types "Tell me about yourself", **Then** the system responds with "I can help only with Todo app features 🙂".
3. **Given** the chatbot is open, **When** the user types "How does the backend work?", **Then** the system responds with "I can help only with Todo app features 🙂".

---

### User Story 4 - View Quick Help Topics (Priority: P2)

As an authenticated user, I want to see suggested help topics so that I can quickly access common information without typing questions.

**Why this priority**: Quick topics reduce friction for users who know they need help but aren't sure what to ask. It provides discoverability for chatbot capabilities.

**Independent Test**: Can be tested by opening the chatbot and verifying quick topic buttons are displayed.

**Acceptance Scenarios**:

1. **Given** the chatbot is open, **When** the panel loads, **Then** 3-4 quick help topic buttons are displayed at the top or after the welcome message.
2. **Given** the quick help topics are displayed, **When** the user clicks on "Creating Todos", **Then** the system displays information about adding todos.
3. **Given** the quick help topics are displayed, **When** the user clicks on "Filtering Tasks", **Then** the system displays information about filtering.

---

### User Story 5 - See Chat History Within Session (Priority: P3)

As an authenticated user, I want to see my conversation history within the current session so that I can review previous answers and continue my help session seamlessly.

**Why this priority**: Low priority enhancement that improves usability but is not essential for core functionality. Allows users to reference earlier answers.

**Independent Test**: Can be tested by asking multiple questions and verifying all messages remain visible in the chat.

**Acceptance Scenarios**:

1. **Given** the user has asked questions and received answers, **When** they scroll through the chat, **Then** all previous questions and answers are visible.
2. **Given** the user refreshes the page, **When** they reopen the chatbot, **Then** the chat history is cleared (session-only persistence).

---

### Edge Cases

- What happens when the user types only whitespace or empty messages?
- How does the system handle very long messages that exceed reasonable length?
- What happens if multiple rapid messages are sent before responses appear?
- How does the system handle special characters or emojis in user messages?
- What happens if the user navigates away while waiting for a response?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The chatbot MUST be visible only on authenticated routes (`/dashboard` and `/dashboard/todos`).
- **FR-002**: The chatbot MUST be hidden on public routes (`/`, `/signin`, `/signup`).
- **FR-003**: Users MUST be able to open the chatbot by clicking a floating action button in the bottom-right corner.
- **FR-004**: Users MUST be able to close the chatbot via a close button or clicking outside the panel.
- **FR-005**: The chatbot panel MUST display with a glassmorphism design matching the app's dark theme.
- **FR-006**: Panel open and close actions MUST have smooth animations using Framer Motion.
- **FR-007**: The chatbot MUST respond only to Todo application-related questions.
- **FR-008**: The chatbot MUST refuse off-topic questions with "I can help only with Todo app features 🙂".
- **FR-009**: Responses MUST be deterministic (same question always produces same response).
- **FR-010**: The chatbot MUST use keyword-based intent matching to route questions to predefined responses.
- **FR-011**: The chatbot MUST include predefined responses for common Todo app questions.
- **FR-012**: The chatbot MUST display 3-4 quick help topic suggestions.
- **FR-013**: Clicking a quick help topic MUST display relevant information.
- **FR-014**: Chat history MUST persist within the current session (lost on page refresh).
- **FR-015**: User messages and bot responses MUST display in a conversation format.
- **FR-016**: Responses MUST appear with a short simulated delay (300-500ms) for natural feel.

### Key Entities

- **ChatMessage**: Represents a single message in the conversation
  - id: unique identifier
  - content: the message text
  - role: "user" or "bot"
  - timestamp: when the message was sent

- **QuickTopic**: Represents a suggested help topic
  - id: unique identifier
  - label: display text for the topic
  - keywords: array of trigger keywords
  - response: predefined response content

- **IntentRule**: Maps user intent patterns to responses
  - id: unique identifier
  - patterns: array of keyword patterns or regex
  - responseId: reference to predefined response

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Users can open the chatbot within 2 seconds of page load (button visible immediately).
- **SC-002**: 100% of off-topic questions receive the standard refusal response.
- **SC-003**: 100% of Todo-related keyword queries match to a predefined response (no unmatched queries within scope).
- **SC-004**: Chatbot panel animation completes within 300ms for open and close transitions.
- **SC-005**: All quick help topics are clickable and display relevant information within 500ms.
- **SC-006**: Users understand chatbot boundaries (evidenced by reduced off-topic questions over session).
- **SC-007**: No external API calls or backend communication for chatbot responses.

## Assumptions

- Chatbot responses are hardcoded/predefined (no AI model integration).
- Knowledge base covers common Todo app use cases: creating todos, editing todos, deleting todos, filtering, dashboard features, authentication flow, and localStorage explanation.
- No user-specific personalization beyond the current session.
- Maximum chat history of 50 messages per session to prevent memory issues.
- Chatbot uses simple keyword matching (no NLP or machine learning).
- Responses are in English only.
