import React, { useEffect, useState } from 'react';
import { getKnowledgeBase, updateKnowledgeBase } from '@/api/knowledgeBase';
import { useAuth } from '@/store/auth';

const KnowledgeBaseView: React.FC = () => {
  const { token, tenantId } = useAuth();
  const [content, setContent] = useState('');
  const [metadataText, setMetadataText] = useState('{"lang":"es","channel":"whatsapp"}');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      if (!tenantId || !token) return;
      setLoading(true);
      try {
        const kb = await getKnowledgeBase(tenantId, token);
        setContent(kb.content);
        setMetadataText(JSON.stringify(kb.metadata, null, 2));
      } finally {
        setLoading(false);
      }
    };
    void load();
  }, [tenantId, token]);

  const onSave = async () => {
    if (!tenantId || !token) return;
    setLoading(true);
    setMessage(null);
    try {
      await updateKnowledgeBase(tenantId, token, {
        content,
        metadata: JSON.parse(metadataText || '{}'),
      });
      setMessage('Base de conocimiento actualizada.');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'No se pudo guardar.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl space-y-6">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
        <h3 className="text-xl font-bold mb-6">Base de Conocimiento por Tenant</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Contenido</label>
            <textarea
              rows={8}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl resize-none"
              placeholder="Reglas del negocio, horarios, politicas, precios."
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Metadata JSON</label>
            <textarea
              rows={6}
              value={metadataText}
              onChange={(e) => setMetadataText(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl resize-none font-mono text-sm"
            />
          </div>
          {message ? <p className="text-sm text-slate-600">{message}</p> : null}
          <button
            onClick={onSave}
            disabled={loading}
            className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-slate-800 disabled:opacity-60"
          >
            {loading ? 'Guardando...' : 'Guardar Base de Conocimiento'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default KnowledgeBaseView;
