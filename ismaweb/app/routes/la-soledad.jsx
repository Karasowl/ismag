import { json } from "@remix-run/node";
import { SiSpotify, SiApplemusic, SiAmazonmusic, SiYoutubemusic, SiDeezer } from "react-icons/si";
import { ArrowRight } from "lucide-react";

const DEFAULT_SITE = "https://ismaelguimarais.com";
const DEFAULT_OG_IMAGE = `${DEFAULT_SITE}/la-soledad-cover.jpg`;

export const loader = () => {
  const site = process.env.PUBLIC_SITE_URL ?? DEFAULT_SITE;
  const ogImage = `${site}/la-soledad-cover.jpg`;
  return json({ site, ogImage });
};

export const meta = ({ data, location }) => {
  const site = data?.site ?? DEFAULT_SITE;
  const url = new URL(location.pathname + location.search, site).toString();
  const title = "La Soledad - Ismael Guimarais";
  const description = "Escucha 'La Soledad', el nuevo single de Ismael Guimarais. Disponible en todas las plataformas digitales.";
  const ogImage = data?.ogImage ?? DEFAULT_OG_IMAGE;

  return [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:url", content: url },
    { property: "og:image", content: ogImage },
    { property: "og:type", content: "music.song" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: ogImage },
    { tagName: "link", rel: "canonical", href: url }
  ];
};

export default function LaSoledad() {
  const musicPlatforms = [
    {
      name: "Spotify",
      url: "https://open.spotify.com/intl-es/album/5gAOQdp4eLDVJrIBBReF39",
      icon: <SiSpotify />,
      className: "spotify"
    },
    {
      name: "Apple Music",
      url: "https://music.apple.com/mx/album/la-soledad-single/1852310177",
      icon: <SiApplemusic />,
      className: "apple-music"
    },
    {
      name: "Amazon Music",
      url: "https://music.amazon.es/albums/B0G1TZ18L6?marketplaceId=A1RKKUPIHCS9HS&musicTerritory=ES&ref=dm_sh_86sLzfkheGHW1DdqFaFqAwbim",
      icon: <SiAmazonmusic />,
      className: "amazon-music"
    },
    {
      name: "YouTube Music",
      url: "https://music.youtube.com/watch?v=dVOdtN5Y_Tw&si=SgmMuv0v2YuXRg_J",
      icon: <SiYoutubemusic />,
      className: "youtube-music"
    },
    {
      name: "Deezer",
      url: "https://link.deezer.com/s/31Ft6t3yz0M38lbMV6o85",
      icon: <SiDeezer />,
      className: "deezer"
    }
  ];

  return (
    <main className="song-page">
      <div className="song-container">
        {/* Header con portada */}
        <div className="song-header" data-reveal>
          <div className="song-cover-wrapper">
            <img
              src="/la-soledad-cover.jpg"
              alt="Portada de La Soledad"
              className="song-cover"
            />
          </div>
          <h1 className="song-title">La Soledad</h1>
          <p className="song-artist">Ismael Guimarais</p>
          <p className="song-release">Single · 2025</p>
        </div>

        {/* Botones de plataformas */}
        <div className="song-platforms-section" data-reveal>
          <h2 className="platforms-title">Escucha ahora en tu plataforma favorita</h2>
          <div className="song-platforms-grid">
            {musicPlatforms.map((platform) => (
              <a
                key={platform.name}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`song-platform-button song-platform-button--${platform.className}`}
                data-analytics={`song-${platform.className}`}
              >
                <span className="song-platform-icon">{platform.icon}</span>
                <span className="song-platform-name">{platform.name}</span>
                <ArrowRight className="song-platform-arrow" size={24} />
              </a>
            ))}
          </div>
        </div>

        {/* Letra */}
        <div className="song-lyrics-section" data-reveal>
          <h2 className="lyrics-title">Letra</h2>
          <div className="lyrics-content">
            <div className="lyrics-verse">
              <p>La soledad es una iglesia sin espíritu</p>
              <p>Una casa sin familia, una máscara, un disfraz</p>
              <p>La soledad es una bomba en el ombligo</p>
              <p>Es tener muchos amigos y nadie con quien llorar</p>
            </div>

            <div className="lyrics-verse">
              <p>La soledad es una fuerza que te hunde en la más negra de las nubes</p>
              <p>Cuando paras de soñar</p>
              <p>La soledad es un ateo socorrido por algún que otro partido</p>
              <p>Y un diploma en su arsenal</p>
            </div>

            <div className="lyrics-verse">
              <p>Solo en la multitud</p>
              <p>Está el mundo, estás tú</p>
              <p>Solo en la multitud</p>
              <p>Todo se detiene y piensas</p>
              <p>Solo en la multitud</p>
              <p>Todos ríen menos tú</p>
              <p>Solo en la multitud</p>
              <p>Levanta tu rostro y ve al azul</p>
              <p>De aquel cielo</p>
              <p>Escucha la historia del buen carpintero</p>
              <p>Que murió en la cruz</p>
              <p>Azotado y solo entre la multitud</p>
            </div>

            <div className="lyrics-verse">
              <p>La soledad es una chica en minifalda que todos quieren mirarla</p>
              <p>Y nadie la quiere amar</p>
              <p>La soledad roba bolsillos en los trenes</p>
              <p>Asesina en los cuarteles y trafica en alta mar</p>
            </div>

            <div className="lyrics-verse">
              <p>Solo en la multitud</p>
              <p>Está el mundo, estás tú</p>
              <p>Solo en la multitud</p>
              <p>Todo se detiene y piensas</p>
              <p>Solo en la multitud</p>
              <p>Solo en la multitud</p>
              <p>Está el mundo, estás tú</p>
              <p>Solo en la multitud</p>
              <p>Todo se detiene y piensas</p>
              <p>Solo en la multitud</p>
              <p>Todos ríen menos tú</p>
              <p>Solo en la multitud</p>
              <p>Levanta tu rostro y ve al azul</p>
              <p>De aquel cielo</p>
              <p>Escucha la historia del buen carpintero</p>
              <p>Que murió en la cruz</p>
              <p>Azotado y solo (azotado y solo) entre la multitud</p>
            </div>
          </div>
        </div>

        {/* CTA final */}
        <div className="song-cta-section" data-reveal>
          <div className="song-cta-card">
            <h2>Más música de Ismael Guimarais</h2>
            <p>Descubre todas mis canciones y sígueme en tus plataformas favoritas</p>
            <div className="song-cta-buttons">
              <a href="/music" className="button button--primary">
                Ver toda mi música
              </a>
              <a href="/conecta" className="button button--secondary">
                Conecta conmigo
              </a>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="song-footer" data-reveal>
          <p>&copy; 2025 Ismael Guimarais · Todos los derechos reservados</p>
          <p>
            <a href="/">Volver al inicio</a>
          </p>
        </footer>
      </div>
    </main>
  );
}
