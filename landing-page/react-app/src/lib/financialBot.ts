export type MedidaId =
  | 'activos'
  | 'pasivos'
  | 'patrimonio'
  | 'depositos'
  | 'depositos_cdat'
  | 'depositos_vista'
  | 'roe';

export type FiltroFechaTipo =
  | 'ninguna'
  | 'anio'
  | 'fecha_especifica'
  | 'lista_fechas'
  | 'rango';

export type BotFinancieroAccion =
  | 'buscar_entidad'
  | 'consultar_balance'
  | 'falta_entidad'
  | 'sin_coincidencia';

export type TipoGrafico =
  | 'tarjeta'
  | 'linea_tiempo'
  | 'linea_tiempo_comparada'
  | 'barras_comparacion'
  | null;

export interface BotFinancieroResponse {
  accion: BotFinancieroAccion;
  medida: MedidaId | 'sin_coincidencia' | null;
  entidades: string[];
  filtro_fecha: {
    tipo: FiltroFechaTipo;
    valores: string[];
  };
  dax_sugerido: string | null;
  tipo_grafico: TipoGrafico;
  aclaracion: string | null;
}

/** Resultado de ejecutar `dax_sugerido` contra Power BI (agregado por el backend, no por el LLM). */
export type FinancialQueryResult =
  | { rows: Record<string, unknown>[]; error?: undefined }
  | { rows?: undefined; error: string };

/** Payload real que devuelve /api/financial-bot: la sugerencia del LLM + el resultado de ejecutarla. */
export interface BotFinancieroApiResponse extends BotFinancieroResponse {
  resultado?: FinancialQueryResult | null;
  /** Conclusión en lenguaje natural generada por IA a partir de `resultado`, o null si no aplica/falló. */
  conclusion?: string | null;
  /** Tokens reales consumidos en el modelo de IA para generar esta respuesta (agregado por el backend, no por el LLM). */
  tokensConsumidos?: number | null;
}

export const MEDIDA_LABELS: Record<string, string> = {
  activos: 'Activos',
  pasivos: 'Pasivos',
  patrimonio: 'Patrimonio',
  depositos: 'Depósitos',
  depositos_cdat: 'Depósitos CDAT',
  depositos_vista: 'Depósitos a la vista',
  roe: 'ROE',
};

export const TIPO_GRAFICO_LABELS: Record<string, string> = {
  tarjeta: 'Tarjeta (valor único)',
  linea_tiempo: 'Línea de tiempo',
  linea_tiempo_comparada: 'Línea de tiempo comparada',
  barras_comparacion: 'Barras de comparación',
};

export const ACCION_LABELS: Record<BotFinancieroAccion, string> = {
  buscar_entidad: 'Buscando entidad',
  consultar_balance: 'Consulta lista',
  falta_entidad: 'Falta la entidad',
  sin_coincidencia: 'Sin coincidencia',
};

/** Los nombres de columna que devuelve Power BI vienen entre corchetes, ej. "[Fecha reporte]". */
export function cleanColumnLabel(key: string): string {
  return key.replace(/^\[|\]$/g, '');
}

export function toDisplayNumber(value: unknown): number {
  const n = typeof value === 'number' ? value : parseFloat(String(value));
  return Number.isFinite(n) ? n : 0;
}

/** Power BI devuelve las fechas como "2025-03-31T00:00:00"; se muestran como "2025-03" (año-mes). */
export function formatFechaLabel(value: unknown): string {
  const str = String(value);
  return /^\d{4}-\d{2}-\d{2}T/.test(str) ? str.slice(0, 7) : str;
}

/**
 * Filtro defensivo: descarta cualquier fila con fecha fuera de 2025, incluso si el DAX generado
 * por el LLM olvidó restringir el año (la tabla ya tiene cierres preliminares de 2026).
 */
export function filterRowsToYear2025(rows: Record<string, unknown>[]): Record<string, unknown>[] {
  return rows.filter((row) =>
    Object.values(row).every((value) => {
      const str = String(value);
      return !/^\d{4}-\d{2}-\d{2}T/.test(str) || str.startsWith('2025-');
    })
  );
}

/**
 * Convención de columnas: SUMMARIZE (ver las plantillas DAX del bot) siempre proyecta las
 * columnas de agrupación primero y el alias de la medida al final, así que la última clave de
 * cada fila es siempre el valor numérico y las anteriores son dimensiones (fecha y/o SIGLA).
 */
export function splitRowColumns(rows: Record<string, unknown>[]) {
  if (rows.length === 0) return { dimensionKeys: [] as string[], valueKey: null as string | null };
  const keys = Object.keys(rows[0]);
  return { dimensionKeys: keys.slice(0, -1), valueKey: keys[keys.length - 1] };
}
