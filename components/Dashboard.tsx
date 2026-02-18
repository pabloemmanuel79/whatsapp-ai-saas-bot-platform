
import React from 'react';
import { BusinessConfig } from '../types';

const Dashboard: React.FC<{ config: BusinessConfig }> = ({ config }) => {
  const stats = [
    { label: 'Pedidos Hoy', value: '42', trend: '+12%', color: 'text-emerald-600' },
    { label: 'Conversaciones IA', value: '156', trend: '+18%', color: 'text-blue-600' },
    { label: 'Nuevos Clientes', value: '8', trend: '+2', color: 'text-indigo-600' },
    { label: 'Satisifacción', value: '98%', trend: '+0.5%', color: 'text-amber-600' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h3 className="text-3xl font-bold text-slate-900">Bienvenido, {config.name}</h3>
          <p className="text-slate-500">Aquí tienes un resumen de la actividad de tu bot hoy.</p>
        </div>
        <button className="bg-emerald-500 text-white px-6 py-2 rounded-xl font-bold shadow-lg shadow-emerald-500/20 hover:bg-emerald-600 transition-all">
          Generar Reporte
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <p className="text-sm font-semibold text-slate-500 mb-1">{stat.label}</p>
            <div className="flex items-baseline gap-2">
              <span className={`text-3xl font-bold ${stat.color}`}>{stat.value}</span>
              <span className="text-xs font-bold text-emerald-600">{stat.trend}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h4 className="font-bold text-lg mb-4">Últimas Interacciones</h4>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((_, i) => (
              <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-600">
                  {['JD', 'MS', 'RB', 'AL'][i]}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <p className="font-semibold text-sm">Cliente #{1200 + i}</p>
                    <span className="text-[10px] text-slate-400 font-medium">Hace {i + 2}m</span>
                  </div>
                  <p className="text-xs text-slate-500 italic mt-1">"¿Cuándo puedo retirar mi vehículo?"</p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] px-2 py-1 bg-blue-100 text-blue-700 font-bold rounded-full">IA RESPONDIÓ</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h4 className="font-bold text-lg mb-4">Estado del Sistema</h4>
          <div className="space-y-6">
            <div className="flex flex-col gap-2">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-slate-500 uppercase">Uso de Tokens (Mes)</span>
                <span>65%</span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 w-[65%]"></div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-slate-500 uppercase">Tiempo de Respuesta</span>
                <span>1.2s</span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 w-[40%]"></div>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-slate-100">
              <p className="text-xs text-slate-400 text-center">IA impulsada por Gemini 3 Flash Preview</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
