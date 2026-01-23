<!--
Sync Impact Report
==================
Version change: 2.2.0 → 3.0.0 (MAJOR - new cloud native deployment architecture with containerization and orchestration)

Modified Principles:
- None (existing principles preserved)

Added Principles:
- XIII. Cloud Native Deployment (NEW - major architectural addition)
- XIV. Containerization with AI Assistance (NEW - Docker AI integration)
- XV. Kubernetes Orchestration (NEW - Helm chart management)
- XVI. AI-Assisted DevOps Operations (NEW - kubectl-ai and Kagent integration)

Added Sections:
- Containerization Requirements
- Kubernetes Deployment Architecture
- Helm Chart Specifications
- AI DevOps Tools Integration
- Minikube Local Deployment
- Docker AI Agent (Gordon) Usage
- kubectl-ai and Kagent Operations

Removed Sections: None

Templates Updated:
- plan-template.md ✅ Updated to include containerization and deployment considerations
- spec-template.md ✅ Updated to include infrastructure requirements
- tasks-template.md ✅ Updated to include deployment tasks

Follow-up TODOs: None
-->

# Cloud Native Todo Chatbot Constitution

## Core Principles

### I. Spec-Driven Development
Every feature MUST originate from a formal specification document in `specs/<feature>/`. The workflow follows: Requirements → Spec → Plan → Tasks → Implementation → Validation. Claude Code agents execute tasks derived from `specs/<feature>/tasks.md`. No implementation without documented specification.

### II. Local-First Authentication
Authentication MUST be simulated using localStorage state. No real backend authentication required. Session persistence via localStorage with automatic restoration on page reload. Auto-redirect authenticated users from public routes to dashboard. Logout clears local session state and redirects to landing.

### III. Component Isolation
Each page and feature MUST be isolated in its own route/component. Landing, Auth (signin/signup), Dashboard, and Todos pages are separate routes. Shared components (Navbar, Cards, Buttons) MUST be reusable and tested in isolation. No cross-page state leakage except through intentional auth context.

### IV. State Management
Use React Context or Zustand for global auth state. Todo state MUST persist to localStorage. No external API calls or backend dependencies. All state changes MUST be immediate and reflected in UI without network latency.

### V. Type Safety
Full TypeScript type safety MUST be maintained. Avoid `any` type entirely. Define interfaces for all data structures (Todo, User, AuthState). Component props MUST have explicit types. Shared types in `types/` directory.

### VI. Monorepo Organization
Project structure MUST follow Spec-Kit Plus conventions:
- `/frontend` - Next.js application
- `/backend` - FastAPI server (when backend features present)
- `/specs` - Feature specifications
- `/.specify` - SpecKit Plus configuration and templates

### VII. Responsive UI
Frontend MUST be fully responsive across mobile, tablet, and desktop. Tailwind CSS utility classes enforce consistent design. Mobile-first approach required; test layouts on multiple screen sizes.

### VIII. Visual Design
Dark futuristic theme with gradient accents (teal, cyan, violet). Glassmorphism cards with backdrop blur. Soft shadows and hover glow effects. Smooth Framer Motion transitions. Fully accessible with keyboard navigation and ARIA labels.

### IX. Error Handling
Frontend MUST handle errors gracefully with user-friendly messages. Use React Error Boundaries for component-level errors. Invalid inputs MUST show inline validation messages. No console errors or unhandled promise rejections in production.

### X. Client-Side Filtering
Todo filtering (All/Active/Completed) MUST be implemented client-side. Filter state MUST persist with todo data in localStorage. Instant feedback on filter changes without loading states.

### XI. Todo Assistant Chatbot (Rule-Based)
The application MAY include a frontend-only chatbot assistant to help users understand and use the Todo application. The chatbot MUST adhere to these constraints:

**Scope Boundaries**:
- Chatbot MUST answer ONLY Todo application-related queries
- Chatbot MUST refuse unrelated questions with: "I can help only with Todo app features 🙂"
- Responses MUST be deterministic and rule-based, not AI-generated
- No external APIs or backend communication for chatbot responses

**Visibility Rules**:
- Chatbot floating button MUST be visible ONLY on `/dashboard` and `/dashboard/todos`
- Chatbot MUST be hidden on `/`, `/signin`, and `/signup` pages

**Allowed Knowledge Domain**:
- Todo app purpose and features
- Todo creation, editing, and deletion workflows
- Filter and dashboard functionality explanation
- Authentication flow (UI-only description)
- Navigation guidance within the app
- LocalStorage data persistence explanation

**Forbidden Topics**:
- Backend architecture or implementation details
- Coding tutorials or programming guidance
- General AI or LLM explanations
- Personal questions about the AI/assistant
- Any topics outside the Todo application domain

**Technical Requirements**:
- Keyword-based intent matching system
- Predefined response knowledge base
- Optional localStorage for chat history persistence
- Glassmorphism chat panel matching app design system
- Smooth open/close animations using Framer Motion
- Floating action button positioned bottom-right

### XII. Todo AI Chatbot (MCP + Agents)
For AI-powered chatbot features, the system MUST implement a stateless MCP-based architecture. This principle supersedes Principle XI for AI chatbot features.

**MCP-Based Architecture**:
- All task operations MUST be executed through MCP (Model Context Protocol) tools
- AI agent MUST NOT make direct database calls or bypass MCP tools
- MCP tools provide a controlled interface for Todo CRUD operations
- Backend exposes MCP server endpoints for agent tool execution

**AI Agent Constraints**:
- AI logic MUST use OpenAI Agents SDK for agent behavior
- Agent MUST operate within a stateless request cycle
- No global variables, memory stores, or in-memory conversation state
- Every request MUST be fully self-contained with all necessary context

**Conversation State Management**:
- Conversation state MUST persist in the database
- Chat history MUST resume after server restart
- AI response MUST be persisted to database before returning to user
- Stateless request cycle enforced: each request loads state from DB

**Horizontal Scalability**:
- Backend MUST remain stateless for horizontal scaling
- No session-affinity required; any server instance can handle any request
- Database serves as the single source of truth for conversation state

**Backend Directory Structure**:
```text
backend/
├── src/
│   ├── main.py                 # FastAPI application entry point
│   ├── models/                 # SQLModel database models
│   │   ├── entities.py         # Todo, User, Conversation, Message
│   │   └── database.py         # Database connection and session
│   ├── mcp/
│   │   ├── tools/              # MCP tool definitions
│   │   │   ├── todo_tools.py   # CRUD operations for todos
│   │   │   └── __init__.py
│   │   └── server.py           # MCP server implementation
│   ├── api/
│   │   └── routes.py           # HTTP endpoints
│   ├── agents/
│   │   └── todo_agent.py       # OpenAI Agents SDK implementation
│   └── lib/
│       └── config.py           # Configuration management
├── alembic/                    # Database migrations
├── tests/
└── pyproject.toml
```

**Forbidden Actions**:
- No frontend logic in backend code
- No direct SQL execution by AI agent
- No non-Todo related responses by AI agent
- No skipping Spec-Kit Plus phases

### XIII. Cloud Native Deployment
The application MUST be deployed using containerized infrastructure with Kubernetes orchestration. This principle governs all deployment-related activities.

**Deployment Architecture**:
- Frontend and backend applications MUST be containerized separately
- Deployment MUST occur on local Kubernetes cluster using Minikube
- All services MUST be exposed through Kubernetes Services and Ingress
- Environment variables MUST be managed through Kubernetes ConfigMaps and Secrets

**Containerization Requirements**:
- Frontend container MUST serve Next.js application in production mode
- Backend container MUST run FastAPI application with proper process management
- Both containers MUST follow security best practices (non-root user, minimal layers)
- Image sizes MUST be optimized for fast deployment and minimal resource consumption

**Kubernetes Deployment Architecture**:
- Frontend deployment MUST expose port 3000
- Backend deployment MUST expose port 8000
- Services MUST use appropriate selectors and ports
- Ingress resource MUST route traffic to appropriate services
- Resource limits and requests MUST be configured for production readiness

### XIV. Containerization with AI Assistance
All containerization tasks MUST leverage Docker AI Agent (Gordon) when available. When Gordon is unavailable, standard Docker CLI commands MUST be used.

**Docker AI Agent (Gordon) Usage**:
- Dockerfiles MUST be generated and optimized using `docker ai` commands when Gordon is available
- Container builds MUST be initiated through AI-assisted commands when possible
- Image optimization recommendations from Gordon MUST be implemented
- If Gordon is unavailable in region/tier, standard Docker CLI commands are acceptable alternatives

**Container Build Process**:
- Multi-stage builds MUST be used for optimized image sizes
- Base images MUST be official, minimal variants (alpine, slim)
- Unnecessary packages and dependencies MUST be removed during build
- Security scanning MUST be performed on final images

### XV. Kubernetes Orchestration
Kubernetes resources MUST be managed through Helm Charts with proper templating and configuration management.

**Helm Chart Specifications**:
- Helm charts MUST include templates for Deployments, Services, and Ingress
- Values files MUST support configurable parameters for different environments
- Chart dependencies MUST be properly managed through requirements.yaml or Chart.yaml
- Release management MUST follow semantic versioning practices

**Resource Management**:
- Deployments MUST include proper resource limits and requests
- Health checks (readiness and liveness probes) MUST be implemented
- ConfigMaps and Secrets MUST be used for configuration management
- Persistent volumes MUST be used for stateful components when needed

### XVI. AI-Assisted DevOps Operations
Kubernetes operations MUST leverage AI-powered tools (kubectl-ai and Kagent) for enhanced productivity and error reduction.

**kubectl-ai and Kagent Operations**:
- Kubernetes resource creation and management MUST utilize kubectl-ai when available
- Cluster analysis and troubleshooting MUST use Kagent for intelligent insights
- Deployment scaling and management MUST use AI-assisted commands
- Monitoring and debugging operations MUST incorporate AI assistance when possible

**AI DevOps Tools Integration**:
- kubectl-ai MUST be used for natural language Kubernetes operations
- Kagent MUST be used for cluster health analysis and optimization
- AI tools MUST be used for infrastructure troubleshooting and optimization
- Natural language commands MUST be preferred over traditional kubectl commands when AI tools are available

## Additional Constraints

### Technology Stack - Infrastructure
- Containerization: Docker (Docker Desktop), Docker AI Agent (Gordon)
- Orchestration: Kubernetes (Minikube for local deployment)
- Package Manager: Helm Charts
- AI DevOps: kubectl-ai, Kagent
- Local Development: Minikube for Kubernetes cluster

### Technology Stack - Frontend
- Framework: Next.js 16+ (App Router), React 18+, TypeScript 5.x
- Styling: Tailwind CSS 3.4+, Dark theme (#0a0a0a bg, #3b82f6 primary)
- State: Zustand or React Context for auth, localStorage for persistence
- Animations: Framer Motion for smooth transitions
- Icons: Lucide React or similar
- Auth Simulation: localStorage-based mock authentication

### Technology Stack - Backend (when present)
- Framework: FastAPI, Python 3.11+
- Database: PostgreSQL (via Neon or local), SQLModel ORM
- AI: OpenAI Agents SDK
- Protocol: MCP (Model Context Protocol)
- Testing: pytest, httpx for async testing

### Deployment Routes

| Service | Port | Purpose |
|---------|------|---------|
| frontend-service | 3000 | Next.js application |
| backend-service | 8000 | FastAPI application |
| ingress | 80 | External access point |

### Containerization Requirements

- Frontend application MUST be built with `npm run build` in Dockerfile
- Backend application MUST be started with proper process manager in Dockerfile
- Environment variables MUST be injected at container runtime
- Health checks MUST be implemented for both containers
- Multi-stage builds MUST be used to minimize attack surface

### Kubernetes Resources Structure

```text
helm-charts/todo-app/
├── Chart.yaml          # Chart metadata
├── values.yaml         # Default configuration values
├── templates/
│   ├── frontend-deployment.yaml
│   ├── backend-deployment.yaml
│   ├── frontend-service.yaml
│   ├── backend-service.yaml
│   ├── ingress.yaml
│   ├── configmap.yaml
│   └── _helpers.tpl    # Template helpers
└── README.md
```

## Development Workflow

### Phase Execution Order
1. Architect: Create/update specifications
2. Plan: Generate implementation plan
3. Containerization: Build Docker images using Gordon or standard Docker
4. Frontend Engineer: Build UI components and pages
5. Backend Engineer: Build API, database, and MCP tools
6. AI Engineer: Implement agent behavior with OpenAI Agents SDK
7. DevOps Engineer: Create Helm charts and deployment configurations
8. Validation Agent: Verify spec compliance and accessibility
9. Integration Test Agent: End-to-end browser testing
10. Deployment Agent: Deploy to local Kubernetes cluster using Minikube

### Quality Gates
- TypeScript compilation MUST succeed with no errors
- Linting MUST pass with no warnings
- All interactive elements MUST have keyboard navigation
- Color contrast MUST meet WCAG 2.1 AA standards
- Page transitions MUST be smooth (Framer Motion)
- All state MUST persist across page reloads
- Backend MUST be stateless for horizontal scaling
- AI agent MUST use MCP tools exclusively for Todo operations
- Container images MUST pass security scanning
- Kubernetes deployments MUST include health checks
- Helm charts MUST validate without errors (`helm lint`)
- Deployments MUST be scalable and resilient

### Code Review Requirements
- PRs MUST reference feature spec
- Agent-executed changes MUST be reviewed
- Components MUST be tested independently
- No hardcoded secrets or API keys
- localStorage usage MUST be documented
- MCP tool usage MUST be verified in AI agent code
- Container security practices MUST be validated
- Kubernetes resource configurations MUST be reviewed
- Helm chart templates MUST be tested with various values

## Governance

This constitution supersedes all other development practices. Amendments require:
1. Documentation of proposed changes
2. Review and approval by project maintainer
3. Migration plan for existing implementations
4. Version increment following semantic versioning

All Pull Requests and code reviews MUST verify compliance with these principles. Complex deviations MUST be justified and documented.

**Version**: 3.0.0 | **Ratified**: 2025-12-31 | **Last Amended**: 2026-01-23
