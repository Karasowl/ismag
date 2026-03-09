/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: '#1a1a2e',
        accent: '#c0392b',
        'accent-light': '#e74c3c',
        warm: '#faf6f1',
        'warm-dark': '#f0e8dd',
        cream: '#fffdf9',
        muted: '#6b7280',
        'section-marketing': '#17184B',
        'section-fe': '#8B6914',
        'section-politica': '#8B1A1A',
        'section-musica': '#4A1A6B',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['"Source Serif 4"', 'Georgia', 'Cambria', 'serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      maxWidth: {
        prose: '65ch',
        content: '72rem',
        narrow: '48rem',
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '65ch',
          },
        },
      },
    },
  },
  plugins: [],
};
