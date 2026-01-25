import { useState } from 'react';

interface Message {
  id: number;
  type: 'bot' | 'user';
  text: string;
}

const suggestions = [
  '¿Cuáles son los riesgos SARLAFT?',
  'Generar reporte de cumplimiento',
  'Ver normativa vigente 2024',
];

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: 'bot',
      text: 'Hola, soy el asistente normativo de MDA. ¿En qué puedo ayudarte hoy? Podemos hablar sobre SAGRILAFT, SARLAFT o el análisis de tus informes.',
    },
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: messages.length + 1,
      type: 'user',
      text: inputValue,
    };

    setMessages([...messages, newMessage]);
    setInputValue('');

    // Simular respuesta del bot
    setTimeout(() => {
      const botResponse: Message = {
        id: messages.length + 2,
        type: 'bot',
        text: 'Gracias por tu consulta. Un especialista revisará tu solicitud y te contactará pronto.',
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 1000);
  };

  const handleSuggestion = (suggestion: string) => {
    setInputValue(suggestion);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-[100] w-14 h-14 bg-primary hover:bg-blue-700 text-white rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110"
        aria-label="Abrir chat"
      >
        <span className="material-symbols-outlined text-2xl">chat</span>
      </button>
    );
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#0e111b]/50 backdrop-blur-[2px] z-[90]"
        onClick={() => setIsOpen(false)}
      />

      {/* Chat window */}
      <div className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-[100] flex flex-col items-end">
        <div className="w-[360px] md:w-[400px] h-[600px] max-h-[85vh] bg-white dark:bg-background-dark rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden flex flex-col font-display relative animate-in">
          {/* Header */}
          <div className="h-16 px-5 flex items-center justify-between border-b border-gray-100 dark:border-gray-800 bg-white/95 dark:bg-background-dark/95 backdrop-blur-md sticky top-0 z-10">
            <div className="flex items-center gap-3">
              <div className="size-9 text-primary bg-primary/10 rounded-lg p-1.5 flex items-center justify-center">
                <svg className="w-full h-full" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24 45.8096C19.6865 45.8096 15.4698 44.5305 11.8832 42.134C8.29667 39.7376 5.50128 36.3314 3.85056 32.3462C2.19985 28.361 1.76794 23.9758 2.60947 19.7452C3.451 15.5145 5.52816 11.6284 8.57829 8.5783C11.6284 5.52817 15.5145 3.45101 19.7452 2.60948C23.9758 1.76795 28.361 2.19986 32.3462 3.85057C36.3314 5.50129 39.7376 8.29668 42.134 11.8833C44.5305 15.4698 45.8096 19.6865 45.8096 24L24 24L24 45.8096Z" fill="currentColor"></path>
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-900 dark:text-white leading-none mb-1">Asistente MDA</h3>
                <div className="flex items-center gap-1.5">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-green opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-green"></span>
                  </span>
                  <span className="text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Online</span>
                </div>
              </div>
            </div>
            <div className="flex gap-1">
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full text-gray-400 transition-colors"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 bg-pearl dark:bg-[#0b0e14] p-5 overflow-y-auto no-scrollbar">
            <div className="space-y-6">
              <div className="flex justify-center my-2">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest bg-gray-200/50 dark:bg-gray-800 px-3 py-1 rounded-full">Hoy</span>
              </div>

              {messages.map((message) => (
                <div key={message.id} className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : ''}`}>
                  {message.type === 'bot' && (
                    <div className="size-8 rounded-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-white shadow-sm flex-shrink-0 mt-1">
                      <span className="material-symbols-outlined text-[16px]">smart_toy</span>
                    </div>
                  )}
                  <div className={`flex flex-col gap-1 max-w-[85%] ${message.type === 'user' ? 'items-end' : ''}`}>
                    {message.type === 'bot' && (
                      <span className="text-[11px] font-bold text-gray-500 dark:text-gray-400 ml-1">Asistente Normativo</span>
                    )}
                    <div className={`p-4 rounded-2xl shadow-sm text-sm leading-relaxed ${
                      message.type === 'bot'
                        ? 'bg-white dark:bg-gray-800 rounded-tl-none border border-gray-100 dark:border-gray-700 text-gray-600 dark:text-gray-300'
                        : 'bg-primary text-white rounded-tr-none'
                    }`}>
                      <p>{message.text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Suggestions */}
            {messages.length === 1 && (
              <div className="mt-12 flex flex-col gap-2">
                <p className="text-[10px] uppercase font-bold text-gray-400 ml-1 mb-1">Sugerencias</p>
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestion(suggestion)}
                    className="w-full text-left p-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 hover:border-primary/30 dark:hover:border-blue-500/30 hover:shadow-md transition-all text-xs font-medium text-gray-600 dark:text-gray-300 flex items-center justify-between group"
                  >
                    <span>{suggestion}</span>
                    <span className="material-symbols-outlined text-[16px] text-gray-300 group-hover:text-primary transition-colors">arrow_forward</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 bg-white dark:bg-background-dark border-t border-gray-100 dark:border-gray-800">
            <div className="relative group">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                className="w-full bg-gray-50 dark:bg-[#1a202e] text-gray-800 dark:text-gray-200 text-sm rounded-xl py-3.5 pl-4 pr-12 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary/20 focus:border-primary dark:focus:border-blue-500 outline-none transition-all placeholder-gray-400 shadow-inner"
                placeholder="Escribe un mensaje..."
              />
              <button
                onClick={handleSend}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-primary hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center justify-center shadow-md"
              >
                <span className="material-symbols-outlined text-[18px]">send</span>
              </button>
            </div>
            <div className="flex justify-center mt-3 gap-2 text-[10px] text-gray-400">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[10px]">lock</span> Encrypted
              </span>
              <span>•</span>
              <span>Powered by MDA Core</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
