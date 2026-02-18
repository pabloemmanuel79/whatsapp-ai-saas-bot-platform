
import React from 'react';
import { Customer } from '../types';

interface FichaProps {
  customer: Customer;
  onBack: () => void;
}

const CustomerFicha: React.FC<FichaProps> = ({ customer, onBack }) => {
  const totalSpent = customer.history.reduce((acc, curr) => acc + curr.cost, 0);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      {/* Header Actions */}
      <div className="flex justify-between items-center">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors font-medium text-sm"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          Volver al Directorio
        </button>
        <div className="flex gap-2">
          <button className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold hover:bg-slate-50">Editar Datos</button>
          <button className="px-4 py-2 bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-500/20 hover:bg-emerald-600 transition-all">Nueva Orden</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Info Card */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6">
              <span className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase ${
                customer.status === 'active' ? 'bg-emerald-100 text-emerald-700' :
                customer.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                'bg-slate-100 text-slate-500'
              }`}>
                {customer.status}
              </span>
            </div>
            
            <div className="flex items-start gap-6">
              <div className="w-20 h-20 rounded-2xl bg-slate-100 flex items-center justify-center text-3xl font-bold text-slate-400 shadow-inner">
                {customer.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900">{customer.name}</h3>
                <p className="text-slate-500 text-sm font-medium mt-1 flex items-center gap-2">
                   <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                   {customer.phone}
                </p>
                <div className="mt-4 flex gap-3">
                  <a 
                    href={`https://wa.me/${customer.phone.replace(/\D/g,'')}`} 
                    target="_blank" 
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#25D366] text-white text-[10px] font-bold rounded-lg hover:bg-[#128C7E] transition-colors"
                  >
                    WhatsApp
                  </a>
                  <button className="text-slate-400 hover:text-slate-600 text-[10px] font-bold flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                    Enviar Email
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-8 mt-10 pt-8 border-t border-slate-100">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Total Invertido</p>
                <p className="text-xl font-bold text-slate-900">${totalSpent}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Visitas Totales</p>
                <p className="text-xl font-bold text-slate-900">{customer.history.length}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Antigüedad</p>
                <p className="text-xl font-bold text-slate-900">1 año</p>
              </div>
            </div>
          </div>

          {/* History Timeline */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
            <h4 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 8v4l3 3"/><circle cx="12" cy="12" r="10"/></svg>
              Historial de Servicios
            </h4>
            <div className="space-y-8 relative before:content-[''] before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-100">
              {customer.history.map((record) => (
                <div key={record.id} className="relative pl-10">
                  <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-white border-4 border-emerald-500 z-10 shadow-sm"></div>
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
                    <div>
                      <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full uppercase">{record.date}</span>
                      <h5 className="font-bold text-slate-800 mt-1">{record.description}</h5>
                      <p className="text-sm text-slate-500 mt-1 leading-relaxed">{record.notes || 'Sin observaciones adicionales.'}</p>
                      <div className="flex gap-4 mt-2">
                         <span className="text-[10px] text-slate-400 flex items-center gap-1 font-medium">
                           Mecánico: <span className="text-slate-700">{record.mechanic}</span>
                         </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-bold text-slate-900">${record.cost}</span>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">FACTURADO</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Cards */}
        <div className="space-y-6">
          {/* Vehicle Card */}
          <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-xl overflow-hidden relative">
            <div className="absolute -right-4 -bottom-4 opacity-10">
              <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/></svg>
            </div>
            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Vehículo Vinculado</h4>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-slate-400 font-medium">Marca y Modelo</p>
                <p className="text-lg font-bold">{customer.vehicle.brand} {customer.vehicle.model}</p>
              </div>
              <div className="flex justify-between">
                <div>
                  <p className="text-xs text-slate-400 font-medium">Patente</p>
                  <p className="text-sm font-mono font-bold uppercase tracking-wider bg-white/10 px-2 py-1 rounded inline-block">{customer.vehicle.plate}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-400 font-medium">Año</p>
                  <p className="text-sm font-bold">{customer.vehicle.year}</p>
                </div>
              </div>
              <div>
                <p className="text-xs text-slate-400 font-medium">Color</p>
                <div className="flex items-center gap-2">
                   <div className="w-3 h-3 rounded-full bg-slate-400 border border-white/20"></div>
                   <p className="text-sm font-medium">{customer.vehicle.color}</p>
                </div>
              </div>
            </div>
            <button className="w-full mt-6 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-bold transition-colors">
              Historial del Vehículo
            </button>
          </div>

          {/* Quick Notes Card */}
          <div className="bg-amber-50 border border-amber-100 p-6 rounded-2xl">
            <h4 className="text-amber-800 font-bold text-sm mb-3 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              Notas Internas
            </h4>
            <textarea 
              className="w-full bg-transparent border-none text-xs text-amber-900/70 focus:ring-0 resize-none font-medium leading-relaxed" 
              rows={4}
              placeholder="Escribe recordatorios sobre este cliente..."
              defaultValue="Cliente recurrente. Muy puntual con los mantenimientos. Prefiere que lo contacten por la tarde."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerFicha;
