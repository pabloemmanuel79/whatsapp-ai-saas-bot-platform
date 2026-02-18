import React, { useState } from 'react';
import { ConversationMessage, Lead, LeadStatus, WorkOrderStatus } from '@/types';

interface Props {
  lead: Lead;
  messages: ConversationMessage[];
  onStatusChange: (leadId: string, status: LeadStatus) => Promise<void>;
  onAssign: (leadId: string, agentId: string) => Promise<void>;
  onCreateWorkOrder: (payload: {
    leadId: string;
    serviceType: string;
    status: WorkOrderStatus;
    estimatedCost: number;
    scheduledAt?: string;
    notes?: string;
  }) => Promise<void>;
}

const CustomerFicha: React.FC<Props> = ({ lead, messages, onStatusChange, onAssign, onCreateWorkOrder }) => {
  const [agentId, setAgentId] = useState(lead.assignedAgentId || '');
  const [woForm, setWoForm] = useState({
    serviceType: 'Diagnostico general',
    status: 'scheduled' as WorkOrderStatus,
    estimatedCost: 80,
    scheduledAt: '',
    notes: '',
  });

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h3 className="text-2xl font-bold text-slate-900">{lead.name}</h3>
            <p className="text-sm text-slate-500 font-mono">{lead.phone}</p>
          </div>
          <div className="flex items-center gap-2">
            <select
              value={lead.status}
              onChange={(e) => onStatusChange(lead.id, e.target.value as LeadStatus)}
              className="text-sm border border-slate-200 rounded-lg px-3 py-2"
            >
              {['Nuevo', 'Calificando', 'Agendado', 'Cerrado'].map((status) => (
                <option key={status}>{status}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-4 grid md:grid-cols-2 gap-4">
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
            <p className="text-xs uppercase font-bold text-slate-500">Resumen IA</p>
            <p className="text-sm text-slate-700 mt-2">{lead.aiSummary || 'Sin resumen generado aun.'}</p>
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
            <p className="text-xs uppercase font-bold text-slate-500">Asignar agente</p>
            <div className="mt-2 flex gap-2">
              <input
                value={agentId}
                onChange={(e) => setAgentId(e.target.value)}
                placeholder="user_id_agente"
                className="flex-1 text-sm border border-slate-200 rounded-lg px-3 py-2"
              />
              <button
                onClick={() => onAssign(lead.id, agentId)}
                className="px-3 py-2 text-xs font-bold bg-slate-900 text-white rounded-lg"
              >
                Asignar
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <h4 className="font-bold text-slate-800 mb-4">Timeline de mensajes</h4>
        <div className="space-y-3 max-h-[280px] overflow-y-auto pr-2">
          {messages.map((message) => (
            <div key={message.id} className={`p-3 rounded-xl text-sm ${message.direction === 'in' ? 'bg-slate-100' : 'bg-emerald-100'}`}>
              <div className="flex justify-between gap-2">
                <span className="font-semibold uppercase text-[10px]">{message.direction === 'in' ? 'Cliente' : 'Bot/Agente'}</span>
                <span className="text-[10px] text-slate-500">{new Date(message.timestamp).toLocaleString()}</span>
              </div>
              <p className="mt-1 text-slate-800">{message.text}</p>
            </div>
          ))}
          {messages.length === 0 ? <p className="text-sm text-slate-500">Sin mensajes.</p> : null}
        </div>
      </div>

      {lead.vehicles.length > 0 ? (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h4 className="font-bold text-slate-800 mb-4">Vehiculos vinculados (Automotriz)</h4>
          <div className="grid md:grid-cols-2 gap-3">
            {lead.vehicles.map((vehicle) => (
              <div key={vehicle.id} className="border border-slate-200 rounded-xl p-3">
                <p className="font-semibold text-sm text-slate-800">{vehicle.brand} {vehicle.model}</p>
                <p className="text-xs font-mono text-slate-500">{vehicle.plate}</p>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <h4 className="font-bold text-slate-800 mb-4">Crear Work Order</h4>
        <div className="grid md:grid-cols-2 gap-3">
          <input
            value={woForm.serviceType}
            onChange={(e) => setWoForm((prev) => ({ ...prev, serviceType: e.target.value }))}
            placeholder="serviceType"
            className="text-sm border border-slate-200 rounded-lg px-3 py-2"
          />
          <select
            value={woForm.status}
            onChange={(e) => setWoForm((prev) => ({ ...prev, status: e.target.value as WorkOrderStatus }))}
            className="text-sm border border-slate-200 rounded-lg px-3 py-2"
          >
            {['draft', 'scheduled', 'in_progress', 'completed', 'cancelled'].map((status) => (
              <option key={status}>{status}</option>
            ))}
          </select>
          <input
            type="number"
            value={woForm.estimatedCost}
            onChange={(e) => setWoForm((prev) => ({ ...prev, estimatedCost: Number(e.target.value) }))}
            placeholder="estimatedCost"
            className="text-sm border border-slate-200 rounded-lg px-3 py-2"
          />
          <input
            type="datetime-local"
            value={woForm.scheduledAt}
            onChange={(e) => setWoForm((prev) => ({ ...prev, scheduledAt: e.target.value }))}
            className="text-sm border border-slate-200 rounded-lg px-3 py-2"
          />
          <textarea
            value={woForm.notes}
            onChange={(e) => setWoForm((prev) => ({ ...prev, notes: e.target.value }))}
            placeholder="Notas"
            className="md:col-span-2 text-sm border border-slate-200 rounded-lg px-3 py-2"
            rows={3}
          />
        </div>
        <button
          onClick={() => onCreateWorkOrder({ ...woForm, leadId: lead.id, scheduledAt: woForm.scheduledAt || undefined })}
          className="mt-3 px-4 py-2 bg-emerald-500 text-white text-sm font-bold rounded-lg"
        >
          Crear orden
        </button>
      </div>
    </div>
  );
};

export default CustomerFicha;
