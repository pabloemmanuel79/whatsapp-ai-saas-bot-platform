
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import { Message, BusinessConfig } from '../types';
import { Icons, COLORS } from '../constants';

const BotSimulator: React.FC<{ config: BusinessConfig }> = ({ config }) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: `¡Hola! Bienvenido a ${config.name}. ¿En qué puedo ayudarte hoy?`, timestamp: new Date() }
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
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: (process.env.API_KEY as string) });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [...messages.map(m => ({
          role: m.role === 'model' ? 'model' : 'user',
          parts: [{ text: m.text }]
        })), { role: 'user', parts: [{ text: input }] }],
        config: {
          systemInstruction: `Eres un asistente de IA para ${config.name}, un negocio de tipo ${config.industry}. 
          Tu base de conocimientos es: ${config.knowledgeBase}. 
          Tus respuestas deben ser breves, amigables y en español. 
          Si el usuario pide un servicio, pregunta detalles para agendarlo. 
          Eres un bot de WhatsApp. Usa emojis ocasionalmente.`,
          temperature: 0.7,
        }
      });

      const botMsg: Message = { role: 'model', text: response.text || "Lo siento, hubo un problema.", timestamp: new Date() };
      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'model', text: "Error de conexión con la IA.", timestamp: new Date() }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto h-[600px] bg-slate-200 rounded-[2.5rem] p-4 border-[12px] border-slate-800 shadow-2xl relative overflow-hidden flex flex-col">
      {/* Phone Notch/Status Bar */}
      <div className="h-6 flex justify-between px-6 items-center text-[10px] font-bold text-slate-900">
        <span>9:41</span>
        <div className="flex gap-1">
          <div className="w-4 h-4 rounded-full bg-slate-900/10"></div>
          <div className="w-4 h-4 rounded-full bg-slate-900/10"></div>
        </div>
      </div>

      {/* WhatsApp Header */}
      <div className="bg-[#075E54] text-white p-4 flex items-center gap-3 shadow-md">
        <div className="w-10 h-10 rounded-full bg-slate-200/20 flex items-center justify-center overflow-hidden">
          <Icons.Bot />
        </div>
        <div>
          <h4 className="font-bold text-sm">{config.name}</h4>
          <p className="text-[10px] text-emerald-300">en línea</p>
        </div>
      </div>

      {/* Chat Area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#E5DDD5]"
        style={{ backgroundImage: 'url(https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png)' }}
      >
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-2 rounded-lg text-sm shadow-sm relative ${
              m.role === 'user' ? 'bg-[#DCF8C6] text-slate-800 rounded-tr-none' : 'bg-white text-slate-800 rounded-tl-none'
            }`}>
              <p>{m.text}</p>
              <p className="text-[9px] text-slate-400 text-right mt-1">
                {m.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white p-3 rounded-lg shadow-sm text-xs text-slate-400 animate-pulse">
              Escribiendo...
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-2 bg-[#F0F0F0] flex items-center gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Escribe un mensaje"
          className="flex-1 bg-white px-4 py-2 rounded-full text-sm focus:outline-none"
        />
        <button 
          onClick={handleSend}
          className="w-10 h-10 bg-[#128C7E] text-white rounded-full flex items-center justify-center hover:bg-[#075E54] transition-colors"
        >
          <Icons.Send />
        </button>
      </div>
    </div>
  );
};

export default BotSimulator;
