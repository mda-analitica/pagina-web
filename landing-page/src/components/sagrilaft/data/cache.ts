const PREFIX = 'sagrilaft_';

export const CACHE_KEYS = {
  riesgos: `${PREFIX}riesgos`,
  controles: `${PREFIX}controles`,
  eventos: `${PREFIX}eventos`,
  planesAccion: `${PREFIX}planes_accion`,
  catalogoProcesos: `${PREFIX}cat_procesos`,
  catalogoRiesgos: `${PREFIX}cat_riesgos`,
  catalogoControles: `${PREFIX}cat_controles`,
  catalogoProductos: `${PREFIX}cat_productos`,
  catalogoZonas: `${PREFIX}cat_zonas`,
  catalogoCanales: `${PREFIX}cat_canales`,
  catalogoContrapartes: `${PREFIX}cat_contrapartes`,
  catalogoNotificarA: `${PREFIX}cat_notificar_a`,
  catalogoCausas: `${PREFIX}cat_causas`,
} as const;

export type CacheKey = (typeof CACHE_KEYS)[keyof typeof CACHE_KEYS];

export const CacheService = {
  getCollection<T>(key: CacheKey): T[] {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return [];
      return JSON.parse(raw) as T[];
    } catch {
      return [];
    }
  },

  setCollection<T>(key: CacheKey, data: T[]): void {
    localStorage.setItem(key, JSON.stringify(data));
  },

  seedIfEmpty<T>(key: CacheKey, seedData: T[]): T[] {
    const existing = this.getCollection<T>(key);
    if (existing.length > 0) return existing;
    this.setCollection(key, seedData);
    return seedData;
  },

  addToCollection<T extends { id: number }>(key: CacheKey, item: T): T {
    const collection = this.getCollection<T>(key);
    collection.push(item);
    this.setCollection(key, collection);
    return item;
  },

  updateInCollection<T extends { id: number }>(key: CacheKey, id: number, changes: Partial<T>): T | undefined {
    const collection = this.getCollection<T>(key);
    const idx = collection.findIndex(item => item.id === id);
    if (idx === -1) return undefined;
    collection[idx] = { ...collection[idx], ...changes };
    this.setCollection(key, collection);
    return collection[idx];
  },

  removeFromCollection<T extends { id: number }>(key: CacheKey, id: number): boolean {
    const collection = this.getCollection<T>(key);
    const filtered = collection.filter(item => item.id !== id);
    if (filtered.length === collection.length) return false;
    this.setCollection(key, filtered);
    return true;
  },

  getNextId<T extends { id: number }>(key: CacheKey): number {
    const collection = this.getCollection<T>(key);
    if (collection.length === 0) return 1;
    return Math.max(...collection.map(item => item.id)) + 1;
  },

  clearAll(): void {
    Object.values(CACHE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
  },
};
