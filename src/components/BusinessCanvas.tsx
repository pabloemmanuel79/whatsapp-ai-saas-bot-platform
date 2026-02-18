import React from 'react';

const BusinessCanvasView: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
        <h3 className="text-2xl font-bold mb-6 text-slate-900">Business Model Canvas - WhatsApp AI SaaS</h3>
        <p className="text-sm text-slate-600 leading-relaxed">
          El canvas actual se mantiene para no romper layout. El foco del MVP en este incremento es CRM multi-tenant,
          autenticacion y persistencia real por API.
        </p>
      </div>
    </div>
  );
};

export default BusinessCanvasView;
