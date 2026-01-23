# Research: Dark Theme Frontend for Todo Web App

**Date**: 2025-12-31
**Feature**: 004-dark-theme-frontend

## JWT Token Storage

### Decision: httpOnly cookies with localStorage fallback

**Rationale**:
- httpOnly cookies prevent XSS attacks from stealing tokens
- Same-site strict mode prevents CSRF attacks
- localStorage fallback for environments where httpOnly is not feasible

**Implementation**:
```typescript
// Token storage options considered
const tokenStorage = {
  httpOnly: {
    pros: ['XSS protection', 'CSRF resistant'],
    cons: ['Server-side rendering challenges', 'Server must set cookies']
  },
  localStorage: {
    pros: ['SSR compatible', 'Easy access'],
    cons: ['Vulnerable to XSS', 'No CSRF protection']
  }
};
```

**Sources**:
- OWASP Authentication Cheat Sheet
- Next.js Auth.js documentation

## State Management: Zustand + React Query

### Decision: Zustand for client state, React Query for server state

**Rationale**:
- **Zustand**: Minimal boilerplate, no providers wrapping, selective subscriptions prevent unnecessary re-renders
- **React Query**: Caching, automatic refetching, optimistic updates for CRUD operations

**Alternative Evaluations**:
| Solution | Boilerplate | Learning Curve | Ecosystem | SSR Support |
|----------|-------------|----------------|-----------|-------------|
| Zustand | Low | Low | Good | Good |
| Redux | High | High | Excellent | Good |
| Context API | Low | Low | Native | Good |
| Recoil | Medium | Medium | Growing | Experimental |

**Implementation Pattern**:
```typescript
// Auth store (Zustand)
interface AuthStore {
  user: User | null;
  token: string | null;
  login: (user: User, token: string) => void;
  logout: () => void;
}

// Task queries (React Query)
const useTasks = (filters: TaskFilters) => {
  return useQuery({
    queryKey: ['tasks', filters],
    queryFn: () => fetchTasks(filters),
  });
};
```

## Dark Theme with Tailwind CSS

### Decision: CSS variables with Tailwind 4.x

**Color Palette**:
```css
:root {
  --background: #0a0a0a;
  --surface: #171717;
  --surface-hover: #262626;
  --primary: #3b82f6;
  --primary-hover: #2563eb;
  --secondary: #60a5fa;
  --text-primary: #f3f4f6;
  --text-secondary: #9ca3af;
  --border: #262626;
  --error: #ef4444;
  --success: #22c55e;
}
```

**Tailwind Configuration**:
```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        surface: 'var(--surface)',
        primary: {
          DEFAULT: '#3b82f6',
          hover: '#2563eb',
        },
      },
    },
  },
};
```

## Responsive Design Strategy

### Mobile-First Approach

**Breakpoints** (Tailwind defaults):
- sm: 640px (small devices)
- md: 768px (tablets)
- lg: 1024px (laptops)
- xl: 1280px (desktops)
- 2xl: 1536px (large screens)

**Layout Patterns**:
| Viewport | Task Cards | Navigation | Modals |
|----------|------------|------------|--------|
| Mobile (<640px) | Single column | Hamburger menu | Full-width |
| Tablet (640-1024px) | 2 columns | Collapsed | Centered, 80% |
| Desktop (>1024px) | 3 columns | Full | Centered, 600px |

## Form Validation

### Decision: React Hook Form + Zod

**Rationale**:
- React Hook Form: Performance (uncontrolled inputs), easy integration
- Zod: Type-safe schemas, TypeScript inference, declarative

**Schema Example**:
```typescript
const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

type LoginForm = z.infer<typeof loginSchema>;
```

## API Client

### Decision: Axios with interceptors

**Rationale**:
- Axios: Automatic JSON parsing, interceptor support, timeout handling
- Interceptors: Automatic token injection, error handling

**Configuration**:
```typescript
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
});

// Request interceptor - add token
apiClient.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor - handle errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      logout();
      router.push('/login');
    }
    return Promise.reject(error);
  }
);
```

## Component Architecture

### Atomic Design Adaptation

```
components/
├── ui/                    # Atoms (primitive components)
│   ├── Button/
│   ├── Input/
│   ├── Modal/
│   ├── Card/
│   └── Toast/
├── auth/                  # Molecules (auth-specific)
│   ├── LoginForm/
│   └── SignupForm/
├── tasks/                 # Organisms (task features)
│   ├── TaskCard/
│   ├── TaskList/
│   └── TaskForm/
└── layout/                # Templates
    ├── Header/
    ├── Footer/
    └── Sidebar/
```

## Performance Optimizations

### Identified Opportunities

| Optimization | Technique | Expected Impact |
|--------------|-----------|-----------------|
| Code splitting | Next.js dynamic imports | Reduce initial bundle |
| Image optimization | next/image | Faster LCP |
| Caching | React Query | Fewer API calls |
| Memoization | useMemo, useCallback | Prevent re-renders |
| Virtualization | react-window (if needed) | Handle 100+ tasks |

## Security Considerations

1. **XSS Prevention**: Escape user input, use httpOnly cookies
2. **CSRF Protection**: Same-site cookies, CSRF tokens
3. **Input Validation**: Server + client validation (defense in depth)
4. **Token Management**: Short expiry, refresh token rotation
5. **API Security**: Rate limiting, proper error messages (no sensitive data)

## Browser Support

**Target**: Modern browsers (last 2 versions)
- Chrome 120+
- Firefox 120+
- Safari 17+
- Edge 120+

**Polyfills needed**: None (modern browsers support all ES2022+ features)
