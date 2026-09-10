import { NextRequest } from 'next/server';
import { executeDax } from '@/lib/powerAutomate';
import { generateConclusion } from '@/lib/financialConclusion';
import { MEDIDA_LABELS, filterRowsToYear2025, type MedidaId } from '@/lib/financialBot';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const dax = body?.dax;
    const medida: MedidaId | undefined = body?.medida;
    const entidades: string[] = Array.isArray(body?.entidades) ? body.entidades : [];

    if (typeof dax !== 'string' || !dax.trim().toUpperCase().startsWith('EVALUATE')) {
      return new Response(
        JSON.stringify({ error: 'Consulta DAX inválida' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    let resultado = await executeDax(dax);
    if ('rows' in resultado && resultado.rows) {
      resultado = { rows: filterRowsToYear2025(resultado.rows) };
    }

    let conclusion: string | null = null;
    let tokensConsumidos = 0;
    if ('rows' in resultado && resultado.rows?.length) {
      const medidaLabel = medida ? MEDIDA_LABELS[medida] ?? null : null;
      const conclusionResult = await generateConclusion(resultado.rows, medidaLabel, entidades);
      conclusion = conclusionResult.texto;
      tokensConsumidos = conclusionResult.tokens;
    }

    return Response.json({ resultado, conclusion, tokensConsumidos });
  } catch (error) {
    console.error('Financial bot execute API error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
