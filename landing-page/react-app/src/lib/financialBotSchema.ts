import { Type } from '@google/genai';

/**
 * responseSchema para Gemini (@google/genai, `responseMimeType: 'application/json'`) que replica
 * `BotFinancieroResponse` de `src/lib/financialBot.ts`. Gemini usa un subset de OpenAPI 3.0:
 * los campos nullable se marcan con `nullable: true` (no `type: [..., "null"]` como en el modo
 * estricto de Groq/OpenAI), y no soporta `additionalProperties`/`strict`.
 */
export const FINANCIAL_BOT_GEMINI_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    accion: {
      type: Type.STRING,
      enum: ['buscar_entidad', 'consultar_balance', 'falta_entidad', 'sin_coincidencia'],
    },
    medida: {
      type: Type.STRING,
      nullable: true,
      enum: [
        'activos',
        'pasivos',
        'patrimonio',
        'depositos',
        'depositos_cdat',
        'depositos_vista',
        'roe',
        'sin_coincidencia',
      ],
    },
    entidades: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
    },
    filtro_fecha: {
      type: Type.OBJECT,
      properties: {
        tipo: {
          type: Type.STRING,
          enum: ['ninguna', 'anio', 'fecha_especifica', 'lista_fechas', 'rango'],
        },
        valores: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
        },
      },
      required: ['tipo', 'valores'],
    },
    dax_sugerido: { type: Type.STRING, nullable: true },
    tipo_grafico: {
      type: Type.STRING,
      nullable: true,
      enum: ['tarjeta', 'linea_tiempo', 'linea_tiempo_comparada', 'barras_comparacion'],
    },
    aclaracion: { type: Type.STRING, nullable: true },
  },
  required: ['accion', 'medida', 'entidades', 'filtro_fecha', 'dax_sugerido', 'tipo_grafico', 'aclaracion'],
} as const;
