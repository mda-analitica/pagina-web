'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Calendar, ChevronRight, Clock, Moon, PieChart, Sun } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

const CATEGORIES = ['Todos', 'Cumplimiento', 'Tecnología', 'Finanzas', 'Eventos'] as const;
type Category = (typeof CATEGORIES)[number];

const featuredPost = {
  tag: 'DESTACADO • TENDENCIAS 2026',
  title: 'Tendencias 2026: El futuro del monitoreo transaccional dinámico',
  description:
    'Un análisis profundo sobre cómo la inteligencia artificial generativa y el aprendizaje federado están redefiniendo el cumplimiento regulatorio en el sector financiero global para adelantarse a los delitos de nueva generación.',
  readTime: '12 min lectura',
  date: '14 Nov 2023',
  image:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAzeb-nUlDbLvt4opgQ_u6gW-BJMNyotIiOv1-W3lbR6miBXAMujy7LlfDz-vr0QoqsjGDpd6F9Ciwsk_qL_Z_G0x4CWo5a_bs_97Zhy8ikmCwjHAfimpr3P5HM_2d8G4bKDa2ZMYOSVC_T-DOCkecJQSRNRbmzLMDVpk8DW1BgajsqoctjiakKNaNxI9yKd24GRaG0af2qYcprgZQn7bH_alUm8r9vlO0pUCUhTQw1OT18hqRzPDiFpQu-oR0kkfCYd85_sscuAOTW',
  category: 'Finanzas',
};

const posts = [
  {
    category: 'Cumplimiento',
    readTime: '5 min',
    title: 'Nuevas normativas SAGRILAFT para el 2024',
    description:
      'Una guía técnica esencial para oficiales de cumplimiento sobre los cambios en la matriz de riesgo estructural.',
    date: 'Oct 12, 2023',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAwxuU0G7PAXbuvfkCmPy12fO-30uCFLCAY3x6_kyLV2tYSN1i9xgf9lFEPFy0fgihHMrfowsKx-OxsK6vXEqs3oEKSAauD0H-NrGcFXrnOwI068zjZC70GgRsujancmi_VBoAIQhJ9CkMlexH6WqG0mXcksZsbbEN29W__CdZV2vFlw5rE30dIFmtV07Ug2uXSgJEAniEdFSSXkdnUkbQ6hET0ojthqtrR7zCKqbYCScbMBFmJtcMO3aiCAbFmQoJE4Yj_eCEgnRIs',
  },
  {
    category: 'Tecnología',
    readTime: '8 min',
    title: 'Ciberseguridad en el reporte de operaciones',
    description:
      'Protegiendo la integridad de los datos financieros en el flujo de reporte a la UIAF mediante cifrado cuántico.',
    date: 'Oct 10, 2023',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCa8AvioyoNv5xtYu2jHP0RvxxQtjPPp68j-D6O-ISSBT-RPDRRMZPMOOrJ0X6EW3x2ZBTp9fJ1CG4al4rv7Ubs-0IAYdMMapNXZoR66X4ki3KrUkOXgti7-24lvvf_lAQ61_Io94veE79LQsb7trDTlHmQYNCvnk5ZlciGzraCF96AHZMqd_USFJdn4QJnihsshIyJnzM_9nDNQR5B3FkwFqZ-Ij45ncWArSVqHpMWxtRf0EQflEXWpdmQ_RsDadeZpun10xDV9Uky',
  },
  {
    category: 'Finanzas',
    readTime: '6 min',
    title: 'IA Generativa aplicada al análisis de riesgo',
    description:
      'Cómo optimizar la detección de patrones atípicos y reducir los falsos positivos en un 40% usando LLMs especializados.',
    date: 'Oct 05, 2023',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCDrmy8ZHMkAyz_V-n3spw87N2_TUVWGIluIWBW-S0zCITiOw07SwDmKOxVdzXN4yc1m5n9nPG2YQnrVPAqYfdpTUe6pmMs_9XQRaetHP-ulysQmMilrcqKDchIWBPJPMegixK-IGtXcSqLtmkdl1n-N2vF0wK5CknRl_O4Av2nz023UHMiNXalDI2V7nz0HtafHXZ3SdrmEx_jCstxjsFsZc6rO7raywvKQgXftGaEr8H6hbKpOc5IZYdZpGQR_TFHv_ggGIll0giE',
  },
];

export default function BlogPage() {
  const { theme, toggleTheme } = useTheme();
  const [activeCategory, setActiveCategory] = useState<Category>('Todos');

  const filteredPosts =
    activeCategory === 'Todos'
      ? posts
      : posts.filter((p) => p.category === activeCategory);

  return (
    <div className="bg-background-light dark:bg-background-dark text-[#0e111b] dark:text-white antialiased transition-colors duration-300">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-solid border-gray-200 dark:border-gray-800 px-4 md:px-20 py-3">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-3">
              <div className="size-8 text-primary">
                <PieChart size={32} />
              </div>
              <h2 className="text-[#0e111b] dark:text-white text-xl font-bold tracking-tight">
                MDA Analítica
              </h2>
            </Link>
            <nav className="hidden lg:flex items-center gap-8">
              <Link href="/" className="text-gray-600 dark:text-gray-400 text-sm font-medium hover:text-primary transition-colors">
                Inicio
              </Link>
              <Link href="/#soluciones" className="text-gray-600 dark:text-gray-400 text-sm font-medium hover:text-primary transition-colors">
                Soluciones
              </Link>
              <Link href="/#analitica" className="text-gray-600 dark:text-gray-400 text-sm font-medium hover:text-primary transition-colors">
                Analítica
              </Link>
              <Link href="/blog" className="text-primary text-sm font-bold">
                Blog
              </Link>
              <Link href="/#nosotros" className="text-gray-600 dark:text-gray-400 text-sm font-medium hover:text-primary transition-colors">
                Nosotros
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative group">
              <button className="flex min-w-[120px] cursor-pointer items-center justify-center rounded-lg h-10 px-4 bg-accent-green text-white text-sm font-bold transition-transform hover:scale-105">
                Ver Aplicaciones
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-2 z-50">
                <Link href="/#analitica" className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  RIF-Analytic
                </Link>
                <Link href="/sagrilaft" className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  SAGRILAFT
                </Link>
              </div>
            </div>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-[#0e111b] dark:text-white"
              aria-label="Toggle dark mode"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-[1200px] mx-auto px-4 py-12">
        {/* Hero */}
        <section className="mb-16 text-center max-w-3xl mx-auto">
          <h1 className="text-[#0e111b] dark:text-white text-5xl font-black leading-tight tracking-tighter mb-6">
            Insights & Perspectivas <span className="text-primary">Normativas</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg font-normal leading-relaxed">
            Análisis profundo y actualizaciones críticas sobre SARLAFT, SAGRILAFT y las
            fronteras de la analítica financiera avanzada para oficiales de cumplimiento.
          </p>
        </section>

        {/* Category Filters */}
        <div className="flex gap-3 mb-12 overflow-x-auto pb-4">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex h-10 shrink-0 items-center justify-center px-6 rounded-full text-sm font-medium transition-colors ${
                activeCategory === cat
                  ? 'bg-primary text-white shadow-sm font-bold'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-primary/20'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Featured Post */}
        {(activeCategory === 'Todos' || activeCategory === featuredPost.category) && (
          <section className="mb-16">
            <div className="group relative bg-white dark:bg-gray-900 border border-solid border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden flex flex-col lg:flex-row items-stretch transition-all hover:shadow-xl hover:shadow-primary/5">
              <div
                className="flex-1 min-h-[350px] bg-center bg-no-repeat bg-cover relative"
                style={{ backgroundImage: `url('${featuredPost.image}')` }}
              >
                <div className="absolute inset-0 bg-[#0e111b]/20 group-hover:bg-[#0e111b]/0 transition-colors" />
              </div>
              <div className="flex-1 p-8 lg:p-12 flex flex-col justify-center gap-6">
                <div className="space-y-4">
                  <p className="text-primary text-sm font-bold tracking-widest uppercase">
                    {featuredPost.tag}
                  </p>
                  <h2 className="text-[#0e111b] dark:text-white text-3xl font-black leading-tight">
                    {featuredPost.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 text-base leading-relaxed">
                    {featuredPost.description}
                  </p>
                </div>
                <div className="flex items-center gap-4 text-gray-500 dark:text-gray-500 text-xs font-medium uppercase tracking-tighter">
                  <span className="flex items-center gap-1">
                    <Clock size={16} /> {featuredPost.readTime}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar size={16} /> {featuredPost.date}
                  </span>
                </div>
                <button className="flex min-w-[140px] items-center justify-center rounded-lg h-12 px-6 bg-gray-100 dark:bg-gray-800 text-[#0e111b] dark:text-white gap-2 text-sm font-bold transition-all hover:bg-primary hover:text-white group-hover:shadow-md">
                  <span>Leer artículo completo</span>
                  <ArrowRight size={20} />
                </button>
              </div>
            </div>
          </section>
        )}

        {/* Posts Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {filteredPosts.map((post) => (
            <article
              key={post.title}
              className="flex flex-col bg-white dark:bg-gray-900 border border-solid border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden group hover:translate-y-[-4px] transition-all duration-300"
            >
              <div
                className="aspect-video w-full bg-cover bg-center"
                style={{ backgroundImage: `url('${post.image}')` }}
              />
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                    {post.category}
                  </span>
                  <span className="text-gray-500 text-[10px] font-medium flex items-center gap-1">
                    <Clock size={14} /> {post.readTime}
                  </span>
                </div>
                <h3 className="text-[#0e111b] dark:text-white text-lg font-bold leading-snug mb-3 group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6 flex-1">
                  {post.description}
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
                  <span className="text-xs text-gray-500">{post.date}</span>
                  <button className="text-[#0e111b] dark:text-white text-sm font-bold flex items-center gap-1 hover:text-primary transition-colors">
                    Leer <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </section>

        {/* Newsletter */}
        <section className="bg-[#0e111b] rounded-2xl p-8 lg:p-16 flex flex-col lg:flex-row items-center gap-10 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[100px] -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent-green/20 rounded-full blur-[80px] -ml-24 -mb-24" />
          <div className="flex-1 text-center lg:text-left z-10">
            <h2 className="text-white text-3xl font-bold mb-4">Únase al MDA Briefing</h2>
            <p className="text-gray-400 text-lg font-medium">
              Suscríbase para recibir análisis técnicos semanales directamente en su bandeja de
              entrada. Únase a +5,000 profesionales del sector.
            </p>
          </div>
          <div className="flex-1 w-full max-w-md z-10">
            <form className="flex flex-col sm:flex-row gap-3">
              <input
                className="flex-1 h-12 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-gray-500 focus:ring-primary focus:border-primary px-4 outline-none"
                placeholder="Su correo profesional"
                type="email"
              />
              <button
                type="submit"
                className="h-12 px-8 bg-accent-green text-white font-bold rounded-lg hover:shadow-lg hover:shadow-accent-green/30 transition-all whitespace-nowrap"
              >
                Suscribirme
              </button>
            </form>
            <p className="text-gray-600 text-[10px] mt-4 text-center lg:text-left italic">
              Prometemos no enviar spam. Puede cancelar en cualquier momento.
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="max-w-[1200px] mx-auto px-4 py-12 border-t border-gray-200 dark:border-gray-800">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3 grayscale opacity-70">
            <div className="size-6 text-[#0e111b] dark:text-white">
              <PieChart size={24} />
            </div>
            <span className="text-sm font-bold">MDA Analítica © 2024</span>
          </div>
          <div className="flex gap-8">
            <a className="text-gray-500 text-xs hover:text-primary transition-colors" href="#">
              Términos de Servicio
            </a>
            <a className="text-gray-500 text-xs hover:text-primary transition-colors" href="#">
              Privacidad
            </a>
            <a className="text-gray-500 text-xs hover:text-primary transition-colors" href="#">
              Cookies
            </a>
          </div>
        </div>
      </footer>

    </div>
  );
}
