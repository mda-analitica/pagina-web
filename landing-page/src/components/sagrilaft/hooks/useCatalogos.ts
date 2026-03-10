import { useState, useEffect } from 'react';
import type { CatalogoItem } from '../data/types';
import { CacheService, CACHE_KEYS } from '../data/cache';
import {
  seedProcesos, seedProductos, seedZonasGeograficas, seedCanales,
  seedContrapartes, seedNotificarA, seedCausas,
} from '../data/seed';

export function useCatalogos() {
  const [procesos, setProcesos] = useState<CatalogoItem[]>([]);
  const [productos, setProductos] = useState<CatalogoItem[]>([]);
  const [zonasGeograficas, setZonasGeograficas] = useState<CatalogoItem[]>([]);
  const [canales, setCanales] = useState<CatalogoItem[]>([]);
  const [contrapartes, setContrapartes] = useState<CatalogoItem[]>([]);
  const [notificarA, setNotificarA] = useState<CatalogoItem[]>([]);
  const [causas, setCausas] = useState<CatalogoItem[]>([]);

  useEffect(() => {
    setProcesos(CacheService.seedIfEmpty(CACHE_KEYS.catalogoProcesos, seedProcesos));
    setProductos(CacheService.seedIfEmpty(CACHE_KEYS.catalogoProductos, seedProductos));
    setZonasGeograficas(CacheService.seedIfEmpty(CACHE_KEYS.catalogoZonas, seedZonasGeograficas));
    setCanales(CacheService.seedIfEmpty(CACHE_KEYS.catalogoCanales, seedCanales));
    setContrapartes(CacheService.seedIfEmpty(CACHE_KEYS.catalogoContrapartes, seedContrapartes));
    setNotificarA(CacheService.seedIfEmpty(CACHE_KEYS.catalogoNotificarA, seedNotificarA));
    setCausas(CacheService.seedIfEmpty(CACHE_KEYS.catalogoCausas, seedCausas));
  }, []);

  return { procesos, productos, zonasGeograficas, canales, contrapartes, notificarA, causas };
}
