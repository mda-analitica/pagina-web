import React, { useState, useMemo } from 'react';
import { useControles } from '../hooks/useControles';
import { useRiesgos } from '../hooks/useRiesgos';
import { useCatalogos } from '../hooks/useCatalogos';
import { useSagrilaft } from '../context/SagrilaftContext';
import { Icon } from '../components/ui/Icon';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { SearchBar } from '../components/ui/SearchBar';
import { StatCard } from '../components/ui/StatCard';
import { ToastContainer, useToast } from '../components/ui/Toast';
import type { Control } from '../data/types';
import { ControlForm } from '../components/forms/ControlForm';

const ITEMS_PER_PAGE = 10;

export function ControlesPage() {
  const { selectedRiesgo, navigateToRiesgos } = useSagrilaft();
  const { data: riesgos } = useRiesgos();
  const { data, loading, createItem, updateItem, deleteItem } = useControles();
  const { toasts, removeToast, showSuccess, showError } = useToast();
  const catalogs = useCatalogos();

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingControl, setEditingControl] = useState<Control | null>(null);

  // Filtrar controles por riesgo seleccionado
  const filteredData = useMemo(() => {
    let result = data;

    if (selectedRiesgo) {
      result = result.filter(c => c.riesgoId === selectedRiesgo.id);
    }

    return result.filter(c =>
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.control.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [data, selectedRiesgo, searchTerm]);

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredData.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredData, currentPage]);

  const handleOpenCreate = () => {
    if (!selectedRiesgo) {
      showError('Error', 'Selecciona un riesgo primero');
      return;
    }
    setEditingControl(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (control: Control) => {
    setEditingControl(control);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingControl(null);
  };

  const handleSaveControl = async (formData: Partial<Control>) => {
    try {
      if (editingControl) {
        await updateItem(editingControl.id, formData);
        showSuccess('Éxito', `Control "${editingControl.title}" actualizado`);
      } else {
        if (!selectedRiesgo) throw new Error('Riesgo no seleccionado');
        await createItem({
          ...formData,
          riesgoId: selectedRiesgo.id,
          riesgoNombre: selectedRiesgo.title,
        } as Omit<Control, 'id'>);
        showSuccess('Éxito', 'Control creado exitosamente');
      }
      handleCloseModal();
    } catch (err) {
      showError('Error', err instanceof Error ? err.message : 'Error guardando control');
    }
  };

  const handleDeleteControl = async (control: Control) => {
    if (!confirm(`¿Eliminar control "${control.title}"?`)) return;
    try {
      await deleteItem(control.id);
      showSuccess('Éxito', `Control "${control.title}" eliminado`);
    } catch (err) {
      showError('Error', err instanceof Error ? err.message : 'Error eliminando control');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Cargando controles...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Riesgo Banner */}
      {selectedRiesgo ? (
        <div className="px-8 py-4 flex-shrink-0 bg-blue-50 dark:bg-blue-900/20 border-b border-blue-200 dark:border-blue-800 flex items-center justify-between">
          <div>
            <p className="text-xs text-blue-600 dark:text-blue-400 font-semibold">RIESGO SELECCIONADO</p>
            <p className="text-sm font-semibold text-blue-900 dark:text-blue-100">{selectedRiesgo.title}</p>
          </div>
          <Button variant="outline" onClick={navigateToRiesgos} className="text-xs">
            Cambiar Riesgo
          </Button>
        </div>
      ) : (
        <div className="px-8 py-4 flex-shrink-0 bg-amber-50 dark:bg-amber-900/20 border-b border-amber-200 dark:border-amber-800">
          <p className="text-sm text-amber-700 dark:text-amber-300">
            Selecciona un riesgo desde la página de Riesgos para ver sus controles
          </p>
        </div>
      )}

      {/* Stats */}
      <div className="px-8 py-6 flex-shrink-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard
            label="Total Controles"
            value={filteredData.length}
            icon="verified_user"
            trend={{ direction: 'up', value: 0 }}
          />
          <StatCard
            label="Validados"
            value={filteredData.filter(c => c.validado).length}
            icon="check_circle"
            trend={{ direction: 'neutral', value: 0 }}
          />
          <StatCard
            label="Pendientes Validación"
            value={filteredData.filter(c => !c.validado).length}
            icon="schedule"
            trend={{ direction: 'down', value: 0 }}
          />
        </div>
      </div>

      {/* Filter Bar */}
      <div className="px-8 py-4 flex-shrink-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex gap-3 items-center">
        <SearchBar
          placeholder="Buscar controles..."
          value={searchTerm}
          onChange={setSearchTerm}
        />
        <Button
          variant="primary"
          onClick={handleOpenCreate}
          disabled={!selectedRiesgo}
          className="flex items-center gap-2 flex-shrink-0"
        >
          <Icon name="add" size={18} />
          Nuevo Control
        </Button>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100 dark:bg-gray-800 sticky top-0">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300">Control</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300">Tipo</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300">Frecuencia</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300">Estado</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {paginatedData.map((control) => (
              <tr key={control.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <td className="px-6 py-4">
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">{control.title}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">{control.control}</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-600 dark:text-gray-300">{control.tipoControl}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-600 dark:text-gray-300">{control.frecuencia}</span>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${
                    control.validado
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
                      : 'bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300'
                  }`}>
                    {control.validado ? 'Validado' : 'Pendiente'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleOpenEdit(control)}
                      className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors"
                      title="Editar"
                    >
                      <Icon name="edit" size={16} className="text-gray-600 dark:text-gray-400" />
                    </button>
                    <button
                      onClick={() => handleDeleteControl(control)}
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
            <p className="text-gray-500 dark:text-gray-400">
              {selectedRiesgo ? 'No hay controles para este riesgo' : 'Selecciona un riesgo para ver controles'}
            </p>
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

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingControl ? 'Editar Control' : 'Nuevo Control'}
        size="lg"
      >
        <ControlForm
          initialData={editingControl}
          riesgoId={selectedRiesgo?.id}
          catalogs={catalogs}
          onSubmit={handleSaveControl}
          onCancel={handleCloseModal}
        />
      </Modal>

      {/* Toasts */}
      <ToastContainer toasts={toasts} onClose={removeToast} />
    </div>
  );
}
