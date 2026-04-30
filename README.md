# JVO Frontend + Strapi Backend

This project now includes:
- React + Vite frontend in the repo root
- Strapi backend in `backend`
- Non-AI CMS + form submission integration

## Environment Variables

### Frontend (`.env`)
Copy `.env.example` to `.env`:

```bash
VITE_STRAPI_URL=http://localhost:1337
VITE_CALENDLY_URL=
```

### Backend (`backend/.env`)
Copy `backend/.env.example` to `backend/.env` and set secure values.

## Run Commands

### Backend
```bash
cd backend
npm install
npm run develop
```

### Frontend
```bash
npm install
npm run dev
```

## Strapi Admin Setup

1. Start backend (`npm run develop` in `backend`).
2. Open `http://localhost:1337/admin`.
3. Create the first admin user.
4. Create and publish content entries for each collection.

## Strapi Collections

- `contact-submissions`
- `newsletter-subscribers`
- `insight-articles`
- `case-studies`
- `services`
- `team-members`
- `squad-members`
- `squad-brief-submissions`

## Required Public Role Permissions

In Strapi admin: `Settings -> Users & Permissions Plugin -> Roles -> Public`

### Allow `find` and `findOne` for:
- `insight-articles`
- `case-studies`
- `services`
- `team-members`
- `squad-members`

### Allow `create` for:
- `contact-submissions`
- `newsletter-subscribers`
- `squad-brief-submissions`

Do not expose internal CMS-only notes in frontend screens.

## Frontend API Layer

`src/lib/strapi.js` includes:
- `STRAPI_URL`
- `getStrapiMediaUrl()`
- `getInsights()`
- `getFeaturedInsights()`
- `subscribeNewsletter()`
- `submitContact()`
- `getServices()`
- `getCaseStudies()`
- `getTeamMembers()`
- `getSquadMembers()`
- `submitSquadBrief()`

All API usage is wrapped with error handling and fallback data behavior.

## Manual Test Plan

### Contact
- Open `/contact`
- Submit the form
- Verify entry in `contact-submissions`

### Newsletter
- Open `/insights`
- Submit newsletter email
- Verify entry in `newsletter-subscribers`
- Re-submit same email and verify duplicate message

### Insights
- Add and publish `insight-articles`
- Verify `/insights` uses CMS data
- Stop backend and verify fallback still renders

### Case Studies
- Add and publish `case-studies`
- Verify `/case-studies` uses CMS data when available
- Stop backend and verify fallback still renders

### Services
- Add active `services` entries with `order`
- Verify `/services` sorted active content
- Stop backend and verify fallback still renders

### Team
- Add active `team-members`
- Verify `/about-us` uses CMS data
- Stop backend and verify fallback leaders still render

### Build Squad
- Add active `squad-members`
- Verify `/build-squad` uses CMS data where available
- Select members and click `Deploy Squad`
- Verify entry in `squad-brief-submissions`

## Notes

- CORS is configured in `backend/config/middlewares.ts` for `http://localhost:5173`.
- Backend local DB is SQLite (`.tmp/data.db`).
- No AI functionality is implemented in this backend scope.
