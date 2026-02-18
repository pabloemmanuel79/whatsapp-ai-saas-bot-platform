import { apiRequest } from './client';
import { ConversationMessage, Lead, LeadDetail, LeadStatus, WorkOrder } from '@/types';

export async function getLeads(tenantId: string, token: string): Promise<Lead[]> {
  return apiRequest<Lead[]>(`/tenants/${tenantId}/leads`, { token });
}

export async function createLead(tenantId: string, token: string, payload: Partial<Lead>): Promise<Lead> {
  return apiRequest<Lead>(`/tenants/${tenantId}/leads`, {
    method: 'POST',
    token,
    body: JSON.stringify(payload),
  });
}

export async function getLeadById(tenantId: string, leadId: string, token: string): Promise<LeadDetail> {
  return apiRequest<LeadDetail>(`/tenants/${tenantId}/leads/${leadId}`, { token });
}

export async function getMessages(tenantId: string, leadId: string, token: string): Promise<ConversationMessage[]> {
  const query = new URLSearchParams({ leadId });
  return apiRequest<ConversationMessage[]>(`/tenants/${tenantId}/messages?${query.toString()}`, { token });
}

export async function createMessage(
  tenantId: string,
  token: string,
  payload: Pick<ConversationMessage, 'leadId' | 'direction' | 'channel' | 'text'>,
): Promise<ConversationMessage> {
  return apiRequest<ConversationMessage>(`/tenants/${tenantId}/messages`, {
    method: 'POST',
    token,
    body: JSON.stringify(payload),
  });
}

export async function getWorkOrders(tenantId: string, token: string): Promise<WorkOrder[]> {
  return apiRequest<WorkOrder[]>(`/tenants/${tenantId}/work-orders`, { token });
}

export async function createWorkOrder(
  tenantId: string,
  token: string,
  payload: Pick<WorkOrder, 'leadId' | 'serviceType' | 'status' | 'estimatedCost' | 'scheduledAt' | 'notes'>,
): Promise<WorkOrder> {
  return apiRequest<WorkOrder>(`/tenants/${tenantId}/work-orders`, {
    method: 'POST',
    token,
    body: JSON.stringify(payload),
  });
}

export async function updateLead(
  tenantId: string,
  leadId: string,
  token: string,
  payload: { status?: LeadStatus; assignedAgentId?: string },
): Promise<Lead> {
  return apiRequest<Lead>(`/tenants/${tenantId}/leads/${leadId}`, {
    method: 'PUT',
    token,
    body: JSON.stringify(payload),
  });
}
