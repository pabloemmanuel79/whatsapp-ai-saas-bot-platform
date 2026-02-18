
export type View = 'dashboard' | 'canvas' | 'crm' | 'bot-simulator' | 'knowledge-base' | 'settings';

export interface Customer {
  id: string;
  name: string;
  phone: string;
  vehicle: {
    brand: string;
    model: string;
    plate: string;
    year: string;
    color: string;
  };
  email?: string;
  status: 'active' | 'pending' | 'completed';
  history: ServiceRecord[];
}

export interface ServiceRecord {
  id: string;
  date: string;
  description: string;
  cost: number;
  mechanic?: string;
  notes?: string;
}

export interface Message {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface BusinessConfig {
  name: string;
  industry: string;
  knowledgeBase: string;
  currency: string;
}
