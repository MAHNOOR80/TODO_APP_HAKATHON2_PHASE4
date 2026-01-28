<!--
SYNC IMPACT REPORT
Version change: 3.0.0 → 4.0.0
Modified principles:
  - Updated project overview to include Cloud-Native and Kubernetes deployment
  - Added new principle: VII. Cloud-Native Infrastructure (New for Phase IV)
  - Added new principle: VIII. Autonomous Agent Behavior (New for Phase IV)
  - Added new principle: IX. Observability & Reliability (New for Phase IV)
  - Updated Technical Stack to include Infrastructure Layer
  - Updated Backend Architecture to include containerization and K8s concerns
  - Updated Out of Scope to remove cloud deployment (now IN scope)
  - Updated Environment Configuration to include Kubernetes secrets
  - Updated Testing Strategy to include infrastructure and observability testing

Added sections:
  - VII. Cloud-Native Infrastructure (Core Principle)
  - VIII. Autonomous Agent Behavior (Core Principle)
  - IX. Observability & Reliability (Core Principle)
  - Infrastructure Layer in Technical Stack
  - Kubernetes Deployment Architecture section
  - Service Containerization Requirements
  - Autonomous Agent Architecture section
  - Health Checks and Probes section
  - Infrastructure Testing section

Removed sections:
  - "Cloud deployment configuration" from Out of Scope (moved to In Scope)

Templates requiring updates:
  - plan-template.md: ✅ Compatible - constitution check will adapt to new principles
  - spec-template.md: ✅ Compatible - user stories can incorporate infrastructure features
  - tasks-template.md: ✅ Compatible - task organization unchanged, can include infra phases
  - phr-template.prompt.md: ✅ Compatible - no changes needed

Follow-up TODOs:
  - README.md needs updating to reflect Phase 4 deployment instructions
  - Kubernetes manifests or Helm charts need to be created
  - Dockerfiles for all services need to be created
-->
<!--
Version: 4.0.0
Created: 2025-12-29
Phase: IV - Cloud-Native Autonomous AI System
Previous Phase: Phase III (AI-Powered Todo Assistant) v3.0.0
Breaking Changes:
  - Architecture shift: Single-app deployment → Cloud-Native Kubernetes Deployment
  - Added: Containerization layer with Docker for all services
  - Added: Kubernetes orchestration for scalability and resilience
  - Added: Autonomous background agents for monitoring and suggestions
  - Added: Observability stack with structured logging, health checks, and probes
  - Technology stack: Infrastructure layer added (Docker, Kubernetes, Helm)
Rationale:
  - Phase 4 transitions from a feature-complete AI app to a production-ready, cloud-native system
  - Maintains full feature parity with Phases 1, 2, and 3
  - All existing functionality continues to work unchanged
  - New sections: Cloud-Native Infrastructure, Autonomous Agent Behavior, Observability & Reliability
-->

# Phase IV Cloud-Native Autonomous AI System Constitution

## Purpose

This constitution defines the non-negotiable principles, rules, and decision framework for all specifications, plans, and implementations of the Phase IV Cloud-Native Autonomous AI System.

**All future specs, plans, and code MUST comply with this document.**

## Project Overview

This project evolves the Phase III AI-powered Todo application into a production-ready, cloud-native system deployed on Kubernetes, with observability, scalability, and autonomous agent workflows, following Spec-Kit Plus and Agentic Dev Stack principles.

**Phase IV Scope:**
- Full-stack web application with AI conversational interface (Frontend + Backend + Database + AI Agent Layer)
- **Containerized** using Docker for all services
- **Kubernetes-deployed** with horizontal scalability
- **Observable** with structured logging, health checks, and probes
- **Secure** with environment-based secrets management
- **Autonomous agents** for background monitoring and suggestions
- Persistent storage using **Neon Serverless PostgreSQL**
- User authentication and authorization using **Better Auth**
- Multi-user support (each user sees only their own tasks)
- RESTful API architecture with versioning
- Responsive web interface with AI conversational interface
- Complete feature parity with Phases I, II, and III
- Agentic Dev Stack workflow with Claude as the primary reasoning and planning agent

**Out of Scope for Phase IV:**
- Real-time collaboration features
- Mobile native applications
- Third-party integrations (calendar sync, email notifications, etc.)
- Advanced analytics or reporting
- Voice-based interaction (text-based only)
- Multi-cloud deployments (single cloud provider target)
- Service mesh (Istio, Linkerd)

## Feature Availability Across Interfaces

All features from Phases I, II, and III MUST be fully available through both interfaces:

### Traditional UI Interface
- All existing web UI functionality from Phases II and III
- Standard form-based task management
- Click-based interactions

### AI Conversational Interface
- Natural language processing for all task operations
- Supported intents include:
  - Create tasks
  - Update tasks
  - Delete tasks
  - Mark complete/incomplete
  - Set priorities, categories, due dates
  - Configure recurring tasks
  - Search, filter, and sort tasks
- AI responses must be clear, safe, and deterministic

All functionality must be accessible via both traditional UI and AI conversational interface:

### Basic Level - Core Essentials
1. **Add Task** - Create new tasks with title and optional description
2. **Delete Task** - Remove tasks by ID
3. **Update Task** - Modify task title/description
4. **View Task List** - Display all tasks with status
5. **Mark Complete/Incomplete** - Toggle task completion status

### Intermediate Level - Organization & Usability
1. **Priorities** - Assign low/medium/high priority to tasks
2. **Tags/Categories** - Organize tasks by custom tags or categories
3. **Search & Filter** - Find tasks by title, description, tags, or priority
4. **Sort** - Order tasks by due date, priority, creation date, or alphabetically

### Advanced Level - Intelligent Features
1. **Recurring Tasks** - Support daily, weekly, monthly recurrence patterns
2. **Due Dates** - Assign due dates to tasks with validation
3. **Time Reminders** - Notify users before tasks are due (browser-based notifications)

## Core Principles

### I. Simplicity and Readability First (Carried from Phase I)

Code MUST be immediately understandable to any full-stack developer. Avoid clever tricks, over-engineering, or premature optimization.

**Non-Negotiable Rules:**
- No complex abstractions unless absolutely necessary
- Prefer explicit, verbose code over concise but obscure patterns
- No performance optimizations unless there's a measured bottleneck
- Code reviews must verify that any developer can understand the logic in under 2 minutes
- Component and API naming MUST be self-documenting

**Rationale:** Phase IV builds on all previous foundations. Clarity enables future developers to extend the system confidently across frontend, backend, database, AI, and infrastructure layers.

### II. Clean Code Principles (Expanded for Web)

Follow language-specific best practices strictly. Use meaningful variable, function, component, and API names. Keep functions/components focused on a single responsibility.

**Non-Negotiable Rules:**
- **Backend (Node.js/TypeScript):** ESLint + Prettier enforced
- **Frontend:** Component-based architecture, single responsibility per component
- **Infrastructure:** YAML linting for Kubernetes manifests, Dockerfiles follow best practices
- Function/method length MUST NOT exceed 50 lines unless justified
- Variable/parameter names MUST be descriptive (no single-letter names except loop iterators)
- Each function/component MUST do one thing only
- API endpoint names MUST follow RESTful conventions

**Rationale:** Multi-layer architecture requires consistent style across codebase. Clean separation between frontend, backend, data, AI, and infrastructure layers prevents coupling.

### III. Modularity and Extensibility (Critical for Full Stack)

Design decisions MUST support future phases. Adding new features MUST NOT require major refactoring. Business logic MUST be decoupled from presentation, persistence, and infrastructure layers.

**Non-Negotiable Rules:**
- **Backend:** Business logic MUST NOT contain HTTP/database/infrastructure implementation details
- **Frontend:** UI components MUST NOT contain business logic or direct API calls
- **Database:** Schema design MUST support future extensions without breaking changes
- **Infrastructure:** Deployment manifests MUST be environment-agnostic (dev/staging/prod via config)
- All dependencies MUST flow inward (UI → API → Business Logic → Data Layer)
- Authentication/authorization MUST be middleware-based (not embedded in route handlers)

**Rationale:** Full-stack applications have multiple refactoring pain points. Clean separation ensures each layer can evolve independently.

### IV. Security First (Carried from Phase II)

Security is non-negotiable. All user data MUST be protected. Authentication and authorization MUST be enforced at every layer.

**Non-Negotiable Rules:**
- **Never store plaintext passwords** (Better Auth handles hashing)
- **All API endpoints MUST require authentication** (except signup/signin and health checks)
- **Input validation MUST occur on both client and server**
- **SQL injection prevention:** Use parameterized queries ONLY
- **XSS prevention:** Sanitize all user input displayed in UI
- **CSRF protection:** Implement CSRF tokens for state-changing operations
- **Environment secrets:** NEVER commit `.env` files or credentials to version control
- **Kubernetes secrets:** Use Kubernetes Secrets or external secret managers for production
- **User data isolation:** Users MUST ONLY access their own tasks (enforced at database query level)
- **Container security:** Run containers as non-root users, use minimal base images

**Rationale:** Cloud-native applications face additional security threats at the infrastructure layer. Defense-in-depth approach prevents common vulnerabilities.

### V. API-First Design (Carried from Phase II)

The backend API is the contract between frontend and backend. It MUST be stable, well-documented, and versioned.

**Non-Negotiable Rules:**
- **RESTful conventions REQUIRED:** `GET /tasks`, `POST /tasks`, `PUT /tasks/:id`, `DELETE /tasks/:id`
- **Consistent response format:**
  ```json
  {
    "success": true,
    "data": { ... },
    "error": null
  }
  ```
- **HTTP status codes MUST be semantically correct:**
  - `200 OK` - Successful GET/PUT
  - `201 Created` - Successful POST
  - `204 No Content` - Successful DELETE
  - `400 Bad Request` - Validation errors
  - `401 Unauthorized` - Missing/invalid auth
  - `403 Forbidden` - Authenticated but not authorized
  - `404 Not Found` - Resource doesn't exist
  - `500 Internal Server Error` - Server failures
  - `503 Service Unavailable` - Service temporarily unavailable
- **Error responses MUST include actionable messages:**
  ```json
  {
    "success": false,
    "data": null,
    "error": {
      "code": "VALIDATION_ERROR",
      "message": "Title is required and must be between 1-200 characters",
      "field": "title"
    }
  }
  ```
- **API versioning:** Routes MUST be prefixed with `/api/v1/`

**Rationale:** Frontend and backend may evolve independently. A stable, well-designed API contract prevents integration issues.

### VI. AI & Agent Layer (Carried from Phase III)

The AI agent is responsible for intent detection, parameter extraction, and action planning. The AI layer must NOT directly mutate data; all mutations go through validated backend APIs.

**Non-Negotiable Rules:**
- **Intent Detection:** AI agent MUST accurately identify user intent from natural language (create, update, delete, search, etc.)
- **Parameter Extraction:** AI agent MUST extract relevant parameters (task title, due date, priority, etc.) from user input
- **Action Planning:** AI agent MUST plan appropriate API calls based on detected intent and extracted parameters
- **No Direct Data Mutation:** AI layer MUST NOT directly access database or bypass API validation
- **User Context Isolation:** AI actions MUST respect user authentication and authorization boundaries
- **Response Clarity:** AI responses MUST be clear, deterministic, and safe
- **Error Handling:** AI layer MUST gracefully handle ambiguous or invalid user inputs

**Rationale:** AI-powered interfaces require careful separation between natural language processing and business logic. This ensures security, data integrity, and maintainability while providing an intuitive user experience.

### VII. Cloud-Native Infrastructure (New for Phase IV)

The application MUST be containerized, deployable on Kubernetes, and designed for horizontal scalability.

**Non-Negotiable Rules:**
- **Containerization:** All services (frontend, backend, AI agent) MUST have Dockerfiles
- **Multi-stage builds:** Dockerfiles MUST use multi-stage builds to minimize image size
- **Non-root containers:** All containers MUST run as non-root users
- **Kubernetes deployment:** Application MUST be deployable via Kubernetes manifests or Helm charts
- **Service separation:** Frontend, Backend API, and AI Agent MUST be separate deployable services
- **Stateless services:** Application services MUST be stateless (state in database/external stores)
- **Environment configuration:** All environment-specific config MUST be via environment variables or ConfigMaps
- **Resource limits:** Kubernetes deployments MUST specify resource requests and limits
- **Graceful shutdown:** Services MUST handle SIGTERM and drain connections gracefully

**Rationale:** Cloud-native design enables horizontal scalability, resilience, and operational efficiency. Containerization ensures consistent deployment across environments.

### VIII. Autonomous Agent Behavior (New for Phase IV)

Background AI agents MUST operate autonomously for monitoring and suggestions while respecting strict safety boundaries.

**Non-Negotiable Rules:**
- **Suggestive only:** Autonomous agents MUST ONLY suggest actions, NEVER execute destructive operations
- **User consent:** Any automated action that modifies user data MUST require explicit user confirmation
- **Background monitoring:** Agents MAY monitor for:
  - Overdue tasks
  - Task prioritization opportunities
  - Schedule adjustment recommendations
- **Notification delivery:** Agent suggestions MUST be delivered via non-intrusive notifications
- **Rate limiting:** Autonomous agents MUST have rate limits to prevent notification spam
- **User control:** Users MUST be able to enable/disable autonomous agent features
- **Audit trail:** All autonomous agent actions and suggestions MUST be logged
- **Permission boundaries:** Autonomous agents operate within strict permission boundaries (read-only by default)

**Rationale:** Autonomous agents add intelligence without being intrusive or dangerous. Suggestive-only behavior ensures user remains in control while benefiting from proactive insights.

### IX. Observability & Reliability (New for Phase IV)

The system MUST be debuggable in production with comprehensive logging, health checks, and monitoring.

**Non-Negotiable Rules:**
- **Structured logging:** All services MUST use structured JSON logging with correlation IDs
- **Log levels:** MUST support DEBUG, INFO, WARN, ERROR levels configurable via environment
- **Health endpoints:** All services MUST expose `/health` (liveness) and `/ready` (readiness) endpoints
- **Kubernetes probes:** Deployments MUST configure liveness and readiness probes
- **Startup probes:** Services with slow initialization MUST configure startup probes
- **Error tracking:** Application errors MUST include stack traces in logs (not in API responses)
- **Request tracing:** HTTP requests MUST include request ID for correlation
- **Performance metrics:** Track API latency, error rates, and throughput
- **Graceful degradation:** Services MUST handle partial failures gracefully

**Rationale:** Production debugging requires comprehensive observability. Proactive monitoring prevents incidents and enables rapid resolution.

## Technical Stack

### Infrastructure Layer (New for Phase IV)
- **Containerization:** Docker
- **Orchestration:** Kubernetes (K8s)
- **Package Management:** Helm charts (optional) or raw K8s manifests
- **Container Registry:** Any OCI-compliant registry (Docker Hub, GHCR, ECR, GCR)
- **Secret Management:** Kubernetes Secrets (with option for external secret managers)

### AI & Agent Layer
- **AI Framework:** OpenAI GPT or Claude API for natural language processing
- **Agent Orchestration:** LangGraph, CrewAI, or OpenAI Agents SDK for intent detection and action planning
- **Intent Classification:** Machine learning model for detecting user intents (create, update, delete, search, etc.)
- **Entity Extraction:** Named entity recognition for extracting task parameters from natural language
- **Conversation Context:** Session-based conversation memory management
- **Background Jobs:** Scheduled tasks for autonomous agent monitoring

### Backend
- **Runtime:** Node.js 20+ LTS
- **Language:** TypeScript 5+
- **Framework:** Express.js or Fastify (TBD in spec)
- **Authentication:** Better Auth
- **Database ORM:** Prisma or Drizzle (TBD in spec)
- **Database:** Neon Serverless PostgreSQL
- **Validation:** Zod or Joi (TBD in spec)
- **Logging:** Pino or Winston with JSON output

### Frontend
- **Framework:** React 18+ or Next.js 14+ (TBD in spec)
- **Language:** TypeScript 5+
- **Styling:** Tailwind CSS or shadcn/ui (TBD in spec)
- **State Management:** React Context or Zustand (if needed, TBD in spec)
- **HTTP Client:** Fetch API or Axios (TBD in spec)
- **Form Handling:** React Hook Form (if needed, TBD in spec)
- **Chat Interface:** OpenAI ChatKit or similar for conversational UI components

### Development Tools
- **Package Manager:** pnpm or npm (TBD in spec)
- **Linting:** ESLint with TypeScript plugin
- **Formatting:** Prettier
- **Type Checking:** TypeScript strict mode REQUIRED
- **Container Tools:** Docker, docker-compose (for local development)

**Rationale:** Modern, widely-adopted tools with strong community support. TypeScript everywhere ensures type safety across the stack. Infrastructure layer enables production deployment.

## Database Schema Requirements

### Core Entities

#### Users Table
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  autonomous_agents_enabled BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

**Rules:**
- Better Auth will manage password hashing and session storage
- Email MUST be unique and validated
- `autonomous_agents_enabled` controls background agent features per user
- Soft deletes NOT required for Phase IV

#### Tasks Table
```sql
CREATE TABLE tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  completed BOOLEAN DEFAULT FALSE,
  priority VARCHAR(20) DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high')),
  tags TEXT[], -- PostgreSQL array type
  category VARCHAR(100),
  due_date TIMESTAMP,
  recurrence_pattern VARCHAR(50), -- 'daily', 'weekly', 'monthly', or NULL
  reminder_enabled BOOLEAN DEFAULT FALSE,
  reminder_offset_minutes INT, -- Minutes before due_date to remind
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_tasks_user_id ON tasks(user_id);
CREATE INDEX idx_tasks_due_date ON tasks(due_date);
CREATE INDEX idx_tasks_completed ON tasks(completed);
```

#### Agent Suggestions Table (New for Phase IV)
```sql
CREATE TABLE agent_suggestions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  task_id UUID REFERENCES tasks(id) ON DELETE CASCADE,
  suggestion_type VARCHAR(50) NOT NULL, -- 'overdue_reminder', 'prioritization', 'schedule_adjustment'
  message TEXT NOT NULL,
  dismissed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_agent_suggestions_user_id ON agent_suggestions(user_id);
CREATE INDEX idx_agent_suggestions_dismissed ON agent_suggestions(dismissed);
```

**Rules:**
- UUIDs REQUIRED for all primary keys (better for distributed systems than auto-increment)
- `user_id` foreign key MUST enforce CASCADE DELETE
- All queries MUST filter by `user_id` to enforce data isolation
- `tags` stored as PostgreSQL array for efficient querying
- `recurrence_pattern` stored as string for simplicity
- Agent suggestions are user-dismissable and auditable

**Rationale:** Schema supports all Phase III features plus autonomous agent capabilities while enabling future extensions. UUIDs prevent enumeration attacks. Proper indexing ensures fast queries.

## Backend Architecture

### Required Layers

```
┌─────────────────────────────────────────┐
│  Autonomous Agent Layer (Background)    │
│  - Overdue task monitoring              │
│  - Prioritization suggestions           │
│  - Schedule recommendations             │
└────────────┬────────────────────────────┘
             │ (Internal API calls)
┌────────────▼────────────────────────────┐
│  AI & Agent Layer (LangGraph/CrewAI)    │
│  - Intent detection                     │
│  - Parameter extraction                 │
│  - Action planning                      │
└────────────┬────────────────────────────┘
             │
┌────────────▼────────────────────────────┐
│  HTTP Layer (Express/Fastify)           │
│  - Route handlers                       │
│  - Request/response formatting          │
│  - Health check endpoints               │
└────────────┬────────────────────────────┘
             │
┌────────────▼────────────────────────────┐
│  Middleware Layer                       │
│  - Authentication (Better Auth)         │
│  - Validation (Zod/Joi)                 │
│  - Error handling                       │
│  - Request logging/tracing              │
└────────────┬────────────────────────────┘
             │
┌────────────▼────────────────────────────┐
│  Business Logic Layer (Services)        │
│  - Task operations                      │
│  - Recurrence logic                     │
│  - Reminder scheduling                  │
│  - Agent suggestion management          │
└────────────┬────────────────────────────┘
             │
┌────────────▼────────────────────────────┐
│  Data Access Layer (Repositories)       │
│  - Database queries (Prisma/Drizzle)    │
│  - User isolation enforcement           │
└─────────────────────────────────────────┘
```

**Non-Negotiable Rules:**
- **Autonomous Agent Layer:** MUST run as background jobs, MUST NOT block HTTP requests
- **AI Layer:** MUST NOT directly access database or perform data mutations (only call backend APIs)
- **AI Layer:** MUST respect user authentication and authorization boundaries
- **HTTP Layer:** MUST NOT contain business logic (only route mapping and serialization)
- **HTTP Layer:** MUST expose health check endpoints
- **Middleware:** MUST be composable and reusable
- **Middleware:** MUST include request ID generation and logging
- **Business Logic:** MUST be testable without HTTP context
- **Data Access:** MUST use ORM (no raw SQL except for complex queries)
- **User Isolation:** MUST be enforced in data access layer (ALL queries filter by `user_id`)

**File Structure Example:**
```
backend/
├── src/
│   ├── autonomous/       # Autonomous Agent Layer (New for Phase IV)
│   │   ├── scheduler.ts
│   │   ├── overdue-monitor.ts
│   │   ├── prioritization-agent.ts
│   │   └── suggestion-generator.ts
│   ├── ai/               # AI & Agent Layer
│   │   ├── agent.ts
│   │   ├── intent-detector.ts
│   │   ├── parameter-extractor.ts
│   │   └── action-planner.ts
│   ├── routes/           # API route definitions
│   │   ├── auth.routes.ts
│   │   ├── tasks.routes.ts
│   │   ├── suggestions.routes.ts
│   │   └── health.routes.ts
│   ├── middleware/       # Auth, validation, error handling
│   │   ├── auth.middleware.ts
│   │   ├── validate.middleware.ts
│   │   ├── logger.middleware.ts
│   │   └── request-id.middleware.ts
│   ├── services/         # Business logic
│   │   ├── task.service.ts
│   │   ├── recurrence.service.ts
│   │   └── suggestion.service.ts
│   ├── repositories/     # Database access
│   │   ├── task.repository.ts
│   │   └── suggestion.repository.ts
│   ├── models/           # TypeScript types/interfaces
│   │   ├── task.model.ts
│   │   └── suggestion.model.ts
│   ├── config/           # Configuration (DB, Auth, AI)
│   │   ├── database.config.ts
│   │   ├── ai.config.ts
│   │   └── logger.config.ts
│   └── index.ts          # App entry point
├── prisma/ (or drizzle/)
│   └── schema.prisma
├── Dockerfile            # Multi-stage build (New for Phase IV)
├── .env.example
└── package.json
```

**Rationale:** Layered architecture enforces separation of concerns and makes testing straightforward. Autonomous agent layer is clearly separated from request-handling code.

## Kubernetes Deployment Architecture (New for Phase IV)

### Service Topology

```
┌─────────────────────────────────────────────────────────────────┐
│                        Kubernetes Cluster                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐ │
│  │    Frontend     │  │   Backend API   │  │   AI Agent      │ │
│  │    Service      │  │    Service      │  │    Service      │ │
│  │  (Deployment)   │  │  (Deployment)   │  │  (Deployment)   │ │
│  │                 │  │                 │  │                 │ │
│  │  Port: 3000     │  │  Port: 4000     │  │  Port: 5000     │ │
│  │  Replicas: 2+   │  │  Replicas: 2+   │  │  Replicas: 1+   │ │
│  └────────┬────────┘  └────────┬────────┘  └────────┬────────┘ │
│           │                    │                    │          │
│  ┌────────▼────────────────────▼────────────────────▼────────┐ │
│  │                    Ingress Controller                     │ │
│  │                    (nginx or traefik)                     │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │                    ConfigMaps & Secrets                    │ │
│  │  - app-config (environment variables)                      │ │
│  │  - db-credentials (DATABASE_URL)                          │ │
│  │  - ai-credentials (API keys)                              │ │
│  └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
                    ┌─────────────────────┐
                    │  Neon PostgreSQL    │
                    │  (External Service) │
                    └─────────────────────┘
```

### Deployment Manifests Structure

```
k8s/
├── base/                    # Base configurations
│   ├── namespace.yaml
│   ├── frontend/
│   │   ├── deployment.yaml
│   │   └── service.yaml
│   ├── backend/
│   │   ├── deployment.yaml
│   │   └── service.yaml
│   ├── ai-agent/
│   │   ├── deployment.yaml
│   │   └── service.yaml
│   ├── configmap.yaml
│   └── ingress.yaml
├── overlays/                # Environment-specific overrides
│   ├── development/
│   │   └── kustomization.yaml
│   ├── staging/
│   │   └── kustomization.yaml
│   └── production/
│       └── kustomization.yaml
└── secrets/                 # Secret templates (NOT committed)
    └── secrets.yaml.example
```

**OR** using Helm:

```
helm/
├── Chart.yaml
├── values.yaml              # Default values
├── values-dev.yaml          # Development overrides
├── values-staging.yaml      # Staging overrides
├── values-prod.yaml         # Production overrides
└── templates/
    ├── _helpers.tpl
    ├── namespace.yaml
    ├── frontend-deployment.yaml
    ├── frontend-service.yaml
    ├── backend-deployment.yaml
    ├── backend-service.yaml
    ├── ai-agent-deployment.yaml
    ├── ai-agent-service.yaml
    ├── configmap.yaml
    ├── secrets.yaml
    └── ingress.yaml
```

**Non-Negotiable Rules:**
- **Separate services:** Frontend, Backend, and AI Agent MUST be separate Kubernetes Deployments
- **Health probes:** All Deployments MUST have liveness and readiness probes configured
- **Resource limits:** All containers MUST specify resource requests and limits
- **Secrets:** Sensitive values MUST use Kubernetes Secrets, never ConfigMaps
- **Ingress:** External access MUST be via Ingress controller (not NodePort/LoadBalancer per service)
- **Namespacing:** Application MUST deploy to a dedicated namespace

**Rationale:** Kubernetes provides horizontal scalability, self-healing, and declarative infrastructure. Separation of services enables independent scaling and deployment.

## Service Containerization Requirements (New for Phase IV)

### Dockerfile Standards

**Backend Dockerfile Example:**
```dockerfile
# Build stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build

# Production stage
FROM node:20-alpine AS runner
WORKDIR /app
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 appuser
COPY --from=builder --chown=appuser:nodejs /app/dist ./dist
COPY --from=builder --chown=appuser:nodejs /app/node_modules ./node_modules
USER appuser
EXPOSE 4000
ENV NODE_ENV=production
CMD ["node", "dist/index.js"]
```

**Non-Negotiable Rules:**
- **Multi-stage builds:** MUST use multi-stage builds to minimize final image size
- **Alpine base:** MUST use Alpine-based images where possible for minimal attack surface
- **Non-root user:** MUST create and use a non-root user for running the application
- **No secrets in images:** NEVER bake secrets into Docker images
- **.dockerignore:** MUST have a .dockerignore file excluding node_modules, .env, etc.
- **Health check:** MUST include HEALTHCHECK instruction or rely on Kubernetes probes

**Rationale:** Secure, minimal container images reduce attack surface and improve deployment speed.

## Authentication & Authorization

### Better Auth Integration

**Requirements:**
- Use Better Auth for all authentication flows
- Session-based authentication (stateful sessions stored in database)
- CSRF protection enabled
- Secure cookie configuration (httpOnly, secure, sameSite)

**Auth Flows:**

1. **Signup:**
   - `POST /api/v1/auth/signup`
   - Validate email format and password strength
   - Create user record
   - Return session token

2. **Signin:**
   - `POST /api/v1/auth/signin`
   - Validate credentials
   - Create session
   - Return session token

3. **Signout:**
   - `POST /api/v1/auth/signout`
   - Invalidate session
   - Clear cookies

4. **Session Validation:**
   - Middleware checks session on every protected route
   - Attach `user` object to request context

**Authorization Rules:**
- All `/api/v1/tasks/*` endpoints REQUIRE authentication
- All `/api/v1/suggestions/*` endpoints REQUIRE authentication
- Users can ONLY access their own tasks and suggestions
- Database queries MUST include `WHERE user_id = $authenticatedUserId`
- Health check endpoints (`/health`, `/ready`) do NOT require authentication

**Rationale:** Better Auth provides battle-tested security primitives. Session-based auth is simpler than JWT for single-server applications.

## Frontend Architecture

### Component Structure

**Required Patterns:**
- **Container/Presentational Pattern:**
  - Container components handle data fetching and state
  - Presentational components receive props and render UI
- **Single Responsibility:** Each component does ONE thing
- **Prop Validation:** Use TypeScript interfaces for all props

**Component Hierarchy Example:**
```
App
├── AuthProvider (wraps entire app)
├── Routes
│   ├── SignupPage
│   ├── SigninPage
│   └── DashboardPage
│       ├── TaskListContainer (fetches tasks, handles state)
│       │   ├── TaskList (presentational)
│       │   │   ├── TaskItem (presentational)
│       │   │   └── TaskFilters (presentational)
│       │   ├── AddTaskForm (container + presentational)
│       │   └── AIChatInterface (conversational task management)
│       ├── SuggestionsPanel (autonomous agent suggestions)
│       └── Sidebar (navigation)
```

**File Structure Example:**
```
frontend/
├── src/
│   ├── components/       # Reusable presentational components
│   │   ├── TaskItem.tsx
│   │   ├── TaskList.tsx
│   │   ├── Button.tsx
│   │   ├── ChatMessage.tsx
│   │   └── SuggestionCard.tsx
│   ├── containers/       # Container components (data + state)
│   │   ├── TaskListContainer.tsx
│   │   ├── AddTaskFormContainer.tsx
│   │   ├── AIChatContainer.tsx
│   │   └── SuggestionsContainer.tsx
│   ├── pages/            # Page-level components
│   │   ├── SignupPage.tsx
│   │   ├── SigninPage.tsx
│   │   └── DashboardPage.tsx
│   ├── hooks/            # Custom React hooks
│   │   ├── useTasks.ts
│   │   ├── useAuth.ts
│   │   ├── useAIChat.ts
│   │   └── useSuggestions.ts
│   ├── services/         # API client functions
│   │   ├── api.ts
│   │   ├── tasks.api.ts
│   │   ├── ai.api.ts
│   │   └── suggestions.api.ts
│   ├── types/            # TypeScript types/interfaces
│   │   ├── task.types.ts
│   │   ├── ai.types.ts
│   │   └── suggestion.types.ts
│   ├── utils/            # Helper functions
│   │   ├── dateFormatter.ts
│   │   └── ai-response-parser.ts
│   └── App.tsx
├── public/
├── Dockerfile            # Multi-stage build (New for Phase IV)
└── package.json
```

**Rationale:** Clear separation between data/logic and presentation makes components reusable and testable.

### State Management Rules

**Non-Negotiable Rules:**
- **Server state (tasks, suggestions):** Fetch from API, cache in component state or context
- **Client state (UI):** Use React's `useState` for local component state
- **Avoid prop drilling:** Use React Context for deeply nested shared state
- **No global mutable state:** All state changes MUST be explicit (setState, context updates)

**Rationale:** React's built-in state management is sufficient for Phase IV. Adding Redux/MobX would be over-engineering.

### API Integration

**Required Patterns:**
- Centralized API client (`services/api.ts`) with:
  - Base URL configuration
  - Authentication headers injection
  - Error handling and retry logic
- Per-resource API modules (`tasks.api.ts`, `auth.api.ts`, `suggestions.api.ts`)

**Example API Client:**
```typescript
// services/api.ts
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api/v1';

export async function apiRequest<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    credentials: 'include', // Include cookies for session auth
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Request failed');
  }

  return response.json();
}

// tasks.api.ts
export async function fetchTasks(): Promise<Task[]> {
  const response = await apiRequest<{ success: boolean; data: Task[] }>('/tasks');
  return response.data;
}
```

**Rationale:** Centralized API logic prevents duplicated error handling and auth logic across components.

## UI/UX Requirements

### Responsive Design
- MUST support desktop (1024px+), tablet (768px-1023px), and mobile (320px-767px)
- Use mobile-first approach (start with mobile styles, add breakpoints for larger screens)
- Touch-friendly tap targets (minimum 44x44px)

### Accessibility
- Semantic HTML (use `<button>`, `<form>`, `<nav>`, etc. correctly)
- ARIA labels for icon-only buttons
- Keyboard navigation support (tab order, focus states)
- Color contrast ratio MUST meet WCAG AA standards (4.5:1 for normal text)
- AI chat interface MUST be accessible via keyboard and screen readers
- Suggestion notifications MUST be accessible

### Visual Design Principles
- **Consistent spacing:** Use 4px/8px grid system
- **Typography hierarchy:** Clear heading levels (h1, h2, h3)
- **Status indicators:**
  - Completed tasks: Green checkmark + strikethrough text
  - Incomplete tasks: Empty checkbox
  - Overdue tasks: Red highlight
- **Priority colors:**
  - High: Red (`#EF4444` or equivalent)
  - Medium: Yellow (`#F59E0B` or equivalent)
  - Low: Gray (`#6B7280` or equivalent)
- **Loading states:** Skeleton loaders or spinners for async operations
- **Empty states:** Helpful messages when no tasks exist ("No tasks yet. Add your first task!")
- **AI Chat Interface:** Clear distinction between user input and AI responses, with appropriate styling for conversation flow
- **Suggestion cards:** Non-intrusive, dismissible cards for autonomous agent suggestions

### AI Interface Design Principles
- **Clarity:** AI responses MUST be clear and unambiguous
- **Feedback:** Visual indication when AI is processing user input
- **Safety:** Clear boundaries on what the AI can and cannot do
- **Transparency:** Users MUST understand when they're interacting with AI vs traditional UI
- **Fallback:** Traditional UI controls MUST remain available as alternative to AI interactions

### Autonomous Agent UI Design (New for Phase IV)
- **Non-intrusive:** Suggestions MUST NOT interrupt user workflow
- **Dismissible:** Users MUST be able to dismiss suggestions
- **Actionable:** Suggestions MUST include clear actions (accept/dismiss)
- **Preference control:** Users MUST be able to toggle autonomous agent features

**Rationale:** Consistent, accessible UI improves user experience and reduces support burden. AI and autonomous agent elements require special consideration for clarity and user trust.

## Error Handling

### Backend Error Handling

**Required Middleware:**
```typescript
// middleware/errorHandler.ts
export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  const requestId = req.headers['x-request-id'] || 'unknown';
  logger.error({ err, requestId }, 'Request error');

  // Known validation errors
  if (err instanceof ValidationError) {
    return res.status(400).json({
      success: false,
      data: null,
      error: {
        code: 'VALIDATION_ERROR',
        message: err.message,
        field: err.field,
      },
    });
  }

  // Unauthorized errors
  if (err instanceof UnauthorizedError) {
    return res.status(401).json({
      success: false,
      data: null,
      error: { code: 'UNAUTHORIZED', message: 'Authentication required' },
    });
  }

  // Generic server errors
  res.status(500).json({
    success: false,
    data: null,
    error: { code: 'INTERNAL_ERROR', message: 'An unexpected error occurred' },
  });
}
```

**Rules:**
- NEVER expose stack traces in production
- Log all errors server-side with request ID for debugging
- Return user-friendly error messages
- Use appropriate HTTP status codes

### Frontend Error Handling

**Required Patterns:**
- Toast notifications for transient errors (network failures)
- Inline validation errors for forms
- Graceful degradation (show cached data if API fails)
- Retry mechanisms for network errors

**Example:**
```typescript
async function handleAddTask(task: CreateTaskInput) {
  try {
    const newTask = await createTask(task);
    setTasks([...tasks, newTask]);
    showToast('Task added successfully', 'success');
  } catch (error) {
    console.error('Failed to add task:', error);
    showToast('Failed to add task. Please try again.', 'error');
  }
}
```

**Rationale:** Users should never see cryptic error messages or be left wondering what went wrong.

### AI-Specific Error Handling
- **Ambiguous Input:** AI agent MUST return clear error messages when user intent is unclear
- **Parameter Extraction Failures:** AI agent MUST gracefully handle incomplete or malformed parameter extraction
- **Intent Classification Errors:** AI agent MUST provide helpful suggestions when unable to classify user intent
- **API Call Failures:** AI layer MUST handle backend API failures gracefully and inform user appropriately
- **Processing Limits:** AI agent MUST have timeouts and rate limiting to prevent infinite processing loops

### Autonomous Agent Error Handling (New for Phase IV)
- **Monitoring failures:** Background agent failures MUST NOT affect user-facing functionality
- **Suggestion delivery:** Failed suggestion delivery MUST retry with exponential backoff
- **Silent failures:** Agent failures MUST be logged but NOT displayed to users unless critical

**Rationale:** AI interfaces introduce new error types that require specific handling patterns for good user experience. Autonomous agents must fail gracefully without disrupting the user experience.

## Testing Strategy

### Infrastructure Testing (New for Phase IV)
- **Container tests:** Verify Dockerfiles build successfully and pass security scans
- **Kubernetes tests:** Validate manifests with `kubectl dry-run` or `kubeval`
- **Health check tests:** Verify health endpoints return correct status codes
- **Integration tests:** Test service-to-service communication in containerized environment
- **Tools:** Docker, kind (Kubernetes in Docker), kubeval

**Example:**
```bash
# Validate Kubernetes manifests
kubeval --strict k8s/base/*.yaml

# Test health endpoints
curl -f http://localhost:4000/health || exit 1
curl -f http://localhost:4000/ready || exit 1
```

### AI & Agent Layer Testing
- **Intent Detection Tests:** Unit tests for AI intent classification accuracy
- **Parameter Extraction Tests:** Unit tests for entity extraction precision
- **Action Planning Tests:** Integration tests for AI-to-API call translation
- **Conversation Flow Tests:** End-to-end tests for multi-turn conversations
- **Error Handling Tests:** Tests for AI handling of ambiguous or invalid inputs
- **Autonomous Agent Tests:** Tests for background monitoring and suggestion generation
- **Tools:** Jest or Vitest with mock AI services

**Example:**
```typescript
// ai.agent.test.ts
describe('AI Agent', () => {
  it('should correctly detect create task intent', async () => {
    const userInput = 'Create a task called "Buy groceries"';
    const intent = await aiAgent.detectIntent(userInput);
    expect(intent.type).toBe('CREATE_TASK');
    expect(intent.parameters.title).toBe('Buy groceries');
  });

  it('should handle ambiguous input gracefully', async () => {
    const userInput = 'Maybe do something tomorrow';
    const response = await aiAgent.processInput(userInput);
    expect(response.type).toBe('ERROR');
    expect(response.message).toContain('could not understand');
  });
});

// autonomous-agent.test.ts
describe('Autonomous Agent', () => {
  it('should generate overdue task suggestion', async () => {
    const overdueTask = { id: '1', title: 'Test', due_date: '2025-01-01' };
    const suggestion = await overdueMonitor.checkTask(overdueTask);
    expect(suggestion.type).toBe('overdue_reminder');
  });
});
```

### Backend Testing
- **Unit Tests:** Business logic (services) MUST have >80% coverage
- **Integration Tests:** API routes with real database (test database)
- **Health Check Tests:** Verify `/health` and `/ready` endpoints
- **Tools:** Jest or Vitest + Supertest

**Example:**
```typescript
// task.service.test.ts
describe('TaskService', () => {
  it('should create a task for authenticated user', async () => {
    const userId = 'test-user-id';
    const taskData = { title: 'Test Task', description: 'Test' };
    const task = await taskService.createTask(userId, taskData);
    expect(task.title).toBe('Test Task');
    expect(task.userId).toBe(userId);
  });

  it('should not allow user to access another user\'s tasks', async () => {
    const user1 = 'user-1';
    const user2 = 'user-2';
    await taskService.createTask(user1, { title: 'User 1 Task' });
    const user2Tasks = await taskService.getTasks(user2);
    expect(user2Tasks).toHaveLength(0);
  });
});

// health.routes.test.ts
describe('Health Endpoints', () => {
  it('should return 200 for /health', async () => {
    const response = await request(app).get('/health');
    expect(response.status).toBe(200);
  });

  it('should return 200 for /ready when database is connected', async () => {
    const response = await request(app).get('/ready');
    expect(response.status).toBe(200);
  });
});
```

### Frontend Testing
- **Component Tests:** React Testing Library for UI components
- **Integration Tests:** User flows (signup → signin → add task → complete task)
- **AI Interface Tests:** Conversational UI flows and error states
- **Suggestion Tests:** Autonomous agent suggestion display and dismissal
- **Tools:** Vitest + React Testing Library

**Rationale:** Tests provide safety net for refactoring and catch regressions early. AI components and infrastructure require specialized testing approaches for reliability.

## Environment Configuration

### Required Environment Variables

**Backend (.env):**
```
# Database
DATABASE_URL=postgresql://user:password@host:5432/dbname

# Better Auth
AUTH_SECRET=<random-secret-key>
AUTH_COOKIE_NAME=session
AUTH_COOKIE_SECURE=true (production) / false (development)

# AI Service
OPENAI_API_KEY=<your-openai-api-key>  # Or CLAUDE_API_KEY if using Claude
AI_MODEL_NAME=gpt-4o  # Model identifier for AI agent
AI_TEMPERATURE=0.7    # Controls randomness in AI responses

# Autonomous Agent (New for Phase IV)
AUTONOMOUS_AGENT_ENABLED=true
AUTONOMOUS_AGENT_INTERVAL_MS=300000  # 5 minutes
SUGGESTION_RATE_LIMIT_PER_HOUR=10

# Observability (New for Phase IV)
LOG_LEVEL=info  # debug, info, warn, error
LOG_FORMAT=json  # json or pretty

# Server
PORT=4000
NODE_ENV=development | production
```

**Frontend (.env):**
```
VITE_API_BASE_URL=http://localhost:4000/api/v1
```

**Kubernetes Secrets (production):**
```yaml
apiVersion: v1
kind: Secret
metadata:
  name: todo-app-secrets
type: Opaque
stringData:
  DATABASE_URL: <base64-encoded>
  AUTH_SECRET: <base64-encoded>
  OPENAI_API_KEY: <base64-encoded>
```

**Rules:**
- `.env` files MUST be in `.gitignore`
- `.env.example` MUST be committed with dummy values
- Secrets MUST be generated securely (`openssl rand -base64 32`)
- Production secrets MUST be managed via Kubernetes Secrets or external secret managers
- Secret templates (`secrets.yaml.example`) MUST NOT contain real values

**Rationale:** Hardcoded secrets are security vulnerabilities. Environment-based config enables different settings per environment. Kubernetes-native secret management for production.

## Deployment Readiness

The application MUST be fully deployment-ready with the following:

**Required Artifacts:**
- **Dockerfiles:** Multi-stage builds for frontend, backend, and AI agent services
- **Kubernetes manifests or Helm charts:** Complete deployment configuration
- **Health check endpoints:** `/health` (liveness) and `/ready` (readiness) for all services
- **Environment configuration:** ConfigMaps and Secrets templates
- **Database migrations:** Prisma/Drizzle migration files
- **Production build scripts:** `npm run build` for all services

**Deployment Workflow:**
1. Build Docker images for all services
2. Push images to container registry
3. Apply Kubernetes manifests (or Helm install)
4. Verify health checks pass
5. Monitor logs for errors

**Rationale:** Cloud-native deployment requires complete infrastructure configuration. All components must be production-ready.

## Documentation Requirements

### README.md (Required)

MUST include:
- **Project Overview:** What the application does, key features
- **Tech Stack:** List all major technologies (React, Node.js, PostgreSQL, Better Auth, Docker, Kubernetes, etc.)
- **Prerequisites:** Node.js 20+, pnpm, Docker, kubectl, PostgreSQL (or Neon account)
- **Local Development Setup:**
  1. Clone repository
  2. Install dependencies (`pnpm install`)
  3. Set up environment variables (`.env` files)
  4. Run database migrations
  5. Start backend (`pnpm run dev:backend`)
  6. Start frontend (`pnpm run dev:frontend`)
- **Docker Development:**
  1. Build images (`docker-compose build`)
  2. Start services (`docker-compose up`)
- **Kubernetes Deployment:**
  1. Build and push images
  2. Configure secrets
  3. Apply manifests (`kubectl apply -k k8s/overlays/production`)
- **Project Structure:** High-level directory overview
- **API Documentation:** Link to API endpoint reference (or inline summary)
- **Testing:** How to run tests (`pnpm test`)
- **Contributing Guidelines:** If applicable

### API Documentation (Required)

MUST include for each endpoint:
- HTTP method and path
- Request body schema (with examples)
- Response schema (with examples)
- Error codes and meanings
- Authentication requirements

**Format:** Markdown file (`API.md`) or inline code comments (JSDoc)

**Rationale:** Good documentation reduces onboarding friction and prevents API misuse.

## Governance

### Amendment Procedure

1. Amendments MUST be proposed with rationale and impact analysis
2. Amendments MUST be approved before implementation begins
3. Version MUST be incremented according to semantic versioning:
   - **MAJOR (3.x.0 → 4.0.0):** Backward-incompatible changes (e.g., architecture shifts, removing principles)
   - **MINOR (4.0.x → 4.1.0):** New principles/sections added or materially expanded
   - **PATCH (4.0.0 → 4.0.1):** Clarifications, wording fixes, non-semantic refinements
4. All dependent templates and documentation MUST be updated to reflect changes

### Versioning Policy

- Constitution version follows semantic versioning (MAJOR.MINOR.PATCH)
- All specs, plans, and code reviews MUST reference the constitution version they comply with

### Compliance Review

- All PRs and design reviews MUST verify compliance with this constitution
- Security violations MUST block merges (no exceptions)
- Infrastructure violations (missing health checks, non-root containers) MUST block merges
- Deviations require explicit approval and ADR (Architecture Decision Record)

**Enforcement:** Non-compliance blocks merges. No exceptions.

## Progressive Implementation Strategy

### Phase Enforcement Rules

1. **Infrastructure MUST be implemented first (Phase IV priority)**
   - Dockerfiles for all services
   - Kubernetes manifests or Helm charts
   - Health check endpoints
   - Basic observability (logging)

2. **Authentication MUST be implemented early**
   - Signup/Signin flows functional
   - Session management working
   - Protected routes enforcing auth

3. **Basic Level MUST be fully implemented before Intermediate**
   - All CRUD operations functional
   - Database persistence working
   - User isolation enforced
   - Frontend UI polished

4. **Intermediate Level MUST be fully implemented before Advanced**
   - Priority, tags, search, filter, and sort working
   - API endpoints complete
   - Frontend components integrated

5. **Advanced Level requires robust foundation**
   - Due dates and recurrence patterns validated
   - Reminder system designed (browser notifications)
   - Backward compatibility maintained

6. **Autonomous Agent features MUST be implemented last**
   - Background monitoring infrastructure
   - Suggestion generation logic
   - User preference controls
   - Rate limiting and safety boundaries

**Rationale:** Progressive implementation ensures each level is production-ready before adding complexity. Infrastructure-first ensures deployability from day one.

### Backward Compatibility Rules

- New features MUST NOT break existing API contracts
- Database migrations MUST be non-destructive (additive only)
- Frontend MUST handle tasks created in earlier levels without errors
- Default values MUST be sensible for all optional fields
- Infrastructure changes MUST NOT break existing deployments

**Example:** A task created with only title/description (Basic Level) MUST display correctly when viewed after Phase IV features are added.

---

**Version**: 4.0.0 | **Created**: 2025-12-29 | **Ratified**: 2026-01-24 | **Phase**: IV (Cloud-Native Autonomous AI System)
