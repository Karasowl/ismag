# Ismaweb

Aplicacion Vite + React para la presencia digital de Ismael Guimarais.

## Scripts

- `npm run dev` inicia el entorno de desarrollo.
- `npm run build` genera la version optimizada, dispara el prerender y crea el sitemap.
- `npm run preview` sirve la carpeta `dist/` para verificacion local.
- `npm run test` ejecuta la suite de pruebas con Vitest.

## SEO & Prerender

La aplicacion usa React Router v6, react-helmet-async y react-snap para producir HTML prerenderizado de las rutas clave.

Pasos para agregar una nueva pagina indexable:

1. Crear el componente en `src/pages/` y agregarlo al `App.jsx` con su ruta.
2. En el componente, usar `<SEO />` con `title`, `description` y, si aplica, JSON-LD.
3. Anadir la ruta a `package.json` dentro de `reactSnap.include`.
4. (Opcional) Actualizar `scripts/generate-sitemap.mjs` si la nueva ruta debe aparecer en el sitemap.
5. Ejecutar `npm run build` para generar `dist/` con los HTML prerenderizados, `sitemap.xml(.gz)` y `robots.txt`.

Los archivos `dist/*.html` resultan de `react-snap`; comprueba su contenido con `npm run preview`. El sitemap se genera leyendo las rutas incluidas y omite `/404`.

## Variables de entorno

Configurar un archivo `.env` en la raiz con:

```
VITE_SITE_URL=https://tu-dominio.com
VITE_SITE_NAME=TuMarca
VITE_TWITTER_HANDLE=@tuusuario
VITE_YOUTUBE_API_KEY=
VITE_YOUTUBE_CHANNEL_ID=UCX-0vZliN8aUFGyr_WGxndA
```

`VITE_YOUTUBE_API_KEY` es opcional; sin valor la pagina de YouTube mostrara el contenido de respaldo prerenderizado.

### TODO: Migracion a SSR

- Evaluar `vite-plugin-ssr` para servir HTML dinamico cuando se necesiten rutas con datos frescos.
- Compartir las rutas de `App.jsx` en un archivo comun para usarlas en `vite-plugin-ssr` + `PageShell`.
- Habilitar `npm run build:ssr` que ejecute `vite build --ssr` y renderice en el servidor.
- Sustituir `react-snap` por `vite-plugin-ssr` y mover la generacion de sitemap a la salida del build SSR.

