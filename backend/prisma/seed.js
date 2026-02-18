import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const tenantId = 'tenant_demo_1';
  const userId = 'user_admin_1';

  await prisma.tenant.upsert({
    where: { id: tenantId },
    update: {},
    create: {
      id: tenantId,
      name: 'Taller Central AI',
      industry: 'Automotriz',
    },
  });

  await prisma.user.upsert({
    where: { id: userId },
    update: {},
    create: {
      id: userId,
      tenantId,
      name: 'Admin Taller',
      email: 'admin@tallercentral.ai',
      role: 'admin',
    },
  });

  const lead1 = await prisma.lead.upsert({
    where: { id: 'lead_1' },
    update: {},
    create: {
      id: 'lead_1',
      tenantId,
      name: 'Juan Perez',
      phone: '+5491112345678',
      status: 'Nuevo',
      aiSummary: 'Consulta por frenos con ruido al doblar.',
      lastMessageAt: new Date(),
      vehicles: {
        create: [{ brand: 'Toyota', model: 'Hilux', plate: 'AD123BC', year: 2022, color: 'Gris' }],
      },
    },
  });

  const lead2 = await prisma.lead.upsert({
    where: { id: 'lead_2' },
    update: {},
    create: {
      id: 'lead_2',
      tenantId,
      name: 'Maria Garcia',
      phone: '+5491187654321',
      status: 'Calificando',
      aiSummary: 'Solicita turno para alineacion y balanceo.',
      lastMessageAt: new Date(Date.now() - 1000 * 60 * 40),
      vehicles: {
        create: [{ brand: 'Volkswagen', model: 'Gol', plate: 'FE999ZZ', year: 2019, color: 'Blanco' }],
      },
    },
  });

  await prisma.conversationMessage.deleteMany({
    where: { tenantId },
  });

  await prisma.conversationMessage.createMany({
    data: [
      {
        id: 'msg_1',
        tenantId,
        leadId: lead1.id,
        direction: 'in',
        channel: 'whatsapp',
        text: 'Hola, escucho ruido al frenar. Tienen turno?',
        timestamp: new Date(Date.now() - 1000 * 60 * 5),
      },
      {
        id: 'msg_2',
        tenantId,
        leadId: lead1.id,
        direction: 'out',
        channel: 'whatsapp',
        text: 'Si, podemos agendar para hoy 16:30. Te sirve?',
        timestamp: new Date(Date.now() - 1000 * 60 * 3),
      },
      {
        id: 'msg_3',
        tenantId,
        leadId: lead2.id,
        direction: 'in',
        channel: 'whatsapp',
        text: 'Quiero hacer alineacion y balanceo esta semana.',
        timestamp: new Date(Date.now() - 1000 * 60 * 40),
      },
    ],
  });

  await prisma.knowledgeBase.upsert({
    where: { tenantId },
    update: {},
    create: {
      tenantId,
      content:
        'Especialistas en frenos, suspension y mecanica general. Horario: Lunes a Viernes de 9 a 18 hs. Diagnostico base: 50 USD.',
      metadata: JSON.stringify({ lang: 'es', channel: 'whatsapp', version: 'mvp' }),
    },
  });

  await prisma.workOrder.upsert({
    where: { id: 'wo_1' },
    update: {},
    create: {
      id: 'wo_1',
      tenantId,
      leadId: lead2.id,
      serviceType: 'Alineacion y balanceo',
      status: 'scheduled',
      estimatedCost: 85,
      scheduledAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
      notes: 'Confirmar disponibilidad del cliente por la tarde.',
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
