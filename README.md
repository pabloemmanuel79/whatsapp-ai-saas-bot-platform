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
  - `BOOTSTRAP_SECRET` (secreto obligatorio para `POST /api/bootstrap`)
  - `BOOTSTRAP_DISABLED` (`false` por defecto; poner `true` despues de inicializar)

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

## Bootstrap en produccion (Vercel Function)

Endpoint: `POST /api/bootstrap`

Body JSON:

```json
{
  "tenantId": "tenant_demo_1",
  "tenantName": "Taller Central",
  "email": "admin@tallercentral.ai",
  "password": "Admin1234!"
}
```

Headers requeridos:

- `content-type: application/json`
- `x-bootstrap-secret: <BOOTSTRAP_SECRET>`

Reglas de seguridad:

- Si `BOOTSTRAP_DISABLED=true`, responde `403`.
- Si falta `BOOTSTRAP_SECRET` en entorno, responde `500`.
- Si `x-bootstrap-secret` no coincide, responde `401`.

Ejemplo `curl`:

```bash
curl -X POST "https://<tu-dominio-vercel>/api/bootstrap" \
  -H "content-type: application/json" \
  -H "x-bootstrap-secret: <BOOTSTRAP_SECRET>" \
  -d '{
    "tenantId": "tenant_demo_1",
    "tenantName": "Taller Central",
    "email": "admin@tallercentral.ai",
    "password": "Admin1234!"
  }'
```

Comportamiento:

- Si tenant y admin ya existen, responde `200` indicando sistema ya inicializado.
- Si faltan, crea tenant y/o usuario admin (`role=admin`) con `password` hasheado (`bcryptjs`).

### Pasos exactos en Vercel (one-shot)

1. En Vercel -> Project -> Settings -> Environment Variables, agregar:
   - `BOOTSTRAP_SECRET` (valor largo y aleatorio)
   - `BOOTSTRAP_DISABLED=false`
2. Redeploy del proyecto para aplicar variables.
3. Ejecutar `POST /api/bootstrap` una sola vez con el header `x-bootstrap-secret`.
4. Volver a Vercel -> Environment Variables y cambiar:
   - `BOOTSTRAP_DISABLED=true`
5. Redeploy final para dejar bootstrap bloqueado.

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
