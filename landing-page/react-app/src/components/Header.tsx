'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Menu, Moon, PieChart, Sun, X } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

const navLinks = [
  { label: 'Inicio', href: '/#inicio' },
  { label: 'Soluciones', href: '/#soluciones' },
  { label: 'Analítica', href: '/#analitica' },
  { label: 'Nosotros', href: '/#nosotros' },
];

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const sectionIds = ['inicio', 'soluciones', 'analitica', 'nosotros'];
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '0px', threshold: 0.3 }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  const openRifModal = () => {
    document.dispatchEvent(new CustomEvent('open-rif-modal'));
  };

  return (
    <header className="sticky top-0 z-50 glass-header border-b border-solid border-[#e7eaf3] dark:border-gray-800 px-6 md:px-10 py-3">
      <div className="max-w-[1280px] mx-auto flex items-center justify-between whitespace-nowrap">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="size-8 text-primary">
            <PieChart size={32} />
          </div>
          <h2 className="text-primary dark:text-teal-400 text-xl font-black leading-tight tracking-tight">
            MDA Analítica
          </h2>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex flex-1 justify-center gap-9">
          {navLinks.map((link) => {
            const sectionId = link.href.replace('/#', '').replace('#', '');
            const isActive = activeSection === sectionId;
            return (
              <a
                key={link.href}
                href={link.href}
                className={`nav-link text-sm font-semibold leading-normal relative py-1 transition-colors ${
                  isActive
                    ? 'text-primary dark:text-teal-400'
                    : 'text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-teal-400'
                }`}
                style={{
                  ['--tw-after' as string]: isActive ? '100%' : '0%',
                }}
              >
                {link.label}
                <span
                  className="absolute bottom-[-4px] left-0 h-0.5 bg-primary dark:bg-teal-400 transition-all duration-300"
                  style={{ width: isActive ? '100%' : '0%' }}
                />
              </a>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="hidden lg:flex gap-3 items-center">
          <div className="relative group">
            <button className="flex min-w-[160px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-6 bg-accent-green text-white text-sm font-bold leading-normal tracking-wide transition-all hover:bg-emerald-600 border border-emerald-400/20 glow-accent">
              <span>Ver Aplicaciones</span>
            </button>
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-2 z-50">
              <button
                onClick={openRifModal}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                RIF-Analytic
              </button>
              <a
                href="https://sagrilaft.mda-analitica.com"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                SARO-Analytic
              </a>
            </div>
          </div>

          {/* Dark mode toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-[#0e111b] dark:text-white transition-colors"
            aria-label="Toggle dark mode"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>

        {/* Mobile menu button */}
        <button
          className="lg:hidden flex items-center justify-center rounded-lg h-10 w-10 text-gray-600 dark:text-gray-300"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-background-dark px-6 py-4 space-y-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="block text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-primary transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <div className="flex items-center gap-3 pt-2">
            <a
              href="https://sagrilaft.mda-analitica.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center rounded-lg h-10 px-4 bg-accent-green text-white text-sm font-bold flex items-center justify-center"
              onClick={() => setMobileOpen(false)}
            >
              SARO-Analytic
            </a>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-[#0e111b] dark:text-white"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
