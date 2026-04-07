# 🎨 SAGRILAFT - Vista Visual de la Aplicación

## Acceso
**URL en navegador:** http://localhost:4323/sagrilaft

---

## 📱 Página de Inicio (Home)

```
┌─────────────────────────────────────────────────────────────┐
│                     SAGRILAFT                                │
│                  Sistema de Gestión de Riesgos              │
│                                                              │
│  Bienvenido al módulo de riesgos SARLAFT/PTEE.             │
│  Selecciona una sección para comenzar.                      │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   ⚠️ RIESGOS │  │ ✓ CONTROLES  │  │ 📊 REPORTES  │      │
│  │              │  │              │  │              │      │
│  │ Identifica,  │  │ Gestiona los │  │ Visualiza    │      │
│  │ evalúa y     │  │ controles    │  │ estadísticas │      │
│  │ registra...  │  │ mitigantes   │  │ y genera     │      │
│  │              │  │              │  │ reportes...  │      │
│  │ Abrir >      │  │ Abrir >      │  │ Abrir >      │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐                        │
│  │ 📝 EVENTOS   │  │ 📋 PLANES    │                        │
│  │              │  │              │                        │
│  │ Registra y   │  │ Gestiona     │                        │
│  │ consulta los │  │ planes de    │                        │
│  │ eventos...   │  │ acción...    │                        │
│  │              │  │              │                        │
│  │ Abrir >      │  │ Abrir >      │                        │
│  └──────────────┘  └──────────────┘                        │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Características Visuales:
- ✨ Cards con hover effect (shadow, border color)
- 🎨 Colores temáticos: rojo (riesgos), verde (controles), azul (reportes), índigo (eventos), violeta (planes)
- 📱 Responsive: 1 columna móvil → 2 columnas tablet → 5 columnas desktop
- 🌙 Dark mode automático

---

## 📊 Página de Riesgos (Lista)

```
┌──────────────────────────────────────────────────────────────┐
│  SIDEB | Total: 8      Identificados: 8      [+] Nuevo Riesgo│
│  AR    ├─────────────────────────────────────────────────────┤
│        │ [🔍 Buscar...]                                       │
│  Inicio│                                                      │
│  Riesg │  Riesgo              │ Prob.    │ Impacto│ Estado   │
│  Contr │  ─────────────────────────────────────────────────  │
│  Event │ Fraude Interno       │ Probable │ Mayor  │ Identificado
│  Planes│  Riesgo de fraude...│          │        │          │
│  Report│                     │          │        │          │
│        │ Pérdida Datos        │ Posible  │Moderado│ En Tratamiento
│        │  Acceso no autori... │          │        │          │
│        │                     │          │        │          │
│        │ Fallo Seguridad      │ Improbab │ Bajo   │ Mitigado
│        │  Vulnerabilidades... │          │        │          │
│        │                     │          │        │          │
│        │ [Pagination: 1 de 2 > ]                             │
│        │                                                      │
└──────────────────────────────────────────────────────────────┘
```

### Funciones:
- 🔍 **Búsqueda en tiempo real** - Filtra riesgos mientras escribes
- 📄 **Paginación** - 10 items por página (nav anterior/siguiente)
- ✏️ **Editar** - Click en ícono edit → abre modal con formulario
- 🗑️ **Eliminar** - Click en ícono delete → confirmación → elimina
- ➕ **Crear Riesgo** - Click en botón "Nuevo Riesgo" → modal con formulario
- 💬 **Toast Notifications** - Éxito/error en esquina inferior derecha

---

## 📋 Página de Controles (Filtrada por Riesgo)

```
┌──────────────────────────────────────────────────────────────┐
│  SIDEB │ RIESGO SELECCIONADO: Fraude Interno              X  │
│  AR    │ ─────────────────────────────────────────────────   │
│        │ Controles Validados: 1/3 (33%)     [+] Nuevo Control│
│        │ ─────────────────────────────────────────────────   │
│  Inicio│ [🔍 Buscar...]                                       │
│  Riesgo│                                                      │
│  Contr │  Control             │ Tipo       │ Frecuencia│ Estado
│  Event │  ─────────────────────────────────────────────────  │
│  Planes│ Validación Trans.    │ Preventivo │ Mensual   │ ✓ Validado
│  Report│  Control automático..│            │           │         │
│        │                     │            │           │         │
│        │ Auditoría Accesos    │ Detectivo  │ Trimestral│ ⏳ Pendiente
│        │  Seguimiento logs... │            │           │         │
│        │                     │            │           │         │
│        │ Segregación Deberes  │ Preventivo │ Semestral │ ✓ Validado
│        │  Separación de roles │            │           │         │
│        │                     │            │           │         │
└──────────────────────────────────────────────────────────────┘
```

### Características Especiales:
- 🎯 **Filtrado automático** - Solo muestra controles del riesgo seleccionado
- ⚠️ **Banner de contexto** - Muestra qué riesgo está seleccionado
- 🔄 **Cambiar Riesgo** - Botón para volver a RiesgosListPage
- 📊 **Stats** - Total, Validados, Pendientes en encabezado
- 🔐 **Validación** - Estado visual (checkmark verde = validado, reloj naranja = pendiente)

---

## 📊 Página de Reportes (Dashboard)

```
┌──────────────────────────────────────────────────────────────┐
│                   📊 REPORTES                                 │
│            Análisis consolidado del sistema                  │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  RESUMEN GENERAL                                            │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐            │
│  │ 8 Riesgos  │  │12 Controles│  │ 2 Eventos  │            │
│  └────────────┘  └────────────┘  └────────────┘            │
│                                                              │
│  ESTADO DE RIESGOS                                          │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐ ┌────────┐│
│  │ 8 Identif. │  │ 0 En Trat. │  │ 0 Mitigad. │ │ Validac│
│  └────────────┘  └────────────┘  └────────────┘ │ 33%   ││
│                                                   └────────┘
│  MATRIZ PROBABILIDAD × IMPACTO                   (5×5 grid)
│  ┌─────────┬─────┬────────┬───────┬──────────┐             │
│  │ Prob\Im │ Bajo│ Menor  │Moderado│Mayor│Cat│             │
│  ├─────────┼─────┼────────┼───────┼──────────┤             │
│  │Casi crt │ 0   │ 0      │ 0     │ 1   │ 0 │             │
│  │Probable │ 0   │ 0      │ 1     │ 0   │ 0 │             │
│  │Posible  │ 0   │ 2      │ 1     │ 0   │ 0 │             │
│  │Improbab │ 0   │ 0      │ 2     │ 0   │ 0 │             │
│  │Inusual  │ 1   │ 0      │ 0     │ 0   │ 0 │             │
│  └─────────┴─────┴────────┴───────┴──────────┘             │
│                                                              │
│  TOP 10 PROCESOS CON MAYOR RIESGO                          │
│  Proceso A      [████████░░] 8 riesgos                     │
│  Proceso B      [████░░░░░░] 4 riesgos                     │
│  Proceso C      [██░░░░░░░░] 2 riesgos                     │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

### Información Mostrada:
- 📈 **KPIs** - Total de riesgos, controles, eventos
- 🎯 **Estado de Riesgos** - Desglose por estado (Identificado, En Trat, etc)
- 📊 **Matriz Heatmap** - Colores (verde=bajo riesgo, rojo=crítico)
- 💰 **Financiero** - Pérdidas totales, recuperado
- 📋 **Planes** - Completados, En progreso, Pendientes
- 🏢 **Top Procesos** - Los 10 con mayor número de riesgos

---

## 📋 Página de Eventos

```
┌──────────────────────────────────────────────────────────────┐
│  Eventos: 2                Pérdidas: $50,000    Recuperado: 0│
│  ─────────────────────────────────────────────────────────   │
│  [🔍 Buscar...]                                  [+] Nuevo   │
│                                                              │
│  Evento               │ Fecha      │ Pérdida    │ Recuperado│
│  ─────────────────────────────────────────────────────────  │
│ Fraude Cheques        │ 2024-01-15 │ $50,000    │ $0       │
│  Cheques falsificados │            │            │          │
│                       │            │            │          │
│ Acceso No Autori.     │ 2024-02-20 │ $0         │ $0       │
│  Intento de acceso... │            │            │          │
│                       │            │            │          │
└──────────────────────────────────────────────────────────────┘
```

---

## 📅 Página de Planes de Acción

```
┌──────────────────────────────────────────────────────────────┐
│ Total: 2         Completados: 0    En Progreso: 1  Pendient: 1
│ ─────────────────────────────────────────────────────────   │
│ [🔍 Buscar...]                                              │
│                                                              │
│ Plan                 │ Estado      │ Progreso    │ Vencimiento
│ ─────────────────────────────────────────────────────────  │
│ Implementar MFA      │ 🔄 En Prog. │ [████░░] 40%│ 2024-04-30
│  Multi-factor auth...│             │             │          │
│                      │             │             │          │
│ Auditoría Seguridad  │ ⏳ Pendiente│ [░░░░░░] 0% │ 2024-03-31
│  Auditoría completa..│             │             │          │
│                      │             │             │          │
└──────────────────────────────────────────────────────────────┘
```

---

## 🎨 Tema y Estilos

### Colores Principales
- **Primario:** #007878 (Teal - Riesgos)
- **Secundario:** #0e7490 (Teal oscuro)
- **Acento Verde:** #14b8a6 (Controles)
- **Fondo Claro:** #f6f6f8
- **Fondo Oscuro:** #111521
- **Tarjeta Oscura:** #1e2333

### Modo Oscuro
- 🌙 Se activa automáticamente según preferencias del SO
- ✨ Todos los colores se adaptan para readabilidad
- 🎨 Smooth transitions entre temas

### Tipografía
- **Font:** Inter (sans-serif)
- **Headings:** Font-weight 700, size 18-24px
- **Body:** Font-weight 400, size 14px
- **Labels:** Font-weight 600, size 12px

---

## 🎯 Elementos Interactivos

### Botones
- **Primary (Azul):** Crear, Guardar
- **Outline (Gris):** Anterior, Siguiente, Cancelar
- **Danger (Rojo):** Eliminar
- **Hover Effects:** Shadow, translateY(-2px)

### Modales
- **Overlay:** Semi-transparent dark backdrop
- **Animation:** Fade in/out (300ms)
- **Formularios:** Campos validados con error inline
- **Tamaño:** lg (800px ancho)

### Tablas
- **Sticky Header:** Se queda arriba al scroll
- **Row Hover:** Background highlight
- **Striped:** Alternancia de colores
- **Responsive:** Scroll horizontal en móvil

### Formularios
- **Validación:** Campos requeridos marcados con *
- **Errores:** Bordes rojo + mensaje debajo
- **Feedback:** Toast notifications (éxito/error)
- **Layouts:** Grid responsivo (1-3 columnas)

---

## 🔄 Flujos de Usuario

### Crear un Riesgo
1. Click en "Nuevo Riesgo" (home o lista)
2. Modal se abre con formulario vacío
3. Completa campos (nombre, descripción, proceso, prob/impacto)
4. Click "Crear Riesgo"
5. ✅ Toast "Riesgo creado exitosamente"
6. Modal cierra, tabla se actualiza
7. Datos persisten en localStorage

### Editar un Riesgo
1. En tabla, click en ícono edit (📝)
2. Modal abre con datos del riesgo
3. Edita los campos necesarios
4. Click "Actualizar Riesgo"
5. ✅ Toast de confirmación
6. Modal cierra, tabla se actualiza

### Cambiar de Riesgo en Controles
1. Estás en página de Controles
2. Controles filtrados por riesgo actual
3. Click en botón "Cambiar Riesgo"
4. Vuelves a RiesgosListPage
5. Selecciona otro riesgo
6. En Controles, automáticamente se filtra

---

## 📱 Responsive Design

### Desktop (1280px+)
- Sidebar visible (64px ancho)
- Tablas con todas las columnas
- Cards en grid: 5 columnas
- Modales: 800px ancho

### Tablet (768px-1279px)
- Sidebar visible pero comprimido
- Tablas con scroll horizontal
- Cards en grid: 2-3 columnas
- Modales: 90% ancho

### Mobile (< 768px)
- Sidebar oculto (nav inferior o hamburger)
- Tablas con scroll horizontal
- Cards: 1 columna
- Modales: fullscreen o 95% ancho

---

## ✨ Animaciones & Transiciones

- **Page Transitions:** Fade in (200ms) cuando cambias módulos
- **Button Hover:** Shadow + translateY (300ms ease)
- **Row Hover:** Background highlight (200ms)
- **Modal Open:** Zoom in (300ms cubic-bezier)
- **Toast Slide:** Slide in desde abajo (300ms)
- **Loading Spinner:** Rotación continua (1s linear)

---

## 🚀 Rendimiento

- **Bundle Size:** 285 KB (93 KB gzip)
- **Initial Load:** ~2-3s (con mock data)
- **Interactividad:** Inmediata (localStorage sync)
- **Lazy Loading:** Páginas cargan bajo demanda
- **Dark Mode:** Sin flash (detecta preferencia)

---

## 📖 Para Ver en Vivo

```bash
# Terminal en C:\Users\caesv\Downloads\Procol\Proyectos - Code\PaginaWeb\landing-page

npm run preview

# Abre en navegador:
http://localhost:4323/sagrilaft
```

**Navega por los 6 módulos usando la barra lateral izquierda.** 🚀
