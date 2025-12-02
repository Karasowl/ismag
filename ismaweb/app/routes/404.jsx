import { json } from "@remix-run/node";

const SITE = process.env.PUBLIC_SITE_URL ?? "https://ismaelguimarais.com";
const OG_IMAGE = `${SITE}/og-default.jpg`;

export const loader = () => json({ site: SITE, ogImage: OG_IMAGE });

export const meta = ({ data, location }) => {
  const site = data?.site ?? SITE;
  const url = new URL(location.pathname + location.search, site).toString();
  const title = "Página no encontrada";
  const description = "Lo sentimos, no encontramos el contenido que estás buscando.";
  const ogImage = data?.ogImage ?? OG_IMAGE;

  return [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:url", content: url },
    { property: "og:image", content: ogImage },
    { property: "og:type", content: "website" },
    { tagName: "link", rel: "canonical", href: url }
  ];
};

export default function NotFound() {
  return (
    <main className="section card">
      <h1>Página no encontrada</h1>
      <p>
        El enlace podría haber cambiado o quizá hay un error tipográfico. Regresa al inicio o visita las secciones
        principales.
      </p>
      <div className="links-grid">
        <a className="social-link" href="/">
          <span>Ir al inicio</span>
          <span>Inicio</span>
        </a>
        <a className="social-link" href="/musica">
          <span>Explorar música</span>
          <span>Descubrir</span>
        </a>
        <a className="social-link" href="/sobre">
          <span>Conocer la historia</span>
          <span>Sobre mí</span>
        </a>
      </div>
    </main>
  );
}
