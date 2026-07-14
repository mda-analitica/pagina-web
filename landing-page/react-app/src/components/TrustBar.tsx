'use client';

import { motion } from 'framer-motion';

// Clientes como logos de texto — reemplazar por SVG/imagen cuando estén disponibles
const clients = [
  { name: 'Ciplas', detail: 'Sector real · Colombia' },
  { name: 'Isavia', detail: 'Infraestructura · Islandia' },
];

const sectors = ['Financiero', 'Solidario', 'Transporte', 'Real'];

export default function TrustBar() {
  return (
    <section className="py-12 bg-pearl dark:bg-gray-900 border-y border-gray-100 dark:border-gray-800">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center text-sm font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-8"
        >
          Experiencia comprobada en Colombia e internacional
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6"
        >
          {clients.map((client) => (
            <div key={client.name} className="flex flex-col items-center">
              <span className="text-2xl font-black text-gray-400 dark:text-gray-500 hover:text-primary dark:hover:text-primary transition-colors tracking-tight">
                {client.name}
              </span>
              <span className="text-[11px] text-gray-400 dark:text-gray-500 mt-0.5">
                {client.detail}
              </span>
            </div>
          ))}

          <div className="hidden md:block w-px h-10 bg-gray-200 dark:bg-gray-700" />

          <div className="flex flex-wrap items-center justify-center gap-3">
            {sectors.map((sector) => (
              <span
                key={sector}
                className="px-4 py-1.5 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm font-semibold text-gray-600 dark:text-gray-300"
              >
                {sector}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
