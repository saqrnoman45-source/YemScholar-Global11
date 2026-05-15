# NexPath

A modern educational platform where students and professionals discover courses, apply for scholarships, read research articles, and track their skills.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 8080)
- `pnpm --filter @workspace/nexpath run dev` — run the frontend (port 22057)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string, `SESSION_SECRET` — session signing key

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React + Vite + Tailwind CSS (artifact: `nexpath`)
- API: Express 5 (artifact: `api-server`)
- DB: PostgreSQL + Drizzle ORM
- Session auth: express-session + bcryptjs
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `lib/api-spec/openapi.yaml` — OpenAPI contract (source of truth)
- `lib/db/src/schema/` — Drizzle table definitions
- `artifacts/api-server/src/routes/` — Express route handlers
- `artifacts/nexpath/src/` — React frontend

## Seed accounts

- Admin: `admin@nexpath.io` / `admin123`
- Student: `student@nexpath.io` / `student123`

## Architecture decisions

- Contract-first: OpenAPI spec gates all codegen; never hand-write hooks or Zod schemas
- Session auth with express-session (server-side sessions, signed cookies)
- Separate artifacts for frontend and API server with path-based proxy routing
- Admin dashboard only visible to users with `role === "admin"`

## Product

NexPath provides:
- **Courses** — Browse, filter, and enroll in courses across categories and skill levels
- **Scholarships** — Discover funding opportunities and submit applications
- **Research Articles** — Read and publish research across academic topics
- **Skills Tracking** — Build and display a verified skills portfolio
- **Admin Dashboard** — Manage users, review applications, and monitor platform stats

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

- Re-run codegen (`pnpm --filter @workspace/api-spec run codegen`) after every spec change
- Session secret falls back to a dev default if `SESSION_SECRET` env var is absent
- The proxy routes `/api` to the API server and `/` to the frontend

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
