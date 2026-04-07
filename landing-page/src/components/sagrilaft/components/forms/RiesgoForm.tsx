import React, { useState, useEffect } from 'react';
import type { Riesgo } from '../../data/types';
import { PROBABILIDADES, IMPACTOS, ESTADOS_RIESGO, TIPOS_RIESGO, PERIODICIDADES } from '../../data/types';
import { Button } from '../ui/Button';
import { Icon } from '../ui/Icon';
import type { CatalogsData } from '../../hooks/useCatalogos';

interface RiesgoFormProps {
  initialData?: Riesgo;
  catalogs: CatalogsData;
  onSubmit: (data: Partial<Riesgo>) => Promise<void>;
  onCancel: () => void;
  loading?: boolean;
}

export function RiesgoForm({ initialData, catalogs, onSubmit, onCancel, loading }: RiesgoFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    riesgo: '',
    proceso: '',
    tipoRiesgo: '',
    descripcion: '',
    causas: '',
    consecuencias: '',
    probabilidad: 'Posible' as const,
    impacto: 'Moderado' as const,
    factor: '',
    responsable: '',
    estadoRiesgo: 'Identificado' as const,
    fechaIdentificacion: new Date().toISOString().split('T')[0],
    periodicidadMonitoreo: 'Mensual' as const,
    notificar: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        riesgo: initialData.riesgo || '',
        proceso: initialData.proceso || '',
        tipoRiesgo: initialData.tipoRiesgo || '',
        descripcion: initialData.descripcion || '',
        causas: initialData.causas || '',
        consecuencias: initialData.consecuencias || '',
        probabilidad: (initialData.probabilidad as any) || 'Posible',
        impacto: (initialData.impacto as any) || 'Moderado',
        factor: initialData.factor || '',
        responsable: initialData.responsable || '',
        estadoRiesgo: (initialData.estadoRiesgo as any) || 'Identificado',
        fechaIdentificacion: initialData.fechaIdentificacion || new Date().toISOString().split('T')[0],
        periodicidadMonitoreo: (initialData.periodicidadMonitoreo as any) || 'Mensual',
        notificar: initialData.notificar || false,
      });
    }
  }, [initialData]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.title.trim()) newErrors.title = 'El nombre es requerido';
    if (!formData.riesgo.trim()) newErrors.riesgo = 'La descripción del riesgo es requerida';
    if (!formData.proceso) newErrors.proceso = 'El proceso es requerido';
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
      {/* Nombre del Riesgo */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
          Nombre del Riesgo *
        </label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => handleInputChange('title', e.target.value)}
          placeholder="Ej: Riesgo de fraude interno"
          className={`w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary ${
            errors.title ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
          }`}
        />
        {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
      </div>

      {/* Descripción del Riesgo */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
          Descripción del Riesgo *
        </label>
        <textarea
          value={formData.riesgo}
          onChange={(e) => handleInputChange('riesgo', e.target.value)}
          placeholder="Describe el riesgo identificado"
          rows={3}
          className={`w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary ${
            errors.riesgo ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
          }`}
        />
        {errors.riesgo && <p className="text-red-500 text-xs mt-1">{errors.riesgo}</p>}
      </div>

      {/* Proceso */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
          Proceso *
        </label>
        <select
          value={formData.proceso}
          onChange={(e) => handleInputChange('proceso', e.target.value)}
          className={`w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary ${
            errors.proceso ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
          }`}
        >
          <option value="">Seleccionar proceso</option>
          {catalogs.procesos.map(p => (
            <option key={p.id} value={p.value}>{p.value}</option>
          ))}
        </select>
        {errors.proceso && <p className="text-red-500 text-xs mt-1">{errors.proceso}</p>}
      </div>

      {/* Tipo de Riesgo */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
          Tipo de Riesgo
        </label>
        <select
          value={formData.tipoRiesgo}
          onChange={(e) => handleInputChange('tipoRiesgo', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="">Seleccionar tipo</option>
          {TIPOS_RIESGO.map(tipo => (
            <option key={tipo} value={tipo}>{tipo}</option>
          ))}
        </select>
      </div>

      {/* Probabilidad e Impacto */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
            Probabilidad
          </label>
          <select
            value={formData.probabilidad}
            onChange={(e) => handleInputChange('probabilidad', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {PROBABILIDADES.map(p => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
            Impacto
          </label>
          <select
            value={formData.impacto}
            onChange={(e) => handleInputChange('impacto', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {IMPACTOS.map(i => (
              <option key={i} value={i}>{i}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Causas y Consecuencias */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
            Causas
          </label>
          <textarea
            value={formData.causas}
            onChange={(e) => handleInputChange('causas', e.target.value)}
            placeholder="Describe las causas"
            rows={2}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
            Consecuencias
          </label>
          <textarea
            value={formData.consecuencias}
            onChange={(e) => handleInputChange('consecuencias', e.target.value)}
            placeholder="Describe las consecuencias"
            rows={2}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      {/* Estado y Periodicidad */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
            Estado
          </label>
          <select
            value={formData.estadoRiesgo}
            onChange={(e) => handleInputChange('estadoRiesgo', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {ESTADOS_RIESGO.map(e => (
              <option key={e} value={e}>{e}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
            Periodicidad Monitoreo
          </label>
          <select
            value={formData.periodicidadMonitoreo}
            onChange={(e) => handleInputChange('periodicidadMonitoreo', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {PERIODICIDADES.map(p => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
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

      {/* Notificar */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="notificar"
          checked={formData.notificar}
          onChange={(e) => handleInputChange('notificar', e.target.checked)}
          className="rounded"
        />
        <label htmlFor="notificar" className="text-sm text-gray-700 dark:text-gray-300">
          Notificar a responsables
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
          {initialData ? 'Actualizar' : 'Crear'} Riesgo
        </Button>
      </div>
    </form>
  );
}
