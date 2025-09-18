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
  const title = "Sobre Ismael Guimarais";
  const description = "Biografía, convicciones y recorrido artístico de Ismael Guimarais.";
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
    <main className="section card">
      <h1>Sobre Ismael Guimarais</h1>
      <p>
        Nací en Cuba y crecí entre acordes, lecturas y conversaciones sobre fe. Mis canciones mezclan pop alternativo
        con letras que invitan a pensar y sanar. He compartido escenarios en América Latina, colaborado con líderes
        comunitarios y facilitado espacios donde la duda se convierte en diálogo.
      </p>
      <p>
        Además de la música, produzco newsletters y podcasts donde analizo cultura, biblia y sociedad desde una perspectiva
        honesta. Creo en la búsqueda intelectual como camino hacia la esperanza.
      </p>
      <ul className="list">
        <li>500K+ reproducciones en plataformas digitales.</li>
        <li>Conciertos íntimos y encuentros formativos en Argentina, Chile, República Dominicana y Cuba.</li>
        <li>Mentor de equipos creativos y líderes juveniles.</li>
      </ul>
    </main>
  );
}
