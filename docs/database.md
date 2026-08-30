# Database

Bachelor Buddy uses `@libsql/client` so the same code path works locally with SQLite and in production with Turso.

## Local Setup

- Default local URL: `file:./data/bachelor-buddy.sqlite`
- The database file lives inside the repo during development.
- In Docker, the file should be stored on a mounted volume.

## Production Setup

- Use `TURSO_DATABASE_URL` for the libSQL endpoint.
- Use `TURSO_AUTH_TOKEN` for authentication.
- Do not commit secrets to Git.

## Tables

### `vendors`

- `id`
- `name`
- `category`
- `area`
- `description`
- `price`
- `rating`
- `response_time`
- `tags`

### `service_requests`

- `id`
- `name`
- `phone`
- `category`
- `area`
- `message`
- `created_at`

## Behavior

- Schema creation is automatic on first app startup.
- Seed vendors are inserted only when the vendor table is empty.
- Queries are parameterized to avoid string concatenation.
