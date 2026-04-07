// Simplified types for SAGRILAFT module - NO SharePoint OData format

export interface LookupRef {
  id: number;
  value: string;
}

export interface CatalogoItem {
  id: number;
  value: string;
  description?: string;
}

export interface Riesgo {
  id: number;
  title: string;
  riesgo: string;
  proceso: string;
  tipoRiesgo: string;
  descripcion: string;
  causas: string;
  consecuencias: string;
  probabilidad: string;
  impacto: string;
  factor: string;
  responsable: string;
  estadoRiesgo: string;
  fechaIdentificacion: string;
  fechaUltimoMonitoreo?: string;
  periodicidadMonitoreo: string;
  notificar: boolean;
  modified?: string;
}

export interface Control {
  id: number;
  title: string;
  control: string;
  riesgoId: number;
  riesgoNombre: string;
  tipoControl: string;
  frecuencia: string;
  implementacion: string;
  costo: string;
  complejidad: string;
  cobertura: string;
  fechaImplementacion: string;
  fechaValidacion?: string;
  validado: boolean;
  evidencia?: string;
  nombreDocumentacion?: string;
}

export interface RegistroEvento {
  id: number;
  nombreEvento: string;
  fechaInicioEvento: string;
  fechaFinalizacionEvento: string;
  fechaContabilizacion?: string;
  fechaIdentificacion?: string;
  cuentaContable?: string;
  cuantiaPerdida: number;
  cuantiaRecuperadaDirecta: number;
  cuantiaRecuperadaSeguros?: number;
  descripcionEvento?: string;
  causas?: string;
  consecuencias?: string;
  acciones?: string;
  observaciones?: string;
  comentarios?: string;
  nombreRegistra?: string;
  riesgo?: LookupRef;
  proceso?: LookupRef;
  producto?: LookupRef;
  zonaGeografica?: LookupRef;
  notificarA?: LookupRef[];
  notificar: boolean;
  causa?: LookupRef;
  canal?: LookupRef;
  contraparte?: LookupRef;
  modified?: string;
  created?: string;
}

export interface PlanAccionEvento {
  id: number;
  nombrePlan: string;
  descripcionPlan: string;
  progreso: number;
  fechaInicio: string;
  fechaVencimiento: string;
  notaSeguimiento?: string;
  comunicar: boolean;
  asignado?: string;
  estado: 'Completado' | 'En progreso' | 'Pendiente';
  reporteEventoId?: number;
  reporteEventoNombre?: string;
  modified?: string;
  created?: string;
}

// Enums / Constants
export const PROBABILIDADES = ['Inusual', 'Improbable', 'Posible', 'Probable', 'Casi certeza'] as const;
export const IMPACTOS = ['Bajo', 'Menor', 'Moderado', 'Mayor', 'Catastrófico'] as const;
export const ESTADOS_RIESGO = ['Identificado', 'En Tratamiento', 'Mitigado', 'Aceptado'] as const;
export const FACTORES = ['Producto', 'Contraparte', 'Jurisdicción', 'Canal'] as const;
export const TIPOS_CONTROL = ['Preventivo', 'Detectivo', 'Correctivo'] as const;
export const FRECUENCIAS_CONTROL = ['Diario', 'Semanal', 'Mensual', 'Trimestral', 'Anual'] as const;
export const IMPLEMENTACIONES = ['Manual', 'Automatico', 'Semi-automatico'] as const;
export const COSTOS = ['Bajo', 'Medio', 'Alto'] as const;
export const COMPLEJIDADES = ['Baja', 'Media', 'Alta'] as const;
export const TIPOS_RIESGO = ['Tecnologico', 'Legal', 'Operativo', 'Financiero', 'Reputacional'] as const;
export const PERIODICIDADES = ['Mensual', 'Trimestral', 'Semestral', 'Anual'] as const;
export const ESTADOS_PLAN = ['Pendiente', 'En progreso', 'Completado'] as const;

// Page types for SPA navigation
export type SagrilaftPage =
  | 'home'
  | 'riesgos-list'
  | 'riesgos-controles'
  | 'riesgos-reportes'
  | 'riesgos-eventos'
  | 'riesgos-planes';
