
import React, { useState } from 'react';
import { Customer } from '../types';
import CustomerFicha from './CustomerFicha';

const CRMView: React.FC = () => {
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [customers] = useState<Customer[]>([
    {
      id: '1',
      name: 'Juan Pérez',
      phone: '+54 11 1234 5678',
      email: 'juan.perez@email.com',
      vehicle: { brand: 'Toyota', model: 'Hilux', plate: 'AD123BC', year: '2022', color: 'Gris Plata' },
      status: 'active',
      history: [
        { id: 'h1', date: '2023-10-15', description: 'Cambio de aceite y filtros', cost: 150, mechanic: 'Carlos G.', notes: 'Se recomienda revisar pastillas en 5000km.' },
        { id: 'h2', date: '2023-05-10', description: 'Rotación de neumáticos', cost: 45, mechanic: 'Santi R.' }
      ]
    },
    {
      id: '2',
      name: 'María García',
      phone: '+54 11 8765 4321',
      vehicle: { brand: 'VW', model: 'Gol Trend', plate: 'FE999ZZ', year: '2019', color: 'Blanco' },
      status: 'pending',
      history: [{ id: 'h3', date: '2023-11-01', description: 'Alineación y balanceo', cost: 80, mechanic: 'Carlos G.' }]
    },
    {
      id: '3',
      name: 'Roberto Sánchez',
      phone: '+54 11 5555 4444',
      vehicle: { brand: 'Ford', model: 'Focus', plate: 'KK345LL', year: '2021', color: 'Azul' },
      status: 'completed',
      history: [{ id: 'h4', date: '2023-11-20', description: 'Revisión técnica general', cost: 45, mechanic: 'Santi R.' }]
    }
  ]);

  if (selectedCustomer) {
    return <CustomerFicha customer={selectedCustomer} onBack={() => setSelectedCustomer(null)} />;
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
        <h3 className="font-bold text-lg">Directorio de Clientes</h3>
        <div className="flex gap-2">
          <input 
            type="text" 
            placeholder="Buscar por nombre o patente..." 
            className="text-sm px-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 w-64"
          />
        </div>
      </div>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="text-[10px] uppercase tracking-wider text-slate-400 font-bold border-b border-slate-100 bg-slate-50">
            <th className="px-6 py-4">Cliente</th>
            <th className="px-6 py-4">Teléfono</th>
            <th className="px-6 py-4">Vehículo</th>
            <th className="px-6 py-4">Estado</th>
            <th className="px-6 py-4">Última Acción</th>
            <th className="px-6 py-4 text-right">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {customers.map((c) => (
            <tr key={c.id} className="hover:bg-slate-50 transition-colors">
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500">
                    {c.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <span className="font-semibold text-slate-700">{c.name}</span>
                </div>
              </td>
              <td className="px-6 py-4 text-sm text-slate-500 font-mono">{c.phone}</td>
              <td className="px-6 py-4">
                <div className="text-sm font-medium text-slate-600">{c.vehicle.brand} {c.vehicle.model}</div>
                <div className="text-[10px] font-mono text-slate-400">{c.vehicle.plate}</div>
              </td>
              <td className="px-6 py-4">
                <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase ${
                  c.status === 'active' ? 'bg-emerald-100 text-emerald-700' :
                  c.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                  'bg-slate-100 text-slate-500'
                }`}>
                  {c.status}
                </span>
              </td>
              <td className="px-6 py-4 text-xs text-slate-500">{c.history[0]?.description}</td>
              <td className="px-6 py-4 text-right">
                <button 
                  onClick={() => setSelectedCustomer(c)}
                  className="text-emerald-500 hover:text-emerald-700 font-bold text-xs"
                >
                  Ver Ficha
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CRMView;
