'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { MessageCircle, X, Bot, Send, PieChart, Loader2 } from 'lucide-react';
import { renderMessageContent } from '@/lib/renderMessageContent';
import FinancialSuggestionCard from '@/components/FinancialSuggestionCard';
import FinancialLoadingIndicator from '@/components/FinancialLoadingIndicator';
import FinancialUsageGate from '@/components/FinancialUsageGate';
import type { BotFinancieroApiResponse } from '@/lib/financialBot';
import {
  FREE_QUERY_LIMIT,
  REGISTERED_QUERY_LIMIT,
  WHATSAPP_CONTACT_URL,
  getQueryCount,
  getRegistration,
  incrementQueryCount,
  saveRegistration,
} from '@/lib/financialBotUsage';

interface Message {
  id: number;
  role: 'user' | 'assistant';
  content: string;
  suggestion?: BotFinancieroApiResponse;
}

const FINANCIAL_INITIAL_MESSAGE: Message = {
  id: 1,
  role: 'assistant',
  content:
    'Hola, soy el Bot Financiero de MDA. Pregúntame por activos, pasivos, patrimonio, depósitos o ROE de cualquier entidad del sector solidario.\n\n' +
    'Esta es la versión gratuita: cubre datos de 2025 (según lo publicado por la Supersolidaria) y permite hasta 10 consultas por sesión. ' +
    `¿Necesitas otro periodo o más acceso? [Escríbenos por WhatsApp](${WHATSAPP_CONTACT_URL}).`,
};

const MAX_DEMANDA_ATTEMPTS = 10;
const DEMANDA_RETRY_DELAY_MS = 5000;

const FINANCIAL_SUGGESTED_QUERIES = [
  'Calcular el activo de COOPRUDEA',
  'Comparar Coogranada y COOPRUDEA en el saldo de depósitos durante el 2025',
  'Comparar COOPRUDEA y COMEDAL en activos de diciembre del 2025',
];

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [messages, setMessages] = useState<Message[]>([FINANCIAL_INITIAL_MESSAGE]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [retryingIds, setRetryingIds] = useState<Set<number>>(new Set());
  const [usage, setUsage] = useState({ count: 0, registered: false });
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Load usage/registration from localStorage after mount (avoids SSR hydration mismatch)
  useEffect(() => {
    setUsage({ count: getQueryCount(), registered: getRegistration() !== null });
  }, []);

  const gate: 'none' | 'register' | 'maxed' =
    usage.count >= REGISTERED_QUERY_LIMIT
      ? 'maxed'
      : usage.count >= FREE_QUERY_LIMIT && !usage.registered
        ? 'register'
        : 'none';

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
      if (!text.trim() || isLoading || gate !== 'none') return;

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

      // Create placeholder for the assistant response
      const assistantMessageId = Date.now() + 1;
      setMessages((prev) => [
        ...prev,
        { id: assistantMessageId, role: 'assistant', content: '' },
      ]);

      const controller = new AbortController();
      abortControllerRef.current = controller;

      try {
        let suggestion: BotFinancieroApiResponse | null = null;
        let demandaErrorText = 'Nuestro asistente esta experimentando alta demanda. Por favor intente de nuevo en unos segundos.';

        for (let attempt = 1; attempt <= MAX_DEMANDA_ATTEMPTS; attempt++) {
          const response = await fetch('/api/financial-bot', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ messages: chatHistory }),
            signal: controller.signal,
          });

          if (response.status === 429) {
            const errorData = await response.json().catch(() => null);
            demandaErrorText = errorData?.error || demandaErrorText;

            if (attempt === MAX_DEMANDA_ATTEMPTS) break;

            setMessages((prev) =>
              prev.map((m) =>
                m.id === assistantMessageId
                  ? { ...m, content: `Estamos reintentando... (intento ${attempt + 1} de ${MAX_DEMANDA_ATTEMPTS})` }
                  : m
              )
            );
            await new Promise((resolve) => setTimeout(resolve, DEMANDA_RETRY_DELAY_MS));
            if (controller.signal.aborted) return;
            continue;
          }

          if (!response.ok) {
            const errorData = await response.json().catch(() => null);
            throw new Error(
              errorData?.error || `Error del servidor (${response.status})`
            );
          }

          suggestion = (await response.json()) as BotFinancieroApiResponse;
          break;
        }

        if (!suggestion) {
          setMessages((prev) =>
            prev.map((m) => (m.id === assistantMessageId ? { ...m, content: demandaErrorText } : m))
          );
          return;
        }

        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantMessageId
              ? { ...m, content: suggestion!.aclaracion || '', suggestion: suggestion! }
              : m
          )
        );

        const rows = suggestion.resultado && 'rows' in suggestion.resultado ? suggestion.resultado.rows : null;
        if (suggestion.accion === 'consultar_balance' && rows && rows.length > 0) {
          setUsage((prev) => ({ ...prev, count: incrementQueryCount() }));
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
    [messages, isLoading, gate]
  );

  const handleSend = () => {
    sendMessage(inputValue);
  };

  const handleReintentar = useCallback(async (messageId: number, dax: string) => {
    setRetryingIds((prev) => new Set(prev).add(messageId));
    try {
      const target = messages.find((m) => m.id === messageId);
      const response = await fetch('/api/financial-bot/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          dax,
          medida: target?.suggestion?.medida,
          entidades: target?.suggestion?.entidades ?? [],
        }),
      });
      const data = await response.json();
      const resultado = data.resultado ?? { error: data.error || 'No se pudo ejecutar la consulta.' };
      setMessages((prev) =>
        prev.map((m) =>
          m.id === messageId && m.suggestion
            ? { ...m, suggestion: { ...m.suggestion, resultado, conclusion: data.conclusion ?? null } }
            : m
        )
      );
    } catch {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === messageId && m.suggestion
            ? { ...m, suggestion: { ...m.suggestion, resultado: { error: 'No se pudo reintentar. Intenta de nuevo.' } } }
            : m
        )
      );
    } finally {
      setRetryingIds((prev) => {
        const next = new Set(prev);
        next.delete(messageId);
        return next;
      });
    }
  }, [messages]);

  // Don't render anything if modal is open
  if (isHidden) {
    return null;
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-40 w-14 h-14 bg-primary hover:bg-blue-700 text-white rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110"
        aria-label="Abrir chat"
        data-chatbot-trigger
      >
        <MessageCircle size={28} />
      </button>
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
        <div className="w-[360px] md:w-[400px] h-[600px] max-h-[85vh] bg-white dark:bg-background-dark rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden flex flex-col font-display relative animate-in">
          {/* Header */}
          <div className="px-5 pt-4 pb-3 flex flex-col gap-3 border-b border-gray-100 dark:border-gray-800 bg-white/95 dark:bg-background-dark/95 backdrop-blur-md sticky top-0 z-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="size-9 text-primary bg-primary/10 rounded-lg p-1.5 flex items-center justify-center">
                  <PieChart size={24} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white leading-none mb-1">
                    IA Supersolidaria (MDA)
                  </h3>
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
                  <X size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 bg-pearl dark:bg-[#0b0e14] p-5 overflow-y-auto no-scrollbar">
            <div className="space-y-6">
              <div className="flex justify-center my-2">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest bg-gray-200/50 dark:bg-gray-800 px-3 py-1 rounded-full">Hoy</span>
              </div>

              {messages.map((message) => (
                <div key={message.id} className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : ''}`}>
                  {message.role === 'assistant' && (
                    <div className="size-8 rounded-full bg-linear-to-br from-primary to-blue-600 flex items-center justify-center text-white shadow-sm shrink-0 mt-1">
                      <Bot size={16} />
                    </div>
                  )}
                  <div className={`flex flex-col gap-1 max-w-[85%] ${message.role === 'user' ? 'items-end' : ''}`}>
                    {message.role === 'assistant' && (
                      <span className="text-[11px] font-bold text-gray-500 dark:text-gray-400 ml-1">
                        Bot Financiero
                      </span>
                    )}
                    <div className={`p-4 rounded-2xl shadow-sm text-sm leading-relaxed ${message.role === 'assistant'
                      ? 'bg-white dark:bg-gray-800 rounded-tl-none border border-gray-100 dark:border-gray-700 text-gray-600 dark:text-gray-300'
                      : 'bg-primary text-white rounded-tr-none'
                      }`}>
                      {message.role === 'assistant' && message.content === '' && !message.suggestion && isLoading ? (
                        <FinancialLoadingIndicator />
                      ) : message.role === 'assistant' && message.suggestion ? (
                        <FinancialSuggestionCard
                          suggestion={message.suggestion}
                          onConfirmarEntidad={(valor) => sendMessage(`La entidad correcta es ${valor}`)}
                          onReintentar={() =>
                            message.suggestion?.dax_sugerido &&
                            handleReintentar(message.id, message.suggestion.dax_sugerido)
                          }
                          reintentando={retryingIds.has(message.id)}
                        />
                      ) : (
                        <p className="whitespace-pre-wrap">{renderMessageContent(message.content)}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {gate !== 'none' && (
                <div className="flex gap-3">
                  <div className="size-8 rounded-full bg-linear-to-br from-primary to-blue-600 flex items-center justify-center text-white shadow-sm shrink-0 mt-1">
                    <Bot size={16} />
                  </div>
                  <div className="flex flex-col gap-1 max-w-[85%]">
                    <FinancialUsageGate
                      mode={gate}
                      onRegister={(nombre, correo, empresa) => {
                        saveRegistration({ nombre, correo, empresa });
                        setUsage((prev) => ({ ...prev, registered: true }));
                      }}
                    />
                  </div>
                </div>
              )}

              {gate === 'none' && messages.length === 1 && !isLoading && (
                <div className="flex gap-3">
                  <div className="size-8 shrink-0" />
                  <div className="flex flex-col gap-1.5 max-w-[85%]">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider ml-1">
                      Prueba con
                    </span>
                    {FINANCIAL_SUGGESTED_QUERIES.map((query) => (
                      <button
                        key={query}
                        onClick={() => sendMessage(query)}
                        className="text-left text-xs font-medium bg-white dark:bg-gray-800 hover:bg-primary/5 dark:hover:bg-primary/10 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 px-3 py-2 rounded-xl rounded-tl-none transition-colors"
                      >
                        {query}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

          </div>

          {/* Input */}
          <div className="p-4 bg-white dark:bg-background-dark border-t border-gray-100 dark:border-gray-800">
            <div className="relative group">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
                disabled={isLoading || gate !== 'none'}
                className="w-full bg-gray-50 dark:bg-[#1a202e] text-gray-800 dark:text-gray-200 text-sm rounded-xl py-3.5 pl-4 pr-12 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary/20 focus:border-primary dark:focus:border-blue-500 outline-none transition-all placeholder-gray-400 shadow-inner disabled:opacity-50"
                placeholder={
                  gate === 'register'
                    ? 'Regístrate para continuar'
                    : gate === 'maxed'
                      ? 'Límite alcanzado'
                      : isLoading
                        ? 'Esperando respuesta...'
                        : 'Ej: activos de COOPRUDEA en 2025'
                }
              />
              <button
                onClick={handleSend}
                disabled={isLoading || !inputValue.trim() || gate !== 'none'}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-primary hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center justify-center shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
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
