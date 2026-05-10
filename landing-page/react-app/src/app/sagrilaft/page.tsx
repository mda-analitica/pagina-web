import Link from 'next/link';
import { ArrowLeft, Clock, PieChart } from 'lucide-react';

export const metadata = {
  title: 'SAGRILAFT | MDA Analítica - Próximamente',
};

export default function SagrilaftPage() {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark flex flex-col">
      {/* Simple header */}
      <header className="border-b border-gray-200 dark:border-gray-800 px-6 py-4">
        <Link href="/" className="flex items-center gap-3 w-fit">
          <div className="size-7 text-primary">
            <PieChart size={28} />
          </div>
          <span className="text-primary dark:text-teal-400 font-black text-lg">
            MDA Analítica
          </span>
        </Link>
      </header>

      {/* Content */}
      <main className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="max-w-lg text-center">
          <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-8">
            <Clock size={40} className="text-primary" />
          </div>
          <h1 className="text-4xl font-black text-[#0e111b] dark:text-white mb-4">
            SAGRILAFT
          </h1>
          <p className="text-2xl font-bold text-primary dark:text-teal-400 mb-6">
            Próximamente
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mb-10">
            Nuestra plataforma integral de gestión de riesgos SAGRILAFT está en
            desarrollo activo. Pronto podrás acceder a todos los módulos de
            cumplimiento normativo desde aquí.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-primary text-white font-bold px-8 py-4 rounded-xl hover:bg-teal-700 transition-colors"
          >
            <ArrowLeft size={20} />
            Volver al inicio
          </Link>
        </div>
      </main>
    </div>
  );
}
