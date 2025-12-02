const routes = [
  { path: "/", priority: "1.0", changefreq: "daily" },
  { path: "/sobre", priority: "0.8", changefreq: "monthly" },
  { path: "/musica", priority: "0.9", changefreq: "weekly" },
  { path: "/la-soledad", priority: "0.9", changefreq: "monthly" },
  { path: "/conecta", priority: "0.7", changefreq: "monthly" },
  { path: "/blog", priority: "0.8", changefreq: "weekly" },
  { path: "/blog/el-mensaje-de-jesus", priority: "0.7", changefreq: "yearly", lastmod: "2024-01-15" }
];

export const loader = () => {
  const host = process.env.PUBLIC_SITE_URL ?? "https://ismaelguimarais.com";
  const items = routes
    .map((route) => {
      const lastmod = route.lastmod ? `<lastmod>${route.lastmod}</lastmod>` : "";
      return `<url><loc>${host}${route.path}</loc>${lastmod}<changefreq>${route.changefreq}</changefreq><priority>${route.priority}</priority></url>`;
    })
    .join("");
  const xml = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${items}</urlset>`;
  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600"
    }
  });
};
