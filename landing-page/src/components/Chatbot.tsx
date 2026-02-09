import { useState, useEffect, useRef, useCallback } from 'react';
import { MessageCircle, X, Bot, Send, Lock, Loader2, RotateCcw, Maximize2, Minimize2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface Message {
  id: number;
  role: 'user' | 'assistant';
  content: string;
}

const INITIAL_MESSAGE: Message = {
  id: 1,
  role: 'assistant',
  content:
    'Hola, soy el asistente de MDA Analítica. ¿En qué puedo ayudarte hoy?',
};

// Preguntas frecuentes sugeridas
const SUGGESTED_QUESTIONS = [
  '¿Qué es RIF-Analytic?',
  '¿De donde salen los datos de RIF-Analytic?',
  '¿Puedo tener RIF-Analytic con los datos de mi cooperativa?',
];

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

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

  // Cleanup abort controller on unmount
  useEffect(() => {
    return () => {
      abortControllerRef.current?.abort();
    };
  }, []);

  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || isLoading) return;

      const userMessage: Message = {
        id: Date.now(),
        role: 'user',
        content: text.trim(),
      };
      const updatedMessages = [...messages, userMessage];
      setMessages(updatedMessages);
      setInputValue('');
      setIsLoading(true);

      // Prepare conversation history for API (exclude initial message ID logic, just send roles+content)
      const chatHistory = updatedMessages.map((m) => ({
        role: m.role,
        content: m.content,
      }));

      // Create placeholder for streaming response
      const assistantMessageId = Date.now() + 1;
      setMessages((prev) => [
        ...prev,
        { id: assistantMessageId, role: 'assistant', content: '' },
      ]);

      const controller = new AbortController();
      abortControllerRef.current = controller;

      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: chatHistory }),
          signal: controller.signal,
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => null);
          throw new Error(
            errorData?.error || `Error del servidor (${response.status})`
          );
        }

        const reader = response.body?.getReader();
        if (!reader) throw new Error('No response stream');

        const decoder = new TextDecoder();
        let buffer = '';

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop() || '';

          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed || !trimmed.startsWith('data: ')) continue;

            const data = trimmed.slice(6);
            if (data === '[DONE]') break;

            try {
              const parsed = JSON.parse(data);
              if (parsed.error) throw new Error(parsed.error);
              if (parsed.content) {
                setMessages((prev) =>
                  prev.map((m) =>
                    m.id === assistantMessageId
                      ? { ...m, content: m.content + parsed.content }
                      : m
                  )
                );
              }
            } catch (parseError) {
              if (parseError instanceof Error && parseError.message !== data) {
                throw parseError;
              }
            }
          }
        }
      } catch (error) {
        if ((error as Error).name === 'AbortError') return;

        const errorText =
          error instanceof Error
            ? error.message
            : 'Lo siento, hubo un error al procesar tu consulta. Por favor intenta de nuevo.';

        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantMessageId
              ? { ...m, content: m.content || errorText }
              : m
          )
        );
      } finally {
        setIsLoading(false);
        abortControllerRef.current = null;
      }
    },
    [messages, isLoading]
  );

  const handleSend = () => {
    sendMessage(inputValue);
  };

  const resetChat = () => {
    // Cancelar cualquier petición en curso
    abortControllerRef.current?.abort();
    // Reiniciar mensajes al estado inicial
    setMessages([INITIAL_MESSAGE]);
    // Limpiar input
    setInputValue('');
    // Resetear loading
    setIsLoading(false);
  };

  // Don't render anything if modal is open
  if (isHidden) {
    return null;
  }

  if (!isOpen) {
    return (
      <div className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-40 flex items-center gap-3">
        <div className="bg-white px-4 py-2 rounded-full shadow-lg border border-gray-200 animate-pulse">
          <p className="text-sm font-semibold text-gray-800 whitespace-nowrap">Habla con la IA</p>
        </div>
        <button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 bg-primary hover:bg-[#1475BB] text-white rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110"
          aria-label="Abrir chat"
          data-chatbot-trigger
        >
          <MessageCircle size={28} />
        </button>
      </div>
    );
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#0e111b]/50 backdrop-blur-[2px] z-40"
        onClick={() => setIsOpen(false)}
      />

      {/* Chat window */}
      <div className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-50 flex flex-col items-end">
        <div className={`${isExpanded
          ? 'w-[90vw] md:w-[700px] lg:w-[900px] h-[85vh]'
          : 'w-[360px] md:w-[400px] h-[600px] max-h-[85vh]'} bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col font-display relative animate-in transition-all duration-300`}>
          {/* Header */}
          <div className="h-16 px-5 flex items-center justify-between border-b border-gray-100 bg-white/95 backdrop-blur-md sticky top-0 z-10">
            <div className="flex items-center gap-3">
              <div>
                <h3 className="text-sm font-bold text-gray-900 leading-none mb-1">Asistente MDA</h3>
                <div className="flex items-center gap-1.5">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-green opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-green"></span>
                  </span>
                  <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Online</span>
                </div>
              </div>
            </div>
            <div className="flex gap-1">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-1.5 hover:bg-gray-100 rounded-full text-gray-400 hover:text-primary transition-colors"
                title={isExpanded ? "Reducir" : "Ampliar"}
              >
                {isExpanded ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
              </button>
              <button
                onClick={resetChat}
                className="p-1.5 hover:bg-gray-100 rounded-full text-gray-400 hover:text-primary transition-colors"
                title="Nuevo chat"
              >
                <RotateCcw size={18} />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 hover:bg-gray-100 rounded-full text-gray-400 transition-colors"
                title="Cerrar"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 bg-pearl p-5 overflow-y-auto no-scrollbar">
            <div className="space-y-6">
              <div className="flex justify-center my-2">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest bg-gray-200/50 px-3 py-1 rounded-full">Hoy</span>
              </div>

              {messages.map((message) => (
                <div key={message.id} className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : ''}`}>
                  {message.role === 'assistant' && (
                    <div className="size-8 rounded-full bg-linear-to-br from-primary to-accent-green flex items-center justify-center text-white shadow-sm shrink-0 mt-1">
                      <Bot size={16} />
                    </div>
                  )}
                  <div className={`flex flex-col gap-1 max-w-[85%] ${message.role === 'user' ? 'items-end' : ''}`}>
                    {message.role === 'assistant' && (
                      <span className="text-[11px] font-bold text-gray-500 ml-1">Asistente con Inteligencia Artificial</span>
                    )}
                    <div className={`p-4 rounded-2xl shadow-sm text-sm leading-relaxed ${message.role === 'assistant'
                      ? 'bg-white rounded-tl-none border border-gray-100 text-gray-600'
                      : 'bg-primary text-white rounded-tr-none'
                      }`}>
                      {message.role === 'assistant' && message.content === '' && isLoading ? (
                        <div className="flex items-center gap-2">
                          <Loader2 size={14} className="animate-spin" />
                          <span className="text-gray-400 text-xs">Pensando...</span>
                        </div>
                      ) : message.role === 'assistant' ? (
                        <div className="prose prose-sm max-w-none">
                        <ReactMarkdown
                          components={{
                            h1: (props) => <h1 className="text-lg font-bold mb-2 text-gray-900" {...props} />,
                            h2: (props) => <h2 className="text-base font-bold mb-2 text-gray-900" {...props} />,
                            h3: (props) => <h3 className="text-sm font-bold mb-1 text-gray-900" {...props} />,
                            p: (props) => <p className="mb-2 last:mb-0" {...props} />,
                            a: (props) => <a className="text-primary underline font-semibold hover:opacity-80" target="_blank" rel="noopener noreferrer" {...props} />,
                            ul: (props) => <ul className="list-disc list-inside mb-2 space-y-1" {...props} />,
                            ol: (props) => <ol className="list-decimal list-inside mb-2 space-y-1" {...props} />,
                            li: (props) => <li className="ml-2" {...props} />,
                            strong: (props) => <strong className="font-bold text-gray-900" {...props} />,
                            em: (props) => <em className="italic" {...props} />,
                            code: (props: any) => {
                              const { inline, ...rest } = props;
                              return inline ?
                                <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs font-mono text-gray-800" {...rest} /> :
                                <code className="block bg-gray-100 p-2 rounded text-xs font-mono text-gray-800 my-2" {...rest} />;
                            }
                          }}
                        >
                          {message.content}
                        </ReactMarkdown>
                      </div>
                      ) : (
                        <p className="whitespace-pre-wrap">{message.content}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Sugerencias de preguntas (solo cuando hay pocos mensajes) */}
            {messages.length <= 2 && !isLoading && (
              <div className="px-5 pb-4">
                <p className="text-xs font-semibold text-gray-500 mb-3">Preguntas frecuentes:</p>
                <div className="grid grid-cols-1 gap-2">
                  {SUGGESTED_QUESTIONS.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => sendMessage(question)}
                      className="text-left text-sm px-4 py-3 rounded-xl bg-white border border-gray-200 hover:border-primary hover:bg-primary/5 transition-all text-gray-700 hover:text-primary font-medium"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Input */}
          <div className="p-4 bg-white border-t border-gray-100">
            <div className="relative group">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
                disabled={isLoading}
                className="w-full bg-gray-50 text-gray-800 text-sm rounded-xl py-3.5 pl-4 pr-12 border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all duration-200 placeholder-gray-400 shadow-inner disabled:opacity-50"
                placeholder={isLoading ? 'Esperando respuesta...' : 'Escribe un mensaje...'}
              />
              <button
                onClick={handleSend}
                disabled={isLoading || !inputValue.trim()}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-primary hover:bg-[#006060] text-white rounded-xl transition-colors flex items-center justify-center shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
              </button>
            </div>
            <div className="flex justify-center mt-3 gap-2 text-[10px] text-gray-400">
              <span>Desarrollado por MDA Analitica</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
