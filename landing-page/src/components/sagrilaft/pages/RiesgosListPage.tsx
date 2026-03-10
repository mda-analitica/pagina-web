import React, { useState, useMemo } from 'react';
import { useRiesgos } from '../hooks/useRiesgos';
import { useCatalogos } from '../hooks/useCatalogos';
import { useSagrilaft } from '../context/SagrilaftContext';
import { Icon } from '../components/ui/Icon';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { SearchBar } from '../components/ui/SearchBar';
import { StatCard } from '../components/ui/StatCard';
import { ToastContainer, useToast } from '../components/ui/Toast';
import type { Riesgo } from '../data/types';
import { RiesgoForm } from '../components/forms/RiesgoForm';

const ITEMS_PER_PAGE = 10;

export function RiesgosListPage() {
  const { setSelectedRiesgo } = useSagrilaft();
  const { data, loading, stats, createItem, updateItem, deleteItem } = useRiesgos();
  const { toasts, removeToast, showSuccess, showError } = useToast();
  const catalogs = useCatalogos();

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRiesgo, setEditingRiesgo] = useState<Riesgo | null>(null);

  const filteredData = useMemo(() => {
    return data.filter(r =>
      r.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [data, searchTerm]);

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredData.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredData, currentPage]);

  const handleOpenCreate = () => {
    setEditingRiesgo(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (riesgo: Riesgo) => {
    setEditingRiesgo(riesgo);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingRiesgo(null);
  };

  const handleSaveRiesgo = async (formData: Partial<Riesgo>) => {
    try {
      if (editingRiesgo) {
        await updateItem(editingRiesgo.id, formData);
        showSuccess('Éxito', `Riesgo "${editingRiesgo.title}" actualizado`);
      } else {
        await createItem(formData as Omit<Riesgo, 'id'>);
        showSuccess('Éxito', 'Riesgo creado exitosamente');
      }
      handleCloseModal();
    } catch (err) {
      showError('Error', err instanceof Error ? err.message : 'Error guardando riesgo');
    }
  };

  const handleDeleteRiesgo = async (riesgo: Riesgo) => {
    if (!confirm(`¿Eliminar riesgo "${riesgo.title}"?`)) return;
    try {
      await deleteItem(riesgo.id);
      showSuccess('Éxito', `Riesgo "${riesgo.title}" eliminado`);
    } catch (err) {
      showError('Error', err instanceof Error ? err.message : 'Error eliminando riesgo');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Cargando riesgos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Stats */}
      <div className="px-8 py-6 flex-shrink-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            label="Total de Riesgos"
            value={stats.total}
            icon="warning"
            trend={{ direction: 'up', value: 0 }}
          />
          <StatCard
            label="Identificados"
            value={stats.total}
            icon="check_circle"
            trend={{ direction: 'neutral', value: 0 }}
          />
        </div>
      </div>

      {/* Filter Bar */}
      <div className="px-8 py-4 flex-shrink-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex gap-3 items-center">
        <SearchBar
          placeholder="Buscar riesgos..."
          value={searchTerm}
          onChange={setSearchTerm}
        />
        <Button
          variant="primary"
          onClick={handleOpenCreate}
          className="flex items-center gap-2 flex-shrink-0"
        >
          <Icon name="add" size={18} />
          Nuevo Riesgo
        </Button>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100 dark:bg-gray-800 sticky top-0">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300">Riesgo</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300">Probabilidad</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300">Impacto</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300">Estado</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {paginatedData.map((riesgo) => (
              <tr key={riesgo.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <td className="px-6 py-4">
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">{riesgo.title}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">{riesgo.descripcion}</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-600 dark:text-gray-300">{riesgo.probabilidad}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-600 dark:text-gray-300">{riesgo.impacto}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">
                    {riesgo.estadoRiesgo}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleOpenEdit(riesgo)}
                      className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors"
                      title="Editar"
                    >
                      <Icon name="edit" size={16} className="text-gray-600 dark:text-gray-400" />
                    </button>
                    <button
                      onClick={() => handleDeleteRiesgo(riesgo)}
                      className="p-1.5 hover:bg-red-100 dark:hover:bg-red-900/30 rounded transition-colors"
                      title="Eliminar"
                    >
                      <Icon name="delete" size={16} className="text-red-600 dark:text-red-400" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {paginatedData.length === 0 && (
          <div className="flex items-center justify-center h-64">
            <p className="text-gray-500 dark:text-gray-400">No hay riesgos para mostrar</p>
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

      {/* Modal para crear/editar */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingRiesgo ? 'Editar Riesgo' : 'Nuevo Riesgo'}
        size="lg"
      >
        <RiesgoForm
          initialData={editingRiesgo}
          catalogs={catalogs}
          onSubmit={handleSaveRiesgo}
          onCancel={handleCloseModal}
        />
      </Modal>

      {/* Toasts */}
      <ToastContainer toasts={toasts} onClose={removeToast} />
    </div>
  );
}
