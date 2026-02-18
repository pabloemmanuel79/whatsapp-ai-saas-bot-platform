
import React from 'react';

const BusinessCanvasView: React.FC = () => {
  const blocks = [
    { title: 'Asociaciones Clave', content: 'Proveedores de API de WhatsApp (Meta), Desarrolladores de IA (Google/OpenAI), Pasarelas de Pago (Stripe/MercadoPago).', color: 'bg-emerald-50' },
    { title: 'Actividades Clave', content: 'Desarrollo de IA conversacional, Mantenimiento de infraestructura SaaS, Soporte al cliente técnico, Integración con CRMs.', color: 'bg-emerald-50' },
    { title: 'Propuesta de Valor', content: 'Automatización 24/7 de toma de pedidos y gestión de servicios vía WhatsApp, IA con contexto específico del negocio, Escalabilidad SaaS.', color: 'bg-emerald-100' },
    { title: 'Relación con Clientes', content: 'Auto-servicio (SaaS), Soporte premium para cuentas corporativas, Actualizaciones continuas de IA.', color: 'bg-emerald-50' },
    { title: 'Segmentos de Clientes', content: 'Gastronomía (Restaurantes), Talleres Mecánicos, Centros de Estética, Servicios de Delivery, Pymes que usan WhatsApp.', color: 'bg-emerald-50' },
    { title: 'Recursos Clave', content: 'Plataforma SaaS, Modelos LLM (Gemini), Equipo de ingeniería, Base de datos de clientes.', color: 'bg-emerald-50' },
    { title: 'Canales', content: 'WhatsApp Business API, Web App Admin Dashboard, Marketing digital (B2B).', color: 'bg-emerald-50' },
    { title: 'Estructura de Costes', content: 'Hosting Cloud, Consumo de Tokens API, Desarrollo de Software, Marketing y Ventas.', color: 'bg-slate-100' },
    { title: 'Flujos de Ingresos', content: 'Suscripciones mensuales/anuales (Tiered Pricing), Fee por configuración inicial, Comisión por transacción (opcional).', color: 'bg-emerald-200' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
        <h3 className="text-2xl font-bold mb-6 text-slate-900">Business Model Canvas - WhatsApp AI SaaS</h3>
        <div className="grid grid-cols-5 grid-rows-2 gap-4 h-[600px]">
          <div className={`${blocks[0].color} p-4 border rounded-xl row-span-2`}>
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-500 mb-2">{blocks[0].title}</h4>
            <p className="text-sm text-slate-700 leading-relaxed">{blocks[0].content}</p>
          </div>
          <div className="flex flex-col gap-4 row-span-2">
            <div className={`${blocks[1].color} p-4 border rounded-xl flex-1`}>
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-500 mb-2">{blocks[1].title}</h4>
              <p className="text-sm text-slate-700 leading-relaxed">{blocks[1].content}</p>
            </div>
            <div className={`${blocks[5].color} p-4 border rounded-xl flex-1`}>
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-500 mb-2">{blocks[5].title}</h4>
              <p className="text-sm text-slate-700 leading-relaxed">{blocks[5].content}</p>
            </div>
          </div>
          <div className={`${blocks[2].color} p-4 border rounded-xl row-span-2`}>
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-500 mb-2">{blocks[2].title}</h4>
            <p className="text-sm text-slate-900 font-medium leading-relaxed">{blocks[2].content}</p>
          </div>
          <div className="flex flex-col gap-4 row-span-2">
            <div className={`${blocks[3].color} p-4 border rounded-xl flex-1`}>
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-500 mb-2">{blocks[3].title}</h4>
              <p className="text-sm text-slate-700 leading-relaxed">{blocks[3].content}</p>
            </div>
            <div className={`${blocks[6].color} p-4 border rounded-xl flex-1`}>
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-500 mb-2">{blocks[6].title}</h4>
              <p className="text-sm text-slate-700 leading-relaxed">{blocks[6].content}</p>
            </div>
          </div>
          <div className={`${blocks[4].color} p-4 border rounded-xl row-span-2`}>
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-500 mb-2">{blocks[4].title}</h4>
            <p className="text-sm text-slate-700 leading-relaxed">{blocks[4].content}</p>
          </div>
          <div className={`${blocks[7].color} p-4 border rounded-xl col-span-2`}>
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-500 mb-2">{blocks[7].title}</h4>
            <p className="text-sm text-slate-700 leading-relaxed">{blocks[7].content}</p>
          </div>
          <div className={`${blocks[8].color} p-4 border rounded-xl col-span-3`}>
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-500 mb-2">{blocks[8].title}</h4>
            <p className="text-sm text-slate-900 font-semibold leading-relaxed">{blocks[8].content}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessCanvasView;
