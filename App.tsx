
import React, { useState } from 'react';
import { View, BusinessConfig } from './types';
import { Icons, COLORS } from './constants';
import Dashboard from './components/Dashboard';
import BusinessCanvasView from './components/BusinessCanvas';
import CRMView from './components/CRM';
import BotSimulator from './components/BotSimulator';
import KnowledgeBaseView from './components/KnowledgeBase';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [businessConfig, setBusinessConfig] = useState<BusinessConfig>({
    name: 'Taller Central AI',
    industry: 'Automotriz',
    knowledgeBase: 'Especialistas en frenos, suspensión y mecánica general. Horario: Lunes a Viernes 9-18hs. Costo revisión: $50.',
    currency: 'USD'
  });

  const renderView = () => {
    switch (currentView) {
      case 'dashboard': return <Dashboard config={businessConfig} />;
      case 'canvas': return <BusinessCanvasView />;
      case 'crm': return <CRMView />;
      case 'bot-simulator': return <BotSimulator config={businessConfig} />;
      case 'knowledge-base': return <KnowledgeBaseView config={businessConfig} setConfig={setBusinessConfig} />;
      default: return <Dashboard config={businessConfig} />;
    }
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <Icons.Dashboard /> },
    { id: 'canvas', label: 'Modelo de Negocio', icon: <Icons.Canvas /> },
    { id: 'crm', label: 'Gestión CRM', icon: <Icons.CRM /> },
    { id: 'bot-simulator', label: 'Simulador Bot', icon: <Icons.Bot /> },
    { id: 'knowledge-base', label: 'Base de Conocimiento', icon: <Icons.Settings /> },
  ];

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col">
        <div className="p-6 border-b border-slate-800 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center font-bold text-white">W</div>
          <h1 className="font-bold text-lg tracking-tight">WhatsApp SaaS</h1>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id as View)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                currentView === item.id 
                  ? 'bg-emerald-500 text-white' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              {item.icon}
              <span className="font-medium text-sm">{item.label}</span>
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-slate-800">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/50">
            <div className="w-8 h-8 rounded-full bg-slate-700"></div>
            <div className="flex-1 overflow-hidden">
              <p className="text-xs font-semibold truncate">Admin Panel</p>
              <p className="text-[10px] text-slate-500 truncate">v1.0.2 - Premium</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-10">
          <h2 className="text-xl font-bold text-slate-800 capitalize">
            {currentView.replace('-', ' ')}
          </h2>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              BOT ACTIVO
            </span>
          </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto">
          {renderView()}
        </div>
      </main>
    </div>
  );
};

export default App;
