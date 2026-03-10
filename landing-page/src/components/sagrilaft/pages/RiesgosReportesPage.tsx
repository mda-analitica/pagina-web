import React, { useMemo } from 'react';
import { useRiesgos } from '../hooks/useRiesgos';
import { useControles } from '../hooks/useControles';
import { useEventos } from '../hooks/useEventos';
import { usePlanAccionEventos } from '../hooks/usePlanAccionEventos';
import { StatCard } from '../components/ui/StatCard';
import { Icon } from '../components/ui/Icon';
import { PROBABILIDADES, IMPACTOS } from '../data/types';

export function RiesgosReportesPage() {
  const { data: riesgos } = useRiesgos();
  const { data: controles } = useControles();
  const { data: eventos } = useEventos();
  const { data: planes } = usePlanAccionEventos();

  const stats = useMemo(() => {
    return {
      totalRiesgos: riesgos.length,
      riesgosIdentificados: riesgos.filter(r => r.estadoRiesgo === 'Identificado').length,
      riesgosEnTratamiento: riesgos.filter(r => r.estadoRiesgo === 'En Tratamiento').length,
      riesgosMitigados: riesgos.filter(r => r.estadoRiesgo === 'Mitigado').length,
      riesgosAceptados: riesgos.filter(r => r.estadoRiesgo === 'Aceptado').length,
      totalControles: controles.length,
      controlesValidados: controles.filter(c => c.validado).length,
      totalEventos: eventos.length,
      totalPerdidas: eventos.reduce((sum, e) => sum + (e.cuantiaPerdida || 0), 0),
      totalRecuperado: eventos.reduce((sum, e) => sum + ((e.cuantiaRecuperadaDirecta || 0) + (e.cuantiaRecuperadaSeguros || 0)), 0),
      planesCompletados: planes.filter(p => p.estado === 'Completado').length,
      planesEnProgreso: planes.filter(p => p.estado === 'En progreso').length,
      planesPendientes: planes.filter(p => p.estado === 'Pendiente').length,
    };
  }, [riesgos, controles, eventos, planes]);

  // Matriz de probabilidad-impacto
  const matriz = useMemo(() => {
    const result: Record<string, Record<string, number>> = {};
    PROBABILIDADES.forEach(p => {
      result[p] = {};
      IMPACTOS.forEach(i => {
        result[p][i] = riesgos.filter(r => r.probabilidad === p && r.impacto === i).length;
      });
    });
    return result;
  }, [riesgos]);

  // Riesgos por proceso
  const riesgosPorProceso = useMemo(() => {
    const map: Record<string, number> = {};
    riesgos.forEach(r => {
      map[r.proceso] = (map[r.proceso] || 0) + 1;
    });
    return Object.entries(map).sort((a, b) => b[1] - a[1]).slice(0, 10);
  }, [riesgos]);

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      {/* Header */}
      <div className="px-8 py-6 flex-shrink-0">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-lg bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
            <Icon name="analytics" size={24} className="text-primary dark:text-secondary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Reportes del Sistema de Gestión de Riesgos
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              Análisis consolidado de riesgos, controles, eventos y planes
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-8 pb-8 space-y-8">
        {/* Overview Section */}
        <section>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Resumen General</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <StatCard
              label="Riesgos Identificados"
              value={stats.totalRiesgos}
              icon="warning"
              trend={{ direction: 'neutral', value: 0 }}
            />
            <StatCard
              label="Controles Implementados"
              value={stats.totalControles}
              icon="verified_user"
              trend={{ direction: 'up', value: 0 }}
            />
            <StatCard
              label="Eventos Registrados"
              value={stats.totalEventos}
              icon="event_note"
              trend={{ direction: 'neutral', value: 0 }}
            />
          </div>
        </section>

        {/* Riesgos Section */}
        <section>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Estado de Riesgos</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <StatCard
              label="Identificados"
              value={stats.riesgosIdentificados}
              icon="assignment"
              trend={{ direction: 'neutral', value: 0 }}
            />
            <StatCard
              label="En Tratamiento"
              value={stats.riesgosEnTratamiento}
              icon="build"
              trend={{ direction: 'neutral', value: 0 }}
            />
            <StatCard
              label="Mitigados"
              value={stats.riesgosMitigados}
              icon="shield_check"
              trend={{ direction: 'up', value: 0 }}
            />
            <StatCard
              label="Aceptados"
              value={stats.riesgosAceptados}
              icon="check_circle"
              trend={{ direction: 'neutral', value: 0 }}
            />
            <StatCard
              label="Validación (%)"
              value={stats.totalRiesgos > 0 ? Math.round((stats.controlesValidados / stats.totalControles) * 100) : 0}
              icon="trending_up"
              trend={{ direction: 'up', value: 0 }}
            />
          </div>
        </section>

        {/* Controles Section */}
        <section>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Controles</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <StatCard
              label="Total de Controles"
              value={stats.totalControles}
              icon="verified_user"
              trend={{ direction: 'neutral', value: 0 }}
            />
            <StatCard
              label="Validados"
              value={stats.controlesValidados}
              icon="check_circle"
              trend={{ direction: 'up', value: 0 }}
            />
            <StatCard
              label="Tasa Validación"
              value={`${stats.totalControles > 0 ? Math.round((stats.controlesValidados / stats.totalControles) * 100) : 0}%`}
              icon="percent"
              trend={{ direction: 'up', value: 0 }}
            />
          </div>
        </section>

        {/* Eventos Section */}
        <section>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Eventos y Pérdidas</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <StatCard
              label="Eventos Registrados"
              value={stats.totalEventos}
              icon="event_note"
              trend={{ direction: 'neutral', value: 0 }}
            />
            <StatCard
              label="Pérdidas Totales"
              value={`$${stats.totalPerdidas.toLocaleString()}`}
              icon="trending_down"
              trend={{ direction: 'down', value: 0 }}
            />
            <StatCard
              label="Recuperado"
              value={`$${stats.totalRecuperado.toLocaleString()}`}
              icon="trending_up"
              trend={{ direction: 'up', value: 0 }}
            />
          </div>
        </section>

        {/* Planes Section */}
        <section>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Planes de Acción</h2>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <StatCard
              label="Total Planes"
              value={stats.planesCompletados + stats.planesEnProgreso + stats.planesPendientes}
              icon="assignment_turned_in"
              trend={{ direction: 'neutral', value: 0 }}
            />
            <StatCard
              label="Completados"
              value={stats.planesCompletados}
              icon="check_circle"
              trend={{ direction: 'up', value: 0 }}
            />
            <StatCard
              label="En Progreso"
              value={stats.planesEnProgreso}
              icon="schedule"
              trend={{ direction: 'neutral', value: 0 }}
            />
            <StatCard
              label="Pendientes"
              value={stats.planesPendientes}
              icon="pending_actions"
              trend={{ direction: 'down', value: 0 }}
            />
          </div>
        </section>

        {/* Top Procesos Section */}
        {riesgosPorProceso.length > 0 && (
          <section>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Top 10 Procesos con Mayor Riesgo</h2>
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="space-y-3 p-6">
                {riesgosPorProceso.map(([proceso, count]) => (
                  <div key={proceso} className="flex items-center justify-between">
                    <span className="text-sm text-gray-700 dark:text-gray-300">{proceso}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary dark:bg-secondary rounded-full"
                          style={{ width: `${(count / riesgosPorProceso[0][1]) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm font-semibold text-gray-600 dark:text-gray-300 w-8">{count}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
