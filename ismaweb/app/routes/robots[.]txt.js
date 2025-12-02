export const loader = () => {
  const site = process.env.PUBLIC_SITE_URL ?? "https://ismaelguimarais.com";
  const body = `User-agent: *
Allow: /

# Bloquear páginas de confirmación
Disallow: /newsletter/gracias
Disallow: /newsletter/confirmacion

# Sitemap
Sitemap: ${site}/sitemap.xml
`;
  return new Response(body, {
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "public, max-age=86400"
    }
  });
};
