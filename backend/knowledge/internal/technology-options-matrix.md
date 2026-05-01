# Technology Options Matrix for SaaS MVP

Use this matrix to avoid one-vendor answers unless explicitly requested.

## Hosting / Compute

- Generic PaaS: Render, Railway, Fly.io
- Container platforms: AWS ECS/Fargate, GCP Cloud Run/GKE, Azure Container Apps/AKS
- VM route: EC2, Compute Engine, Azure VM (only when needed)

## Database (OLTP)

- PostgreSQL (recommended default for most MVPs)
- MySQL (acceptable alternative)
- SQL Server (enterprise compatibility scenarios)

## Cache / Session / Short-lived data

- Redis (managed or self-hosted)

## Async jobs / messaging

- Redis queue (BullMQ/RQ) for simple workloads
- RabbitMQ/Kafka/PubSub/SQS/Service Bus for scale or stronger semantics

## Search

- Postgres full-text for early MVP
- OpenSearch/Elasticsearch when search complexity grows

## Auth / IAM

- Managed identity providers: Auth0, Clerk, Cognito, Azure AD B2C
- Self-hosted option: Keycloak

## Storage / CDN

- S3-compatible object storage + CDN (CloudFront/Cloudflare/Azure CDN/etc.)

## Observability

- Logs: structured JSON logs
- Traces: OpenTelemetry
- Errors: Sentry
- Metrics: Prometheus + Grafana or managed equivalents

## CI/CD

- GitHub Actions (default)
- GitLab CI / Azure DevOps / CircleCI as alternatives

## How to choose

1. Start with team familiarity.
2. Validate compliance constraints.
3. Minimize moving parts in MVP.
4. Keep migration path open for scale.
