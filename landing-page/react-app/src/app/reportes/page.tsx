'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, BarChart3, Headset, X } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { reports, type ModalId } from '@/data/reports';

const CATEGORIES = ['Todos', 'Disponible', 'Próximamente'] as const;
type Category = (typeof CATEGORIES)[number];

export default function ReportesPage() {
  const [activeCategory, setActiveCategory] = useState<Category>('Todos');
  const [openModal, setOpenModal] = useState<ModalId>(null);

  const filteredReports =
    activeCategory === 'Todos'
      ? reports
      : reports.filter((r) => r.tag === activeCategory);

  const closeModal = () => setOpenModal(null);

  useEffect(() => {
    document.body.style.overflow = openModal ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [openModal]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div className="bg-background-light dark:bg-background-dark text-[#0e111b] dark:text-gray-100 transition-colors duration-300">
      <Header />

      <main className="max-w-[1280px] mx-auto px-6 md:px-10 py-12">
        {/* Back link */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-teal-400 transition-colors"
          >
            <ArrowLeft size={16} />
            Volver al inicio
          </Link>
        </div>

        {/* Hero */}
        <section className="mb-12 text-center max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-12 h-12 bg-yellow-400 rounded-xl flex items-center justify-center text-white">
              <BarChart3 size={28} />
            </div>
            <h1 className="text-[#0e111b] dark:text-white text-4xl lg:text-5xl font-black leading-tight tracking-tight">
              Todos los reportes
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
            Explore nuestra galería de reportes para el sector solidario colombiano. Datos
            oficiales de la Supersolidaria, actualizados periódicamente.
          </p>
        </section>

        {/* Category Filters */}
        <div className="flex gap-3 mb-12 overflow-x-auto pb-2 justify-center">
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

        {/* Reports Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredReports.map((report) => (
            <div
              key={report.title}
              className="group relative overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-900 aspect-video shadow-md hover:shadow-xl transition-all cursor-pointer"
              onClick={() => report.available && setOpenModal(report.modalId)}
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{
                  backgroundImage: `linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.6)), url('${report.image}')`,
                }}
              />
              <div
                className={`absolute top-4 left-4 ${report.tagColor} text-white text-[9px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide`}
              >
                {report.tag}
              </div>
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-white text-xl font-bold leading-tight">{report.title}</p>
                <p className="text-white/80 text-sm mt-1">{report.description}</p>
              </div>
              {report.available && (
                <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="bg-white text-primary font-bold px-6 py-3 rounded-xl shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 text-sm">
                    Abrir reporte →
                  </span>
                </div>
              )}
            </div>
          ))}
        </section>

        {/* CTA */}
        <section className="bg-primary rounded-2xl p-8 lg:p-12 text-white text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent-green/10 rounded-full blur-3xl -ml-24 -mb-24" />
          <div className="relative z-10">
            <h2 className="text-2xl lg:text-3xl font-black mb-4">
              ¿Necesita un reporte personalizado?
            </h2>
            <p className="text-teal-100 text-lg mb-8 max-w-2xl mx-auto">
              Nuestro equipo de analistas puede crear dashboards a medida para sus necesidades
              específicas de cumplimiento y análisis financiero.
            </p>
            <a
              href="https://wa.link/91ybqa"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-primary font-bold px-8 py-4 rounded-xl hover:bg-green-50 transition-colors shadow-xl"
            >
              <Headset size={20} />
              Hablar con un especialista
            </a>
          </div>
        </section>
      </main>

      <Footer />

      {/* RIF Analítica Modal (Power BI) */}
      {openModal === 'rif' && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur p-4"
          onClick={(e) => e.target === e.currentTarget && closeModal()}
        >
          <div className="bg-white dark:bg-background-dark rounded-2xl shadow-2xl w-[95vw] h-[95vh] overflow-auto relative">
            <button
              className="absolute top-4 right-4 z-10 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
              onClick={closeModal}
            >
              <X size={24} />
            </button>
            <div className="w-full h-full flex items-center justify-center p-0">
              <iframe
                title="RIF-Analytic (Pagina Web)"
                width="100%"
                height="100%"
                src="https://app.powerbi.com/view?r=eyJrIjoiNTEwNjExNjAtZjEzNi00NTUxLTg0OGMtMjlhOTVjYWI5YTc0IiwidCI6IjFkY2Y4YjdlLTAzZTItNDU2ZC05Y2JkLTEyMTNiNjg1ZjU0MyJ9"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
