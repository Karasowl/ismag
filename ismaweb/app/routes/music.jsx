import { json } from "@remix-run/node";

const DEFAULT_SITE = "https://ismaelguimarais.com";
const DEFAULT_OG_IMAGE = `${DEFAULT_SITE}/og-default.jpg`;
const TRACK_URL = "https://youtu.be/eJ4tCKzUQ6I";

export const loader = () => {
  const site = process.env.PUBLIC_SITE_URL ?? DEFAULT_SITE;
  const ogImage = `${site}/og-default.jpg`;
  return json({ site, ogImage });
};

export const meta = ({ data, location }) => {
  const site = data?.site ?? DEFAULT_SITE;
  const url = new URL(location.pathname + location.search, site).toString();
  const title = "Música y lanzamientos";
  const description = "Escucha \"Muy Civilizado\" y descubre nuevas canciones y colaboraciones de Ismael Guimarais.";
  const ogImage = data?.ogImage ?? DEFAULT_OG_IMAGE;

  return [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:url", content: url },
    { property: "og:image", content: ogImage },
    { property: "og:type", content: "music.playlist" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: ogImage },
    { tagName: "link", rel: "canonical", href: url },
    {
      "script:ld+json": {
        "@context": "https://schema.org",
        "@type": "MusicRecording",
        "name": "Muy Civilizado",
        "url": TRACK_URL,
        "inAlbum": { "@type": "MusicAlbum", "name": "Muy Civilizado" },
        "byArtist": { "@type": "Person", "name": "Ismael Guimarais" },
        "offers": { "@type": "Offer", "url": TRACK_URL, "price": "0", "priceCurrency": "USD" }
      }
    }
  ];
};

export default function Music() {
  return (
    <main className="section card">
      <h1>Música y lanzamientos</h1>
      <p>
        Cada canción es una crónica sobre cómo la razón y la fe caminan juntas. "Muy Civilizado" es el single más
        reciente; cuenta la historia de un buscador que necesita reconciliar su corazón con Dios.
      </p>
      <div className="links-grid">
        <a className="social-link" href="https://open.spotify.com/track/0iFchlTEV8u0LtcXb2aJjQ" target="_blank" rel="noopener noreferrer">
          <span>Escuchar en Spotify</span>
          <span>stream</span>
        </a>
        <a className="social-link" href="https://music.apple.com/us/album/amor-princesa/1673165177?i=1673165178" target="_blank" rel="noopener noreferrer">
          <span>Escuchar en Apple Music</span>
          <span>single</span>
        </a>
        <a className="social-link" href={TRACK_URL} target="_blank" rel="noopener noreferrer">
          <span>Ver videoclip</span>
          <span>YouTube</span>
        </a>
      </div>
      <p>
        Suscríbete al newsletter para recibir letras comentadas, partituras y sesiones acústicas antes del estreno público.
      </p>
      <a className="button" href="/newsletter/confirmacion">Quiero unirme al newsletter</a>
    </main>
  );
}
