import React, { useEffect } from 'react';
import CustomerFicha from './CustomerFicha';
import { LeadStatus } from '@/types';
import { useAuth } from '@/store/auth';
import { useCRM } from '@/hooks/useCRM';

const CRMView: React.FC = () => {
  const { token, tenantId } = useAuth();
  const {
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
  } = useCRM(tenantId, token);

  useEffect(() => {
    void loadLeads();
  }, [loadLeads]);

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
      <div className="xl:col-span-1 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden h-[calc(100vh-220px)] flex flex-col">
        <div className="p-4 border-b border-slate-100 space-y-3">
          <h3 className="font-bold text-lg">Inbox de Leads</h3>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar nombre, telefono o patente"
            className="w-full text-sm px-3 py-2 border border-slate-200 rounded-lg"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as LeadStatus | 'Todos')}
            className="w-full text-sm px-3 py-2 border border-slate-200 rounded-lg"
          >
            {['Todos', 'Nuevo', 'Calificando', 'Agendado', 'Cerrado'].map((status) => (
              <option key={status}>{status}</option>
            ))}
          </select>
        </div>

        <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
          {loading ? <p className="p-4 text-sm text-slate-500">Cargando leads...</p> : null}
          {error ? <p className="p-4 text-sm text-rose-600">{error}</p> : null}

          {filteredLeads.map((lead) => (
            <button
              key={lead.id}
              onClick={() => void selectLead(lead.id)}
              className={`w-full text-left p-4 hover:bg-slate-50 transition-colors ${selectedLead?.id === lead.id ? 'bg-emerald-50' : ''}`}
            >
              <div className="flex justify-between items-center gap-2">
                <p className="font-semibold text-sm text-slate-800">{lead.name}</p>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">{lead.status}</span>
              </div>
              <p className="text-xs font-mono text-slate-500 mt-1">{lead.phone}</p>
              <p className="text-[11px] text-slate-400 mt-1">
                Ult. mensaje: {lead.lastMessageAt ? new Date(lead.lastMessageAt).toLocaleString() : 'sin actividad'}
              </p>
            </button>
          ))}

          {!loading && filteredLeads.length === 0 ? (
            <p className="p-4 text-sm text-slate-500">No hay resultados con los filtros actuales.</p>
          ) : null}
        </div>
      </div>

      <div className="xl:col-span-2">
        {selectedLead ? (
          <CustomerFicha
            lead={selectedLead}
            messages={messages}
            onStatusChange={changeLeadStatus}
            onAssign={assignLead}
            onCreateWorkOrder={createLeadWorkOrder}
          />
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 p-8 text-slate-500">
            Selecciona un lead para ver la ficha y la timeline de conversacion.
          </div>
        )}
      </div>
    </div>
  );
};

export default CRMView;
