import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };
const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

export default async function handler(req: any, res: any) {
  if (process.env.BOOTSTRAP_DISABLED === 'true') {
    return res.status(403).json({ message: 'Bootstrap is disabled' });
  }

  const bootstrapSecret = process.env.BOOTSTRAP_SECRET;
  if (!bootstrapSecret) {
    return res.status(500).json({ message: 'BOOTSTRAP_SECRET is not configured' });
  }

  const requestSecret = req.headers['x-bootstrap-secret'];
  if (!requestSecret || requestSecret !== bootstrapSecret) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const { tenantId, tenantName, email, password } = body ?? {};

    if (!tenantId || !tenantName || !email || !password) {
      return res.status(400).json({ message: 'tenantId, tenantName, email and password are required' });
    }

    const [existingTenant, existingUser] = await Promise.all([
      prisma.tenant.findUnique({ where: { id: tenantId } }),
      prisma.user.findUnique({ where: { tenantId_email: { tenantId, email } } }),
    ]);

    if (existingTenant && existingUser) {
      return res.status(200).json({
        message: 'System already initialized',
        initialized: true,
        tenantId,
        email,
      });
    }

    if (!existingTenant) {
      await prisma.tenant.upsert({
        where: { id: tenantId },
        update: {},
        create: {
          id: tenantId,
          name: tenantName,
        },
      });
    }

    if (!existingUser) {
      const passwordHash = await bcrypt.hash(password, 10);
      await prisma.user.upsert({
        where: { tenantId_email: { tenantId, email } },
        update: {},
        create: {
          tenantId,
          name: 'Admin',
          email,
          role: 'admin',
          passwordHash,
        },
      });
    }

    return res.status(200).json({
      message: 'Bootstrap completed',
      initialized: true,
      tenantCreated: !existingTenant,
      adminCreated: !existingUser,
      tenantId,
      email,
    });
  } catch (error) {
    console.error('Bootstrap error:', error);
    return res.status(500).json({ message: 'Failed to run bootstrap' });
  }
}
