'use client';

import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';

const STEPS = [
  'Pensando...',
  'Consultando base de datos...',
  'Cruzando cifras del catálogo...',
  'Calculando resultados...',
  'Armando la respuesta...',
];

const TOKEN_STEP_MIN = 8;
const TOKEN_STEP_MAX = 42;
const TOKEN_CAP = 1400;

export default function FinancialLoadingIndicator() {
  const [stepIndex, setStepIndex] = useState(0);
  const [tokens, setTokens] = useState(0);

  useEffect(() => {
    const stepTimer = setInterval(() => {
      setStepIndex((i) => (i + 1) % STEPS.length);
    }, 1600);

    const tokenTimer = setInterval(() => {
      setTokens((t) => {
        if (t >= TOKEN_CAP) return t;
        const step = Math.floor(Math.random() * (TOKEN_STEP_MAX - TOKEN_STEP_MIN + 1)) + TOKEN_STEP_MIN;
        return Math.min(t + step, TOKEN_CAP);
      });
    }, 220);

    return () => {
      clearInterval(stepTimer);
      clearInterval(tokenTimer);
    };
  }, []);

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-2">
        <Loader2 size={14} className="animate-spin" />
        <span className="text-gray-400 text-xs">{STEPS[stepIndex]}</span>
      </div>
      <span className="text-[10px] text-gray-300 dark:text-gray-600 tabular-nums">
        ~{tokens.toLocaleString('es-CO')} tokens
      </span>
    </div>
  );
}
