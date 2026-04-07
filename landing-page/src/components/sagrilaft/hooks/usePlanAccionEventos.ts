import { useState, useEffect, useCallback } from 'react';
import type { PlanAccionEvento } from '../data/types';
import { CacheService, CACHE_KEYS } from '../data/cache';
import { seedPlanesAccion } from '../data/seed';

export function usePlanAccionEventos(filterByEventoId?: number) {
  const [data, setData] = useState<PlanAccionEvento[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(() => {
    try {
      setLoading(true);
      setError(null);
      let items = CacheService.seedIfEmpty<PlanAccionEvento>(CACHE_KEYS.planesAccion, seedPlanesAccion);
      if (filterByEventoId) items = items.filter(i => i.reporteEventoId === filterByEventoId);
      setData([...items].sort((a, b) => b.id - a.id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar planes');
    } finally {
      setLoading(false);
    }
  }, [filterByEventoId]);

  const createItem = useCallback((item: Omit<PlanAccionEvento, 'id'>) => {
    const nextId = CacheService.getNextId<PlanAccionEvento>(CACHE_KEYS.planesAccion);
    const newItem: PlanAccionEvento = { ...item, id: nextId, created: new Date().toISOString(), modified: new Date().toISOString() };
    CacheService.addToCollection(CACHE_KEYS.planesAccion, newItem);
    loadData();
    return newItem;
  }, [loadData]);

  const updateItem = useCallback((id: number, changes: Partial<PlanAccionEvento>) => {
    const updated = CacheService.updateInCollection<PlanAccionEvento>(CACHE_KEYS.planesAccion, id, { ...changes, modified: new Date().toISOString() });
    loadData();
    return updated;
  }, [loadData]);

  const deleteItem = useCallback((id: number) => {
    CacheService.removeFromCollection<PlanAccionEvento>(CACHE_KEYS.planesAccion, id);
    loadData();
  }, [loadData]);

  useEffect(() => { loadData(); }, [loadData]);

  const today = new Date().toISOString().split('T')[0];
  const stats = {
    total: data.length,
    progresoPromedio: data.length > 0 ? Math.round(data.reduce((s, d) => s + d.progreso, 0) / data.length) : 0,
    completados: data.filter(d => d.estado === 'Completado' || d.progreso >= 100).length,
    enProgreso: data.filter(d => d.estado === 'En progreso').length,
    pendientes: data.filter(d => d.estado === 'Pendiente' || !d.estado).length,
    vencidos: data.filter(d => { if (!d.fechaVencimiento) return false; return d.fechaVencimiento.split('T')[0] < today && d.estado !== 'Completado'; }).length,
  };

  return { data, loading, error, stats, loadData, createItem, updateItem, deleteItem };
}
