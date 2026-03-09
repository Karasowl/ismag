import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

export default defineConfig({
  site: 'https://www.guimarais.com',
  output: 'static',
  adapter: vercel(),
  integrations: [
    tailwind(),
    sitemap(),
  ],
});
