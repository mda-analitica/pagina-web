import { Award, Clock, Database, Users } from 'lucide-react';

const valores = [
  {
    title: 'Rigor técnico',
    description: 'Metodologías validadas y datos oficiales de la Supersolidaria.',
  },
  {
    title: 'Transparencia',
    description: 'Fuentes abiertas, trazabilidad completa en cada indicador.',
  },
  {
    title: 'Cercanía',
    description: 'Acompañamos a cada entidad en su proceso de toma de decisiones.',
  },
];

const metricas = [
  { Icon: Database, value: '3.500+', label: 'Entidades analizadas' },
  { Icon: Clock, value: '7 años', label: 'De experiencia (2017-presente)' },
  { Icon: Award, value: '100%', label: 'Datos oficiales Supersolidaria' },
  { Icon: Users, value: '24/7', label: 'Disponibilidad de la plataforma' },
];

export default function Nosotros() {
  return (
    <section id="nosotros" className="py-20 bg-gray-50 dark:bg-[#0b0e14]">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="text-primary dark:text-teal-400 text-sm font-extrabold uppercase tracking-widest">
            Quiénes somos
          </span>
          <h2 className="mt-3 text-3xl lg:text-4xl font-black text-[#0e111b] dark:text-white leading-tight">
            Nosotros
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-16">
          {/* Misión */}
          <div>
            <h3 className="text-xl font-bold text-[#0e111b] dark:text-white mb-4">Nuestra misión</h3>
            <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
              Empoderamos al sector solidario colombiano con analítica de datos confiable, oportuna
              y accionable para transformar la toma de decisiones financieras.
            </p>
          </div>

          {/* Valores */}
          <div>
            <h3 className="text-xl font-bold text-[#0e111b] dark:text-white mb-4">Nuestros valores</h3>
            <ul className="space-y-4">
              {valores.map((v) => (
                <li key={v.title} className="flex gap-3">
                  <span className="mt-1 w-2 h-2 rounded-full bg-primary dark:bg-teal-400 shrink-0" />
                  <div>
                    <span className="font-semibold text-[#0e111b] dark:text-white">{v.title}</span>
                    <span className="text-gray-500 dark:text-gray-400"> — {v.description}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Métricas */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {metricas.map((m) => (
            <div
              key={m.label}
              className="bg-white dark:bg-background-dark rounded-2xl p-6 text-center shadow-sm border border-gray-100 dark:border-gray-800"
            >
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary dark:text-teal-400 mx-auto mb-3">
                <m.Icon size={22} />
              </div>
              <p className="text-2xl font-black text-[#0e111b] dark:text-white">{m.value}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 leading-snug">{m.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
