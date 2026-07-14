'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

interface HeroProps {
  tagline?: string;
  title?: string;
  highlightedText?: string;
  description?: string;
}

const stats = [
  { value: '3', label: 'Sectores impactados' },
  { value: '2', label: 'Países con impacto' },
  { value: '100%', label: 'Cloud-native' },
];

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

const sliderVariants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, delay: 0.3 },
  },
};

export default function Hero({
  tagline = '',
  title = 'Controla tus riesgos en minutos, no en días',
  highlightedText = 'Risk Analytic',
  description = 'Risk Analytic automatiza la identificación, documentación y monitoreo de riesgos. Toma decisiones basadas en datos sin costo adicional.',
}: HeroProps) {

  return (
    <section
      id="inicio"
      className="relative overflow-hidden bg-gradient-to-b from-primary/5 via-white to-white dark:from-primary/10 dark:via-background-dark dark:to-background-dark py-16 lg:py-24"
    >
      {/* Background decorative blurs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent-green/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3 pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-6 md:px-10 relative">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Content */}
          <div className="flex flex-col gap-8 flex-1">
            <div className="flex flex-col gap-5 text-left">
              {/* Badge pill */}
              <motion.div
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                className="inline-flex"
              >
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 dark:bg-primary/20 border border-primary/20 text-primary text-sm font-semibold">
                  <Sparkles size={14} />
                  {tagline || 'Analítica de datos · Gestión de riesgos'}
                </span>
              </motion.div>

              <motion.h1
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.1 }}
                className="text-[#0e111b] dark:text-white text-4xl lg:text-6xl font-black leading-[1.1] tracking-tight"
              >
                {title}
                <br />
                <span className="text-primary dark:text-primary">
                  {highlightedText}
                </span>
              </motion.h1>
              <motion.p
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.2 }}
                className="text-gray-600 dark:text-gray-400 text-lg md:text-xl font-normal leading-relaxed max-w-xl"
              >
                {description}
              </motion.p>
            </div>

            {/* CTAs */}
            <motion.div
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <a
                href="mailto:contacto@mda-analitica.com?subject=Quiero%20una%20demo"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-primary text-white font-bold text-base hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25 transition-all"
              >
                Solicita una demo
                <ArrowRight size={18} />
              </a>
              <a
                href="#soluciones"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 text-[#0e111b] dark:text-white font-bold text-base hover:border-primary hover:text-primary transition-all"
              >
                Explorar soluciones
              </a>
            </motion.div>

            {/* Stats row */}
            <motion.div
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.4 }}
              className="flex items-center gap-8 pt-4 border-t border-gray-100 dark:border-gray-800"
            >
              {stats.map((stat) => (
                <div key={stat.label} className="flex flex-col">
                  <span className="text-2xl font-black text-primary">{stat.value}</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">{stat.label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Video Player framed as product window */}
          <motion.div
            variants={sliderVariants}
            initial="hidden"
            animate="visible"
            className="flex-1 w-full relative"
          >
            <div
              id="hero-video"
              className="relative z-10 w-full rounded-2xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-800 bg-gray-900"
            >
              {/* Browser chrome bar */}
              <div className="flex items-center gap-2 px-4 py-3 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                <span className="w-3 h-3 rounded-full bg-red-400" />
                <span className="w-3 h-3 rounded-full bg-yellow-400" />
                <span className="w-3 h-3 rounded-full bg-green-400" />
                <div className="flex-1 mx-4">
                  <div className="max-w-[240px] mx-auto px-3 py-1 rounded-md bg-white dark:bg-gray-700 text-[11px] text-gray-400 dark:text-gray-400 text-center truncate">
                    mda-analitica.com
                  </div>
                </div>
              </div>
              <div className="w-full aspect-video">
                <video
                  className="w-full h-full object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                >
                  <source src="/Video1.mp4" type="video/mp4" />
                </video>
              </div>
            </div>
            {/* Decorative blurs */}
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-accent-green/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-primary/10 rounded-full blur-3xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
