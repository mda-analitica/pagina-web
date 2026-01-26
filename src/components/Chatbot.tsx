import { useState, useEffect, useRef } from 'react';

interface Message {
  id: number;
  type: 'bot' | 'user';
  text: string;
  timestamp: number;
}

const STORAGE_KEY = 'mda-chat-history';
const MAX_STORED_MESSAGES = 50;

const suggestions = [
  '¿Cuáles son los riesgos SARLAFT?',
  'Generar reporte de cumplimiento',
  'Ver normativa vigente 2024',
];

const botResponses: Record<string, string> = {
  'sarlaft': 'Los principales riesgos SARLAFT incluyen: lavado de activos, financiación del terrorismo, y proliferación de armas. Nuestro sistema monitorea transacciones inusuales, PEPs, y listas restrictivas en tiempo real.',
  'reporte': 'Para generar un reporte de cumplimiento, acceda al módulo de Intelligence Hub y seleccione "Generar Reporte". Puede personalizar el período, entidad y tipo de análisis.',
  'normativa': 'La normativa vigente 2024 incluye actualizaciones de la Circular Externa 027 de la SFC, resolución 314 de la UIAF, y los lineamientos GAFI actualizados. ¿Desea más detalles sobre alguna normativa específica?',
  'default': 'Gracias por tu consulta. Puedo ayudarte con información sobre SARLAFT, SAGRILAFT, PTEE, reportes de cumplimiento y normativas vigentes. ¿En qué tema específico necesitas ayuda?',
};

function getResponseForMessage(message: string): string {
  const lowerMessage = message.toLowerCase();
  if (lowerMessage.includes('sarlaft') || lowerMessage.includes('riesgo')) {
    return botResponses['sarlaft'];
  }
  if (lowerMessage.includes('reporte') || lowerMessage.includes('generar')) {
    return botResponses['reporte'];
  }
  if (lowerMessage.includes('normativa') || lowerMessage.includes('2024') || lowerMessage.includes('vigente')) {
    return botResponses['normativa'];
  }
  return botResponses['default'];
}

// Typing indicator component
function TypingIndicator() {
  return (
    <div className="flex gap-3">
      <div className="size-8 rounded-full bg-gradient-to-br from-primary to-teal-600 flex items-center justify-center text-white shadow-sm flex-shrink-0 mt-1">
        <span className="material-symbols-outlined text-[16px]">smart_toy</span>
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-[11px] font-bold text-gray-500 dark:text-gray-400 ml-1">Asistente Normativo</span>
        <div className="p-4 bg-white dark:bg-gray-800 rounded-2xl rounded-tl-none border border-gray-100 dark:border-gray-700 shadow-sm">
          <div className="flex gap-1 items-center h-5">
            <span className="typing-dot w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
            <span className="typing-dot w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
            <span className="typing-dot w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load messages from localStorage
  const [messages, setMessages] = useState<Message[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Check if messages are from today
        const today = new Date().toDateString();
        const messagesFromToday = parsed.filter((m: Message) =>
          new Date(m.timestamp).toDateString() === today
        );
        if (messagesFromToday.length > 0) {
          return messagesFromToday;
        }
      }
    } catch (e) {
      console.error('Error loading chat history:', e);
    }
    return [{
      id: 1,
      type: 'bot' as const,
      text: 'Hola, soy el asistente normativo de MDA. ¿En qué puedo ayudarte hoy? Podemos hablar sobre SAGRILAFT, SARLAFT o el análisis de tus informes.',
      timestamp: Date.now(),
    }];
  });

  const [inputValue, setInputValue] = useState('');

  // Save messages to localStorage
  useEffect(() => {
    if (messages.length > 0) {
      const toStore = messages.slice(-MAX_STORED_MESSAGES);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(toStore));
    }
  }, [messages]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Check if modal is open and hide chatbot
  useEffect(() => {
    const checkModalState = () => {
      const modalOpen = document.body.hasAttribute('data-modal-open');
      setIsHidden(modalOpen);
      if (modalOpen && isOpen) {
        setIsOpen(false);
      }
    };

    checkModalState();
    const observer = new MutationObserver(checkModalState);
    observer.observe(document.body, { attributes: true, attributeFilter: ['data-modal-open'] });

    return () => observer.disconnect();
  }, [isOpen]);

  const handleSend = (messageText?: string) => {
    const text = messageText || inputValue;
    if (!text.trim()) return;

    const newMessage: Message = {
      id: Date.now(),
      type: 'user',
      text: text.trim(),
      timestamp: Date.now(),
    };

    setMessages(prev => [...prev, newMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot response with typing delay
    const responseDelay = 1000 + Math.random() * 1000;
    setTimeout(() => {
      setIsTyping(false);
      const botResponse: Message = {
        id: Date.now() + 1,
        type: 'bot',
        text: getResponseForMessage(text),
        timestamp: Date.now(),
      };
      setMessages(prev => [...prev, botResponse]);
    }, responseDelay);
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSend(suggestion);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const clearHistory = () => {
    localStorage.removeItem(STORAGE_KEY);
    setMessages([{
      id: Date.now(),
      type: 'bot',
      text: 'Historial limpiado. ¿En qué puedo ayudarte?',
      timestamp: Date.now(),
    }]);
  };

  // Don't render anything if modal is open
  if (isHidden) {
    return null;
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-[100] w-14 h-14 bg-primary hover:bg-teal-700 text-white rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        aria-label="Abrir chat de asistencia"
        data-chatbot-trigger
      >
        <span className="material-symbols-outlined text-2xl">chat</span>
      </button>
    );
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#0e111b]/50 backdrop-blur-[2px] z-[90] animate-fadeIn"
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      {/* Chat window */}
      <div
        className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-[100] flex flex-col items-end"
        role="dialog"
        aria-modal="true"
        aria-label="Chat de asistencia MDA"
      >
        <div className="w-[360px] md:w-[400px] h-[600px] max-h-[85vh] bg-white dark:bg-background-dark rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden flex flex-col font-display relative animate-slideIn">
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
                  <span className="text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    {isTyping ? 'Escribiendo...' : 'Online'}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex gap-1">
              <button
                onClick={clearHistory}
                className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full text-gray-400 transition-colors"
                aria-label="Limpiar historial"
                title="Limpiar historial"
              >
                <span className="material-symbols-outlined text-[20px]">delete</span>
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full text-gray-400 transition-colors"
                aria-label="Cerrar chat"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
          </div>

          {/* Messages */}
          <div
            className="flex-1 bg-pearl dark:bg-[#0b0e14] p-5 overflow-y-auto no-scrollbar"
            role="log"
            aria-live="polite"
            aria-label="Mensajes del chat"
          >
            <div className="space-y-6">
              <div className="flex justify-center my-2">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest bg-gray-200/50 dark:bg-gray-800 px-3 py-1 rounded-full">Hoy</span>
              </div>

              {messages.map((message) => (
                <div key={message.id} className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : ''} animate-fadeIn`}>
                  {message.type === 'bot' && (
                    <div className="size-8 rounded-full bg-gradient-to-br from-primary to-teal-600 flex items-center justify-center text-white shadow-sm flex-shrink-0 mt-1">
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
                    <span className="text-[10px] text-gray-400 mx-1">
                      {new Date(message.timestamp).toLocaleTimeString('es', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              ))}

              {isTyping && <TypingIndicator />}

              <div ref={messagesEndRef} />
            </div>

            {/* Suggestions - only show if few messages */}
            {messages.length <= 2 && !isTyping && (
              <div className="mt-8 flex flex-col gap-2">
                <p className="text-[10px] uppercase font-bold text-gray-400 ml-1 mb-1">Sugerencias</p>
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="w-full text-left p-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 hover:border-primary/30 dark:hover:border-teal-500/30 hover:shadow-md transition-all duration-300 text-xs font-medium text-gray-600 dark:text-gray-300 flex items-center justify-between group"
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
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full bg-gray-50 dark:bg-[#1a202e] text-gray-800 dark:text-gray-200 text-sm rounded-xl py-3.5 pl-4 pr-12 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary/20 focus:border-primary dark:focus:border-teal-500 outline-none transition-all placeholder-gray-400 shadow-inner"
                placeholder="Escribe un mensaje..."
                aria-label="Mensaje"
                disabled={isTyping}
              />
              <button
                onClick={() => handleSend()}
                disabled={!inputValue.trim() || isTyping}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-primary hover:bg-teal-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg transition-colors duration-300 flex items-center justify-center shadow-md"
                aria-label="Enviar mensaje"
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

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(20px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }
        .typing-dot {
          animation-duration: 0.6s;
        }
      `}</style>
    </>
  );
}
