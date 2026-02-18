export type TaskInput = {
  id?: string;
  title?: unknown;
  description?: unknown;
  status?: unknown;
  priority?: unknown;
  dueDate?: unknown;
};

export function parseJsonBody(req: any) {
  if (!req.body) return {};
  if (typeof req.body === 'string') return JSON.parse(req.body);
  return req.body;
}

export function normalizeTaskPayload(input: TaskInput) {
  const title = typeof input.title === 'string' ? input.title.trim() : '';
  if (!title) {
    throw new Error('title is required');
  }

  const description =
    typeof input.description === 'string' && input.description.trim().length > 0
      ? input.description.trim()
      : null;
  const status =
    typeof input.status === 'string' && input.status.trim().length > 0
      ? input.status.trim().toLowerCase()
      : 'pending';
  const priority =
    typeof input.priority === 'string' && input.priority.trim().length > 0
      ? input.priority.trim().toLowerCase()
      : 'medium';

  let dueDate: Date | null = null;
  if (input.dueDate) {
    const parsed = new Date(String(input.dueDate));
    if (Number.isNaN(parsed.valueOf())) {
      throw new Error('dueDate must be a valid date');
    }
    dueDate = parsed;
  }

  return { title, description, status, priority, dueDate };
}

export function methodNotAllowed(res: any, allow: string[]) {
  res.setHeader('Allow', allow.join(', '));
  return res.status(405).json({ message: 'Method Not Allowed' });
}
