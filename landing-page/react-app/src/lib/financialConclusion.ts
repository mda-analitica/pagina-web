import { ThinkingLevel } from '@google/genai';
import { getGeminiClient, getGeminiModel } from '@/lib/geminiClient';
import { splitRowColumns, toDisplayNumber } from '@/lib/financialBot';

interface EntitySummary {
  entidad?: string;
  ultimoPeriodo: string;
  ultimoValor: number;
}

interface ResultFacts {
  totalRegistros: number;
  resumenPorEntidad: EntitySummary[];
}

const CONCLUSION_SYSTEM_PROMPT = `Eres un asistente que redacta una conclusión breve (máximo 2 frases) en
español de Colombia para un panel financiero.

Se te entrega un JSON con datos YA CALCULADOS — NUNCA recalcules, cuentes ni inventes cifras, solo redacta
usando exactamente los valores dados:
- "medida": el indicador consultado.
- "entidades": las cooperativas consultadas (si vinieron mencionadas en la pregunta original).
- "totalRegistros": cuántos registros/periodos se reportaron.
- "resumenPorEntidad": por cada entidad (o una sola si no hay comparación), el último periodo
  reportado ("ultimoPeriodo", formato fecha) y su valor ("ultimoValor", número).

Menciona cuántos registros se reportaron y, para cada entidad de "resumenPorEntidad", el saldo en su
último periodo reportado. Formatea los montos con puntos de miles (ej. 6.401.576.915). Si hay más de
una entidad, nombra a cada una. Responde SOLO con el texto de la conclusión, sin JSON, sin comillas,
sin listas, sin agregar análisis u opiniones.`;

function buildResultFacts(rows: Record<string, unknown>[]): ResultFacts {
  const { dimensionKeys, valueKey } = splitRowColumns(rows);
  if (!valueKey || rows.length === 0) {
    return { totalRegistros: rows.length, resumenPorEntidad: [] };
  }

  if (dimensionKeys.length >= 2) {
    const [entityKey, dateKey] = dimensionKeys;
    const byEntity = new Map<string, { fecha: string; valor: number }>();
    for (const row of rows) {
      const entidad = String(row[entityKey]);
      const fecha = String(row[dateKey]);
      const valor = toDisplayNumber(row[valueKey]);
      const prev = byEntity.get(entidad);
      if (!prev || fecha > prev.fecha) byEntity.set(entidad, { fecha, valor });
    }
    return {
      totalRegistros: rows.length,
      resumenPorEntidad: Array.from(byEntity.entries()).map(([entidad, v]) => ({
        entidad,
        ultimoPeriodo: v.fecha,
        ultimoValor: v.valor,
      })),
    };
  }

  const dateKey = dimensionKeys[0];
  let last = rows[0];
  if (dateKey) {
    for (const row of rows) {
      if (String(row[dateKey]) > String(last[dateKey])) last = row;
    }
  }
  return {
    totalRegistros: rows.length,
    resumenPorEntidad: [
      {
        ultimoPeriodo: dateKey ? String(last[dateKey]) : '',
        ultimoValor: toDisplayNumber(last[valueKey]),
      },
    ],
  };
}

export interface ConclusionResult {
  texto: string | null;
  tokens: number;
}

export async function generateConclusion(
  rows: Record<string, unknown>[],
  medidaLabel: string | null,
  entidades: string[]
): Promise<ConclusionResult> {
  if (rows.length === 0) return { texto: null, tokens: 0 };

  const ai = getGeminiClient();
  if (!ai) return { texto: null, tokens: 0 };

  const facts = buildResultFacts(rows);
  if (facts.resumenPorEntidad.length === 0) return { texto: null, tokens: 0 };

  try {
    const response = await ai.models.generateContent({
      model: getGeminiModel(),
      contents: [
        {
          role: 'user',
          parts: [{ text: JSON.stringify({ medida: medidaLabel, entidades, ...facts }) }],
        },
      ],
      config: {
        systemInstruction: CONCLUSION_SYSTEM_PROMPT,
        temperature: 0.3,
        maxOutputTokens: 250,
        thinkingConfig: { thinkingLevel: ThinkingLevel.MINIMAL },
      },
    });

    return {
      texto: response.text?.trim() || null,
      tokens: response.usageMetadata?.totalTokenCount ?? 0,
    };
  } catch (error) {
    console.error('Financial bot conclusion error:', error);
    return { texto: null, tokens: 0 };
  }
}
