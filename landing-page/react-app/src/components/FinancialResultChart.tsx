'use client';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend,
  Title,
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import { formatFechaLabel, splitRowColumns, toDisplayNumber, type TipoGrafico } from '@/lib/financialBot';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Tooltip, Legend, Title);

const CHART_COLORS = ['#0d9488', '#2563eb', '#dc2626', '#d97706'];

function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function formatChartValue(value: number, isPercent: boolean, compact: boolean): string {
  if (isPercent) return `${value.toLocaleString('es-CO', { maximumFractionDigits: 2 })}%`;
  if (compact) {
    return new Intl.NumberFormat('es-CO', { notation: 'compact', maximumFractionDigits: 1 }).format(value);
  }
  return `$${value.toLocaleString('es-CO')}`;
}

function buildChartOptions(medidaLabel: string) {
  const isPercent = medidaLabel === 'ROE';
  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { labels: { boxWidth: 10, font: { size: 10 } } },
      title: { display: Boolean(medidaLabel), text: medidaLabel, font: { size: 12 } },
      tooltip: {
        callbacks: {
          label: (context: { dataset: { label?: string }; parsed: { y?: number | null; x?: number | null } }) => {
            const value = context.parsed.y ?? context.parsed.x ?? 0;
            const prefix = context.dataset.label ? `${context.dataset.label}: ` : '';
            return `${prefix}${formatChartValue(value, isPercent, false)}`;
          },
        },
      },
    },
    scales: {
      x: { ticks: { font: { size: 9 } } },
      y: {
        ticks: {
          font: { size: 9 },
          callback: (value: string | number) => formatChartValue(Number(value), isPercent, true),
        },
      },
    },
  };
}

export default function FinancialResultChart({
  tipoGrafico,
  rows,
  medidaLabel,
}: {
  tipoGrafico: TipoGrafico;
  rows: Record<string, unknown>[];
  medidaLabel: string;
}) {
  if (!tipoGrafico || tipoGrafico === 'tarjeta' || rows.length === 0) return null;

  const { dimensionKeys, valueKey } = splitRowColumns(rows);
  if (!valueKey) return null;

  const chartOptions = buildChartOptions(medidaLabel);

  if (tipoGrafico === 'linea_tiempo') {
    const dateKey = dimensionKeys[0];
    const data = {
      labels: rows.map((r) => formatFechaLabel(r[dateKey])),
      datasets: [
        {
          label: medidaLabel,
          data: rows.map((r) => toDisplayNumber(r[valueKey])),
          borderColor: CHART_COLORS[0],
          backgroundColor: hexToRgba(CHART_COLORS[0], 0.15),
          tension: 0.25,
          fill: true,
          pointRadius: 3,
          pointHoverRadius: 5,
        },
      ],
    };
    return (
      <div className="h-64">
        <Line data={data} options={chartOptions} />
      </div>
    );
  }

  if (tipoGrafico === 'linea_tiempo_comparada') {
    const [entityKey, dateKey] = dimensionKeys;
    const labels: string[] = [];
    const seenLabels = new Set<string>();
    const byEntity = new Map<string, Map<string, number>>();

    for (const row of rows) {
      const entity = String(row[entityKey]);
      const date = formatFechaLabel(row[dateKey]);
      if (!seenLabels.has(date)) {
        seenLabels.add(date);
        labels.push(date);
      }
      if (!byEntity.has(entity)) byEntity.set(entity, new Map());
      byEntity.get(entity)!.set(date, toDisplayNumber(row[valueKey]));
    }

    const datasets = Array.from(byEntity.entries()).map(([entity, values], i) => ({
      label: entity,
      data: labels.map((date) => values.get(date) ?? null),
      borderColor: CHART_COLORS[i % CHART_COLORS.length],
      backgroundColor: hexToRgba(CHART_COLORS[i % CHART_COLORS.length], 0.12),
      tension: 0.25,
      spanGaps: true,
      fill: true,
      pointRadius: 3,
      pointHoverRadius: 5,
    }));

    return (
      <div className="h-64">
        <Line data={{ labels, datasets }} options={chartOptions} />
      </div>
    );
  }

  if (tipoGrafico === 'barras_comparacion') {
    const entityKey = dimensionKeys[0];
    const data = {
      labels: rows.map((r) => String(r[entityKey])),
      datasets: [
        {
          label: medidaLabel,
          data: rows.map((r) => toDisplayNumber(r[valueKey])),
          backgroundColor: CHART_COLORS,
        },
      ],
    };
    return (
      <div className="h-64">
        <Bar data={data} options={chartOptions} />
      </div>
    );
  }

  return null;
}
