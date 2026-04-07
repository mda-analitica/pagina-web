import React from 'react';
import { useSagrilaft } from '../context/SagrilaftContext';
import { Icon } from '../components/ui/Icon';
import type { SagrilaftPage } from '../data/types';

type ColorKey = 'warning' | 'success' | 'primary' | 'secondary' | 'plans';

const colorMap: Record<ColorKey, {
  icon: string;
  iconHover: string;
  titleHover: string;
  cta: string;
  bar: string;
  cardHover: string;
}> = {
  warning: {
    icon: 'bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-400',
    iconHover: 'group-hover:bg-red-200 dark:group-hover:bg-red-800/40',
    titleHover: 'group-hover:text-red-600 dark:group-hover:text-red-400',
    cta: 'text-red-600 dark:text-red-400',
    bar: 'bg-red-500',
    cardHover: 'hover:border-red-200 dark:hover:border-red-800/60 hover:shadow-red-50 dark:hover:shadow-none',
  },
  success: {
    icon: 'bg-green-100 text-green-600 dark:bg-green-900/40 dark:text-green-400',
    iconHover: 'group-hover:bg-green-200 dark:group-hover:bg-green-800/40',
    titleHover: 'group-hover:text-green-600 dark:group-hover:text-green-400',
    cta: 'text-green-600 dark:text-green-400',
    bar: 'bg-green-500',
    cardHover: 'hover:border-green-200 dark:hover:border-green-800/60 hover:shadow-green-50 dark:hover:shadow-none',
  },
  primary: {
    icon: 'bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400',
    iconHover: 'group-hover:bg-blue-200 dark:group-hover:bg-blue-800/40',
    titleHover: 'group-hover:text-blue-600 dark:group-hover:text-blue-400',
    cta: 'text-blue-600 dark:text-blue-400',
    bar: 'bg-blue-500',
    cardHover: 'hover:border-blue-200 dark:hover:border-blue-800/60 hover:shadow-blue-50 dark:hover:shadow-none',
  },
  secondary: {
    icon: 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-400',
    iconHover: 'group-hover:bg-indigo-200 dark:group-hover:bg-indigo-800/40',
    titleHover: 'group-hover:text-indigo-600 dark:group-hover:text-indigo-400',
    cta: 'text-indigo-600 dark:text-indigo-400',
    bar: 'bg-indigo-500',
    cardHover: 'hover:border-indigo-200 dark:hover:border-indigo-800/60 hover:shadow-indigo-50 dark:hover:shadow-none',
  },
  plans: {
    icon: 'bg-violet-100 text-violet-600 dark:bg-violet-900/40 dark:text-violet-400',
    iconHover: 'group-hover:bg-violet-200 dark:group-hover:bg-violet-800/40',
    titleHover: 'group-hover:text-violet-600 dark:group-hover:text-violet-400',
    cta: 'text-violet-600 dark:text-violet-400',
    bar: 'bg-violet-500',
    cardHover: 'hover:border-violet-200 dark:hover:border-violet-800/60 hover:shadow-violet-50 dark:hover:shadow-none',
  },
};

interface ModuleCardProps {
  icon: string;
  title: string;
  description: string;
  color: ColorKey;
  onClick: () => void;
}

function ModuleCard({ icon, title, description, color, onClick }: ModuleCardProps) {
  const c = colorMap[color];

  return (
    <button
      onClick={onClick}
      className={`group relative flex flex-col bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-xl transition-all duration-300 text-left w-full overflow-hidden ${c.cardHover}`}
    >
      {/* Barra de color superior - aparece en hover */}
      <div className={`absolute top-0 left-0 right-0 h-0.5 ${c.bar} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

      <div className="flex flex-col flex-1 p-5 pt-6">
        {/* Icono */}
        <div className="flex items-start justify-between mb-5">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200 ${c.icon} ${c.iconHover}`}>
            <Icon name={icon} size={24} />
          </div>
        </div>

        {/* Título */}
        <h3 className={`text-sm font-semibold text-gray-900 dark:text-white leading-snug mb-2 transition-colors duration-200 ${c.titleHover}`}>
          {title}
        </h3>

        {/* Descripción */}
        <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed flex-1">
          {description}
        </p>

        {/* CTA */}
        <div className={`mt-5 flex items-center gap-1 text-xs font-semibold uppercase tracking-wide ${c.cta} opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-200`}>
          <span>Abrir sección</span>
          <Icon name="arrow_forward" size={13} />
        </div>
      </div>
    </button>
  );
}

export function RiesgosHomePage() {
  const { setCurrentPage } = useSagrilaft();

  const modules = [
    {
      icon: 'warning',
      title: 'Identificación de Riesgos',
      description: 'Identifica, evalúa y registra los riesgos de la organización. Define probabilidad, impacto y estado de cada riesgo.',
      color: 'warning' as ColorKey,
      page: 'riesgos-list' as SagrilaftPage,
    },
    {
      icon: 'verified_user',
      title: 'Controles de Riesgos',
      description: 'Gestiona los controles mitigantes. Define tipo de control, frecuencia, costo y estado de validación.',
      color: 'success' as ColorKey,
      page: 'riesgos-controles' as SagrilaftPage,
    },
    {
      icon: 'analytics',
      title: 'Reportes de Riesgos',
      description: 'Visualiza estadísticas y genera reportes del estado de los riesgos y controles de la organización.',
      color: 'primary' as ColorKey,
      page: 'riesgos-reportes' as SagrilaftPage,
    },
    {
      icon: 'event_note',
      title: 'Registro de Eventos',
      description: 'Registra y consulta los eventos del módulo de riesgos. Controla fechas de inicio y finalización.',
      color: 'secondary' as ColorKey,
      page: 'riesgos-eventos' as SagrilaftPage,
    },
    {
      icon: 'assignment_turned_in',
      title: 'Planes de Acción',
      description: 'Gestiona planes de acción derivados de eventos. Controla progreso, estado y notas de seguimiento.',
      color: 'plans' as ColorKey,
      page: 'riesgos-planes' as SagrilaftPage,
    },
  ];

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="px-8 pt-7 pb-5 flex-shrink-0">
        <div className="flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center flex-shrink-0">
            <Icon name="shield" size={22} className="text-primary dark:text-secondary" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white leading-tight">
              Sistema de Gestión de Riesgos
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              Bienvenido al módulo de riesgos SARLAFT/PTEE. Selecciona una sección para comenzar.
            </p>
          </div>
        </div>
        <div className="mt-5 border-t border-gray-100 dark:border-gray-800" />
      </div>

      {/* Grid de módulos */}
      <div className="px-6 pb-6 overflow-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
          {modules.map((module) => (
            <ModuleCard
              key={module.page}
              icon={module.icon}
              title={module.title}
              description={module.description}
              color={module.color}
              onClick={() => setCurrentPage(module.page)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
