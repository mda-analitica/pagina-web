import type { Riesgo, Control, RegistroEvento, PlanAccionEvento, CatalogoItem } from './types';

export const seedRiesgos: Riesgo[] = [
  {
    id: 1, title: 'RIE-001', riesgo: 'Fuga de información sensible de clientes',
    proceso: 'Gestión de Accesos', tipoRiesgo: 'Tecnologico',
    descripcion: 'Posibilidad de que información confidencial de clientes sea expuesta o robada por actores externos o internos.',
    causas: 'Controles de acceso débiles, falta de cifrado, empleados no capacitados en seguridad',
    consecuencias: 'Multas regulatorias, demandas, pérdida de confianza de clientes, daño reputacional',
    probabilidad: 'Probable', impacto: 'Catastrófico', factor: 'Canal',
    responsable: 'Director de Seguridad', estadoRiesgo: 'En Tratamiento',
    fechaIdentificacion: '2024-01-15', fechaUltimoMonitoreo: '2024-11-15',
    periodicidadMonitoreo: 'Mensual', notificar: true, modified: '2024-12-20T10:30:00Z',
  },
  {
    id: 2, title: 'RIE-002', riesgo: 'Incumplimiento normativo SARLAFT',
    proceso: 'SARLAFT', tipoRiesgo: 'Legal',
    descripcion: 'Riesgo de no cumplir con las regulaciones de prevención de lavado de activos y financiación del terrorismo.',
    causas: 'Falta de debida diligencia, monitoreo insuficiente de transacciones, ausencia de reportes a la UIAF',
    consecuencias: 'Sanciones de la Superintendencia, pérdida de licencia, multas económicas',
    probabilidad: 'Posible', impacto: 'Catastrófico', factor: 'Contraparte',
    responsable: 'Oficial de Cumplimiento', estadoRiesgo: 'En Tratamiento',
    fechaIdentificacion: '2024-01-20', fechaUltimoMonitoreo: '2024-12-01',
    periodicidadMonitoreo: 'Mensual', notificar: true, modified: '2024-12-18T14:20:00Z',
  },
  {
    id: 3, title: 'RIE-003', riesgo: 'Ataques de Phishing a empleados',
    proceso: 'Gestión de Accesos', tipoRiesgo: 'Tecnologico',
    descripcion: 'Empleados podrían caer en engaños de ingeniería social y revelar credenciales o información sensible.',
    causas: 'Falta de capacitación en ciberseguridad, correos no filtrados, ausencia de autenticación de dos factores',
    consecuencias: 'Compromiso de cuentas, robo de datos, instalación de malware',
    probabilidad: 'Posible', impacto: 'Mayor', factor: 'Canal',
    responsable: 'Gerente de TI', estadoRiesgo: 'Mitigado',
    fechaIdentificacion: '2024-02-01', fechaUltimoMonitoreo: '2024-10-15',
    periodicidadMonitoreo: 'Trimestral', notificar: false, modified: '2024-11-05T09:15:00Z',
  },
  {
    id: 4, title: 'RIE-004', riesgo: 'Caída del servicio de hosting principal',
    proceso: 'Backup', tipoRiesgo: 'Operativo',
    descripcion: 'Interrupción del servicio de infraestructura que soporta las aplicaciones críticas del negocio.',
    causas: 'Fallas de hardware, ataques DDoS, errores de configuración, desastres naturales',
    consecuencias: 'Pérdida de productividad, incumplimiento de SLAs, pérdida de ingresos',
    probabilidad: 'Improbable', impacto: 'Catastrófico', factor: 'Producto',
    responsable: 'Gerente de Infraestructura', estadoRiesgo: 'Identificado',
    fechaIdentificacion: '2024-02-10', fechaUltimoMonitoreo: '2024-12-10',
    periodicidadMonitoreo: 'Mensual', notificar: true, modified: '2024-12-15T16:45:00Z',
  },
  {
    id: 5, title: 'RIE-005', riesgo: 'Pérdida de personal clave',
    proceso: 'Contratación', tipoRiesgo: 'Operativo',
    descripcion: 'Riesgo de que empleados críticos abandonen la organización sin transferencia de conocimiento.',
    causas: 'Falta de planes de sucesión, baja retención, ausencia de documentación de procesos',
    consecuencias: 'Pérdida de conocimiento institucional, retrasos en proyectos, costos de reclutamiento',
    probabilidad: 'Posible', impacto: 'Mayor', factor: 'Contraparte',
    responsable: 'Director de RRHH', estadoRiesgo: 'Aceptado',
    fechaIdentificacion: '2024-02-15', fechaUltimoMonitoreo: '2024-09-20',
    periodicidadMonitoreo: 'Trimestral', notificar: false, modified: '2024-10-25T11:30:00Z',
  },
  {
    id: 6, title: 'RIE-006', riesgo: 'Fraude interno por manipulación de cuentas',
    proceso: 'Cuentas por Pagar', tipoRiesgo: 'Financiero',
    descripcion: 'Posibilidad de que empleados manipulen registros contables o realicen transacciones fraudulentas.',
    causas: 'Falta de segregación de funciones, controles débiles, supervisión insuficiente',
    consecuencias: 'Pérdidas financieras, responsabilidad legal, daño reputacional',
    probabilidad: 'Improbable', impacto: 'Mayor', factor: 'Producto',
    responsable: 'Contralor', estadoRiesgo: 'Mitigado',
    fechaIdentificacion: '2024-03-01', fechaUltimoMonitoreo: '2024-12-05',
    periodicidadMonitoreo: 'Mensual', notificar: true, modified: '2024-12-10T08:00:00Z',
  },
  {
    id: 7, title: 'RIE-007', riesgo: 'Soborno y corrupción en contratación',
    proceso: 'Órdenes de compra', tipoRiesgo: 'Legal',
    descripcion: 'Riesgo de que funcionarios acepten o soliciten sobornos para favorecer proveedores específicos.',
    causas: 'Falta de código de ética, ausencia de línea de denuncias, controles débiles en compras',
    consecuencias: 'Sanciones penales, inhabilidades, pérdida de contratos con el Estado',
    probabilidad: 'Inusual', impacto: 'Catastrófico', factor: 'Contraparte',
    responsable: 'Director de Compras', estadoRiesgo: 'En Tratamiento',
    fechaIdentificacion: '2024-03-10', fechaUltimoMonitoreo: '2024-11-01',
    periodicidadMonitoreo: 'Trimestral', notificar: true, modified: '2024-11-15T13:20:00Z',
  },
  {
    id: 8, title: 'RIE-008', riesgo: 'Financiación del terrorismo inadvertida',
    proceso: 'SARLAFT', tipoRiesgo: 'Legal',
    descripcion: 'Posibilidad de que la entidad sea utilizada para canalizar recursos hacia organizaciones terroristas.',
    causas: 'Falta de verificación de listas restrictivas, monitoreo insuficiente, debida diligencia inadecuada',
    consecuencias: 'Sanciones internacionales, pérdida de corresponsalía bancaria, cierre de operaciones',
    probabilidad: 'Inusual', impacto: 'Catastrófico', factor: 'Jurisdicción',
    responsable: 'Oficial de Cumplimiento', estadoRiesgo: 'Identificado',
    fechaIdentificacion: '2024-03-15', fechaUltimoMonitoreo: '2024-12-15',
    periodicidadMonitoreo: 'Mensual', notificar: true, modified: '2024-12-20T15:00:00Z',
  },
];

export const seedControles: Control[] = [
  { id: 1, title: 'CTR-001', control: 'Cifrado de datos en reposo y en tránsito', riesgoId: 1, riesgoNombre: 'Fuga de información sensible de clientes', tipoControl: 'Preventivo', frecuencia: 'Diario', implementacion: 'Automatico', costo: 'Medio', complejidad: 'Alta', cobertura: '100%', fechaImplementacion: '2024-01-20', fechaValidacion: '2024-06-15', validado: true, evidencia: 'Certificados SSL, políticas de cifrado AES-256', nombreDocumentacion: 'POL-SEG-001' },
  { id: 2, title: 'CTR-002', control: 'Control de acceso basado en roles (RBAC)', riesgoId: 1, riesgoNombre: 'Fuga de información sensible de clientes', tipoControl: 'Preventivo', frecuencia: 'Diario', implementacion: 'Automatico', costo: 'Bajo', complejidad: 'Media', cobertura: '95%', fechaImplementacion: '2024-01-15', fechaValidacion: '2024-05-20', validado: true, evidencia: 'Matriz de roles en Active Directory', nombreDocumentacion: 'PRO-ACC-002' },
  { id: 3, title: 'CTR-003', control: 'Debida diligencia ampliada para clientes de alto riesgo', riesgoId: 2, riesgoNombre: 'Incumplimiento normativo SARLAFT', tipoControl: 'Preventivo', frecuencia: 'Mensual', implementacion: 'Manual', costo: 'Alto', complejidad: 'Alta', cobertura: '100%', fechaImplementacion: '2024-02-01', fechaValidacion: '2024-07-10', validado: true, evidencia: 'Formularios de conocimiento del cliente, visitas', nombreDocumentacion: 'PRO-SAR-001' },
  { id: 4, title: 'CTR-004', control: 'Monitoreo de transacciones inusuales', riesgoId: 2, riesgoNombre: 'Incumplimiento normativo SARLAFT', tipoControl: 'Detectivo', frecuencia: 'Diario', implementacion: 'Automatico', costo: 'Alto', complejidad: 'Alta', cobertura: '100%', fechaImplementacion: '2024-01-10', fechaValidacion: '2024-06-01', validado: true, evidencia: 'Alertas del sistema de monitoreo', nombreDocumentacion: 'PRO-SAR-002' },
  { id: 5, title: 'CTR-005', control: 'Capacitación en ciberseguridad para empleados', riesgoId: 3, riesgoNombre: 'Ataques de Phishing a empleados', tipoControl: 'Preventivo', frecuencia: 'Trimestral', implementacion: 'Manual', costo: 'Bajo', complejidad: 'Baja', cobertura: '90%', fechaImplementacion: '2024-02-15', fechaValidacion: '2024-05-15', validado: true, evidencia: 'Registros de asistencia, evaluaciones', nombreDocumentacion: 'CAP-SEG-001' },
  { id: 6, title: 'CTR-006', control: 'Autenticación multifactor (MFA)', riesgoId: 3, riesgoNombre: 'Ataques de Phishing a empleados', tipoControl: 'Preventivo', frecuencia: 'Diario', implementacion: 'Automatico', costo: 'Bajo', complejidad: 'Media', cobertura: '100%', fechaImplementacion: '2024-03-01', fechaValidacion: '2024-06-20', validado: true, evidencia: 'Configuración en Azure AD', nombreDocumentacion: 'PRO-MFA-001' },
  { id: 7, title: 'CTR-007', control: 'Plan de recuperación ante desastres (DRP)', riesgoId: 4, riesgoNombre: 'Caída del servicio de hosting principal', tipoControl: 'Correctivo', frecuencia: 'Anual', implementacion: 'Manual', costo: 'Alto', complejidad: 'Alta', cobertura: '100%', fechaImplementacion: '2024-01-05', fechaValidacion: '2024-04-10', validado: true, evidencia: 'Documento DRP, pruebas de recuperación', nombreDocumentacion: 'PLA-DRP-001' },
  { id: 8, title: 'CTR-008', control: 'Segregación de funciones en pagos', riesgoId: 6, riesgoNombre: 'Fraude interno por manipulación de cuentas', tipoControl: 'Preventivo', frecuencia: 'Diario', implementacion: 'Manual', costo: 'Bajo', complejidad: 'Baja', cobertura: '100%', fechaImplementacion: '2024-02-01', fechaValidacion: '2024-07-01', validado: true, evidencia: 'Matriz de segregación de funciones', nombreDocumentacion: 'POL-FIN-001' },
  { id: 9, title: 'CTR-009', control: 'Código de ética y conducta', riesgoId: 7, riesgoNombre: 'Soborno y corrupción en contratación', tipoControl: 'Preventivo', frecuencia: 'Anual', implementacion: 'Manual', costo: 'Bajo', complejidad: 'Baja', cobertura: '100%', fechaImplementacion: '2024-01-01', fechaValidacion: '2024-03-15', validado: true, evidencia: 'Código firmado por empleados', nombreDocumentacion: 'COD-ETI-001' },
  { id: 10, title: 'CTR-010', control: 'Línea de denuncias anónima', riesgoId: 7, riesgoNombre: 'Soborno y corrupción en contratación', tipoControl: 'Detectivo', frecuencia: 'Diario', implementacion: 'Semi-automatico', costo: 'Medio', complejidad: 'Media', cobertura: '100%', fechaImplementacion: '2024-02-20', fechaValidacion: '2024-06-30', validado: true, evidencia: 'Portal de denuncias activo', nombreDocumentacion: 'PRO-DEN-001' },
  { id: 11, title: 'CTR-011', control: 'Consulta de listas restrictivas internacionales', riesgoId: 8, riesgoNombre: 'Financiación del terrorismo inadvertida', tipoControl: 'Preventivo', frecuencia: 'Diario', implementacion: 'Automatico', costo: 'Medio', complejidad: 'Media', cobertura: '100%', fechaImplementacion: '2024-01-10', fechaValidacion: '2024-05-01', validado: true, evidencia: 'Integración con OFAC, ONU, UE', nombreDocumentacion: 'PRO-LIS-001' },
  { id: 12, title: 'CTR-012', control: 'Revisión de logs de acceso', riesgoId: 1, riesgoNombre: 'Fuga de información sensible de clientes', tipoControl: 'Detectivo', frecuencia: 'Semanal', implementacion: 'Semi-automatico', costo: 'Bajo', complejidad: 'Media', cobertura: '80%', fechaImplementacion: '2024-03-01', validado: false, nombreDocumentacion: 'PRO-LOG-001' },
];

export const seedEventos: RegistroEvento[] = [
  {
    id: 1, nombreEvento: 'Falla en sistema de monitoreo transaccional',
    fechaInicioEvento: '2026-02-10T08:00:00Z', fechaFinalizacionEvento: '2026-02-10T17:00:00Z',
    fechaContabilizacion: '2026-02-11T09:00:00Z', fechaIdentificacion: '2026-02-10T10:00:00Z',
    cuentaContable: '510595', cuantiaPerdida: 5000000, cuantiaRecuperadaDirecta: 0,
    descripcionEvento: 'Caída del servidor principal de alertas SAGRILAFT durante 4 horas.',
    causas: 'Fallo en la fuente de poder del rack principal.',
    consecuencias: 'Retraso en el reporte de operaciones sospechosas.',
    acciones: 'Cambio de hardware y configuración de redundancia.',
    observaciones: 'Se requiere mantenimiento preventivo del datacenter.',
    nombreRegistra: 'Carlos Pérez',
    riesgo: { id: 1, value: 'Falla tecnológica' },
    proceso: { id: 2, value: 'Gestión de TI' },
    producto: { id: 1, value: 'Banca Móvil' },
    zonaGeografica: { id: 1, value: 'Antioquia' },
    notificarA: [{ id: 5, value: 'Director de Riesgos' }],
    notificar: true,
    causa: { id: 3, value: 'Infraestructura' },
    canal: { id: 2, value: 'App' },
    contraparte: { id: 10, value: 'Suministros TI S.A.' },
    comentarios: 'Se implementó redundancia en la infraestructura. Monitoreo continuo activado.',
    created: '2026-02-10T10:30:00Z', modified: '2026-02-11T14:30:00Z',
  },
  {
    id: 2, nombreEvento: 'Error en liquidación de intereses',
    fechaInicioEvento: '2026-02-15T08:00:00Z', fechaFinalizacionEvento: '2026-02-15T12:00:00Z',
    fechaContabilizacion: '2026-02-16T08:00:00Z', fechaIdentificacion: '2026-02-15T15:00:00Z',
    cuentaContable: '410210', cuantiaPerdida: 1250000, cuantiaRecuperadaDirecta: 1250000,
    descripcionEvento: 'Cálculo erróneo en la tasa aplicada a créditos de vivienda.',
    causas: 'Error en la actualización de la tabla de tasas UVR.',
    consecuencias: 'Cobro menor al esperado en cartera.',
    acciones: 'Corrección manual y notificación a clientes.',
    observaciones: 'Error humano en la carga de datos masivos.',
    nombreRegistra: 'Martha Gómez',
    riesgo: { id: 2, value: 'Riesgo Operativo - Cálculo' },
    proceso: { id: 3, value: 'Operaciones de Crédito' },
    producto: { id: 4, value: 'Crédito Hipotecario' },
    zonaGeografica: { id: 2, value: 'Cundinamarca' },
    notificarA: [{ id: 2, value: 'Gerente Financiero' }],
    notificar: false,
    causa: { id: 4, value: 'Error Humano' },
    canal: { id: 1, value: 'Oficina Virtual' },
    contraparte: { id: 101, value: 'Persona Natural' },
    comentarios: 'Se retrainó al personal. Control adicional en los cargues de datos masivos.',
    created: '2026-02-15T16:00:00Z', modified: '2026-02-16T10:00:00Z',
  },
];

export const seedPlanesAccion: PlanAccionEvento[] = [
  {
    id: 1, nombrePlan: 'Implementar control de documentación',
    descripcionPlan: 'Se debe implementar un sistema de control y custodia de documentación para evitar pérdidas futuras.',
    progreso: 45, fechaInicio: '2024-01-10', fechaVencimiento: '2024-04-10',
    estado: 'En progreso', comunicar: true, asignado: 'Juan Pérez',
    reporteEventoId: 1, reporteEventoNombre: 'Evento de Pérdida #1',
    notaSeguimiento: '10/01/2024 - 14:30 - Juan Pérez:\nSe inicia el plan de acción con la evaluación de procesos actuales.',
    created: '2024-01-10T10:00:00Z', modified: '2024-02-11T10:15:00Z',
  },
  {
    id: 2, nombrePlan: 'Capacitación en procedimientos de seguridad',
    descripcionPlan: 'Realizar capacitación integral al personal sobre procedimientos de seguridad y prevención de fraudes.',
    progreso: 80, fechaInicio: '2024-01-15', fechaVencimiento: '2024-03-15',
    estado: 'En progreso', comunicar: false, asignado: 'Carlos López',
    reporteEventoId: 2, reporteEventoNombre: 'Evento de Fraude #1',
    notaSeguimiento: '15/01/2024 - 09:00 - Carlos López:\nInicio del programa de capacitación con diagnóstico de necesidades.',
    created: '2024-01-15T09:00:00Z', modified: '2024-02-15T14:30:00Z',
  },
];

// Catalogos
export const seedProcesos: CatalogoItem[] = [
  { id: 1, value: 'Cuentas por Pagar' }, { id: 2, value: 'Tesorería' }, { id: 3, value: 'Facturación' },
  { id: 4, value: 'Gestión de Accesos' }, { id: 5, value: 'Backup' }, { id: 6, value: 'Monitoreo' },
  { id: 7, value: 'Selección' }, { id: 8, value: 'Contratación' }, { id: 9, value: 'Nómina' },
  { id: 10, value: 'Cotizaciones' }, { id: 11, value: 'Órdenes de compra' }, { id: 12, value: 'Recepción' },
  { id: 13, value: 'Compliance' }, { id: 14, value: 'Reportes regulatorios' }, { id: 15, value: 'SARLAFT' },
  { id: 16, value: 'Almacenamiento' }, { id: 17, value: 'Despacho' }, { id: 18, value: 'Conteo' },
  { id: 19, value: 'Cuentas por Cobrar' }, { id: 20, value: 'Gestión de Inventarios' },
];

export const seedProductos: CatalogoItem[] = [
  { id: 1, value: 'Cuenta de Ahorros' }, { id: 2, value: 'Cuenta Corriente' }, { id: 3, value: 'CDT' },
  { id: 4, value: 'Credito de Consumo' }, { id: 5, value: 'Credito Hipotecario' },
  { id: 6, value: 'Tarjeta de Credito' }, { id: 7, value: 'Seguro de Vida' }, { id: 8, value: 'Fondo de Inversion' },
];

export const seedZonasGeograficas: CatalogoItem[] = [
  { id: 1, value: 'Antioquia' }, { id: 2, value: 'Cundinamarca' }, { id: 3, value: 'Valle del Cauca' },
  { id: 4, value: 'Atlántico' }, { id: 5, value: 'Santander' }, { id: 6, value: 'Bolívar' },
  { id: 7, value: 'Risaralda' }, { id: 8, value: 'Caldas' },
];

export const seedCanales: CatalogoItem[] = [
  { id: 1, value: 'Oficina Virtual' }, { id: 2, value: 'App' }, { id: 3, value: 'Cajeros' },
  { id: 4, value: 'Corresponsales' }, { id: 5, value: 'Ventanilla' },
  { id: 6, value: 'Call Center' }, { id: 7, value: 'Asesor Comercial' },
];

export const seedContrapartes: CatalogoItem[] = [
  { id: 1, value: 'Cliente' }, { id: 2, value: 'Proveedor' }, { id: 3, value: 'Empleado' },
  { id: 4, value: 'Accionista' }, { id: 5, value: 'Estado' }, { id: 6, value: 'Competencia' },
  { id: 10, value: 'Suministros TI S.A.' }, { id: 101, value: 'Persona Natural' },
];

export const seedNotificarA: CatalogoItem[] = [
  { id: 1, value: 'Oficial de Cumplimiento' }, { id: 2, value: 'Gerente Financiero' },
  { id: 3, value: 'Gerente de TI' }, { id: 4, value: 'Auditoría Interna' },
  { id: 5, value: 'Director de Riesgos' },
];

export const seedCausas: CatalogoItem[] = [
  { id: 1, value: 'Error humano', description: 'Acciones incorrectas o negligencia del personal' },
  { id: 2, value: 'Falla tecnológica', description: 'Problemas en sistemas o infraestructura de TI' },
  { id: 3, value: 'Fraude interno', description: 'Actos deshonestos cometidos por empleados' },
  { id: 4, value: 'Fraude externo', description: 'Actos deshonestos cometidos por terceros' },
  { id: 5, value: 'Falla de proceso', description: 'Deficiencias en el diseño o ejecución de procesos' },
];
