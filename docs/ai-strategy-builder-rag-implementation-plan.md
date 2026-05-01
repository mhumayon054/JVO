# AI Strategy Builder - RAG System Implementation Plan

## 1) Goal and Product Definition

Build a production-grade RAG-backed "AI Strategy Builder" in the Home landing page section so a visitor can:

- Enter idea context in: "What are you trying to build?"
- Choose mode:
  - `Auto Mode`: Generate full strategy package directly.
  - `Deeper Knowledge Mode`: Ask non-technical follow-up questions first, then generate full package.
- See results in the same section UI.
- Receive a well-formatted PDF by email.

Output package must include at minimum:

- Architecture blueprint
- Technical roadmap
- Strategy recommendations
- Core specs
- Risks and mitigations
- Strengths and weaknesses
- Key assumptions and open decisions

## 2) Current Codebase Reality (What Exists)

Frontend:

- Home section is currently static mock UI in `src/pages/HomePage.jsx` (AI Strategy Builder block).
- No real form fields, no state, no submit handler, no API integration.

Backend:

- Strapi backend exists (`backend/`) and already supports custom submission flows (`squad-brief-submission` custom route/controller).
- Email sending via Nodemailer already exists in backend custom controller.

Shared utilities:

- Frontend `src/lib/strapi.js` already centralizes API calls and can be extended.
- PDF generation utility style exists in frontend (`src/utils/squadBriefPdf.js`), but for this feature PDF should be generated server-side for auditability and consistent email output.

## 3) Research Summary (Design Choices)

### OpenAI APIs

- Use OpenAI `Responses API` as primary generation interface.
- Use `Structured Outputs` (`json_schema`) to force deterministic machine-readable strategy payload.
- Use `Function Calling` for deeper-mode questionnaire orchestration when needed.

### RAG

Two valid paths:

1. Hosted retrieval with OpenAI `vector_stores` + `file_search` tool.
2. Self-managed retrieval with local vector DB (pgvector/Qdrant/etc.) + embeddings.

For your current stack and speed-to-production, start with path (1), then optionally migrate to path (2) if advanced filtering/multi-tenant hard isolation is needed.

### Safety

- Add moderation on user input and generated output.
- Defend against prompt injection in retrieved documents via strict system instructions and source trust policy.

### Email

- Continue with Nodemailer SMTP flow in backend.

## 4) End-to-End System Architecture

## Frontend (React)

`AI Strategy Builder` component responsibilities:

- Capture `idea_text`, `work_email`, `mode`.
- For deeper mode: render dynamic questionnaire steps.
- Submit to backend endpoints.
- Poll or stream generation progress.
- Render structured result sections in the right panel.
- Offer `Download PDF` + `Sent to email` confirmation state.

## Backend (Strapi Custom API)

Create new feature namespace: `ai-strategy-submission`.

Core backend responsibilities:

- Validate and sanitize input.
- Persist draft + final records.
- Run moderation checks.
- Build retrieval context from vector store.
- Call OpenAI for:
  - question generation (deeper mode)
  - final strategy JSON generation
- Create PDF from final structured output.
- Email PDF attachment to user.
- Return normalized payload for frontend rendering.

## Data/Knowledge Layer

Knowledge corpus examples:

- Internal architecture patterns
- Industry-specific implementation playbooks
- Security/compliance templates
- Estimation heuristics
- Case study snippets

Storage options:

- Initial: OpenAI vector store IDs mapped by tenant/scope.
- Future: own vector DB if you need custom ranking/observability/cost controls.

## 5) Mode Design

## Auto Mode

Input:

- idea text
- email
- optional metadata (industry, budget, timeline, region)

Flow:

1. Validate input + moderation.
2. Retrieve relevant context chunks.
3. Generate single structured strategy JSON.
4. Render output in UI.
5. Generate PDF + send email.

## Deeper Knowledge Mode

Flow split into two stages:

1. Questionnaire stage:
- Model generates 6-10 non-technical, plain-language follow-up questions based on user idea.
- Frontend asks questions in a guided form.

2. Synthesis stage:
- Combine original idea + Q/A responses + retrieved context.
- Generate structured strategy JSON.
- Render output, generate PDF, send email.

Question style constraints:

- Non-technical wording
- Multiple-choice + short text where possible
- Ask only high-signal business/product constraints (users, timeline, integrations, data sensitivity, budget flexibility, launch priorities)

## 6) Output Contract (Structured JSON Schema)

Define strict JSON schema for final output:

- `executive_summary`
- `problem_framing`
- `solution_blueprint`
  - `architecture_overview`
  - `core_components[]`
  - `data_flow[]`
  - `deployment_model`
- `roadmap`
  - `phase_0_discovery`
  - `phase_1_mvp`
  - `phase_2_scale`
- `technical_specs`
  - `stack_recommendations`
  - `security_basics`
  - `observability`
  - `cost_envelope`
- `risks_and_mitigations[]`
- `strengths[]`
- `weaknesses[]`
- `assumptions[]`
- `open_questions[]`
- `next_30_day_plan`
- `disclaimer`

Use strict schema to avoid malformed outputs and reduce fragile parser logic.

## 7) API Design (Backend)

Create custom routes:

1. `POST /api/ai-strategy-submissions/start`
- Creates draft record.
- If mode=auto: can immediately kick generation.
- If mode=deeper: returns questionnaire.

2. `POST /api/ai-strategy-submissions/:id/questionnaire`
- Accepts answers for deeper mode.
- Triggers final generation.

3. `GET /api/ai-strategy-submissions/:id`
- Fetch status + current/final result.

4. `POST /api/ai-strategy-submissions/:id/resend-email`
- Re-send generated PDF.

Status model:

- `draft`
- `questionnaire_ready`
- `in_progress`
- `completed`
- `failed`

## 8) Strapi Content Types

Add content type `ai-strategy-submission` fields:

- `mode` (enum: auto, deeper)
- `workEmail` (email)
- `ideaText` (long text)
- `questionnaire` (JSON)
- `answers` (JSON)
- `retrievalContextMeta` (JSON)
- `strategyResult` (JSON)
- `pdfUrl` (string/media)
- `status` (enum)
- `errorMessage` (text)
- `tokenUsage` (JSON)
- `timingsMs` (JSON)
- `sourcePage` (string)

Indexing:

- index on `workEmail`, `createdAt`, `status`.

## 9) OpenAI Integration Blueprint

Create backend service module `backend/src/services/ai-strategy/`:

- `moderation.ts`
- `retrieval.ts`
- `questionnaire.ts`
- `strategy-generator.ts`
- `schema.ts`
- `pdf.ts`
- `mailer.ts`

Model usage (example policy):

- Questionnaire generation: smaller fast reasoning model.
- Final blueprint synthesis: higher quality model.
- Embeddings/retrieval: OpenAI vector stores and file search (or embeddings if self-managed).

Prompting layers:

- System prompt: role, safety rules, output schema contract.
- Developer prompt: business objective + section-specific requirements.
- User content: idea + answers.
- Retrieved context: top-k chunks with source tags.

Guardrails:

- Never claim certainty for unknowns.
- Must emit assumptions explicitly.
- Must include at least N risks and mitigations.
- Must output client-friendly language in summary.

## 10) Retrieval Design

Corpus preparation:

- Curate internal docs and playbooks.
- Chunk and upload with metadata tags:
  - `domain` (health, legal, fintech...)
  - `stage` (mvp, scale)
  - `artifact_type` (architecture, roadmap, security)

Retrieval strategy:

- Hybrid semantic + keyword (OpenAI file search handles both).
- Top-k retrieval with rerank preference for domain + stage.
- Budget context tokens and deduplicate near-identical chunks.

Quality controls:

- Reject low-relevance retrieval (score threshold policy).
- Fallback to "generic blueprint" template when context is weak.

## 11) PDF + Email Delivery

PDF generation (server-side):

- Generate from structured JSON (not from raw markdown) for deterministic formatting.
- Include sections, tables, timelines, and risk matrix.
- Save file and attach in outbound email.

Email flow:

- Subject: "Your AI Strategy Blueprint"
- Body: short summary + disclaimer + contact CTA.
- Attachment: `<submission-id>-ai-strategy-blueprint.pdf`

Retry policy:

- Retry send once on transient SMTP errors.
- Persist email delivery status and message for observability.

## 12) Frontend Implementation Plan

Refactor Home section into dedicated component:

- `src/components/home/AIStrategyBuilderSection.jsx`

State model:

- `mode`
- `ideaText`
- `workEmail`
- `questionnaire[]`
- `answers`
- `status`
- `result`
- `errors`

UX states:

- Idle
- Input validation errors
- Generating
- Questionnaire in progress
- Completed with rendered blueprint
- Failed with retry action

Validation:

- Idea min length (e.g., 40 chars)
- Email RFC-style pattern
- Rate-limit trigger feedback

Render output panels:

- Executive summary
- Architecture blueprint cards
- Roadmap timeline
- Risks/mitigations table
- Strengths/weaknesses columns
- "PDF sent to <email>" confirmation

## 13) Security, Abuse, and Compliance

- Add backend rate limits per IP/email.
- Add CAPTCHA on repeated attempts.
- Use OpenAI moderation for user prompt and generated output.
- Strip HTML/script from user input.
- Avoid logging full sensitive user text in plaintext logs.
- Add PII retention policy (e.g., auto-delete after N days if required).

## 14) Observability and Cost Control

Track per submission:

- model names
- input/output tokens
- retrieval latency
- generation latency
- email status
- failure reason

Controls:

- max input tokens
- max response tokens
- mode-specific token caps
- queue/timeout for long jobs

## 15) Testing Strategy

Unit tests:

- schema validation
- prompt builders
- questionnaire parser
- PDF formatter

Integration tests:

- full `auto mode` flow
- full `deeper mode` flow
- SMTP send success/failure

Adversarial tests:

- prompt-injection text
- abusive content
- irrelevant/very short ideas

Manual QA matrix:

- desktop/mobile
- slow network
- repeated submits
- malformed email

## 16) Delivery Phases

Phase 1 (MVP, 1-2 weeks):

- Functional Auto Mode
- Structured output rendering
- PDF + email send
- Basic moderation and logging

Phase 2 (1 week):

- Deeper Knowledge questionnaire mode
- Improved retrieval tuning
- Better error recovery states

Phase 3 (ongoing):

- Prompt/eval optimization
- Cost tuning and analytics dashboards
- Optional migration to self-hosted vector DB

## 17) Concrete File-Level Work Plan (This Repo)

Frontend:

- Update `src/pages/HomePage.jsx` to replace static block with new component.
- Add `src/components/home/AIStrategyBuilderSection.jsx`.
- Add API client methods in `src/lib/strapi.js`:
  - `startAIStrategySubmission`
  - `submitAIStrategyQuestionnaire`
  - `getAIStrategySubmission`
  - `resendAIStrategyEmail`

Backend:

- Add Strapi API module:
  - `backend/src/api/ai-strategy-submission/content-types/ai-strategy-submission/schema.json`
  - `backend/src/api/ai-strategy-submission/controllers/ai-strategy-submission.ts`
  - `backend/src/api/ai-strategy-submission/routes/ai-strategy-submission.ts`
  - `backend/src/api/ai-strategy-submission/routes/custom-ai-strategy-submission.ts`
- Add service modules under `backend/src/services/ai-strategy/*`.
- Add env vars in backend `.env` and docs.

## 18) Required Environment Variables

Backend:

- `OPENAI_API_KEY`
- `OPENAI_MODEL_STRATEGY`
- `OPENAI_MODEL_QUESTIONNAIRE`
- `OPENAI_VECTOR_STORE_ID` (or multiple IDs by domain)
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASS`
- `EMAIL_FROM`

Frontend:

- `VITE_STRAPI_URL`

## 19) Acceptance Criteria

Functional:

- User can submit idea in auto mode and receive full blueprint in UI.
- User can submit idea in deeper mode, answer generated non-technical questionnaire, and then receive blueprint.
- PDF is generated and sent to the provided email for both modes.

Quality:

- Output follows strict schema and renders without parser errors.
- P95 end-to-end completion time within target (define target, e.g., <45s auto, <70s deeper after answers).
- Error states are actionable and recoverable.

Safety:

- Moderation and rate-limits active.
- Prompt injection basic defenses in place.

## 20) Known Risks and Mitigation

- Risk: Hallucinated specifics in architecture.
  - Mitigation: force assumptions, retrieval grounding, explicit uncertainty sections.
- Risk: Weak outputs on low-detail ideas.
  - Mitigation: deeper mode default prompt when detail score below threshold.
- Risk: Cost spikes.
  - Mitigation: token caps, caching, staged models.
- Risk: Email deliverability.
  - Mitigation: SPF/DKIM/DMARC + retry + status tracking.

## 21) Recommended Build Order (Pragmatic)

1. Implement backend `auto mode` only with structured JSON output.
2. Wire frontend UI with real form + results rendering.
3. Add server-side PDF generation + email dispatch.
4. Add deeper-mode questionnaire workflow.
5. Add moderation/rate-limits + eval harness.
6. Tune retrieval and prompts using real submissions.

## 22) Research Sources

- OpenAI Responses API: https://platform.openai.com/docs/api-reference/responses/create?api-mode=responses
- OpenAI Function Calling: https://platform.openai.com/docs/guides/function-calling?api-mode=responses
- OpenAI Structured Outputs: https://platform.openai.com/docs/guides/structured-outputs?lang=javascript
- OpenAI File Search: https://platform.openai.com/docs/guides/tools-file-search?lang=javascript
- OpenAI Retrieval / Vector stores: https://platform.openai.com/docs/guides/retrieval
- OpenAI Vector store API reference: https://platform.openai.com/docs/api-reference/vector-stores/search
- OpenAI Safety best practices: https://platform.openai.com/docs/guides/safety-best-practices
- OpenAI quickstart (Responses + JS): https://platform.openai.com/docs/quickstart?api-mode=responses
- openai-node SDK: https://github.com/openai/openai-node
- Nodemailer SMTP transport: https://nodemailer.com/smtp

---

This plan is designed specifically for your existing React + Strapi architecture and can be executed incrementally without rewriting the platform.
