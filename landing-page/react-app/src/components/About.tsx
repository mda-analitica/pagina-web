'use client';

import { motion } from 'framer-motion';
import { MapPin, Building2, Target, Zap, BarChart3, Lock, Code2, Cpu } from 'lucide-react';

const features = [
  {
    icon: Building2,
    title: 'Empresa formal y colombiana',
    description: 'MDA Analítica (razón social Metadata Analítica S.A.S.) opera bajo la normativa colombiana y está registrada en el Registro Único Empresarial y Social (RUES). Trabajas con una empresa real, responsable y verificable.'
  },
  {
    icon: MapPin,
    title: 'Hechos en Medellín, cerca de ti',
    description: 'Operamos desde Medellín, Antioquia. Conocemos el contexto colombiano del sector solidario y del transporte, y trabajamos en tu mismo huso horario y realidad regulatoria.'
  },
];

const challenges = [
  {
    icon: Zap,
    title: 'Procesos manuales que frenan tu operación',
    description: 'Excel, correos y PDFs consumen tiempo y generan errores. Automatizamos tareas repetitivas para que tu equipo se enfoque en decisiones estratégicas.'
  },
  {
    icon: BarChart3,
    title: 'Información dispersa, decisiones ciegas',
    description: 'Datos en silos impiden que la gerencia tenga indicadores reales. Centralizamos toda tu información en una sola plataforma con visibilidad en tiempo real.'
  },
  {
    icon: Lock,
    title: 'Riesgo normativo sin control',
    description: 'El cumplimiento no puede depender de una persona. Automatizamos trazabilidad, alertas y reportes para que estés siempre preparado.'
  },
  {
    icon: Cpu,
    title: 'Gerencia sin tablero de control',
    description: 'Los indicadores no pueden esperar al cierre de mes. Entregamos dashboards ejecutivos para actuar hoy sobre lo que importa mañana.'
  },
];

const capabilities = [
  { title: 'Desarrollo SaaS & Apps', description: 'Aplicaciones empresariales sobre Power Apps, Dataverse y Azure' },
  { title: 'Automatización de procesos', description: 'Flujos automáticos que eliminan tareas repetitivas y errores manuales' },
  { title: 'Analítica e BI', description: 'Tableros Power BI y modelos analíticos para decisiones en tiempo real' },
  { title: 'Gestión de riesgos', description: 'RIF Analytic: cumplimiento normativo automatizado e integrado' },
  { title: 'Ciencia de datos', description: 'Machine Learning y análisis predictivos sobre tus datos corporativos' },
  { title: 'Gobierno de datos', description: 'Arquitectura, limpieza e integración de fuentes para una sola verdad' },
];

const techStack = [
  { name: 'Power BI', category: 'Analítica' },
  { name: 'Power Apps', category: 'Apps' },
  { name: 'Power Automate', category: 'Automatización' },
  { name: 'Azure', category: 'Cloud' },
  { name: 'Microsoft Fabric', category: 'Datos' },
  { name: 'Dataverse', category: 'BD' },
];

export default function About() {
  return (
    <section id="nosotros" className="py-20 bg-white dark:bg-background-dark">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Target className="text-primary" size={28} />
            <h2 className="text-4xl font-black text-[#0e111b] dark:text-white">
              Sobre Nosotros
            </h2>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed font-semibold">
            Invertimos datos en decisiones y procesos en resultados
          </p>
          <div className="w-16 h-1 bg-primary mx-auto mt-6 rounded-full" />
        </motion.div>

        {/* Main description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-pearl dark:bg-gray-800 p-8 lg:p-12 rounded-2xl mb-12"
        >
          <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-4">
            Somos <span className="font-bold text-primary">MDA Analítica</span>, una empresa de tecnología colombiana
            especializada en construir soluciones digitales que transforman la forma en que las organizaciones operan y deciden.
          </p>
          <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
            Convertimos operaciones manuales e información dispersa en sistemas inteligentes que reducen costos, mitigan riesgos
            y aceleran la toma de decisiones. Somos especialistas en software SaaS, analítica avanzada y automatización de procesos
            construidos sobre Microsoft Power Platform y Azure.
          </p>
        </motion.div>

        {/* Company features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: 0.05 * i }}
                className="flex gap-6 p-6 bg-pearl dark:bg-gray-800 rounded-xl hover:shadow-lg transition-shadow"
              >
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary/10">
                    <Icon className="text-primary" size={24} />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-[#0e111b] dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Challenges section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <h3 className="text-2xl font-black text-[#0e111b] dark:text-white text-center mb-12">
            ¿Tu organización enfrenta estos desafíos?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {challenges.map((challenge, i) => {
              const Icon = challenge.icon;
              return (
                <motion.div
                  key={challenge.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: 0.05 * i }}
                  className="flex gap-4 p-6 border-l-4 border-primary bg-pearl dark:bg-gray-800 rounded-lg"
                >
                  <div className="flex-shrink-0 pt-1">
                    <Icon className="text-primary" size={24} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-[#0e111b] dark:text-white mb-2">
                      {challenge.title}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                      {challenge.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Capabilities section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <h3 className="text-2xl font-black text-[#0e111b] dark:text-white text-center mb-12">
            Lo que hacemos por tu organización
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((cap, i) => (
              <motion.div
                key={cap.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: 0.05 * i }}
                className="p-6 bg-pearl dark:bg-gray-800 rounded-lg hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700"
              >
                <h4 className="font-bold text-[#0e111b] dark:text-white mb-2">
                  {cap.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  {cap.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Tech stack section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-pearl dark:bg-gray-800 p-8 lg:p-12 rounded-2xl"
        >
          <h3 className="text-2xl font-black text-[#0e111b] dark:text-white text-center mb-8">
            Construido sobre el ecosistema Microsoft
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {techStack.map((tech, i) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.3, delay: 0.03 * i }}
                className="flex flex-col items-center justify-center p-4 bg-white dark:bg-background-dark rounded-lg border border-gray-200 dark:border-gray-700 hover:border-primary hover:shadow-md transition-all"
              >
                <p className="font-bold text-[#0e111b] dark:text-white text-center text-sm">
                  {tech.name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {tech.category}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
