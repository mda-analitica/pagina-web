import React, { Suspense } from 'react';
import { useSagrilaft } from '../../context/SagrilaftContext';

// Lazy imports - will be implemented in Phase 5
const RiesgosHomePage = React.lazy(() =>
  import('../../pages/RiesgosHomePage').then(m => ({ default: m.RiesgosHomePage }))
);
const RiesgosListPage = React.lazy(() =>
  import('../../pages/RiesgosListPage').then(m => ({ default: m.RiesgosListPage }))
);
const ControlesPage = React.lazy(() =>
  import('../../pages/ControlesPage').then(m => ({ default: m.ControlesPage }))
);
const RegistroEventosPage = React.lazy(() =>
  import('../../pages/RegistroEventosPage').then(m => ({ default: m.RegistroEventosPage }))
);
const PlanAccionEventosPage = React.lazy(() =>
  import('../../pages/PlanAccionEventosPage').then(m => ({ default: m.PlanAccionEventosPage }))
);
const RiesgosReportesPage = React.lazy(() =>
  import('../../pages/RiesgosReportesPage').then(m => ({ default: m.RiesgosReportesPage }))
);

function PageLoader() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" />
        <p className="text-gray-600 dark:text-gray-400">Cargando...</p>
      </div>
    </div>
  );
}

export function PageRouter() {
  const { currentPage } = useSagrilaft();

  return (
    <Suspense fallback={<PageLoader />}>
      {currentPage === 'home' && <RiesgosHomePage />}
      {currentPage === 'riesgos-list' && <RiesgosListPage />}
      {currentPage === 'riesgos-controles' && <ControlesPage />}
      {currentPage === 'riesgos-eventos' && <RegistroEventosPage />}
      {currentPage === 'riesgos-planes' && <PlanAccionEventosPage />}
      {currentPage === 'riesgos-reportes' && <RiesgosReportesPage />}
    </Suspense>
  );
}
