# Data Model: Todo AI Chatbot

**Feature**: Todo AI Chatbot | **Created**: 2026-01-01

## Entities

### User

Represents an authenticated user who owns todos and conversations.

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | Primary Key, Default: uuid4() | Unique user identifier |
| email | String | Unique, Max 255 | User email address |
| name | String | Max 255 | Display name |
| password_hash | String | Max 255 | Hashed password (not returned in API) |
| created_at | DateTime | Default: now() | Account creation timestamp |

**Relationships**:
- One-to-Many with Todo (owner)
- One-to-Many with Conversation (owner)

### Todo

Represents a task item owned by a user.

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | Primary Key, Default: uuid4() | Unique todo identifier |
| user_id | UUID | Foreign Key (User.id), Not Null | Owner reference |
| title | String | Not Null, Max 500 | Task description |
| description | String | Max 2000, Optional | Detailed task notes |
| is_completed | Boolean | Default: False | Completion status |
| created_at | DateTime | Default: now() | Creation timestamp |
| updated_at | DateTime | Default: now(), Auto-update | Last modification |

**Relationships**:
- Many-to-One with User (owner)
- No direct link to Conversation (accessed via user context)

**Indexes**:
- `idx_todo_user_id` on (user_id)
- `idx_todo_completed` on (user_id, is_completed) for filtering

### Conversation

Represents a chat thread belonging to a user.

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | Primary Key, Default: uuid4() | Unique conversation identifier |
| user_id | UUID | Foreign Key (User.id), Not Null | Owner reference |
| title | String | Max 255, Optional | Conversation title (first message preview) |
| created_at | DateTime | Default: now() | Conversation start |
| last_message_at | DateTime | Default: now(), Auto-update | Timestamp of most recent message |

**Relationships**:
- Many-to-One with User (owner)
- One-to-Many with Message (conversation)

**Indexes**:
- `idx_conversation_user_id` on (user_id)
- `idx_conversation_updated` on (user_id, last_message_at DESC)

### Message

Represents an individual chat message within a conversation.

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | Primary Key, Default: uuid4() | Unique message identifier |
| conversation_id | UUID | Foreign Key (Conversation.id), Not Null | Parent conversation |
| role | Enum | Values: 'user', 'assistant' | Message author |
| content | String | Not Null, Max 10000 | Message text |
| tool_calls | JSON | Optional | MCP tool invocations made |
| tool_results | JSON | Optional | Tool execution results |
| created_at | DateTime | Default: now() | Message timestamp |

**Relationships**:
- Many-to-One with Conversation (parent)

**Indexes**:
- `idx_message_conversation` on (conversation_id, created_at ASC)

## Validation Rules

1. **User Validation**:
   - Email must be valid format (RFC 5322)
   - Password minimum 8 characters
   - Name required, 1-255 characters

2. **Todo Validation**:
   - Title required, 1-500 characters
   - User can only access their own todos
   - Soft delete recommended for audit trail

3. **Conversation Validation**:
   - User can only access their own conversations
   - Messages ordered by created_at ascending

4. **Message Validation**:
   - Content required, 1-10000 characters
   - Role must be 'user' or 'assistant'
   - tool_calls/tool_results are JSON objects

## State Transitions

### Todo Lifecycle

```
[Draft] → [Active] → [Completed]
              ↓
         [Deleted] (soft delete)
```

**Transitions**:
- Draft → Active: Created (implicit)
- Active → Completed: Mark complete via conversation
- Active → Deleted: Delete via conversation
- Any → Any: Update title/content via conversation

### Conversation Lifecycle

```
[Created] → [Active] → [Archived]
                    ↓
              [Deleted] (after retention period)
```

## SQLModel Schema Preview

```python
from sqlmodel import SQLModel, Field, Relationship
from datetime import datetime
from typing import Optional
from enum import Enum
import uuid

class UserRole(str, Enum):
    USER = "user"
    ADMIN = "admin"

class MessageRole(str, Enum):
    USER = "user"
    ASSISTANT = "assistant"

class User(SQLModel, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    email: str = Field(max_length=255, unique=True)
    name: str = Field(max_length=255)
    password_hash: str = Field(max_length=255)
    created_at: datetime = Field(default_factory=datetime.utcnow)

    todos: list["Todo"] = Relationship(back_populates="user")
    conversations: list["Conversation"] = Relationship(back_populates="user")

class Todo(SQLModel, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    user_id: uuid.UUID = Field(foreign_key="user.id", nullable=False)
    title: str = Field(max_length=500, nullable=False)
    description: Optional[str] = Field(max_length=2000, default=None)
    is_completed: bool = Field(default=False)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    user: "User" = Relationship(back_populates="todos")

class Conversation(SQLModel, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    user_id: uuid.UUID = Field(foreign_key="user.id", nullable=False)
    title: Optional[str] = Field(max_length=255, default=None)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    last_message_at: datetime = Field(default_factory=datetime.utcnow)

    user: "User" = Relationship(back_populates="conversations")
    messages: list["Message"] = Relationship(back_populates="conversation")

class Message(SQLModel, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    conversation_id: uuid.UUID = Field(foreign_key="conversation.id", nullable=False)
    role: MessageRole = Field(...)
    content: str = Field(max_length=10000, nullable=False)
    tool_calls: Optional[str] = Field(default=None)  # JSON string
    tool_results: Optional[str] = Field(default=None)  # JSON string
    created_at: datetime = Field(default_factory=datetime.utcnow)

    conversation: "Conversation" = Relationship(back_populates="messages")
```

## Database Migrations

Using Alembic for schema management:

1. **Initial migration** (`001_initial.sql`):
   - Create `users` table
   - Create `todos` table with foreign key
   - Create `conversations` table with foreign key
   - Create `messages` table with foreign key
   - Create all indexes

2. **Indexes strategy**:
   - Query patterns favor user-scoped lookups
   - Conversation messages ordered by created_at for history retrieval
   - Todo filtering by completion status
