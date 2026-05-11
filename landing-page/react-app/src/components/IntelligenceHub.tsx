'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Presentation, X } from 'lucide-react';
import { reports, type ModalId } from '@/data/reports';

export default function IntelligenceHub() {
  const [openModal, setOpenModal] = useState<ModalId>(null);

  const openRif = () => setOpenModal('rif');
  const closeModal = () => setOpenModal(null);

  // Listen for custom event from Header
  useEffect(() => {
    document.addEventListener('open-rif-modal', openRif);
    return () => document.removeEventListener('open-rif-modal', openRif);
  }, []);

  // Block body scroll when a modal is active
  useEffect(() => {
    document.body.style.overflow = openModal ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [openModal]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  return (
    <section id="analitica" className="py-20 bg-white dark:bg-background-dark">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        {/* Section header */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-yellow-400 rounded-lg flex items-center justify-center text-white">
              <Presentation size={24} />
            </div>
            <h2 className="text-3xl font-extrabold text-[#0e111b] dark:text-white">
              Analítica de Datos
            </h2>
          </div>
          <Link
            href="/reportes"
            className="text-primary font-bold text-sm flex items-center gap-1 hover:underline"
          >
            Ver todos los reportes <ArrowRight size={16} />
          </Link>
        </div>

        {/* Reports grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reports.map((report) => (
            <div
              key={report.title}
              className="group relative overflow-hidden rounded-2xl bg-gray-100 aspect-video shadow-md hover:shadow-xl transition-all cursor-pointer"
              onClick={() => setOpenModal(report.modalId)}
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{
                  backgroundImage: `linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.6)), url('${report.image}')`,
                }}
              />
              {!report.available && (
                <div
                  className={`absolute top-4 left-4 ${report.tagColor} text-white text-[8px] font-semibold px-2 py-0.5 rounded-full uppercase opacity-70`}
                >
                  {report.tag}
                </div>
              )}
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-white text-xl font-bold leading-tight">
                  {report.title}
                </p>
                <p className="text-white/80 text-sm mt-1">{report.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RIF Analítica Modal (Power BI) */}
      {openModal === 'rif' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur p-4">
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

      {/* Riesgo de Cartera Modal */}
      {openModal === 'riesgo' && (
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
            <div className="absolute top-4 left-4 z-10 bg-gray-800 text-white text-[8px] font-semibold px-2 py-0.5 rounded-full uppercase opacity-70">
              Próximamente
            </div>
            <div className="w-full h-full flex items-center justify-center p-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://f158ae34df.imgdist.com/pub/bfra/i6q4k2r4/qxp/2yh/y20/Morosidad%20Cooperativas.png"
                alt="Riesgo de cartera"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      )}

      {/* Benchmarking Modal */}
      {openModal === 'benchmarking' && (
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
            <div className="absolute top-4 left-4 z-10 bg-gray-800 text-white text-[8px] font-semibold px-2 py-0.5 rounded-full uppercase opacity-70">
              Próximamente
            </div>
            <div className="w-full h-full flex items-center justify-center p-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://f158ae34df.imgdist.com/pub/bfra/i6q4k2r4/9x0/g91/363/Benchmarking.png"
                alt="Benchmarking sector solidario"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
