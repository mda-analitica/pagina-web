import { useState, useEffect, useCallback } from 'react';
import type { Control } from '../data/types';
import { CacheService, CACHE_KEYS } from '../data/cache';
import { seedControles } from '../data/seed';

export function useControles(riesgoId?: number) {
  const [data, setData] = useState<Control[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(() => {
    try {
      setLoading(true);
      setError(null);
      let items = CacheService.seedIfEmpty<Control>(CACHE_KEYS.controles, seedControles);
      if (riesgoId) items = items.filter(c => c.riesgoId === riesgoId);
      const sorted = [...items].sort((a, b) => b.id - a.id);
      setData(sorted);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar controles');
    } finally {
      setLoading(false);
    }
  }, [riesgoId]);

  const createItem = useCallback((item: Omit<Control, 'id' | 'title'>) => {
    const nextId = CacheService.getNextId<Control>(CACHE_KEYS.controles);
    const newItem: Control = { ...item, id: nextId, title: `CTR-${String(nextId).padStart(3, '0')}` };
    CacheService.addToCollection(CACHE_KEYS.controles, newItem);
    loadData();
    return newItem;
  }, [loadData]);

  const updateItem = useCallback((id: number, changes: Partial<Control>) => {
    const updated = CacheService.updateInCollection<Control>(CACHE_KEYS.controles, id, changes);
    loadData();
    return updated;
  }, [loadData]);

  const deleteItem = useCallback((id: number) => {
    CacheService.removeFromCollection<Control>(CACHE_KEYS.controles, id);
    loadData();
  }, [loadData]);

  useEffect(() => { loadData(); }, [loadData]);

  const stats = {
    total: data.length,
    validados: data.filter(d => d.validado).length,
    noValidados: data.filter(d => !d.validado).length,
    preventivos: data.filter(d => d.tipoControl === 'Preventivo').length,
    detectivos: data.filter(d => d.tipoControl === 'Detectivo').length,
    correctivos: data.filter(d => d.tipoControl === 'Correctivo').length,
    automaticos: data.filter(d => d.implementacion === 'Automatico').length,
    manuales: data.filter(d => d.implementacion === 'Manual').length,
  };

  return { data, loading, error, stats, loadData, createItem, updateItem, deleteItem };
}
