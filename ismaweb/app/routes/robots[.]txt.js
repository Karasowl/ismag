export const loader = () => {
  const site = process.env.PUBLIC_SITE_URL ?? "https://ismaelguimarais.com";
  const body = `User-agent: *\nAllow: /\nSitemap: ${site}/sitemap.xml\n`;
  return new Response(body, {
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "public, max-age=300"
    }
  });
};
