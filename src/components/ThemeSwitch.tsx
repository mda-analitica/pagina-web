import { useEffect, useState } from 'react';

export default function ThemeSwitch() {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check saved theme or system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldBeDark = savedTheme === 'dark' || (!savedTheme && prefersDark);

    setIsDark(shouldBeDark);
    if (shouldBeDark) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);

    if (newIsDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <button
        className="flex items-center justify-center w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 transition-colors"
        aria-label="Cargando tema"
      >
        <span className="material-symbols-outlined text-xl text-gray-400">contrast</span>
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="relative flex items-center justify-center w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 group"
      aria-label={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
      role="switch"
      aria-checked={isDark}
    >
      {/* Sun icon - visible in dark mode (to switch to light) */}
      <span
        className={`absolute transition-all duration-300 ${
          isDark
            ? 'opacity-100 scale-100 rotate-0'
            : 'opacity-0 scale-50 rotate-90'
        }`}
      >
        <span
          className="material-symbols-outlined text-2xl text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          light_mode
        </span>
      </span>

      {/* Moon icon - visible in light mode (to switch to dark) */}
      <span
        className={`absolute transition-all duration-300 ${
          isDark
            ? 'opacity-0 scale-50 -rotate-90'
            : 'opacity-100 scale-100 rotate-0'
        }`}
      >
        <span
          className="material-symbols-outlined text-2xl text-indigo-500 dark:text-indigo-400"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          dark_mode
        </span>
      </span>
    </button>
  );
}
