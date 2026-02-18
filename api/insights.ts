import { GoogleGenAI } from '@google/genai';
import { prisma } from './_lib/prisma';
import { methodNotAllowed, parseJsonBody } from './_lib/task-utils';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return methodNotAllowed(res, ['POST']);
  }

  const geminiKey = process.env.GEMINI_API_KEY;
  if (!geminiKey) {
    return res.status(500).json({ message: 'GEMINI_API_KEY is not configured' });
  }

  try {
    const body = parseJsonBody(req);
    const tasks = Array.isArray(body?.tasks)
      ? body.tasks
      : await prisma.task.findMany({ orderBy: [{ updatedAt: 'desc' }], take: 100 });

    const ai = new GoogleGenAI({ apiKey: geminiKey });
    const prompt = [
      'Analyze these tasks and return JSON only.',
      'Return shape: {"summary":string,"highPriorityCount":number,"blockedOrOverdueCount":number,"nextActions":string[]}.',
      `Tasks: ${JSON.stringify(tasks)}`,
    ].join('\n');

    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: prompt,
    });

    const text = response.text || '{}';
    let parsed: any;
    try {
      parsed = JSON.parse(text);
    } catch {
      parsed = {
        summary: text,
        highPriorityCount: 0,
        blockedOrOverdueCount: 0,
        nextActions: [],
      };
    }

    return res.status(200).json({ insights: parsed });
  } catch (error) {
    console.error('Insights error:', error);
    return res.status(500).json({ message: 'Failed to generate insights' });
  }
}
