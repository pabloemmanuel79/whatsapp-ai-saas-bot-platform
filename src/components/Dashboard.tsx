import React from 'react';
import { BusinessConfig } from '@/types';

const Dashboard: React.FC<{ config: BusinessConfig }> = ({ config }) => {
  const stats = [
    { label: 'Leads hoy', value: '42', trend: '+12%', color: 'text-emerald-600' },
    { label: 'Conversaciones IA', value: '156', trend: '+18%', color: 'text-blue-600' },
    { label: 'Nuevos clientes', value: '8', trend: '+2', color: 'text-indigo-600' },
    { label: 'Satisfaccion', value: '98%', trend: '+0.5%', color: 'text-amber-600' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h3 className="text-3xl font-bold text-slate-900">Bienvenido, {config.name}</h3>
          <p className="text-slate-500">Resumen rapido de actividad de tu tenant.</p>
        </div>
        <button className="bg-emerald-500 text-white px-6 py-2 rounded-xl font-bold shadow-lg shadow-emerald-500/20 hover:bg-emerald-600 transition-all">
          Generar reporte
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <p className="text-sm font-semibold text-slate-500 mb-1">{stat.label}</p>
            <div className="flex items-baseline gap-2">
              <span className={`text-3xl font-bold ${stat.color}`}>{stat.value}</span>
              <span className="text-xs font-bold text-emerald-600">{stat.trend}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
