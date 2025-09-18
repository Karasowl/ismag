import { json } from "@remix-run/node";

const SITE = process.env.PUBLIC_SITE_URL ?? "https://ismaelguimarais.com";
const OG_IMAGE = `${SITE}/og-default.jpg`;

export const loader = () => json({ site: SITE, ogImage: OG_IMAGE });

export const meta = ({ data, location }) => {
  const site = data?.site ?? SITE;
  const url = new URL(location.pathname + location.search, site).toString();
  const title = "Gracias por suscribirte";
  const description = "Revisa tu correo para confirmar la suscripción al newsletter.";
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

export default function NewsletterGracias() {
  return (
    <main className="section card">
      <h1>Confirma tu correo</h1>
      <p>
        Te acabamos de enviar un mensaje con el enlace de confirmación. Haz clic para activar tu suscripción y recibir
        materiales exclusivos antes que nadie.
      </p>
      <div className="links-grid">
        <a className="social-link" href="/newsletter/confirmacion">
          <span>¿Ya confirmé?</span>
          <span>Continuar</span>
        </a>
        <a className="social-link" href="/">
          <span>Volver al inicio</span>
          <span>Explorar</span>
        </a>
      </div>
    </main>
  );
}
