// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://mda-analitica.com',
  integrations: [
    react(),
    sitemap({
      // SAGRILAFT es app interna; blog está noindex mientras tenga contenido placeholder
      filter: (page) => !page.includes('/sagrilaft') && !page.includes('/blog'),
    }),
  ],
  adapter: vercel(),

  vite: {
    plugins: [tailwindcss()]
  }
});
