import { useCallback, useMemo, useState } from 'react';
import { createWorkOrder, getLeadById, getLeads, getMessages, updateLead } from '@/api/crm';
import { ConversationMessage, Lead, LeadStatus, WorkOrderStatus } from '@/types';

export function useCRM(tenantId: string | null, token: string | null) {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [messages, setMessages] = useState<ConversationMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<LeadStatus | 'Todos'>('Todos');

  const loadLeads = useCallback(async () => {
    if (!tenantId || !token) return;
    setLoading(true);
    setError(null);
    try {
      const list = await getLeads(tenantId, token);
      const ordered = [...list].sort((a, b) => (b.lastMessageAt || '').localeCompare(a.lastMessageAt || ''));
      setLeads(ordered);
      if (ordered[0] && !selectedLead) {
        await selectLead(ordered[0].id, ordered);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'No se pudieron cargar los leads');
    } finally {
      setLoading(false);
    }
  }, [tenantId, token]);

  const selectLead = useCallback(
    async (leadId: string, sourceLeads?: Lead[]) => {
      if (!tenantId || !token) return;
      const pool = sourceLeads || leads;
      const lead = pool.find((item) => item.id === leadId) || null;
      setSelectedLead(lead);
      try {
        const [leadDetail, thread] = await Promise.all([
          getLeadById(tenantId, leadId, token),
          getMessages(tenantId, leadId, token),
        ]);
        setSelectedLead(leadDetail);
        setMessages(thread);
      } catch (e) {
        setError(e instanceof Error ? e.message : 'No se pudo abrir la ficha');
      }
    },
    [tenantId, token, leads],
  );

  const changeLeadStatus = useCallback(
    async (leadId: string, status: LeadStatus) => {
      if (!tenantId || !token) return;
      const updated = await updateLead(tenantId, leadId, token, { status });
      setLeads((prev) => prev.map((lead) => (lead.id === leadId ? { ...lead, ...updated } : lead)));
      setSelectedLead((prev) => (prev && prev.id === leadId ? { ...prev, ...updated } : prev));
    },
    [tenantId, token],
  );

  const assignLead = useCallback(
    async (leadId: string, assignedAgentId: string) => {
      if (!tenantId || !token) return;
      const updated = await updateLead(tenantId, leadId, token, { assignedAgentId });
      setLeads((prev) => prev.map((lead) => (lead.id === leadId ? { ...lead, ...updated } : lead)));
      setSelectedLead((prev) => (prev && prev.id === leadId ? { ...prev, ...updated } : prev));
    },
    [tenantId, token],
  );

  const createLeadWorkOrder = useCallback(
    async (payload: {
      leadId: string;
      serviceType: string;
      status: WorkOrderStatus;
      estimatedCost: number;
      scheduledAt?: string;
      notes?: string;
    }) => {
      if (!tenantId || !token) return;
      await createWorkOrder(tenantId, token, payload);
      const refreshed = await getLeadById(tenantId, payload.leadId, token);
      setSelectedLead(refreshed);
    },
    [tenantId, token],
  );

  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const statusOk = statusFilter === 'Todos' || lead.status === statusFilter;
      const q = searchTerm.trim().toLowerCase();
      if (!q) return statusOk;
      const vehiclePlate = lead.vehicles.map((v) => v.plate.toLowerCase()).join(' ');
      const text = `${lead.name.toLowerCase()} ${lead.phone.toLowerCase()} ${vehiclePlate}`;
      return statusOk && text.includes(q);
    });
  }, [leads, statusFilter, searchTerm]);

  return {
    leads,
    filteredLeads,
    selectedLead,
    messages,
    loading,
    error,
    searchTerm,
    statusFilter,
    setSearchTerm,
    setStatusFilter,
    loadLeads,
    selectLead,
    changeLeadStatus,
    assignLead,
    createLeadWorkOrder,
  };
}
