# MVP Tech Stack Playbook (Cloud-Agnostic)

This reference is for generating practical, low-risk MVP architecture plans without defaulting to a single cloud vendor.

## 1) Decision principle for MVP stacks

- Optimize for delivery speed, maintainability, and hiring availability.
- Prefer managed services for first release.
- Keep components replaceable (avoid deep lock-in in v1).
- Choose boring, reliable technologies unless a hard requirement demands otherwise.

## 2) Recommended baseline stacks

### Option A: JavaScript/TypeScript full-stack

- Frontend: Next.js or React + Vite
- Backend: Node.js (NestJS or Express/Fastify)
- Database: PostgreSQL
- Cache: Redis
- Queue/Jobs: BullMQ (Redis) or managed queue
- Auth: Auth0 / Clerk / Supabase Auth / Cognito / Keycloak (self-hosted)
- Payments: Stripe
- File storage: S3-compatible object storage
- Deploy: Docker on Render/Railway/Fly.io/Cloud Run/ECS/AKS/App Service
- Observability: OpenTelemetry + Grafana/Loki + Sentry

### Option B: Python service-centric

- Frontend: Next.js or React
- Backend APIs: FastAPI
- Async workers: Celery or RQ
- Database: PostgreSQL
- Cache: Redis
- Auth: Same options as Option A
- Payments: Stripe/Adyen
- Deploy: Same multi-cloud options
- Observability: Prometheus/Grafana + Sentry + structured logs

### Option C: C# enterprise-friendly

- Frontend: React or Angular
- Backend: ASP.NET Core Web API
- Database: PostgreSQL or SQL Server
- Queue: RabbitMQ or managed messaging
- Auth: Azure AD B2C / Auth0 / Keycloak
- Deploy: Container-based across cloud providers

## 3) Multi-tenant guidance for MVP

- Start with single database, shared tables, `tenant_id` isolation, and strict row-level guards.
- Add row-level security where available.
- Keep tenant-aware indexes early.
- Move hot/large tenants to separate schema/database later when needed.

## 4) Bidding platform essentials

- Real-time updates: WebSockets or server-sent events.
- Time synchronization: server-authoritative bid close time.
- Idempotency keys for payment and bid finalization APIs.
- Anti-sniping policy support (optional in MVP but design for it).
- Immutable bid audit trail.

## 5) Cost-aware MVP path

- Start with single region, managed Postgres, managed Redis, and one app runtime.
- Enable autoscaling only for app and queue workers first.
- Add read replicas and CDN only after measured need.

## 6) What to avoid in v1

- Premature microservices.
- Multi-region active-active unless required.
- Heavy custom orchestration for tenant-specific features.
- Building your own auth or payment rails from scratch.
