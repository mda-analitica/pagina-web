'use client';

import { motion } from 'framer-motion';
import { MapPin, Building2, Target } from 'lucide-react';

const features = [
  {
    icon: Building2,
    title: 'Empresa formal y colombiana',
    description: 'MDA Analítica (razón social Analítica Solidaria S.A.S.) opera bajo la normativa colombiana y está registrada en el Registro Único Empresarial y Social (RUES). Trabajas con una empresa real, responsable y verificable.'
  },
  {
    icon: MapPin,
    title: 'Hechos en Medellín, cerca de ti',
    description: 'Operamos desde Medellín, Antioquia. Conocemos el contexto colombiano del sector solidario y del transporte, y trabajamos en tu mismo huso horario y realidad regulatoria.'
  },
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
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Conocemos por dentro el sector solidario y el de transporte. Por eso construimos herramientas que sí entienden cómo trabajas.
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
          <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
            Somos <span className="font-bold text-primary">MDA Analítica</span>, una empresa colombiana
            especializada en dos sectores que el software genérico suele ignorar: el solidario y el de transporte.
            Cooperativas, fondos de empleados, asociaciones mutuales y empresas de transporte enfrentan retos propios
            que las soluciones de molde no resuelven. Nacimos para resolver justamente esos: combinamos analítica de datos
            y gestión de riesgos en herramientas pensadas para tu operación, tu normativa y tu realidad.
          </p>
        </motion.div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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

      </div>
    </section>
  );
}
