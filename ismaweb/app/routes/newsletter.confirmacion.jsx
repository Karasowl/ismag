import { json } from "@remix-run/node";

const SITE = process.env.PUBLIC_SITE_URL ?? "https://ismaelguimarais.com";
const OG_IMAGE = `${SITE}/og-default.jpg`;

export const loader = () => json({ site: SITE, ogImage: OG_IMAGE });

export const meta = ({ data, location }) => {
  const site = data?.site ?? SITE;
  const url = new URL(location.pathname + location.search, site).toString();
  const title = "Suscripción confirmada";
  const description = "Gracias por confirmar tu suscripción al newsletter de Ismael Guimarais.";
  const ogImage = data?.ogImage ?? OG_IMAGE;

  return [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:url", content: url },
    { property: "og:image", content: ogImage },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: ogImage },
    { tagName: "link", rel: "canonical", href: url },
    {
      "script:ld+json": {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": title,
        "url": url,
        "description": description
      }
    }
  ];
};

export default function NewsletterConfirmacion() {
  return (
    <main className="section card">
      <h1>¡Bienvenido al círculo!</h1>
      <p>
        Gracias por confirmar tu suscripción. Desde ahora recibirás adelantos, detrás de cámaras y apuntes que preparo
        exclusivamente para la comunidad del newsletter.
      </p>
      <p>
        Añade mi correo a tu lista de contactos y revisa la carpeta de promociones para no perderte ninguna entrega.
      </p>
      <a className="button" href="/">Volver al inicio</a>
    </main>
  );
}
