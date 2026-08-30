# Deployment

## Vercel

Bachelor Buddy is Vercel-ready because the app already uses Next.js App Router and Turso/libSQL support.

### Required environment variables

- `TURSO_DATABASE_URL`
- `TURSO_AUTH_TOKEN`

### Why not use the local SQLite file on Vercel

- Vercel deployments are ephemeral.
- Local filesystem writes are not a durable production database strategy.
- A hosted libSQL/Turso database gives stable storage across deploys.

## Local Docker

- Use `docker compose up --build`
- The SQLite file should persist via the named Docker volume
- This is suitable for local demos, not for production hosting on Vercel

## Git hygiene

- Never commit `.env.local`
- Keep secrets in the deployment platform or local environment only
