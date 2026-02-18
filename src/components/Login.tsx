import React, { useState } from 'react';
import { useAuth } from '@/store/auth';

const Login: React.FC = () => {
  const { login, loading, error } = useAuth();
  const [form, setForm] = useState({
    email: 'admin@tallercentral.ai',
    password: 'demo123',
    tenantId: 'tenant_demo_1',
  });

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await login(form);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
      <form onSubmit={onSubmit} className="w-full max-w-md bg-white border border-slate-200 rounded-2xl shadow-sm p-8 space-y-4">
        <h1 className="text-2xl font-bold text-slate-900">WhatsApp SaaS Login</h1>
        <p className="text-sm text-slate-500">Acceso multi-tenant al panel CRM.</p>

        <div>
          <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Tenant ID</label>
          <input
            value={form.tenantId}
            onChange={(e) => setForm((prev) => ({ ...prev, tenantId: e.target.value }))}
            className="w-full border border-slate-200 rounded-xl px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Email</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
            className="w-full border border-slate-200 rounded-xl px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Password</label>
          <input
            type="password"
            value={form.password}
            onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))}
            className="w-full border border-slate-200 rounded-xl px-3 py-2"
          />
        </div>

        {error ? <p className="text-sm text-rose-600">{error}</p> : null}

        <button
          disabled={loading}
          className="w-full bg-emerald-500 text-white py-3 rounded-xl font-bold hover:bg-emerald-600 disabled:opacity-60"
        >
          {loading ? 'Ingresando...' : 'Ingresar'}
        </button>
      </form>
    </div>
  );
};

export default Login;
