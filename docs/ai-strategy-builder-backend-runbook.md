# AI Strategy Builder Backend Runbook

## Backend location

- `backend/` (Strapi app)
- Feature API: `backend/src/api/ai-strategy-submission/`

## Required env vars

Set these in backend `.env`:

- `OPENAI_API_KEY=...`
- `OPENAI_MODEL_STRATEGY=gpt-4.1`
- `OPENAI_MODEL_QUESTIONNAIRE=gpt-4.1-mini`
- `OPENAI_VECTOR_STORE_ID=vs_...`
- `SMTP_HOST=...`
- `SMTP_PORT=587`
- `SMTP_SECURE=false`
- `SMTP_USER=...`
- `SMTP_PASS=...`
- `SMTP_FROM=...`
- `AI_STRATEGY_RATE_WINDOW_MS=600000`
- `AI_STRATEGY_RATE_MAX_ATTEMPTS=5`

## Start backend

From `backend/`:

- `npm install`
- `npm run dev`

Strapi serves API on its configured port (default `1337`).

## RAG knowledge sync

1. Put knowledge files into `backend/knowledge/`
2. Run:
   - `npm run rag:sync`

This uploads files to OpenAI and attaches them to your vector store (`OPENAI_VECTOR_STORE_ID`).

## Frontend integration

Frontend calls backend via `VITE_STRAPI_URL` in root `.env`.

Example:

- `VITE_STRAPI_URL=http://localhost:1337`

## API flow

1. `POST /api/ai-strategy-submissions/start`
- `mode=auto`: returns generated blueprint
- `mode=deeper`: returns questionnaire

2. `POST /api/ai-strategy-submissions/:id/questionnaire`
- submit deeper-mode answers, returns final blueprint

3. `GET /api/ai-strategy-submissions/:id`
- fetch status/result

## What the backend does per request

- Input validation
- Rate limiting (IP + email)
- OpenAI moderation on idea text
- RAG retrieval from vector store
- Strategy generation using structured JSON schema
- Server-side PDF generation
- Email delivery with PDF attachment
- Store submission/result metadata in Strapi DB
