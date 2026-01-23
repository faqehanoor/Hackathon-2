# Data Model: FastAPI Backend for Todo App

## Entities

### User

Represents a registered user account with authentication credentials.

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| `id` | UUID | Primary Key, Default: uuid4() | Unique user identifier |
| `email` | String | Unique, Index, Max: 254 | User email address (RFC 5322 format) |
| `name` | String | Max: 100 | Display name |
| `password_hash` | String | Min: 60 (bcrypt hash) | Hashed password (never plaintext) |
| `created_at` | DateTime | Default:.utcnow | Account creation timestamp |
| `updated_at` | DateTime | Default:utcnow, OnUpdate:utcnow | Last modification timestamp |

**Relationships**:
- One-to-Many with Task (user can have many tasks)

### Task

Represents a user task with optional priority.

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| `id` | UUID | Primary Key, Default: uuid4() | Unique task identifier |
| `user_id` | UUID | ForeignKey: users.id, Index | Owning user (enforces isolation) |
| `title` | String | Max: 200, Min: 1 | Task title |
| `description` | Text | Nullable | Optional task details |
| `completed` | Boolean | Default: False | Task completion status |
| `priority` | Enum | Values: High, Medium, Low | Task priority level |
| `created_at` | DateTime | Default:utcnow | Task creation timestamp |
| `updated_at` | DateTime | Default:utcnow, OnUpdate:utcnow | Last modification timestamp |

**Relationships**:
- Many-to-One with User (each task belongs to one user)

## Validation Rules

### User Registration

```python
email: str = Field(max_length=254, regex=r"^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$")
name: str = Field(min_length=1, max_length=100)
password: str = Field(min_length=8, max_length=128)
```

### Task Creation

```python
title: str = Field(min_length=1, max_length=200)
description: Optional[str] = Field(default=None, max_length=5000)
priority: TaskPriority = Field(default=TaskPriority.MEDIUM)
```

## State Transitions

### Task Completion Flow

```
Active (completed=False) ←→ Completed (completed=True)
```

No other state transitions exist for tasks.

## Database Indexes

| Table | Index Type | Columns | Purpose |
|-------|------------|---------|---------|
| `users` | Unique | email | Fast login lookup |
| `tasks` | Index | user_id | User isolation queries |
| `tasks` | Index | user_id, completed | Filtered task lists |
| `tasks` | Index | (user_id, title) | Search queries |

## Schema Relationships

```
User (1) ──────→ (N) Task
  id                    user_id
```

Foreign key constraint: `Tasks.user_id` → `Users.id` with ON DELETE CASCADE.
