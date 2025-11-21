import { json } from "@remix-run/node";

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
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
        </svg>
      ),
      className: "spotify"
    },
    {
      name: "Apple Music",
      url: "https://music.apple.com/mx/album/la-soledad-single/1852310177",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M23.997 6.124c0-.738-.065-1.47-.24-2.19-.317-1.31-1.062-2.31-2.18-3.043C21.003.517 20.373.285 19.7.164c-.517-.093-1.038-.135-1.564-.15-.04-.003-.083-.01-.124-.013H5.988c-.152.01-.303.017-.455.026C4.786.07 4.043.15 3.34.428 2.004.958 1.04 1.88.475 3.208c-.192.448-.292.925-.363 1.408-.056.392-.088.785-.1 1.18 0 .032-.007.062-.01.093v12.223c.01.14.017.283.027.424.05.815.154 1.624.497 2.373.65 1.42 1.738 2.353 3.234 2.801.42.127.856.187 1.293.228.555.055 1.114.091 1.673.1h11.717c.2-.007.4-.01.597-.02.772-.035 1.537-.106 2.265-.34 1.452-.468 2.52-1.4 3.118-2.854.192-.469.286-.96.335-1.457.048-.5.077-1.003.077-1.507.002-4.168 0-8.336 0-12.504zm-4.653 6.457l-.003 4.29c0 1.474-1.057 2.642-2.495 2.76-1.017.083-1.956-.328-2.37-1.19-.374-.78-.148-1.507.528-2.095.497-.432 1.097-.635 1.738-.69.15-.013.302-.015.453-.013.208 0 .414.01.623.026v-3.912l-5.968 1.222v5.207c0 1.483-1.053 2.655-2.5 2.776-1.02.086-1.965-.324-2.382-1.187-.374-.774-.148-1.498.526-2.083.495-.43 1.093-.632 1.732-.687.15-.013.3-.015.45-.013.21 0 .418.01.628.026v-7.108l10.04-2.053v4.524z"/>
        </svg>
      ),
      className: "apple-music"
    },
    {
      name: "Amazon Music",
      url: "https://music.amazon.es/albums/B0G1TZ18L6?marketplaceId=A1RKKUPIHCS9HS&musicTerritory=ES&ref=dm_sh_86sLzfkheGHW1DdqFaFqAwbim",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M2.25 13.99c3.28 2.43 7.61 3.89 12.19 3.89 4.06 0 7.77-1.14 10.97-3.06.21-.13.46-.13.67 0 .21.13.29.37.21.59-.89 2.43-3.28 4.19-6.08 4.19-2.67 0-5.01-1.52-6.16-3.76-.13-.25-.42-.37-.67-.25-1.52.75-3.28 1.14-5.13 1.14-2.8 0-5.51-.88-7.73-2.43-.25-.17-.29-.5-.13-.75.17-.25.5-.29.75-.13zm19.5-6.5c-.21-.13-.46-.13-.67 0-3.2 1.92-6.91 3.06-10.97 3.06-4.58 0-8.91-1.46-12.19-3.89-.25-.17-.58-.13-.75.13-.17.25-.13.58.13.75 2.22 1.55 4.93 2.43 7.73 2.43 1.85 0 3.61-.39 5.13-1.14.25-.13.54 0 .67.25 1.15 2.24 3.49 3.76 6.16 3.76 2.8 0 5.19-1.76 6.08-4.19.08-.22 0-.46-.21-.59zm-9.5-5.24c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5.67 1.5 1.5 1.5 1.5-.67 1.5-1.5z"/>
        </svg>
      ),
      className: "amazon-music"
    },
    {
      name: "YouTube Music",
      url: "https://music.youtube.com/watch?v=dVOdtN5Y_Tw&si=SgmMuv0v2YuXRg_J",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.376 0 0 5.376 0 12s5.376 12 12 12 12-5.376 12-12S18.624 0 12 0zm0 19.104c-3.924 0-7.104-3.18-7.104-7.104S8.076 4.896 12 4.896s7.104 3.18 7.104 7.104-3.18 7.104-7.104 7.104zm0-13.332c-3.432 0-6.228 2.796-6.228 6.228S8.568 18.228 12 18.228s6.228-2.796 6.228-6.228S15.432 5.772 12 5.772zM9.684 15.54V8.46L15.816 12l-6.132 3.54z"/>
        </svg>
      ),
      className: "youtube-music"
    },
    {
      name: "Deezer",
      url: "https://link.deezer.com/s/31Ft6t3yz0M38lbMV6o85",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.81 4.16v3.03h5.19V4.16h-5.19zm0 4.75v3.03h5.19V8.91h-5.19zm0 4.75v3.03h5.19v-3.03h-5.19zm0 4.75v3.03h5.19v-3.03h-5.19zM12.14 4.16v3.03h5.19V4.16h-5.19zm0 4.75v3.03h5.19V8.91h-5.19zm0 4.75v3.03h5.19v-3.03h-5.19zm0 4.75v3.03h5.19v-3.03h-5.19zM5.47 4.16v3.03h5.19V4.16H5.47zm0 4.75v3.03h5.19V8.91H5.47zm0 4.75v3.03h5.19v-3.03H5.47zm0 4.75v3.03h5.19v-3.03H5.47zM0 8.91v3.03h4.09V8.91H0zm0 4.75v3.03h4.09v-3.03H0zm0 4.75v3.03h4.09v-3.03H0z"/>
        </svg>
      ),
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
                <svg className="song-platform-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
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
