# WhatsApp AI SaaS Bot Platform

Frontend Vite + React + TypeScript con backend migrado a Vercel Functions (`/api/*`) y Prisma sobre Postgres.

## Estructura

- `src/`: frontend.
- `api/`: Vercel Functions (produccion).
- `api/_lib/`: utilidades compartidas (`prisma`, helpers).
- `backend/`: backend Express legado para desarrollo/local. Se mantiene, pero ya no es necesario en produccion.

## Variables de entorno

- `DATABASE_URL`: Postgres (Supabase recomendado).
- `GEMINI_API_KEY`: requerido para `POST /api/insights`.
- `BOOTSTRAP_SECRET`: secreto requerido por `POST /api/bootstrap`.
- `BOOTSTRAP_DISABLED`: `false` para inicializar, `true` para bloquear bootstrap.
- `VITE_API_BASE_URL`: por defecto `/api` (mismo dominio).

## Endpoints Vercel Functions

- `GET|PUT /api/tasks`
- `POST /api/tasks-import`
- `POST /api/insights`
- `POST /api/bootstrap`

`/api/bootstrap`:

- `200` cuando inicializa o ya estaba inicializado.
- `403` si `BOOTSTRAP_DISABLED=true`.
- `401` si `x-bootstrap-secret` no coincide.

## Deploy en Vercel

1. Configurar env vars (`DATABASE_URL`, `BOOTSTRAP_SECRET`, `BOOTSTRAP_DISABLED`, `GEMINI_API_KEY`).
2. Build command: `npm run vercel-build`.
3. El comando `vercel-build` ejecuta:
   - `prisma generate --schema backend/prisma/schema.prisma`
   - `prisma migrate deploy --schema backend/prisma/schema.prisma`
   - `vite build`

`vercel.json` fija runtime Node 20 para `api/*.ts`.

## Desarrollo local

1. `npm install`
2. Levantar frontend: `npm run dev`
3. (Opcional legado) backend Express: `npm run dev:backend`
