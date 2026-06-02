'use client';

import { motion } from 'framer-motion';
import { MapPin, Building2, Target } from 'lucide-react';

const features = [
  {
    icon: Building2,
    title: 'Constitución Formal',
    description: 'Analítica Solidaria S.A.S. constituida bajo las leyes colombianas y registrada en el Registro Único Empresarial y Social (RUES)'
  },
  {
    icon: MapPin,
    title: 'Ubicación',
    description: 'Domiciliada en Medellín, Antioquia - Centro neurálgico de innovación tecnológica y desarrollo de software en América Latina'
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
            Líderes en analítica de datos y gestión de riesgos para el sector solidario colombiano
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
            En el panorama empresarial de la analítica de datos y la gestión de riesgos en Colombia,
            destaca la constitución formal de <span className="font-bold text-primary">Analítica Solidaria S.A.S.</span>,
            una organización que opera comercialmente bajo normativas colombianas y se posiciona como
            un actor clave en la transformación digital del sector solidario, cooperativo y de asociaciones mutuales.
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
