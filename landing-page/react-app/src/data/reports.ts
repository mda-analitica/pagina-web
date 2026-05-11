export type ModalId = 'rif' | 'riesgo' | 'benchmarking' | null;

export interface Report {
  title: string;
  description: string;
  tag: string;
  tagColor: string;
  image: string;
  modalId: ModalId;
  available: boolean;
}

export const reports: Report[] = [
  {
    title: 'RIF Analítica',
    description: 'Minería de datos financiero',
    tag: 'Disponible',
    tagColor: 'bg-primary',
    image:
      'https://f158ae34df.imgdist.com/pub/bfra/i6q4k2r4/8sm/xkp/fl4/Balance%20General%20Nivel%201.png',
    modalId: 'rif',
    available: true,
  },
  {
    title: 'Riesgo de cartera',
    description: 'Analítica del riesgo y de la mora',
    tag: 'Próximamente',
    tagColor: 'bg-gray-600',
    image:
      'https://f158ae34df.imgdist.com/pub/bfra/i6q4k2r4/qxp/2yh/y20/Morosidad%20Cooperativas.png',
    modalId: 'riesgo',
    available: false,
  },
  {
    title: 'Benchmarking sector solidario',
    description: 'Análisis del sector con 77 indicadores',
    tag: 'Próximamente',
    tagColor: 'bg-gray-600',
    image:
      'https://f158ae34df.imgdist.com/pub/bfra/i6q4k2r4/9x0/g91/363/Benchmarking.png',
    modalId: 'benchmarking',
    available: false,
  },
  {
    title: 'Reporte de Cartera',
    description: 'Calidad y composición de la cartera de crédito',
    tag: 'Próximamente',
    tagColor: 'bg-gray-600',
    image:
      'https://f158ae34df.imgdist.com/pub/bfra/i6q4k2r4/qxp/2yh/y20/Morosidad%20Cooperativas.png',
    modalId: null,
    available: false,
  },
  {
    title: 'Reporte de Patrimonio',
    description: 'Evolución patrimonial y solvencia',
    tag: 'Próximamente',
    tagColor: 'bg-gray-600',
    image:
      'https://f158ae34df.imgdist.com/pub/bfra/i6q4k2r4/8sm/xkp/fl4/Balance%20General%20Nivel%201.png',
    modalId: null,
    available: false,
  },
  {
    title: 'Estructura de Costos',
    description: 'Análisis de gastos operativos y eficiencia',
    tag: 'Próximamente',
    tagColor: 'bg-gray-600',
    image:
      'https://f158ae34df.imgdist.com/pub/bfra/i6q4k2r4/9x0/g91/363/Benchmarking.png',
    modalId: null,
    available: false,
  },
];
