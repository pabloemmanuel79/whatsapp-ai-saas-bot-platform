# WhatsApp AI SaaS Bot Platform (MVP CRM Multi-tenant)

Frontend Vite + React + TypeScript con backend Node + Express + Prisma (SQLite) para CRM de leads de WhatsApp.

## Que incluye este MVP

- Login multi-tenant con roles (`admin`, `agent`) por `tenantId`.
- CRM con persistencia real por API REST:
  - Inbox de leads ordenado por ultimo mensaje.
  - Filtros por estado (`Nuevo`, `Calificando`, `Agendado`, `Cerrado`).
  - Busqueda por nombre, telefono o patente.
  - Ficha de lead con timeline de mensajes, resumen IA y acciones rapidas.
- Modo industria `Automotriz`:
  - Lead con `Vehicle` (0..n).
  - Alta de `WorkOrder` (`serviceType`, `status`, `estimatedCost`, `scheduledAt`, `notes`).
- Base de conocimiento por tenant (texto + metadata JSON).

## Estructura

- `src/`: frontend refactorizado (app, componentes, api client, hooks, store, types).
- `backend/`: API Node/Express + Prisma SQLite + migraciones + seed demo.

## Variables de entorno

Copiar `.env.example` y ajustar valores:

- Frontend:
  - `VITE_API_BASE_URL` (ej: `http://localhost:4000`)
  - `GEMINI_API_KEY` (opcional para Bot Simulator)
- Backend:
  - `PORT` (default 4000)
  - `DATABASE_URL` (SQLite, default `file:./dev.db`)

## Ejecucion local

1. Instalar dependencias frontend:
   - `npm install`
2. Instalar dependencias backend:
   - `cd backend && npm install`
3. Crear/aplicar DB y seed demo:
   - `npm run db:migrate`
   - `npm run db:seed`
4. Levantar backend:
   - `npm run dev:backend`
5. Levantar frontend (en otra terminal):
   - `npm run dev:frontend`

Frontend: `http://localhost:3000`
Backend: `http://localhost:4000`

## Credenciales demo

- `tenantId`: `tenant_demo_1`
- `email`: `admin@tallercentral.ai`
- `password`: cualquier valor (login mock temporal)

## Endpoints implementados

- `POST /auth/login`
- `GET/POST /tenants/:tenantId/leads`
- `GET/PUT /tenants/:tenantId/leads/:id`
- `GET/POST /tenants/:tenantId/messages?leadId=`
- `GET/PUT /tenants/:tenantId/knowledge-base`
- `GET/POST /tenants/:tenantId/work-orders`

## Supuestos MVP

- Autenticacion con token mock (sin JWT real ni refresh token).
- `KnowledgeBase.metadata` se guarda como JSON serializado en DB.
- El layout visual principal se conserva; el foco del incremento es arquitectura y persistencia.
