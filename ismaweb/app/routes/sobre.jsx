import { json } from "@remix-run/node";

const DEFAULT_SITE = "https://ismaelguimarais.com";
const DEFAULT_OG_IMAGE = `${DEFAULT_SITE}/og-default.jpg`;

export const loader = () => {
  const site = process.env.PUBLIC_SITE_URL ?? DEFAULT_SITE;
  const ogImage = `${site}/og-default.jpg`;
  return json({ site, ogImage });
};

export const meta = ({ data, location }) => {
  const site = data?.site ?? DEFAULT_SITE;
  const url = new URL(location.pathname + location.search, site).toString();
  const title = "Sobre Ismael Guimarais | Analista cultural y músico cubano en México";
  const description = "Conozca a Ismael Guimarais: analista cultural cubano en México. Creador de videoensayos sobre fe, política y cultura. Músico cristiano con visión reflexiva y contemporánea.";
  const ogImage = data?.ogImage ?? DEFAULT_OG_IMAGE;

  return [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:url", content: url },
    { property: "og:image", content: ogImage },
    { property: "og:type", content: "profile" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: ogImage },
    { tagName: "link", rel: "canonical", href: url },
    {
      "script:ld+json": {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Ismael Guimarais",
        "description": description,
        "image": ogImage,
        "url": url,
        "sameAs": [
          "https://www.youtube.com/@IsmaelGuimarais",
          "https://x.com/IsmaGuimarais",
          "https://www.instagram.com/ismaguimarais/"
        ]
      }
    }
  ];
};

export default function Sobre() {
  return (
    <main className="section">
      <div className="sobre-header">
        <h1 className="page-title">Sobre Ismael Guimarais</h1>
      </div>

      <div className="sobre-content card">
        <div className="sobre-image-section">
          <picture>
            <source srcSet="/ismael-professional.webp" type="image/webp" />
            <img
              src="/ismael-professional.jpg"
              alt="Ismael Guimarais"
              className="sobre-image"
              width="600"
              height="600"
              loading="lazy"
            />
          </picture>
        </div>

        <div className="sobre-text-section">
          <p className="sobre-intro">
            Nací en Cuba y crecí entre libros, música y conversaciones sobre el sentido de la vida. Hoy extraigo "hacks del buen vivir" analizando música, filosofía, historia y cultura para una audiencia hispana que busca profundidad sin rollos.
          </p>
          <p className="sobre-paragraph">
            Creo videos semanales en YouTube donde convierto letras de canciones, eventos históricos e ideas filosóficas en lecciones prácticas para la vida cotidiana.
          </p>

          <div className="sobre-cta">
            <a
              href="https://youtube.com/@IsmaelGuimarais"
              target="_blank"
              rel="noopener noreferrer"
              className="button button--primary"
            >
              <svg style={{ width: '20px', height: '20px', marginRight: '8px' }} viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              Ver mi canal de YouTube
            </a>
            <a href="/#content-grid" className="button button--secondary">
              Explorar contenido
            </a>
          </div>
        </div>
      </div>

      {/* Donation Section */}
      <div className="donation-section">
        <p className="donation-section__description">
          Mi contenido es gratuito y siempre lo será. Si quieres apoyar este proyecto, te lo agradezco de corazón.
        </p>
        <a
          href="https://www.paypal.com/paypalme/miguelitoism"
          target="_blank"
          rel="noopener noreferrer"
          className="donation-badge donation-badge--paypal"
          data-analytics="donation_sobre"
          title="Apoyar mi trabajo con PayPal"
        >
          <span className="donation-badge__emoji">☕</span>
          <span className="donation-badge__text">Apoya mi trabajo</span>
        </a>
      </div>
    </main>
  );
}
