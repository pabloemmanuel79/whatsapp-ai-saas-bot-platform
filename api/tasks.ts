import { prisma } from './_lib/prisma';
import { methodNotAllowed, normalizeTaskPayload, parseJsonBody } from './_lib/task-utils';

export default async function handler(req: any, res: any) {
  if (req.method === 'GET') {
    const tasks = await prisma.task.findMany({
      orderBy: [{ updatedAt: 'desc' }],
    });
    return res.status(200).json(tasks);
  }

  if (req.method === 'PUT') {
    try {
      const body = parseJsonBody(req);
      const { id } = body ?? {};
      const data = normalizeTaskPayload(body ?? {});

      if (id && typeof id === 'string') {
        const task = await prisma.task.update({
          where: { id },
          data,
        });
        return res.status(200).json(task);
      }

      const task = await prisma.task.create({ data });
      return res.status(201).json(task);
    } catch (error: any) {
      return res.status(400).json({ message: error?.message || 'Invalid payload' });
    }
  }

  return methodNotAllowed(res, ['GET', 'PUT']);
}
