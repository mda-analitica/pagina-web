'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Inicio', href: '/#inicio' },
  { label: 'Soluciones', href: '/#soluciones' },
  { label: 'Analítica', href: '/#analitica' },
  { label: 'Nosotros', href: '/#nosotros' },
];

export default function Header() {
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
          <img
            src="/favicon.png"
            alt="MDA Analítica Logo"
            className="size-8 object-contain"
          />
          <h2 className="text-primary dark:text-primary text-xl font-black leading-tight tracking-tight">
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
                    ? 'text-primary dark:text-primary'
                    : 'text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary'
                }`}
                style={{
                  ['--tw-after' as string]: isActive ? '100%' : '0%',
                }}
              >
                {link.label}
                <span
                  className="absolute bottom-[-4px] left-0 h-0.5 bg-primary dark:bg-primary transition-all duration-300"
                  style={{ width: isActive ? '100%' : '0%' }}
                />
              </a>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="hidden lg:flex gap-3 items-center">
          <motion.button
            onClick={openRifModal}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            className="flex min-w-[160px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-6 bg-accent-green text-white text-sm font-bold leading-normal tracking-wide transition-all hover:opacity-90 border border-accent-green/30 glow-accent"
          >
            <span>Risk Analytic</span>
          </motion.button>
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
          <motion.button
            onClick={() => {
              openRifModal();
              setMobileOpen(false);
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            className="w-full text-center rounded-lg h-10 px-4 bg-accent-green text-white text-sm font-bold flex items-center justify-center"
          >
            Risk Analytic
          </motion.button>
        </div>
      )}
    </header>
  );
}
