import React from 'react';
import { PROBABILIDADES, IMPACTOS } from '../../data/types';

interface RiskMatrixProps {
  data: Record<string, Record<string, number>>;
  onCellClick?: (probabilidad: string, impacto: string) => void;
}

export function RiskMatrix({ data, onCellClick }: RiskMatrixProps) {
  const getColor = (prob: string, impact: string): string => {
    const probIdx = PROBABILIDADES.indexOf(prob as any);
    const impactIdx = IMPACTOS.indexOf(impact as any);

    // Matriz de colores: rojo (alto riesgo) a verde (bajo riesgo)
    const riskScore = (probIdx + 1) * (impactIdx + 1);

    if (riskScore >= 20) return 'bg-red-600 dark:bg-red-700';
    if (riskScore >= 15) return 'bg-orange-500 dark:bg-orange-600';
    if (riskScore >= 10) return 'bg-amber-400 dark:bg-amber-500';
    if (riskScore >= 6) return 'bg-yellow-300 dark:bg-yellow-400';
    return 'bg-green-400 dark:bg-green-500';
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 overflow-x-auto">
      <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
        Matriz de Riesgos (Probabilidad × Impacto)
      </h3>

      <div className="inline-block">
        {/* Header con IMPACTOS */}
        <div className="flex">
          {/* Esquina superior izquierda vacía */}
          <div className="w-28 h-10 flex items-center justify-center text-xs font-semibold text-gray-600 dark:text-gray-400 border-b border-r border-gray-200 dark:border-gray-700">
            Prob / Impacto
          </div>

          {/* Headers IMPACTOS */}
          {IMPACTOS.map((impact) => (
            <div
              key={impact}
              className="w-20 h-10 flex items-center justify-center text-xs font-semibold text-gray-700 dark:text-gray-300 border-b border-r border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50"
            >
              {impact}
            </div>
          ))}
        </div>

        {/* Filas con PROBABILIDADES */}
        {PROBABILIDADES.map((prob) => (
          <div key={prob} className="flex">
            {/* Label PROBABILIDAD */}
            <div className="w-28 h-16 flex items-center justify-center text-xs font-semibold text-gray-700 dark:text-gray-300 border-b border-r border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
              {prob}
            </div>

            {/* Celdas de matriz */}
            {IMPACTOS.map((impact) => {
              const count = data[prob]?.[impact] || 0;
              const bgColor = getColor(prob, impact);

              return (
                <button
                  key={`${prob}-${impact}`}
                  onClick={() => onCellClick?.(prob, impact)}
                  className={`w-20 h-16 flex flex-col items-center justify-center border-b border-r border-gray-200 dark:border-gray-700 transition-all hover:shadow-lg cursor-pointer ${bgColor}`}
                  title={`${prob} × ${impact}: ${count} riesgos`}
                >
                  <span className="text-lg font-bold text-white">{count}</span>
                  <span className="text-xs text-white/80">riesgos</span>
                </button>
              );
            })}
          </div>
        ))}

        {/* Leyenda */}
        <div className="mt-6 flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-400 dark:bg-green-500 rounded" />
            <span className="text-xs text-gray-600 dark:text-gray-400">Bajo</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-yellow-300 dark:bg-yellow-400 rounded" />
            <span className="text-xs text-gray-600 dark:text-gray-400">Medio</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-orange-500 dark:bg-orange-600 rounded" />
            <span className="text-xs text-gray-600 dark:text-gray-400">Alto</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-600 dark:bg-red-700 rounded" />
            <span className="text-xs text-gray-600 dark:text-gray-400">Crítico</span>
          </div>
        </div>
      </div>
    </div>
  );
}
