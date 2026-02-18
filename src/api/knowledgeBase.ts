import { apiRequest } from './client';
import { KnowledgeBaseEntry } from '@/types';

export async function getKnowledgeBase(tenantId: string, token: string): Promise<KnowledgeBaseEntry> {
  return apiRequest<KnowledgeBaseEntry>(`/tenants/${tenantId}/knowledge-base`, { token });
}

export async function updateKnowledgeBase(
  tenantId: string,
  token: string,
  payload: Pick<KnowledgeBaseEntry, 'content' | 'metadata'>,
): Promise<KnowledgeBaseEntry> {
  return apiRequest<KnowledgeBaseEntry>(`/tenants/${tenantId}/knowledge-base`, {
    method: 'PUT',
    token,
    body: JSON.stringify(payload),
  });
}
