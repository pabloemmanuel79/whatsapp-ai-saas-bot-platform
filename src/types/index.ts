export type View = 'dashboard' | 'canvas' | 'crm' | 'bot-simulator' | 'knowledge-base';

export type Industry = 'Automotriz' | 'General';
export type UserRole = 'admin' | 'agent';
export type LeadStatus = 'Nuevo' | 'Calificando' | 'Agendado' | 'Cerrado';
export type MessageDirection = 'in' | 'out';
export type MessageChannel = 'whatsapp' | 'web';
export type WorkOrderStatus = 'draft' | 'scheduled' | 'in_progress' | 'completed' | 'cancelled';

export interface Tenant {
  id: string;
  name: string;
  industry: Industry;
}

export interface User {
  id: string;
  tenantId: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface Vehicle {
  id: string;
  leadId: string;
  brand: string;
  model: string;
  plate: string;
  year?: number;
  color?: string;
}

export interface WorkOrder {
  id: string;
  tenantId: string;
  leadId: string;
  serviceType: string;
  status: WorkOrderStatus;
  estimatedCost: number;
  scheduledAt?: string;
  notes?: string;
  createdAt: string;
}

export interface ConversationMessage {
  id: string;
  tenantId: string;
  leadId: string;
  direction: MessageDirection;
  channel: MessageChannel;
  text: string;
  timestamp: string;
}

export interface Lead {
  id: string;
  tenantId: string;
  name: string;
  phone: string;
  email?: string;
  status: LeadStatus;
  assignedAgentId?: string;
  aiSummary?: string;
  lastMessageAt?: string;
  createdAt: string;
  updatedAt: string;
  vehicles: Vehicle[];
}

export interface LeadDetail extends Lead {
  messages: ConversationMessage[];
  workOrders: WorkOrder[];
}

export interface KnowledgeBaseEntry {
  tenantId: string;
  content: string;
  metadata: Record<string, string>;
  updatedAt: string;
}

export interface BusinessConfig {
  name: string;
  industry: Industry;
  knowledgeBase: string;
  currency: string;
}

export interface Message {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface LoginResponse {
  token: string;
  user: User;
  tenant: Tenant;
}
