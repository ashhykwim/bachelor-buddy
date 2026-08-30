# High-Level Architecture

Bachelor Buddy is a small marketplace MVP built to search, compare, and enquire about local services in Bengaluru.

## Request Flow

```mermaid
flowchart LR
  U[User] --> N[Next.js App Router]
  N --> L[data/API layer]
  L --> C[libSQL client]
  C --> S1[SQLite local file]
  C --> S2[Turso in production]
```

## Deployment Flow

```mermaid
flowchart LR
  G[GitHub] --> A[GitHub Actions]
  A --> Q[lint + typecheck + build]
  Q --> V[Vercel]
```

## Notes

- Local development uses the SQLite file under `data/`.
- Production should use Turso/libSQL through environment variables.
- The app keeps the data layer thin so the MVP stays easy to reason about in interviews.
