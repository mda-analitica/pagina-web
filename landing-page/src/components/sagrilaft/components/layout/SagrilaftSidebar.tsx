import React from 'react';
import { useSagrilaft } from '../../context/SagrilaftContext';
import { Icon } from '../ui/Icon';
import type { SagrilaftPage } from '../../data/types';

interface ModuleItem {
  id: SagrilaftPage;
  label: string;
  icon: string;
  description: string;
}

const modules: ModuleItem[] = [
  {
    id: 'home',
    label: 'Inicio',
    icon: 'home',
    description: 'Panel principal',
  },
  {
    id: 'riesgos-list',
    label: 'Riesgos',
    icon: 'warning',
    description: 'Identificación de riesgos',
  },
  {
    id: 'riesgos-controles',
    label: 'Controles',
    icon: 'verified_user',
    description: 'Controles mitigantes',
  },
  {
    id: 'riesgos-eventos',
    label: 'Eventos',
    icon: 'event_note',
    description: 'Registro de eventos',
  },
  {
    id: 'riesgos-planes',
    label: 'Planes',
    icon: 'assignment_turned_in',
    description: 'Planes de acción',
  },
  {
    id: 'riesgos-reportes',
    label: 'Reportes',
    icon: 'analytics',
    description: 'Análisis y reportes',
  },
];

export function SagrilaftSidebar() {
  const { currentPage, setCurrentPage } = useSagrilaft();

  return (
    <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col h-full shadow-sm">
      {/* Header */}
      <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 dark:bg-primary/20 flex items-center justify-center flex-shrink-0">
            <Icon name="shield" size={20} className="text-primary dark:text-secondary" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-gray-900 dark:text-white">
              SAGRILAFT
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Gestión de Riesgos
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-2">
        {modules.map((module) => {
          const isActive = currentPage === module.id;
          return (
            <button
              key={module.id}
              onClick={() => setCurrentPage(module.id)}
              className={`w-full flex items-start gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 text-left ${
                isActive
                  ? 'bg-primary/10 dark:bg-primary/20 border border-primary/30 dark:border-primary/40'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-700/50 border border-transparent'
              }`}
            >
              <Icon
                name={module.icon}
                size={20}
                className={`flex-shrink-0 mt-0.5 ${
                  isActive
                    ? 'text-primary dark:text-secondary'
                    : 'text-gray-500 dark:text-gray-400'
                }`}
              />
              <div className="flex-1 min-w-0">
                <p
                  className={`text-sm font-semibold truncate ${
                    isActive
                      ? 'text-primary dark:text-secondary'
                      : 'text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {module.label}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {module.description}
                </p>
              </div>
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 text-center">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          SARLAFT/PTEE 2024
        </p>
      </div>
    </aside>
  );
}
