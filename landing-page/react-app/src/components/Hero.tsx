'use client';

import { motion } from 'framer-motion';

interface HeroProps {
  tagline?: string;
  title?: string;
  highlightedText?: string;
  description?: string;
}

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
      className="relative overflow-hidden bg-white dark:bg-background-dark py-16 lg:py-24"
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Content */}
          <div className="flex flex-col gap-8 flex-1">
            <div className="flex flex-col gap-4 text-left">
              {tagline && (
                <motion.span
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0 }}
                  className="text-primary dark:text-primary text-sm font-extrabold uppercase tracking-widest"
                >
                  {tagline}
                </motion.span>
              )}
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
          </div>

          {/* Video Player */}
          <motion.div
            variants={sliderVariants}
            initial="hidden"
            animate="visible"
            className="flex-1 w-full relative"
          >
            <div
              id="hero-video"
              className="relative z-10 w-full aspect-video rounded-2xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-800 bg-gray-900"
            >
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
            {/* Decorative blurs */}
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-accent-green/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-primary/10 rounded-full blur-3xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
