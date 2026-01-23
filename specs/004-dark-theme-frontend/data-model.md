# Data Model: Dark Theme Frontend

**Date**: 2025-12-31
**Feature**: 004-dark-theme-frontend

## Entity Overview

This document defines the TypeScript types and interfaces used by the frontend application. These types represent the data contracts between the frontend and backend APIs.

---

## User Entity

### Type Definition

```typescript
interface User {
  id: string;
  email: string;
  name: string;
  created_at: string;
}
```

### Field Descriptions

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | string | Yes | Unique identifier (UUID) |
| email | string | Yes | User's email address |
| name | string | Yes | Display name |
| created_at | string | Yes | ISO 8601 timestamp |

### Validation Rules

- `email`: Valid email format, max 255 characters
- `name`: Non-empty string, 1-100 characters

---

## Task Entity

### Type Definition

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
```

### Field Descriptions

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | string | Yes | Unique identifier (UUID) |
| user_id | string | Yes | Owner's user ID (for backend filtering) |
| title | string | Yes | Task title, 1-255 characters |
| description | string | No | Optional task details, max 10,000 chars |
| completed | boolean | Yes | Completion status |
| created_at | string | Yes | ISO 8601 creation timestamp |
| updated_at | string | Yes | ISO 8601 last update timestamp |

### Validation Rules

- `title`: Required, 1-255 characters, trim whitespace
- `description`: Optional, max 10,000 characters
- `completed`: Boolean, default false

---

## Authentication State

### Type Definition

```typescript
interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData {
  email: string;
  name: string;
  password: string;
}

interface AuthResponse {
  user: User;
  token: string;
}
```

---

## Task State Management

### Type Definition

```typescript
interface TaskFilters {
  status: 'all' | 'active' | 'completed';
  search?: string;
}

interface TaskState {
  tasks: Task[];
  filters: TaskFilters;
  selectedTask: Task | null;
  isLoading: boolean;
  error: string | null;
}

interface CreateTaskInput {
  title: string;
  description?: string;
}

interface UpdateTaskInput {
  title?: string;
  description?: string;
  completed?: boolean;
}
```

---

## API Response Types

### Type Definition

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

interface ValidationError {
  loc: string[];
  msg: string;
  type: string;
}
```

---

## Form Types

### Login Form

```typescript
interface LoginFormData {
  email: string;
  password: string;
}
```

### Signup Form

```typescript
interface SignupFormData {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
}
```

### Task Form

```typescript
interface TaskFormData {
  title: string;
  description: string;
}
```

---

## Component State Types

### Modal State

```typescript
interface ModalState {
  isOpen: boolean;
  type: 'create' | 'edit' | 'delete' | 'detail' | null;
  data: Task | null;
}

interface ToastState {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
}
```

### Filter State

```typescript
type FilterOption = 'all' | 'active' | 'completed';

interface FilterState {
  current: FilterOption;
  searchQuery: string;
}
```

---

## Relationships

```
User 1───* Task
  (one user can have many tasks)
```

---

## Type Exports

```typescript
// types/index.ts

export type { User, Task, AuthState, TaskState, TaskFilters };
export type { LoginCredentials, RegisterData, AuthResponse };
export type { CreateTaskInput, UpdateTaskInput };
export type { ApiResponse, PaginatedResponse, ErrorResponse };
export type { LoginFormData, SignupFormData, TaskFormData };
export type { ModalState, ToastState, FilterState, FilterOption };
```

---

## Integration Notes

1. All API responses should be validated against these types
2. Frontend forms validate input before API calls
3. Backend validation is authoritative - frontend is a first line of defense
4. Timestamps are handled as ISO 8601 strings in UTC
5. User ID from JWT token is used by backend for data isolation
