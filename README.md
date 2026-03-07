# Examination 3

Simple fullstack project with:

- Backend: Fastify + Bun (`/src`)
- Frontend: React + Vite (`/client`)
- Database: PostgreSQL (`/db/migrations`, `/db/seeds`)

## 1. Prerequisites

- Bun (for backend), version `1.3+`
- Node.js + npm (for frontend), Node `18+` recommended
- PostgreSQL (local install or Docker)

## 2. Environment Variables

### Backend (`.env` in project root)

Copy `.env.example` to `.env` and fill in values:

```bash
AUTH0_JWKS_URI=
BUN_PUBLIC_AUTH0_DOMAIN=
BUN_PUBLIC_AUTH0_CLIENT_ID=
DATABASE_URL=
AUTH0_ISSUER=
AUTH0_AUDIENCE=
```

Note: backend auth plugin requires Auth0 values. Missing values can prevent server startup.

### Frontend (`client/.env`)

Copy `client/.env.example` to `client/.env` and fill in values:

```bash
VITE_AUTH0_DOMAIN=
VITE_AUTH0_CLIENT_ID=
VITE_AUTH0_AUDIENCE=
VITE_API_BASE=http://localhost:3001
```

## 3. Install Dependencies

From project root:

```bash
bun install
```

From `client` folder:

```bash
npm install
```

## 4. Set Up Database

Create your PostgreSQL database and make sure `DATABASE_URL` points to it.

Run migrations in order (using `psql` as example):

```bash
psql "$DATABASE_URL" -f db/migrations/001_initial.sql
psql "$DATABASE_URL" -f db/migrations/002_users_auth0_upsert.sql
psql "$DATABASE_URL" -f db/migrations/003_posts.sql
psql "$DATABASE_URL" -f db/migrations/004_comments.sql
psql "$DATABASE_URL" -f db/migrations/005_comments.sql
psql "$DATABASE_URL" -f db/migrations/005_user_role.sql
psql "$DATABASE_URL" -f db/migrations/006_user_nullable
```

Optional: seed test data

```bash
bun run db/seeds/seed.ts
```

## 5. Run The Projects

Use two terminals.

### Terminal 1: Backend

From project root:

```bash
bun run start
```

Backend runs on `http://localhost:3001`.

### Terminal 2: Frontend

From `client`:

```bash
npm run dev
```

Frontend runs on `http://localhost:5173`.

## 6. Run With Docker (Backend + PostgreSQL)

When you add your Docker setup, use this structure:

- `Dockerfile` for backend in project root
- `docker-compose.yml` in project root with at least:
	- `backend` service
	- `postgres` service

Start containers:

```bash
docker compose up --build
```

Run in detached mode:

```bash
docker compose up --build -d
```

Stop containers:

```bash
docker compose down
```

Stop and remove volumes (resets DB data):

```bash
docker compose down -v
```

View logs:

```bash
docker compose logs -f
```

Recommended in your compose/env setup:

- Backend should expose port `3001`
- PostgreSQL should expose `5432` (or mapped port you choose)
- Backend `DATABASE_URL` should point to the Postgres service name, for example:

```bash
DATABASE_URL=postgresql://postgres:postgres@postgres:5432/examdb
```

## 7. Quick Check

1. Open `http://localhost:5173`
2. Log in with Auth0
3. Call protected endpoint from the UI

If frontend cannot reach backend, verify:

- `VITE_API_BASE` is `http://localhost:3001`
- Backend is running
- CORS allows `http://localhost:5173` (configured in `src/app.ts`)
