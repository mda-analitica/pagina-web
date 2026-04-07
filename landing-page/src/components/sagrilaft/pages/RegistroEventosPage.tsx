import React, { useState, useMemo } from 'react';
import { useEventos } from '../hooks/useEventos';
import { useCatalogos } from '../hooks/useCatalogos';
import { Icon } from '../components/ui/Icon';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { SearchBar } from '../components/ui/SearchBar';
import { StatCard } from '../components/ui/StatCard';
import { ToastContainer, useToast } from '../components/ui/Toast';
import type { RegistroEvento } from '../data/types';
import { EventoForm } from '../components/forms/EventoForm';

const ITEMS_PER_PAGE = 10;

export function RegistroEventosPage() {
  const { data, loading, createItem, updateItem, deleteItem } = useEventos();
  const { toasts, removeToast, showSuccess, showError } = useToast();
  const catalogs = useCatalogos();

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvento, setEditingEvento] = useState<RegistroEvento | null>(null);

  const filteredData = useMemo(() => {
    return data.filter(e =>
      e.nombreEvento.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [data, searchTerm]);

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredData.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredData, currentPage]);

  const handleOpenCreate = () => {
    setEditingEvento(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (evento: RegistroEvento) => {
    setEditingEvento(evento);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingEvento(null);
  };

  const handleSaveEvento = async (formData: Partial<RegistroEvento>) => {
    try {
      if (editingEvento) {
        await updateItem(editingEvento.id, formData);
        showSuccess('Éxito', `Evento "${editingEvento.nombreEvento}" actualizado`);
      } else {
        await createItem(formData as Omit<RegistroEvento, 'id'>);
        showSuccess('Éxito', 'Evento creado exitosamente');
      }
      handleCloseModal();
    } catch (err) {
      showError('Error', err instanceof Error ? err.message : 'Error guardando evento');
    }
  };

  const handleDeleteEvento = async (evento: RegistroEvento) => {
    if (!confirm(`¿Eliminar evento "${evento.nombreEvento}"?`)) return;
    try {
      await deleteItem(evento.id);
      showSuccess('Éxito', `Evento "${evento.nombreEvento}" eliminado`);
    } catch (err) {
      showError('Error', err instanceof Error ? err.message : 'Error eliminando evento');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Cargando eventos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Stats */}
      <div className="px-8 py-6 flex-shrink-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard
            label="Total Eventos"
            value={data.length}
            icon="event_note"
            trend={{ direction: 'up', value: 0 }}
          />
          <StatCard
            label="Pérdidas Totales"
            value={`$${data.reduce((sum, e) => sum + (e.cuantiaPerdida || 0), 0).toLocaleString()}`}
            icon="trending_down"
            trend={{ direction: 'down', value: 0 }}
          />
          <StatCard
            label="Recuperado"
            value={`$${data.reduce((sum, e) => sum + (e.cuantiaRecuperadaDirecta || 0) + (e.cuantiaRecuperadaSeguros || 0), 0).toLocaleString()}`}
            icon="trending_up"
            trend={{ direction: 'up', value: 0 }}
          />
        </div>
      </div>

      {/* Filter Bar */}
      <div className="px-8 py-4 flex-shrink-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex gap-3 items-center">
        <SearchBar
          placeholder="Buscar eventos..."
          value={searchTerm}
          onChange={setSearchTerm}
        />
        <Button
          variant="primary"
          onClick={handleOpenCreate}
          className="flex items-center gap-2 flex-shrink-0"
        >
          <Icon name="add" size={18} />
          Nuevo Evento
        </Button>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100 dark:bg-gray-800 sticky top-0">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300">Evento</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300">Fecha Inicio</th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 dark:text-gray-300">Pérdida</th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 dark:text-gray-300">Recuperado</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {paginatedData.map((evento) => {
              const recuperado = (evento.cuantiaRecuperadaDirecta || 0) + (evento.cuantiaRecuperadaSeguros || 0);
              return (
                <tr key={evento.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">{evento.nombreEvento}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">{evento.descripcion}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      {new Date(evento.fechaInicioEvento).toLocaleDateString('es-ES')}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="text-sm font-semibold text-red-600 dark:text-red-400">
                      ${(evento.cuantiaPerdida || 0).toLocaleString()}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="text-sm font-semibold text-green-600 dark:text-green-400">
                      ${recuperado.toLocaleString()}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleOpenEdit(evento)}
                        className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors"
                        title="Editar"
                      >
                        <Icon name="edit" size={16} className="text-gray-600 dark:text-gray-400" />
                      </button>
                      <button
                        onClick={() => handleDeleteEvento(evento)}
                        className="p-1.5 hover:bg-red-100 dark:hover:bg-red-900/30 rounded transition-colors"
                        title="Eliminar"
                      >
                        <Icon name="delete" size={16} className="text-red-600 dark:text-red-400" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {paginatedData.length === 0 && (
          <div className="flex items-center justify-center h-64">
            <p className="text-gray-500 dark:text-gray-400">No hay eventos para mostrar</p>
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
        title={editingEvento ? 'Editar Evento' : 'Nuevo Evento'}
        size="lg"
      >
        <EventoForm
          initialData={editingEvento}
          catalogs={catalogs}
          onSubmit={handleSaveEvento}
          onCancel={handleCloseModal}
        />
      </Modal>

      {/* Toasts */}
      <ToastContainer toasts={toasts} onClose={removeToast} />
    </div>
  );
}
