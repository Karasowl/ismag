import { json } from "@remix-run/node";
import HeroVideo from "../components/HeroVideo.jsx";
import SocialLinks from "../components/SocialLinks.jsx";

const SITE = process.env.PUBLIC_SITE_URL ?? "https://ismaelguimarais.com";
const OG_IMAGE = `${SITE}/og-default.jpg`;

export const loader = () => {
  return json({ site: SITE, ogImage: OG_IMAGE });
};

export const meta = ({ data, location }) => {
  const site = data?.site ?? SITE;
  const ogImage = data?.ogImage ?? OG_IMAGE;
  const url = new URL(location.pathname + location.search, site).toString();
  const title = "Ismael Guimarais — A veces canto, siempre analizo";
  const description = "Piensa bien, siente bien, vive bien. Cronicas, musica y conversaciones que conectan razon y fe.";

  return [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:url", content: url },
    { property: "og:type", content: "website" },
    { property: "og:image", content: ogImage },
    { property: "og:site_name", content: "Ismael Guimarais" },
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
        "url": site,
        "jobTitle": "Cantautor y analista cultural",
        "image": ogImage,
        "sameAs": [
          "https://www.youtube.com/@IsmaelGuimarais",
          "https://x.com/IsmaGuimarais",
          "https://www.instagram.com/ismaguimarais/",
          "https://www.tiktok.com/@ismaelguimarais",
          "https://www.threads.net/@ismaguimarais",
          "https://www.facebook.com/ismaguimarais"
        ]
      }
    },
    {
      "script:ld+json": {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Ismael Guimarais",
        "url": site,
        "publisher": {
          "@type": "Person",
          "name": "Ismael Guimarais"
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": `${site}/?q={search_term_string}`,
          "query-input": "required name=search_term_string"
        }
      }
    }
  ];
};

export default function Index() {
  return (
    <main>
      <HeroVideo
        title="A veces canto, siempre analizo."
        subtitle="La razón bien usada lleva a la fe."
        cta="Escucha la última canción"
        ctaHref="/music"
      />
      <section className="section card">
        <h2>Piensa bien, siente bien, vive bien</h2>
        <p>
          Soy Ismael Guimarais, cantautor y narrador de historias. Desde Cuba hasta el Cono Sur comparto canciones,
          ensayos y conversaciones que conectan la razón con la espiritualidad. Este sitio reúne mis lanzamientos,
          newsletters y proyectos especiales.
        </p>
      </section>
      <section className="section card">
        <h2>Encuéntrame en redes</h2>
        <p>Únete a la comunidad para recibir adelantos, streamings y debates en vivo.</p>
        <SocialLinks />
      </section>
      <footer>
        &copy; {new Date().getFullYear()} Ismael Guimarais. Todos los derechos reservados.
      </footer>
    </main>
  );
}
