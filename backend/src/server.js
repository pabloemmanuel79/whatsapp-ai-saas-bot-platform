import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();
const port = Number(process.env.PORT || 4000);

app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ ok: true, service: 'crm-backend' });
});

app.post('/auth/login', async (req, res) => {
  const { email, tenantId } = req.body;

  if (!email || !tenantId) {
    return res.status(400).json({ message: 'email and tenantId are required' });
  }

  const user = await prisma.user.findFirst({ where: { email, tenantId } });
  const tenant = await prisma.tenant.findUnique({ where: { id: tenantId } });

  if (!user || !tenant) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  return res.json({
    token: `mock-token-${user.id}`,
    user,
    tenant,
  });
});

app.get('/tenants/:tenantId/leads', async (req, res) => {
  const { tenantId } = req.params;
  const leads = await prisma.lead.findMany({
    where: { tenantId },
    include: { vehicles: true },
    orderBy: [{ lastMessageAt: 'desc' }, { createdAt: 'desc' }],
  });
  res.json(leads);
});

app.post('/tenants/:tenantId/leads', async (req, res) => {
  const { tenantId } = req.params;
  const { name, phone, email, status, aiSummary } = req.body;

  if (!name || !phone) {
    return res.status(400).json({ message: 'name and phone are required' });
  }

  const lead = await prisma.lead.create({
    data: {
      tenantId,
      name,
      phone,
      email,
      status: status || 'Nuevo',
      aiSummary,
      vehicles: {
        create: Array.isArray(req.body.vehicles)
          ? req.body.vehicles.map((v) => ({ brand: v.brand, model: v.model, plate: v.plate, year: v.year, color: v.color }))
          : [],
      },
    },
    include: { vehicles: true },
  });

  res.status(201).json(lead);
});

app.get('/tenants/:tenantId/leads/:id', async (req, res) => {
  const { tenantId, id } = req.params;
  const lead = await prisma.lead.findFirst({
    where: { id, tenantId },
    include: {
      vehicles: true,
      messages: { orderBy: { timestamp: 'asc' } },
      workOrders: { orderBy: { createdAt: 'desc' } },
    },
  });

  if (!lead) return res.status(404).json({ message: 'Lead not found' });
  res.json(lead);
});

app.put('/tenants/:tenantId/leads/:id', async (req, res) => {
  const { tenantId, id } = req.params;
  const { status, assignedAgentId } = req.body;

  const current = await prisma.lead.findFirst({ where: { id, tenantId } });
  if (!current) return res.status(404).json({ message: 'Lead not found' });

  const lead = await prisma.lead.update({
    where: { id },
    data: {
      status: status ?? current.status,
      assignedAgentId: assignedAgentId ?? current.assignedAgentId,
      updatedAt: new Date(),
    },
    include: { vehicles: true },
  });

  res.json(lead);
});

app.get('/tenants/:tenantId/messages', async (req, res) => {
  const { tenantId } = req.params;
  const { leadId } = req.query;

  const where = {
    tenantId,
    ...(leadId ? { leadId: String(leadId) } : {}),
  };

  const messages = await prisma.conversationMessage.findMany({
    where,
    orderBy: { timestamp: 'asc' },
  });

  res.json(messages);
});

app.post('/tenants/:tenantId/messages', async (req, res) => {
  const { tenantId } = req.params;
  const { leadId, direction, channel, text } = req.body;

  if (!leadId || !direction || !channel || !text) {
    return res.status(400).json({ message: 'leadId, direction, channel, text are required' });
  }

  const message = await prisma.conversationMessage.create({
    data: {
      tenantId,
      leadId,
      direction,
      channel,
      text,
      timestamp: new Date(),
    },
  });

  await prisma.lead.update({
    where: { id: leadId },
    data: { lastMessageAt: message.timestamp, updatedAt: new Date() },
  });

  res.status(201).json(message);
});

app.get('/tenants/:tenantId/knowledge-base', async (req, res) => {
  const { tenantId } = req.params;
  const kb = await prisma.knowledgeBase.findUnique({ where: { tenantId } });
  if (!kb) return res.status(404).json({ message: 'Knowledge base not found' });

  res.json({
    tenantId: kb.tenantId,
    content: kb.content,
    metadata: JSON.parse(kb.metadata || '{}'),
    updatedAt: kb.updatedAt,
  });
});

app.put('/tenants/:tenantId/knowledge-base', async (req, res) => {
  const { tenantId } = req.params;
  const { content, metadata } = req.body;

  const kb = await prisma.knowledgeBase.upsert({
    where: { tenantId },
    update: {
      content: content || '',
      metadata: JSON.stringify(metadata || {}),
    },
    create: {
      tenantId,
      content: content || '',
      metadata: JSON.stringify(metadata || {}),
    },
  });

  res.json({
    tenantId: kb.tenantId,
    content: kb.content,
    metadata: JSON.parse(kb.metadata || '{}'),
    updatedAt: kb.updatedAt,
  });
});

app.get('/tenants/:tenantId/work-orders', async (req, res) => {
  const { tenantId } = req.params;
  const workOrders = await prisma.workOrder.findMany({
    where: { tenantId },
    orderBy: { createdAt: 'desc' },
  });
  res.json(workOrders);
});

app.post('/tenants/:tenantId/work-orders', async (req, res) => {
  const { tenantId } = req.params;
  const { leadId, serviceType, status, estimatedCost, scheduledAt, notes } = req.body;

  if (!leadId || !serviceType) {
    return res.status(400).json({ message: 'leadId and serviceType are required' });
  }

  const order = await prisma.workOrder.create({
    data: {
      tenantId,
      leadId,
      serviceType,
      status: status || 'draft',
      estimatedCost: Number(estimatedCost || 0),
      scheduledAt: scheduledAt ? new Date(scheduledAt) : null,
      notes,
    },
  });

  res.status(201).json(order);
});

app.listen(port, () => {
  console.log(`CRM backend listening on http://localhost:${port}`);
});
