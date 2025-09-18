# Ismaweb (Remix SSR)

Migrado a Remix v2 con Vite para renderizado en servidor, SEO por ruta y despliegue "zero-config" en Vercel.

## Scripts

- `npm run dev` Inicia el servidor de desarrollo (Remix + Vite).
- `npm run build` Genera `build/client` y `build/server` (SSR listo).
- `npm start` Arranca el servidor SSR local con `remix-serve`.
- `npm test` (deshabilitado por ahora).

## Estructura

- `app/root.jsx` Documento raíz (`<Meta/>`, `<Links/>`, `<Outlet/>`).
- `app/routes/` Rutas SSR:
  - `_index.jsx` Home con meta por-ruta + JSON-LD + canonical.
  - `sobre.jsx`, `music.jsx`, `newsletter.confirmacion.jsx`, `newsletter.gracias.jsx`, `404.jsx`.
  - `sitemap[.]xml.js` y `robots[.]txt.js` como resource routes.
- `app/components/` `HeroVideo.jsx`, `SocialLinks.jsx`.
- `app/styles/global.css` Estilos globales.
- `public/` `og-default.jpg` (1200×630), `hero-background.mp4` (video), assets estáticos.

## SEO por ruta (API `meta` de Remix)

Cada archivo en `app/routes/*.jsx` exporta `meta()` con:

- `title`, `description`.
- OpenGraph / Twitter (`og:*`, `twitter:*`).
- Canonical: `{ tagName: "link", rel: "canonical", href }`.
- JSON-LD nativo: `{ "script:ld+json": { ... } }`.

Ejemplo: ver `app/routes/_index.jsx`.

## Sitemap y robots

- `GET /sitemap.xml` → `app/routes/sitemap[.]xml.js`
- `GET /robots.txt` → `app/routes/robots[.]txt.js`

Se generan en runtime usando `PUBLIC_SITE_URL`.

## Variables de entorno

Crear `.env` (o configurar en Vercel):

```
PUBLIC_SITE_URL=https://tu-dominio.com
YOUTUBE_API_KEY=xxxx
YOUTUBE_CHANNEL_ID=UCxxxxx
SPOTIFY_TRACK_ID=xxxxxxxxxxxxxxx
CONVERTKIT_API_KEY=xxxx
CONVERTKIT_FORM_ID=123456
MAILCHIMP_API_KEY=xxxx-us21
MAILCHIMP_AUDIENCE_ID=xxxxxxxx
```

## Desarrollo

```
npm install
npm run dev
```

## Build local SSR

```
npm run build
npm start
```

## Despliegue en Vercel

1) Conecta el repo en Vercel.
2) Vercel detecta Remix automáticamente; si pide comando, usa `remix vite:build`.
3) Define `PUBLIC_SITE_URL` en Project Settings → Environment Variables.
4) Deploy (preview/prod).

## Añadir una nueva ruta

1) Crea `app/routes/mi-ruta.jsx` exportando `meta()` y un componente.
2) Si la ruta debe indexarse, añade su URL en `sitemap[.]xml.js`.
3) Usa JSON-LD según corresponda (Article, VideoObject, MusicRecording, etc.).

## Contenido pendiente

- Banner OG final (reemplazar `public/og-default.jpg` si lo deseas).
- Actualizar `sameAs` en JSON-LD con tus handles definitivos.

