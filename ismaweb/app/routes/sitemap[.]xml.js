const routes = [
  "/",
  "/sobre",
  "/music",
  "/newsletter/confirmacion",
  "/newsletter/gracias"
];

export const loader = () => {
  const host = process.env.PUBLIC_SITE_URL ?? "https://ismaelguimarais.com";
  const items = routes
    .map((path) => `<url><loc>${host}${path}</loc><changefreq>weekly</changefreq><priority>${path === "/" ? "1.0" : "0.8"}</priority></url>`)
    .join("");
  const xml = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${items}</urlset>`;
  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=300"
    }
  });
};
