import {
  ACCION_LABELS,
  MEDIDA_LABELS,
  TIPO_GRAFICO_LABELS,
  cleanColumnLabel,
  formatFechaLabel,
  toDisplayNumber,
  type BotFinancieroApiResponse,
  type BotFinancieroResponse,
} from '@/lib/financialBot';
import FinancialResultChart from '@/components/FinancialResultChart';
import { WHATSAPP_CONTACT_URL } from '@/lib/financialBotUsage';

const ACCION_BADGE_CLASSES: Record<BotFinancieroResponse['accion'], string> = {
  buscar_entidad: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
  consultar_balance: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
  falta_entidad: 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300',
  sin_coincidencia: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300',
};

function formatFiltroFecha(filtro: BotFinancieroResponse['filtro_fecha']): string | null {
  if (!filtro || filtro.tipo === 'ninguna') return null;
  switch (filtro.tipo) {
    case 'anio':
      return `Año ${filtro.valores.join(', ')}`;
    case 'fecha_especifica':
      return `Fecha: ${filtro.valores[0]}`;
    case 'lista_fechas':
      return `Fechas: ${filtro.valores.join(', ')}`;
    case 'rango':
      return `Rango: ${filtro.valores.join(' a ')}`;
    default:
      return null;
  }
}

export default function FinancialSuggestionCard({
  suggestion,
  onConfirmarEntidad,
  onReintentar,
  reintentando,
}: {
  suggestion: BotFinancieroApiResponse;
  onConfirmarEntidad?: (valor: string) => void;
  onReintentar?: () => void;
  reintentando?: boolean;
}) {
  const medidaLabel = suggestion.medida ? MEDIDA_LABELS[suggestion.medida] ?? null : null;
  const filtroFechaLabel = formatFiltroFecha(suggestion.filtro_fecha);
  const tipoGraficoLabel = suggestion.tipo_grafico ? TIPO_GRAFICO_LABELS[suggestion.tipo_grafico] : null;
  const resultado = suggestion.resultado;
  const rows = resultado && 'rows' in resultado ? resultado.rows ?? [] : null;
  // Si hay medida reconocida pero la acción es "sin_coincidencia", el rechazo fue por fecha fuera de 2025
  // (un indicador no reconocido siempre deja medida en null/"sin_coincidencia", ver route.ts).
  const isOutOfRange = suggestion.accion === 'sin_coincidencia' && medidaLabel !== null;

  return (
    <div className="flex flex-col gap-2">
      {suggestion.accion !== 'sin_coincidencia' && (
        <span
          className={`self-start text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full ${ACCION_BADGE_CLASSES[suggestion.accion]}`}
        >
          {ACCION_LABELS[suggestion.accion]}
        </span>
      )}

      {medidaLabel && (
        <p>
          <span className="font-semibold">Medida:</span> {medidaLabel}
        </p>
      )}

      {suggestion.entidades.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {suggestion.entidades.map((entidad) => (
            <span
              key={entidad}
              className="text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 px-2 py-0.5 rounded-md"
            >
              {entidad}
            </span>
          ))}
        </div>
      )}

      {filtroFechaLabel && (
        <p>
          <span className="font-semibold">Periodo:</span> {filtroFechaLabel}
        </p>
      )}

      {tipoGraficoLabel && suggestion.tipo_grafico !== 'tarjeta' && (
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Se visualiza como: {tipoGraficoLabel}
        </p>
      )}

      {suggestion.dax_sugerido && (
        <details className="mt-1">
          <summary className="cursor-pointer text-xs font-semibold text-primary select-none">
            Consulta a la Base de Datos generada por IA
          </summary>
          <pre className="mt-2 text-[11px] leading-snug whitespace-pre-wrap break-words bg-gray-50 dark:bg-[#0b0e14] border border-gray-200 dark:border-gray-700 rounded-lg p-2 overflow-x-auto">
            {suggestion.dax_sugerido}
          </pre>
        </details>
      )}

      {suggestion.accion === 'buscar_entidad' && rows && (
        rows.length > 0 ? (
          <div className="flex flex-col gap-1.5 mt-1">
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Coincidencias encontradas — selecciona la correcta:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {rows.map((row, i) => {
                const valor = String(Object.values(row)[0]);
                return (
                  <button
                    key={`${valor}-${i}`}
                    onClick={() => onConfirmarEntidad?.(valor)}
                    className="text-xs font-medium bg-primary/10 hover:bg-primary/20 text-primary px-2 py-1 rounded-md transition-colors"
                  >
                    {valor}
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          <p className="text-xs text-gray-500 dark:text-gray-400">
            No se encontraron coincidencias en el catálogo de entidades.
          </p>
        )
      )}

      {suggestion.accion === 'consultar_balance' && rows && rows.length === 0 && (
        <p className="text-xs text-gray-500 dark:text-gray-400">
          No se encontraron datos para esta consulta en Power BI.
        </p>
      )}

      {suggestion.accion === 'consultar_balance' && rows && rows.length > 0 && (
        suggestion.tipo_grafico === 'tarjeta' ? (
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {toDisplayNumber(Object.values(rows[0]).at(-1)).toLocaleString('es-CO')}
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <FinancialResultChart
              tipoGrafico={suggestion.tipo_grafico}
              rows={rows}
              medidaLabel={medidaLabel ?? ''}
            />
            <details className="mt-1">
              <summary className="cursor-pointer text-xs font-semibold text-primary select-none">
                Ver tabla de datos
              </summary>
              <div className="overflow-x-auto mt-2">
                <table className="w-full text-[11px] border-collapse">
                  <thead>
                    <tr>
                      {Object.keys(rows[0]).map((key) => (
                        <th
                          key={key}
                          className="text-left font-semibold border-b border-gray-200 dark:border-gray-700 py-1 pr-2"
                        >
                          {cleanColumnLabel(key)}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row, i) => (
                      <tr key={i}>
                        {Object.entries(row).map(([key, value]) => (
                          <td key={key} className="py-1 pr-2 border-b border-gray-100 dark:border-gray-800">
                            {formatFechaLabel(value)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </details>
          </div>
        )
      )}

      {suggestion.accion === 'consultar_balance' && suggestion.conclusion && (
        <div className="bg-primary/5 dark:bg-primary/10 border border-primary/20 rounded-lg p-2.5">
          <p className="text-sm font-medium text-gray-800 dark:text-gray-100">{suggestion.conclusion}</p>
        </div>
      )}

      {resultado && 'error' in resultado && resultado.error && (
        <div className="flex flex-col gap-1.5 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-2">
          <span className="text-xs text-red-700 dark:text-red-300">{resultado.error}</span>
          {onReintentar && (
            <button
              onClick={onReintentar}
              disabled={reintentando}
              className="self-start text-xs font-semibold text-primary disabled:opacity-50"
            >
              {reintentando ? 'Reintentando...' : 'Reintentar'}
            </button>
          )}
        </div>
      )}

      {suggestion.aclaracion && <p>{suggestion.aclaracion}</p>}

      {isOutOfRange && (
        <div className="flex flex-col gap-1.5 bg-primary/5 dark:bg-primary/10 border border-primary/20 rounded-lg p-2.5">
          <p className="text-xs text-gray-600 dark:text-gray-300">
            La versión gratuita cubre 2025 (según disponibilidad de la Supersolidaria) para todo el
            sector solidario. ¿Necesitas otro periodo (ej. 2026) o más indicadores? Escríbenos por
            WhatsApp.
          </p>
          <a
            href={WHATSAPP_CONTACT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="self-start text-xs font-semibold bg-primary/10 hover:bg-primary/20 text-primary px-3 py-1.5 rounded-md transition-colors"
          >
            Escribir por WhatsApp
          </a>
        </div>
      )}

      <p className="text-[10px] text-gray-400 dark:text-gray-500 italic">
        {resultado
          ? 'Sugerencia generada por IA. Datos obtenidos en tiempo real desde Power BI.'
          : 'Sugerencia generada por IA.'}
        {suggestion.tokensConsumidos
          ? ` · ${suggestion.tokensConsumidos.toLocaleString('es-CO')} tokens usados`
          : ''}
      </p>
    </div>
  );
}
