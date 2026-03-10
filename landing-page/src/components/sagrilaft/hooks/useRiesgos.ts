import { useState, useEffect, useCallback } from 'react';
import type { Riesgo } from '../data/types';
import { CacheService, CACHE_KEYS } from '../data/cache';
import { seedRiesgos } from '../data/seed';

export function useRiesgos() {
  const [data, setData] = useState<Riesgo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(() => {
    try {
      setLoading(true);
      setError(null);
      const items = CacheService.seedIfEmpty<Riesgo>(CACHE_KEYS.riesgos, seedRiesgos);
      const sorted = [...items].sort((a, b) => b.id - a.id);
      setData(sorted);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar riesgos');
    } finally {
      setLoading(false);
    }
  }, []);

  const createItem = useCallback((item: Omit<Riesgo, 'id' | 'title'>) => {
    const nextId = CacheService.getNextId<Riesgo>(CACHE_KEYS.riesgos);
    const newItem: Riesgo = {
      ...item,
      id: nextId,
      title: `RIE-${String(nextId).padStart(3, '0')}`,
      modified: new Date().toISOString(),
    };
    CacheService.addToCollection(CACHE_KEYS.riesgos, newItem);
    loadData();
    return newItem;
  }, [loadData]);

  const updateItem = useCallback((id: number, changes: Partial<Riesgo>) => {
    const updated = CacheService.updateInCollection<Riesgo>(CACHE_KEYS.riesgos, id, {
      ...changes,
      modified: new Date().toISOString(),
    });
    loadData();
    return updated;
  }, [loadData]);

  const deleteItem = useCallback((id: number) => {
    CacheService.removeFromCollection<Riesgo>(CACHE_KEYS.riesgos, id);
    loadData();
  }, [loadData]);

  useEffect(() => { loadData(); }, [loadData]);

  const stats = {
    total: data.length,
    criticos: data.filter(d => d.impacto === 'Catastr\u00f3fico' || d.impacto === 'Mayor').length,
    moderados: data.filter(d => d.impacto === 'Moderado').length,
    bajos: data.filter(d => d.impacto === 'Bajo' || d.impacto === 'Menor').length,
    enTratamiento: data.filter(d => d.estadoRiesgo === 'En Tratamiento').length,
    identificados: data.filter(d => d.estadoRiesgo === 'Identificado').length,
    mitigados: data.filter(d => d.estadoRiesgo === 'Mitigado').length,
    aceptados: data.filter(d => d.estadoRiesgo === 'Aceptado').length,
  };

  return { data, loading, error, stats, loadData, createItem, updateItem, deleteItem };
}
