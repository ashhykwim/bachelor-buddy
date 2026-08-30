# CI/CD

Bachelor Buddy uses a simple GitHub Actions pipeline.

## Workflow

```mermaid
flowchart LR
  P[Push or Pull Request] --> G[GitHub Actions]
  G --> I[npm ci]
  I --> L[lint]
  L --> T[typecheck]
  T --> B[production build]
  B --> S[merge or deploy]
```

## Why this shape

- Catches formatting or lint issues early
- Verifies TypeScript correctness
- Confirms the production build still succeeds
- Keeps the pipeline easy to maintain
