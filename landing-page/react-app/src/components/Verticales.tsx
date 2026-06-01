'use client';

import { useState } from 'react';
import { BarChart3, CheckCircle2, Code2, ShieldCheck } from 'lucide-react';

const tabs = [
  { id: 'cumplimiento', Icon: ShieldCheck, label: 'SAGRILAFT-PTEE' },
  { id: 'rif', Icon: BarChart3, label: 'RIF - Analytic' },
  { id: 'desarrollo', Icon: Code2, label: 'Analítica de datos y riesgos' },
] as const;

type TabId = (typeof tabs)[number]['id'];

const verticalesData: Record<
  TabId,
  { title: string; description: string; features: string[]; stats: { value: string; label: string }[] }
> = {
  rif: {
    title: 'Tu Información financiera a un solo clic.',
    description:
      'Conoce los activos, pasivos, patrimomio, ingresos y egresos de cualquier cooperativa, fondo de empleados o asociación mutual.',
    features: [
      'Realiza verdadera minería de datos',
      'Analítica descriptiva con clases, grupos y cuentas',
      'Actualización constante con datos de la supersolidaria',
      'Disponible 24/7',
    ],
    stats: [
      { value: '3.5K', label: 'Entidades disponibles' },
      { value: '2017', label: 'Información disponible' },
    ],
  },
  cumplimiento: {
    title: 'Solución integral en riesgos',
    description:
      'Nuestro equipo apoyado por tecnología, generamos valor y seguridad en tu organización',
    features: ['Capacitación', 'Gestión de Riesgos', 'Documentación', 'Y mucho más'],
    stats: [
      { value: '100%', label: 'Analítica de Datos' },
      { value: '6', label: 'Módulos Independientes' },
    ],
  },
  desarrollo: {
    title: 'Tecnología y Riesgos',
    description:
      'Nuestro equipo de especialistas en análisis de datos e inteligencia de negocios desarrollará para tu negocio dashboard analíticos para la adecuada toma de decisiones empresariales',
    features: [
      'Desarrollo de aplicaciones web para sistematizar procesos',
      'Gestión de sistema de notificaciones automáticas',
      'Consultoría en cumplimiento normativo de riesgos',
      'Consultoría en SAGRILAFT, SARLAFT y PTEE',
    ],
    stats: [
      { value: '30+', label: 'Proyectos entregados' },
      { value: '100%', label: 'Satisfacción cliente' },
    ],
  },
};

export default function Verticales() {
  const [activeTab, setActiveTab] = useState<TabId>('cumplimiento');
  const data = verticalesData[activeTab];

  return (
    <section id="soluciones" className="bg-pearl dark:bg-gray-900/50 py-16">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#0e111b] dark:text-white">
            Nuestros Servicios
          </h2>
          <div className="w-16 h-1 bg-primary mx-auto mt-4 rounded-full" />
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap border-b border-gray-200 dark:border-gray-800 gap-4 md:gap-12 justify-center">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center justify-center border-b-4 pb-4 pt-2 transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-primary'
              }`}
            >
              <tab.Icon size={28} className="mb-2" />
              <p className="text-sm font-bold uppercase tracking-wider">{tab.label}</p>
            </button>
          ))}
        </div>

        {/* Content Panel */}
        <div className="mt-10 grid md:grid-cols-2 gap-12 items-center bg-white dark:bg-gray-800 p-8 lg:p-12 rounded-2xl shadow-sm transition-all duration-300">
          <div>
            <h3 className="text-2xl font-bold mb-4 dark:text-white">{data.title}</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
              {data.description}
            </p>
            <ul className="space-y-3">
              {data.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-center gap-3 text-sm font-semibold text-gray-700 dark:text-gray-300"
                >
                  <CheckCircle2 size={20} className="text-accent-green shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-4">
            {data.stats.map((stat) => (
              <div key={stat.label} className="p-6 bg-pearl dark:bg-gray-700 rounded-xl">
                <h4 className="text-primary dark:text-primary text-3xl font-black mb-1">
                  {stat.value}
                </h4>
                <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
