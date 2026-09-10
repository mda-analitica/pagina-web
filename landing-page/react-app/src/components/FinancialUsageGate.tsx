'use client';

import { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { FREE_QUERY_LIMIT, REGISTERED_QUERY_LIMIT, WHATSAPP_CONTACT_URL } from '@/lib/financialBotUsage';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function FinancialUsageGate({
  mode,
  onRegister,
}: {
  mode: 'register' | 'maxed';
  onRegister: (nombre: string, correo: string, empresa: string) => void;
}) {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (mode === 'maxed') {
    return (
      <div className="flex flex-col gap-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl rounded-tl-none p-4">
        <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">
          Alcanzaste el límite de {REGISTERED_QUERY_LIMIT} consultas de la versión gratuita.
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          La versión gratuita cubre 2025 para todo el sector solidario. Escríbenos por WhatsApp si
          necesitas otros periodos (como 2026) o más indicadores.
        </p>
        <a
          href={WHATSAPP_CONTACT_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="self-start flex items-center gap-1.5 text-xs font-semibold bg-primary/10 hover:bg-primary/20 text-primary px-3 py-1.5 rounded-md transition-colors"
        >
          <MessageCircle size={14} />
          Escribir por WhatsApp
        </a>
      </div>
    );
  }

  const isValid =
    nombre.trim().length > 0 && EMAIL_REGEX.test(correo.trim()) && empresa.trim().length > 0;

  const handleSubmit = async () => {
    setSubmitting(true);
    setError(null);
    try {
      const response = await fetch('/api/financial-bot/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: nombre.trim(),
          correo: correo.trim(),
          empresa: empresa.trim(),
        }),
      });
      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.error || 'No se pudo completar el registro.');
      }
      onRegister(nombre.trim(), correo.trim(), empresa.trim());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo completar el registro. Intenta de nuevo.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl rounded-tl-none p-4">
      <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">
        Alcanzaste el límite de {FREE_QUERY_LIMIT} consultas de la versión gratuita.
      </p>
      <p className="text-xs text-gray-500 dark:text-gray-400">
        La versión gratuita cubre 2025 para todo el sector solidario. Regístrate para continuar
        hasta {REGISTERED_QUERY_LIMIT} consultas.
      </p>
      <input
        type="text"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        placeholder="Nombre"
        className="text-sm bg-gray-50 dark:bg-[#1a202e] text-gray-800 dark:text-gray-200 rounded-lg py-2 px-3 border border-gray-200 dark:border-gray-700 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
      />
      <input
        type="email"
        value={correo}
        onChange={(e) => setCorreo(e.target.value)}
        placeholder="Correo electrónico"
        className="text-sm bg-gray-50 dark:bg-[#1a202e] text-gray-800 dark:text-gray-200 rounded-lg py-2 px-3 border border-gray-200 dark:border-gray-700 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
      />
      <input
        type="text"
        value={empresa}
        onChange={(e) => setEmpresa(e.target.value)}
        placeholder="Empresa o cooperativa"
        className="text-sm bg-gray-50 dark:bg-[#1a202e] text-gray-800 dark:text-gray-200 rounded-lg py-2 px-3 border border-gray-200 dark:border-gray-700 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
      />
      {error && <p className="text-xs text-red-600 dark:text-red-400">{error}</p>}
      <button
        onClick={handleSubmit}
        disabled={!isValid || submitting}
        className="self-start text-xs font-semibold bg-primary hover:bg-blue-700 text-white px-3 py-1.5 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {submitting ? 'Registrando...' : 'Registrarme y continuar'}
      </button>
    </div>
  );
}
