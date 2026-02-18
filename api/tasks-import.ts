import { prisma } from './_lib/prisma';
import { methodNotAllowed, normalizeTaskPayload, parseJsonBody, TaskInput } from './_lib/task-utils';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return methodNotAllowed(res, ['POST']);
  }

  try {
    const body = parseJsonBody(req);
    const inputTasks = (Array.isArray(body) ? body : body?.tasks) as TaskInput[] | undefined;

    if (!Array.isArray(inputTasks) || inputTasks.length === 0) {
      return res.status(400).json({ message: 'tasks array is required' });
    }

    let imported = 0;
    for (const input of inputTasks) {
      const data = normalizeTaskPayload(input);
      const id = typeof input.id === 'string' ? input.id : undefined;

      if (id) {
        await prisma.task.upsert({
          where: { id },
          update: data,
          create: { id, ...data },
        });
      } else {
        await prisma.task.create({ data });
      }
      imported += 1;
    }

    return res.status(200).json({ imported });
  } catch (error: any) {
    return res.status(400).json({ message: error?.message || 'Invalid payload' });
  }
}
