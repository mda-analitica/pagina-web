import { useState, useEffect, useCallback } from 'react';
import type { RegistroEvento } from '../data/types';
import { CacheService, CACHE_KEYS } from '../data/cache';
import { seedEventos } from '../data/seed';

export function useEventos() {
  const [data, setData] = useState<RegistroEvento[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(() => {
    try {
      setLoading(true);
      setError(null);
      const items = CacheService.seedIfEmpty<RegistroEvento>(CACHE_KEYS.eventos, seedEventos);
      setData([...items].sort((a, b) => b.id - a.id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar eventos');
    } finally {
      setLoading(false);
    }
  }, []);

  const createItem = useCallback((item: Omit<RegistroEvento, 'id'>) => {
    const nextId = CacheService.getNextId<RegistroEvento>(CACHE_KEYS.eventos);
    const newItem: RegistroEvento = { ...item, id: nextId, created: new Date().toISOString(), modified: new Date().toISOString() };
    CacheService.addToCollection(CACHE_KEYS.eventos, newItem);
    loadData();
    return newItem;
  }, [loadData]);

  const updateItem = useCallback((id: number, changes: Partial<RegistroEvento>) => {
    const updated = CacheService.updateInCollection<RegistroEvento>(CACHE_KEYS.eventos, id, { ...changes, modified: new Date().toISOString() });
    loadData();
    return updated;
  }, [loadData]);

  const deleteItem = useCallback((id: number) => {
    CacheService.removeFromCollection<RegistroEvento>(CACHE_KEYS.eventos, id);
    loadData();
  }, [loadData]);

  useEffect(() => { loadData(); }, [loadData]);

  const stats = {
    total: data.length,
    proximos: data.filter(e => { if (!e.fechaInicioEvento) return false; return new Date(e.fechaInicioEvento) >= new Date(); }).length,
    enCurso: data.filter(e => { if (!e.fechaInicioEvento || !e.fechaFinalizacionEvento) return false; const hoy = new Date(); return new Date(e.fechaInicioEvento) <= hoy && new Date(e.fechaFinalizacionEvento) >= hoy; }).length,
    finalizados: data.filter(e => { if (!e.fechaFinalizacionEvento) return false; return new Date(e.fechaFinalizacionEvento) < new Date(); }).length,
  };

  return { data, loading, error, stats, loadData, createItem, updateItem, deleteItem };
}
