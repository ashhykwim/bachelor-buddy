# Docker

The Docker setup uses a multi-stage build to keep the final runtime image small and free of build-only dependencies.

## Stages

1. `deps`
   - Installs Node dependencies with `npm ci`.
2. `builder`
   - Copies the source and runs `npm run build`.
3. `runner`
   - Copies only the standalone Next.js output and static assets.
   - Runs as a non-root user.

## Why multi-stage builds

- Smaller final image size
- Fewer packages shipped to production
- Better separation between build-time and runtime concerns
- Easier to reason about what is actually needed to run the app

## Persistence

- SQLite data must be mounted on a Docker volume.
- The compose file maps a named volume to `/app/data`.
- This lets the database survive container restarts.
