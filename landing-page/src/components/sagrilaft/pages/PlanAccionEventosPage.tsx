import React, { useState, useMemo } from 'react';
import { usePlanAccionEventos } from '../hooks/usePlanAccionEventos';
import { Icon } from '../components/ui/Icon';
import { Button } from '../components/ui/Button';
import { SearchBar } from '../components/ui/SearchBar';
import { StatCard } from '../components/ui/StatCard';
import { ToastContainer, useToast } from '../components/ui/Toast';

const ITEMS_PER_PAGE = 10;

export function PlanAccionEventosPage() {
  const { data, loading, deleteItem } = usePlanAccionEventos();
  const { toasts, removeToast, showSuccess, showError } = useToast();

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredData = useMemo(() => {
    return data.filter(p =>
      p.nombrePlan.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.descripcionPlan.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [data, searchTerm]);

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredData.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredData, currentPage]);

  const handleDeletePlan = async (plan: typeof data[0]) => {
    if (!confirm(`¿Eliminar plan "${plan.nombrePlan}"?`)) return;
    try {
      await deleteItem(plan.id);
      showSuccess('Éxito', `Plan "${plan.nombrePlan}" eliminado`);
    } catch (err) {
      showError('Error', err instanceof Error ? err.message : 'Error eliminando plan');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Cargando planes...</p>
        </div>
      </div>
    );
  }

  const completados = data.filter(p => p.estado === 'Completado').length;
  const enProgreso = data.filter(p => p.estado === 'En progreso').length;
  const pendientes = data.filter(p => p.estado === 'Pendiente').length;

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Stats */}
      <div className="px-8 py-6 flex-shrink-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <StatCard
            label="Total Planes"
            value={data.length}
            icon="assignment_turned_in"
            trend={{ direction: 'up', value: 0 }}
          />
          <StatCard
            label="Completados"
            value={completados}
            icon="check_circle"
            trend={{ direction: 'up', value: 0 }}
          />
          <StatCard
            label="En Progreso"
            value={enProgreso}
            icon="schedule"
            trend={{ direction: 'neutral', value: 0 }}
          />
          <StatCard
            label="Pendientes"
            value={pendientes}
            icon="pending_actions"
            trend={{ direction: 'down', value: 0 }}
          />
        </div>
      </div>

      {/* Filter Bar */}
      <div className="px-8 py-4 flex-shrink-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex gap-3 items-center">
        <SearchBar
          placeholder="Buscar planes..."
          value={searchTerm}
          onChange={setSearchTerm}
        />
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100 dark:bg-gray-800 sticky top-0">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300">Plan</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300">Estado</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300">Progreso</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300">Vencimiento</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {paginatedData.map((plan) => {
              const isOverdue = new Date(plan.fechaVencimiento) < new Date() && plan.estado !== 'Completado';
              return (
                <tr key={plan.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">{plan.nombrePlan}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">{plan.descripcionPlan}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${
                      plan.estado === 'Completado'
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
                        : plan.estado === 'En progreso'
                        ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300'
                        : 'bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300'
                    }`}>
                      {plan.estado}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary dark:bg-secondary rounded-full transition-all"
                          style={{ width: `${Math.min(plan.progreso, 100)}%` }}
                        />
                      </div>
                      <span className="text-xs font-semibold text-gray-600 dark:text-gray-300 w-8">
                        {Math.min(plan.progreso, 100)}%
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-sm ${
                      isOverdue ? 'text-red-600 dark:text-red-400 font-semibold' : 'text-gray-600 dark:text-gray-300'
                    }`}>
                      {new Date(plan.fechaVencimiento).toLocaleDateString('es-ES')}
                      {isOverdue && ' ⚠️'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleDeletePlan(plan)}
                      className="p-1.5 hover:bg-red-100 dark:hover:bg-red-900/30 rounded transition-colors"
                      title="Eliminar"
                    >
                      <Icon name="delete" size={16} className="text-red-600 dark:text-red-400" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {paginatedData.length === 0 && (
          <div className="flex items-center justify-center h-64">
            <p className="text-gray-500 dark:text-gray-400">No hay planes para mostrar</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="px-8 py-4 flex-shrink-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Página {currentPage} de {totalPages}
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
            >
              Anterior
            </Button>
            <Button
              variant="outline"
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
            >
              Siguiente
            </Button>
          </div>
        </div>
      )}

      {/* Toasts */}
      <ToastContainer toasts={toasts} onClose={removeToast} />
    </div>
  );
}
