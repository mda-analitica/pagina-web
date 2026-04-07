import React from 'react';
import { useSagrilaft } from '../../context/SagrilaftContext';
import { Icon } from '../ui/Icon';

const breadcrumbLabels: Record<string, { label: string; icon: string }> = {
  home: { label: 'Inicio', icon: 'home' },
  'riesgos-list': { label: 'Riesgos', icon: 'warning' },
  'riesgos-controles': { label: 'Controles', icon: 'verified_user' },
  'riesgos-eventos': { label: 'Eventos', icon: 'event_note' },
  'riesgos-planes': { label: 'Planes', icon: 'assignment_turned_in' },
  'riesgos-reportes': { label: 'Reportes', icon: 'analytics' },
};

export function SagrilaftBreadcrumb() {
  const { currentPage, selectedRiesgo } = useSagrilaft();

  const current = breadcrumbLabels[currentPage] || { label: 'Desconocida', icon: 'help' };

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-2">
        <Icon name="home" size={18} className="text-gray-500 dark:text-gray-400" />
        <span className="text-sm text-gray-500 dark:text-gray-400">SAGRILAFT</span>
      </div>

      {currentPage !== 'home' && (
        <>
          <Icon name="chevron_right" size={16} className="text-gray-400 dark:text-gray-600" />
          <div className="flex items-center gap-2">
            <Icon name={current.icon} size={18} className="text-primary dark:text-secondary" />
            <span className="text-sm font-semibold text-gray-900 dark:text-white">
              {current.label}
            </span>
          </div>
        </>
      )}

      {selectedRiesgo && currentPage === 'riesgos-controles' && (
        <>
          <Icon name="chevron_right" size={16} className="text-gray-400 dark:text-gray-600" />
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {selectedRiesgo.title}
          </span>
        </>
      )}
    </div>
  );
}
