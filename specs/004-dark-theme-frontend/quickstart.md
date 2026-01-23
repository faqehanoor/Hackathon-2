# Quickstart: Dark Theme Frontend

**Date**: 2025-12-31
**Feature**: 004-dark-theme-frontend

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Access to backend API at `http://localhost:8000/api`

## Setup

### 1. Initialize Project

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# or with yarn
yarn install
```

### 2. Configure Environment

Create `.env.local` file:

```env
# Backend API URL
NEXT_PUBLIC_API_URL=http://localhost:8000/api

# Optional: API timeout (ms)
NEXT_PUBLIC_API_TIMEOUT=10000
```

### 3. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Project Structure

```
frontend/
├── app/                   # Next.js App Router
│   ├── (auth)/           # Authentication pages
│   │   ├── login/
│   │   └── signup/
│   ├── (dashboard)/      # Protected pages
│   │   ├── page.tsx      # Task list
│   │   └── tasks/
│   └── layout.tsx        # Root layout
├── components/           # React components
│   ├── ui/              # Primitive UI components
│   ├── auth/            # Auth components
│   └── tasks/           # Task components
├── lib/                 # Utilities and services
│   ├── auth/           # Authentication utilities
│   └── api/            # API client
├── store/              # State management
├── types/              # TypeScript definitions
└── hooks/              # Custom React hooks
```

## Key Technologies

| Technology | Purpose |
|------------|---------|
| Next.js 16+ | React framework with App Router |
| TypeScript 5.x | Type safety |
| Tailwind CSS 4.x | Styling and dark theme |
| Zustand | Client state management |
| React Query | Server state, caching |
| React Hook Form | Form handling |
| Zod | Schema validation |
| Axios | HTTP client |

## Development Workflow

### Running Tests

```bash
# Unit tests
npm run test

# Watch mode
npm run test:watch

# E2E tests
npm run test:e2e
```

### Linting

```bash
npm run lint
```

### Building for Production

```bash
npm run build
npm run start
```

## Verification Checklist

Before considering the feature complete:

- [ ] Dark theme renders correctly (black background, blue accents)
- [ ] Login page loads and authenticates successfully
- [ ] Signup creates new user and logs in
- [ ] Task list displays tasks for authenticated user
- [ ] Create task form submits successfully
- [ ] Edit task updates task in list
- [ ] Delete task removes task from list
- [ ] Task completion toggle works
- [ ] Filter (All/Active/Completed) functions correctly
- [ ] Responsive layout works on mobile (375px) and desktop (1920px)
- [ ] Form validation shows appropriate errors
- [ ] Loading states display during API calls
- [ ] Error messages show for failed operations
- [ ] Logout clears session and redirects to login

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register new user |
| POST | /api/auth/login | Login and get JWT |
| GET | /api/tasks | List user's tasks |
| POST | /api/tasks | Create new task |
| GET | /api/tasks/{id} | Get task details |
| PUT | /api/tasks/{id} | Replace task |
| PATCH | /api/tasks/{id} | Update task |
| DELETE | /api/tasks/{id} | Delete task |

## Dark Theme Colors

| Element | Color | Tailwind Class |
|---------|-------|----------------|
| Background | #0a0a0a | `bg-[#0a0a0a]` |
| Surface | #171717 | `bg-[#171717]` |
| Primary | #3b82f6 | `text-blue-500`, `bg-blue-500` |
| Primary Hover | #2563eb | `hover:bg-blue-600` |
| Text Primary | #f3f4f6 | `text-gray-100` |
| Text Secondary | #9ca3af | `text-gray-400` |
| Border | #262626 | `border-gray-800` |

## Troubleshooting

### API Not Connecting

1. Verify backend is running at `http://localhost:8000`
2. Check `NEXT_PUBLIC_API_URL` in `.env.local`
3. Check browser console for CORS errors

### Styles Not Loading

1. Ensure Tailwind is properly configured
2. Run `npm run dev` (hot reload required)
3. Check `globals.css` imports Tailwind directives

### Auth Issues

1. Clear browser storage (localStorage/cookies)
2. Try incognito mode
3. Verify JWT token is being sent in requests

## Next Steps

1. Run `/sp.tasks` to generate implementation tasks
2. Implement following the task list order
3. Test each user story independently
4. Complete integration testing before merge
