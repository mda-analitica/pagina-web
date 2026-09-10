import type { FinancialQueryResult } from '@/lib/financialBot';

interface PowerBiExecuteResponse {
  results?: Array<{
    tables?: Array<{
      rows?: Record<string, unknown>[];
    }>;
  }>;
}

export async function executeDax(dax: string): Promise<FinancialQueryResult> {
  const url = process.env.POWER_AUTOMATE_DAX_URL;
  if (!url) {
    return { error: 'La ejecución contra Power BI no está configurada (falta POWER_AUTOMATE_DAX_URL).' };
  }

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ dax }),
    });

    if (!response.ok) {
      return { error: `El flujo de Power Automate respondió con error (${response.status}).` };
    }

    const body = (await response.json()) as PowerBiExecuteResponse;
    const rows = body.results?.[0]?.tables?.[0]?.rows ?? [];
    return { rows };
  } catch (error) {
    console.error('Power Automate execute error:', error);
    return { error: 'No se pudo ejecutar la consulta contra Power BI. Intenta de nuevo.' };
  }
}
