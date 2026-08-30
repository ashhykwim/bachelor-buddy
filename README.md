# Bachelor Buddy

Bachelor Buddy is a polished interview-ready Next.js MVP for finding local services in Bengaluru. It helps users compare nearby vendors for daily needs like laundry, tiffin, househelp, cleaning, and small repairs, then send a quick enquiry that is stored in SQLite or Turso.

## Problem

New city movers often need trustworthy local help quickly, but marketplace experiences are usually cluttered, generic, or too broad.

## Solution

Bachelor Buddy provides a focused, local-first marketplace with:

- a strong landing page
- searchable and filterable vendor listings
- vendor cards with price, locality, rating, response time, and tags
- an enquiry form that persists data
- local SQLite support and production-ready Turso/libSQL support

## Features

- landing page with concise hero and category highlights
- services marketplace page with search and category filters
- mobile-friendly filter and enquiry flow
- enquiry persistence in a local SQLite database
- optional Turso/libSQL production support
- Docker setup with persistent data volume
- GitHub Actions CI pipeline

## Tech Stack

- Next.js App Router
- TypeScript
- `@libsql/client`
- SQLite for local development
- Turso/libSQL for production
- Docker
- GitHub Actions

## Architecture

See the docs in `docs/`:

- `docs/high-level-architecture.md`
- `docs/low-level-design.md`
- `docs/database.md`
- `docs/docker.md`
- `docs/cicd.md`
- `docs/deployment.md`

## Project Structure

```text
app/
  api/requests/route.ts
  globals.css
  layout.tsx
  page.tsx
  services/page.tsx
components/
  request-form.tsx
  service-filters.tsx
docs/
  high-level-architecture.md
  low-level-design.md
  database.md
  docker.md
  cicd.md
  deployment.md
lib/
  data.ts
  db.ts
```

## Local Setup

Install dependencies:

```bash
npm install
```

Run the app:

```bash
npm run dev
```

Open:

```bash
http://localhost:3000
```

## Production Commands

Build:

```bash
npm run build
```

Start:

```bash
npm start
```

## Environment Variables

Local SQLite:

```bash
TURSO_DATABASE_URL=file:./data/bachelor-buddy.sqlite
```

Vercel / Turso:

```bash
TURSO_DATABASE_URL=libsql://your-db.turso.io
TURSO_AUTH_TOKEN=your-token
```

Do not commit `.env.local` or secrets to Git.

## SQLite

The app creates the schema automatically and seeds demo vendors on first run if the vendor table is empty.

- local file mode uses `data/bachelor-buddy.sqlite`
- Docker mounts `/app/data` on a named volume so the database persists across container restarts
- Vercel should use Turso/libSQL instead of a local SQLite file

## Docker

Build and run the container:

```bash
docker compose up --build
```

Why multi-stage builds are used:

- keep the runtime image smaller
- avoid shipping build dependencies
- separate dependency install, build, and runtime concerns

## CI/CD

GitHub Actions runs on push and pull request:

1. checkout
2. setup Node
3. `npm ci`
4. lint
5. typecheck
6. production build

## Vercel Deployment

Set these environment variables in Vercel:

- `TURSO_DATABASE_URL`
- `TURSO_AUTH_TOKEN`

Why not use the local SQLite file on Vercel:

- serverless filesystems are ephemeral
- local file storage is not durable production storage
- Turso provides persistent libSQL storage
