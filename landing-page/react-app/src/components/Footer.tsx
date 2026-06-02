import { AtSign, Globe, Mail, MapPin, Phone, PieChart } from 'lucide-react';

const contact = [
  { Icon: MapPin, text: 'Medellín, Antioquia, Belén Rincón' },
  {
    Icon: Mail,
    text: 'contacto@mda-analitica.com',
    href: 'mailto:contacto@mda-analitica.com',
  },
  { Icon: Phone, text: '+57 (301) 215-9933', href: 'tel:+573012159933' },
];

const legal = [
  { label: 'Términos y Condiciones', href: '#' },
  { label: 'Política de Privacidad', href: '#' },
  { label: 'Cookies', href: '#' },
];

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-background-dark border-t border-gray-200 dark:border-gray-800 py-16">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        <div className="flex flex-col md:flex-row justify-between gap-12">
          {/* Brand */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="size-6 text-primary">
                <PieChart size={24} />
              </div>
              <h2 className="text-primary dark:text-primary text-lg font-bold">
                MDA Analítica
              </h2>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              Somos el centro de analítica para todo el sector solidario,
              agilizamos los procesos de toma de decisiones basado en datos
            </p>
            <div className="flex gap-4">
              <a
                className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-primary hover:text-white transition-all"
                href="#"
              >
                <Globe size={18} />
              </a>
              <a
                className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-primary hover:text-white transition-all"
                href="#"
              >
                <AtSign size={18} />
              </a>
            </div>
          </div>

          {/* Contact */}
          <div className="text-left md:text-right">
            <h4 className="font-bold text-[#0e111b] dark:text-white mb-6 uppercase text-xs tracking-widest">
              Contacto
            </h4>
            <ul className="space-y-4">
              {contact.map((item) => (
                <li
                  key={item.text}
                  className="flex items-center gap-3 text-sm text-gray-500"
                >
                  <item.Icon size={18} className="text-primary shrink-0" />
                  {item.href ? (
                    <a
                      href={item.href}
                      className="hover:text-primary transition-colors"
                    >
                      {item.text}
                    </a>
                  ) : (
                    item.text
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-gray-100 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-gray-400">
          <p>© 2024 MDA Analítica S.A.S. Todos los derechos reservados.</p>
          <div className="flex gap-6">
            {legal.map((item) => (
              <a
                key={item.label}
                className="hover:text-primary transition-colors"
                href={item.href}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
