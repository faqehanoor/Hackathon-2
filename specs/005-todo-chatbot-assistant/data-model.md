# Data Model: Todo Assistant Chatbot

**Feature**: Todo Assistant Chatbot
**Created**: 2026-01-01

## Core Entities

### ChatMessage

Represents a single message in the conversation.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | string | Yes | Unique identifier (UUID) |
| content | string | Yes | Message text content |
| role | 'user' \| 'bot' | Yes | Message sender type |
| timestamp | number | Yes | Unix timestamp in milliseconds |

**Validation Rules**:
- `id`: Must be a valid UUID v4
- `content`: 1-500 characters, trim whitespace
- `role`: Must be either 'user' or 'bot'
- `timestamp`: Must be positive integer

**State Transitions**:
- User message: role='user', content=user input
- Bot message: role='bot', content=matched response

### QuickTopic

Represents a suggested help topic displayed to users.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | string | Yes | Unique identifier |
| label | string | Yes | Display text for button |
| keywords | string[] | Yes | Trigger keywords for matching |
| response | string | Yes | Predefined response content |

**Validation Rules**:
- `id`: Must be unique across all topics
- `label`: 1-30 characters, descriptive action
- `keywords`: Minimum 2 keywords, case-insensitive matching
- `response`: 50-500 characters, helpful content

### KnowledgeEntry

Predefined response for a category of questions.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | string | Yes | Unique identifier |
| category | 'create' \| 'edit' \| 'delete' \| 'filter' \| 'dashboard' \| 'auth' \| 'general' | Yes | Topic category |
| keywords | string[] | Yes | Keywords to match in user input |
| response | string | Yes | Response text to display |

**Categories**:
- `create`: Todo creation questions
- `edit`: Todo editing questions
- `delete`: Todo deletion questions
- `filter`: Filtering and sorting questions
- `dashboard`: Dashboard feature questions
- `auth`: Authentication flow questions
- `general`: General app questions

### IntentRule

Maps user input patterns to knowledge entries.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | string | Yes | Unique identifier |
| patterns | string[] | Yes | Keyword or regex patterns |
| responseId | string | Yes | Reference to KnowledgeEntry.id |

**Pattern Matching Logic**:
1. Normalize input: lowercase, trim, remove punctuation
2. Check each pattern for substring match
3. Return first matching rule's response
4. If no match, return off-topic response

## State Management

### ChatbotState

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| isOpen | boolean | false | Panel visibility state |
| messages | ChatMessage[] | [] | Conversation history |
| isTyping | boolean | false | Bot response in progress |

**State Transitions**:

```
Closed → Open: User clicks button
Open → Closed: User clicks close/outside

[] → [user message]: User submits message
[user message] → [user, bot message]: Bot responds after delay
```

### Constraints

- Maximum 50 messages per session
- Chat history clears on page refresh
- No localStorage persistence required by spec

## Relationships

```
ChatbotContext
├── isOpen: boolean
├── messages: ChatMessage[]
├── isTyping: boolean
├── openPanel()
├── closePanel()
├── sendMessage(text)
└── selectTopic(topicId)

KnowledgeBase
├── entries: KnowledgeEntry[]
└── findResponse(input): KnowledgeEntry | null

QuickTopics
├── topics: QuickTopic[]
└── onSelect(topic): triggers KnowledgeEntry response
```
