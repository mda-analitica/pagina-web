import React, { useState, useEffect } from 'react';
import type { Control } from '../../data/types';
import { TIPOS_CONTROL, FRECUENCIAS_CONTROL, IMPLEMENTACIONES, COSTOS, COMPLEJIDADES } from '../../data/types';
import { Button } from '../ui/Button';
import type { CatalogsData } from '../../hooks/useCatalogos';

interface ControlFormProps {
  initialData?: Control;
  riesgoId?: number;
  catalogs: CatalogsData;
  onSubmit: (data: Partial<Control>) => Promise<void>;
  onCancel: () => void;
  loading?: boolean;
}

export function ControlForm({ initialData, riesgoId, catalogs, onSubmit, onCancel, loading }: ControlFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    control: '',
    riesgoId: riesgoId || 0,
    riesgoNombre: '',
    tipoControl: 'Preventivo',
    frecuencia: 'Mensual',
    implementacion: 'Manual',
    costo: 'Medio',
    complejidad: 'Media',
    cobertura: '',
    fechaImplementacion: new Date().toISOString().split('T')[0],
    fechaValidacion: '',
    validado: false,
    evidencia: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        control: initialData.control || '',
        riesgoId: initialData.riesgoId || 0,
        riesgoNombre: initialData.riesgoNombre || '',
        tipoControl: initialData.tipoControl || 'Preventivo',
        frecuencia: initialData.frecuencia || 'Mensual',
        implementacion: initialData.implementacion || 'Manual',
        costo: initialData.costo || 'Medio',
        complejidad: initialData.complejidad || 'Media',
        cobertura: initialData.cobertura || '',
        fechaImplementacion: initialData.fechaImplementacion || new Date().toISOString().split('T')[0],
        fechaValidacion: initialData.fechaValidacion || '',
        validado: initialData.validado || false,
        evidencia: initialData.evidencia || '',
      });
    }
  }, [initialData]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.title.trim()) newErrors.title = 'El nombre es requerido';
    if (!formData.control.trim()) newErrors.control = 'La descripción es requerida';
    if (formData.riesgoId === 0) newErrors.riesgoId = 'El riesgo es requerido';
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
      {/* Nombre del Control */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
          Nombre del Control *
        </label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => handleInputChange('title', e.target.value)}
          placeholder="Ej: Validación de transacciones"
          className={`w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary ${
            errors.title ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
          }`}
        />
        {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
      </div>

      {/* Descripción */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
          Descripción del Control *
        </label>
        <textarea
          value={formData.control}
          onChange={(e) => handleInputChange('control', e.target.value)}
          placeholder="Describe el control implementado"
          rows={3}
          className={`w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary ${
            errors.control ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
          }`}
        />
        {errors.control && <p className="text-red-500 text-xs mt-1">{errors.control}</p>}
      </div>

      {/* Tipo, Frecuencia, Implementación */}
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
            Tipo Control
          </label>
          <select
            value={formData.tipoControl}
            onChange={(e) => handleInputChange('tipoControl', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {TIPOS_CONTROL.map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
            Frecuencia
          </label>
          <select
            value={formData.frecuencia}
            onChange={(e) => handleInputChange('frecuencia', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {FRECUENCIAS_CONTROL.map(f => (
              <option key={f} value={f}>{f}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
            Implementación
          </label>
          <select
            value={formData.implementacion}
            onChange={(e) => handleInputChange('implementacion', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {IMPLEMENTACIONES.map(i => (
              <option key={i} value={i}>{i}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Costo y Complejidad */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
            Costo
          </label>
          <select
            value={formData.costo}
            onChange={(e) => handleInputChange('costo', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {COSTOS.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
            Complejidad
          </label>
          <select
            value={formData.complejidad}
            onChange={(e) => handleInputChange('complejidad', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {COMPLEJIDADES.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Cobertura */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
          Cobertura (%)
        </label>
        <input
          type="number"
          value={formData.cobertura}
          onChange={(e) => handleInputChange('cobertura', e.target.value)}
          placeholder="0-100"
          min="0"
          max="100"
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Fechas */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
            Fecha Implementación
          </label>
          <input
            type="date"
            value={formData.fechaImplementacion}
            onChange={(e) => handleInputChange('fechaImplementacion', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
            Fecha Validación
          </label>
          <input
            type="date"
            value={formData.fechaValidacion}
            onChange={(e) => handleInputChange('fechaValidacion', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      {/* Validado */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="validado"
          checked={formData.validado}
          onChange={(e) => handleInputChange('validado', e.target.checked)}
          className="rounded"
        />
        <label htmlFor="validado" className="text-sm text-gray-700 dark:text-gray-300">
          Control validado
        </label>
      </div>

      {/* Botones */}
      <div className="flex gap-3 justify-end pt-4 border-t border-gray-200 dark:border-gray-700">
        <Button
          variant="outline"
          onClick={onCancel}
          disabled={loading}
        >
          Cancelar
        </Button>
        <Button
          variant="primary"
          type="submit"
          disabled={loading}
          className="flex items-center gap-2"
        >
          {loading && <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />}
          {initialData ? 'Actualizar' : 'Crear'} Control
        </Button>
      </div>
    </form>
  );
}
