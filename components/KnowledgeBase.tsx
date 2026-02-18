
import React from 'react';
import { BusinessConfig } from '../types';

interface KBProps {
  config: BusinessConfig;
  setConfig: React.Dispatch<React.SetStateAction<BusinessConfig>>;
}

const KnowledgeBaseView: React.FC<KBProps> = ({ config, setConfig }) => {
  return (
    <div className="max-w-3xl space-y-6">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
        <h3 className="text-xl font-bold mb-6">Configuración del Cerebro de la IA</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Nombre del Negocio</label>
            <input 
              type="text" 
              value={config.name}
              onChange={(e) => setConfig({ ...config, name: e.target.value })}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Industria / Rubro</label>
            <select 
              value={config.industry}
              onChange={(e) => setConfig({ ...config, industry: e.target.value })}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:outline-none"
            >
              <option>Automotriz</option>
              <option>Gastronomía</option>
              <option>Estética / Peluquería</option>
              <option>Servicios Médicos</option>
              <option>Retail / Ventas</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Base de Conocimiento (Prompt de Sistema)</label>
            <textarea 
              rows={8}
              value={config.knowledgeBase}
              onChange={(e) => setConfig({ ...config, knowledgeBase: e.target.value })}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:outline-none resize-none font-mono text-sm"
              placeholder="Describe aquí horarios, precios, servicios, políticas de cancelación, etc."
            />
          </div>
          <div className="pt-4">
            <button className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-slate-800 transition-colors shadow-lg">
              Guardar Cambios y Re-entrenar Bot
            </button>
          </div>
        </div>
      </div>

      <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-2xl">
        <h4 className="text-emerald-800 font-bold text-sm mb-2 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
          Consejo de Optimización
        </h4>
        <p className="text-emerald-700 text-xs leading-relaxed">
          Cuanto más detallado seas en la base de conocimiento, mejor responderá el bot. Incluye detalles como: "La revisión básica cuesta $50", "No atendemos feriados", o "El tiempo estimado de entrega es de 48hs".
        </p>
      </div>
    </div>
  );
};

export default KnowledgeBaseView;
