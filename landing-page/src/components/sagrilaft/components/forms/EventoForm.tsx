import React, { useState, useEffect } from 'react';
import type { RegistroEvento } from '../../data/types';
import { Button } from '../ui/Button';
import type { CatalogsData } from '../../hooks/useCatalogos';

interface EventoFormProps {
  initialData?: RegistroEvento;
  catalogs: CatalogsData;
  onSubmit: (data: Partial<RegistroEvento>) => Promise<void>;
  onCancel: () => void;
  loading?: boolean;
}

export function EventoForm({ initialData, catalogs, onSubmit, onCancel, loading }: EventoFormProps) {
  const [formData, setFormData] = useState({
    nombreEvento: '',
    descripcion: '',
    fechaIdentificacion: new Date().toISOString().split('T')[0],
    fechaInicioEvento: new Date().toISOString().split('T')[0],
    fechaFinalizacionEvento: '',
    cuantiaPerdida: 0,
    cuantiaRecuperadaDirecta: 0,
    cuantiaRecuperadaSeguros: 0,
    responsable: '',
    estado: 'Abierto',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        nombreEvento: initialData.nombreEvento || '',
        descripcion: initialData.descripcion || '',
        fechaIdentificacion: initialData.fechaIdentificacion || new Date().toISOString().split('T')[0],
        fechaInicioEvento: initialData.fechaInicioEvento || '',
        fechaFinalizacionEvento: initialData.fechaFinalizacionEvento || '',
        cuantiaPerdida: initialData.cuantiaPerdida || 0,
        cuantiaRecuperadaDirecta: initialData.cuantiaRecuperadaDirecta || 0,
        cuantiaRecuperadaSeguros: initialData.cuantiaRecuperadaSeguros || 0,
        responsable: initialData.responsable || '',
        estado: 'Abierto',
      });
    }
  }, [initialData]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.nombreEvento.trim()) newErrors.nombreEvento = 'El nombre es requerido';
    if (!formData.fechaInicioEvento) newErrors.fechaInicioEvento = 'La fecha es requerida';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      await onSubmit(formData);
    } catch (err) {
      console.error('Error submitting form:', err);
    }
  };

  const handleInputChange = (field: keyof typeof formData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      const newErrors = { ...errors };
      delete newErrors[field];
      setErrors(newErrors);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 p-6">
      {/* Nombre del Evento */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
          Nombre del Evento *
        </label>
        <input
          type="text"
          value={formData.nombreEvento}
          onChange={(e) => handleInputChange('nombreEvento', e.target.value)}
          placeholder="Descripción breve del evento"
          className={`w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary ${
            errors.nombreEvento ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
          }`}
        />
        {errors.nombreEvento && <p className="text-red-500 text-xs mt-1">{errors.nombreEvento}</p>}
      </div>

      {/* Descripción */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
          Descripción Detallada
        </label>
        <textarea
          value={formData.descripcion}
          onChange={(e) => handleInputChange('descripcion', e.target.value)}
          placeholder="Detalle del evento"
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Fechas */}
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
            Fecha Identificación
          </label>
          <input
            type="date"
            value={formData.fechaIdentificacion}
            onChange={(e) => handleInputChange('fechaIdentificacion', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
            Fecha Inicio *
          </label>
          <input
            type="date"
            value={formData.fechaInicioEvento}
            onChange={(e) => handleInputChange('fechaInicioEvento', e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary ${
              errors.fechaInicioEvento ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
            }`}
          />
          {errors.fechaInicioEvento && <p className="text-red-500 text-xs mt-1">{errors.fechaInicioEvento}</p>}
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
            Fecha Finalización
          </label>
          <input
            type="date"
            value={formData.fechaFinalizacionEvento}
            onChange={(e) => handleInputChange('fechaFinalizacionEvento', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      {/* Cuantías */}
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
            Cuantía Pérdida
          </label>
          <input
            type="number"
            value={formData.cuantiaPerdida}
            onChange={(e) => handleInputChange('cuantiaPerdida', parseFloat(e.target.value) || 0)}
            placeholder="0.00"
            min="0"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
            Recuperada (Directa)
          </label>
          <input
            type="number"
            value={formData.cuantiaRecuperadaDirecta}
            onChange={(e) => handleInputChange('cuantiaRecuperadaDirecta', parseFloat(e.target.value) || 0)}
            placeholder="0.00"
            min="0"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
            Recuperada (Seguros)
          </label>
          <input
            type="number"
            value={formData.cuantiaRecuperadaSeguros}
            onChange={(e) => handleInputChange('cuantiaRecuperadaSeguros', parseFloat(e.target.value) || 0)}
            placeholder="0.00"
            min="0"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      {/* Responsable */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
          Responsable
        </label>
        <input
          type="text"
          value={formData.responsable}
          onChange={(e) => handleInputChange('responsable', e.target.value)}
          placeholder="Nombre del responsable"
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Botones */}
      <div className="flex gap-3 justify-end pt-4 border-t border-gray-200 dark:border-gray-700">
        <Button variant="outline" onClick={onCancel} disabled={loading}>
          Cancelar
        </Button>
        <Button variant="primary" type="submit" disabled={loading} className="flex items-center gap-2">
          {loading && <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />}
          {initialData ? 'Actualizar' : 'Crear'} Evento
        </Button>
      </div>
    </form>
  );
}
