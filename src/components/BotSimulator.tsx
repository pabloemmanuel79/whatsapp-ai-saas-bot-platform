import React, { useEffect, useRef, useState } from 'react';
import { GoogleGenAI } from '@google/genai';
import { BusinessConfig, Message } from '@/types';
import { Icons } from '@/constants';

const BotSimulator: React.FC<{ config: BusinessConfig }> = ({ config }) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: `Hola! Bienvenido a ${config.name}. En que puedo ayudarte?`, timestamp: new Date() },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = { role: 'user', text: input, timestamp: new Date() };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: (process.env.API_KEY as string) || '' });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [...messages.map((m) => ({ role: m.role === 'model' ? 'model' : 'user', parts: [{ text: m.text }] })), { role: 'user', parts: [{ text: input }] }],
        config: {
          systemInstruction: `Eres un asistente para ${config.name}, industria ${config.industry}. Base: ${config.knowledgeBase}. Responde breve en espanol.`,
          temperature: 0.7,
        },
      });

      setMessages((prev) => [...prev, { role: 'model', text: response.text || 'No pude responder.', timestamp: new Date() }]);
    } catch {
      setMessages((prev) => [...prev, { role: 'model', text: 'Error de conexion con IA.', timestamp: new Date() }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto h-[600px] bg-slate-200 rounded-[2.5rem] p-4 border-[12px] border-slate-800 shadow-2xl relative overflow-hidden flex flex-col">
      <div className="bg-[#075E54] text-white p-4 flex items-center gap-3 shadow-md">
        <div className="w-10 h-10 rounded-full bg-slate-200/20 flex items-center justify-center overflow-hidden">
          <Icons.Bot />
        </div>
        <div>
          <h4 className="font-bold text-sm">{config.name}</h4>
          <p className="text-[10px] text-emerald-300">en linea</p>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#E5DDD5]">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-2 rounded-lg text-sm shadow-sm ${m.role === 'user' ? 'bg-[#DCF8C6]' : 'bg-white'}`}>
              <p>{m.text}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="p-2 bg-[#F0F0F0] flex items-center gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Escribe un mensaje"
          className="flex-1 bg-white px-4 py-2 rounded-full text-sm focus:outline-none"
        />
        <button onClick={handleSend} className="w-10 h-10 bg-[#128C7E] text-white rounded-full flex items-center justify-center hover:bg-[#075E54] transition-colors">
          <Icons.Send />
        </button>
      </div>
    </div>
  );
};

export default BotSimulator;
