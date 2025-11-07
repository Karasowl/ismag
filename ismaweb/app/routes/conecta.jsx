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
  const title = "Conecta - Ismael Guimarais";
  const description = "Todas las formas de conectar con Ismael Guimarais: redes sociales, música, newsletter y más.";
  const ogImage = data?.ogImage ?? DEFAULT_OG_IMAGE;

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
    { tagName: "link", rel: "canonical", href: url }
  ];
};

export default function Conecta() {
  const socialPlatforms = [
    {
      name: "YouTube",
      icon: "youtube",
      handle: "@IsmaelGuimarais",
      url: "https://www.youtube.com/@IsmaelGuimarais",
      color: "#FF0000"
    },
    {
      name: "Instagram",
      icon: "instagram",
      handle: "@ismaguimarais",
      url: "https://www.instagram.com/ismaguimarais/",
      color: "#E4405F"
    },
    {
      name: "X (Twitter)",
      icon: "x",
      handle: "@IsmaGuimarais",
      url: "https://x.com/IsmaGuimarais",
      color: "#000000"
    },
    {
      name: "TikTok",
      icon: "tiktok",
      handle: "@ismaguimarais",
      url: "https://www.tiktok.com/@ismaguimarais",
      color: "#000000"
    },
    {
      name: "Threads",
      icon: "threads",
      handle: "@ismaguimarais",
      url: "https://www.threads.net/@ismaguimarais",
      color: "#000000"
    },
    {
      name: "Facebook",
      icon: "facebook",
      handle: "Ismael Guimarais",
      url: "https://www.facebook.com/profile.php?id=61566206863056",
      color: "#1877F2"
    }
  ];

  const musicPlatforms = [
    {
      name: "Spotify",
      url: "https://open.spotify.com/artist/5t7JJmMzqEp6j39T0tzsSV",
      icon: "spotify"
    },
    {
      name: "Apple Music",
      url: "https://music.apple.com/us/artist/ismael-guimarais/1764726835",
      icon: "apple"
    },
    {
      name: "Amazon Music",
      url: "https://music.amazon.com/artists/B0DM4NY4VZ/ismael-guimarais",
      icon: "amazon"
    },
    {
      name: "YouTube Music",
      url: "https://music.youtube.com/channel/UCOxCzNODE1o-tqtZRKYYa6g",
      icon: "youtube"
    },
    {
      name: "Deezer",
      url: "https://www.deezer.com/artist/280355925",
      icon: "deezer"
    }
  ];

  const getSocialIcon = (platform) => {
    const icons = {
      youtube: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      ),
      instagram: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      ),
      x: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      ),
      tiktok: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
        </svg>
      ),
      threads: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.018-5.06.869-6.395 2.53-1.388 1.728-2.094 4.227-2.1 7.428.006 3.199.713 5.7 2.1 7.427 1.335 1.661 3.486 2.512 6.395 2.53 2.557-.017 4.484-.563 5.73-1.623.987-.844 1.569-1.956 1.729-3.309-.208-.076-.42-.156-.635-.24-1.78-.693-3.326-1.638-4.6-2.812-1.515-1.398-2.288-3.04-2.296-4.876-.005-1.578.503-2.967 1.51-4.133 1.208-1.396 2.966-2.164 5.084-2.222 2.289-.064 4.216.705 5.73 2.288 1.296 1.356 2.023 3.21 2.161 5.517l.003.052v.024c0 1.928-.37 3.59-1.101 4.942-.758 1.404-1.86 2.48-3.277 3.197-1.657.836-3.694 1.263-6.054 1.267zm5.654-11.281c-.01-.87-.24-1.653-.689-2.329-.636-.956-1.639-1.46-2.982-1.497-1.156.037-2.064.498-2.698 1.37-.477.652-.713 1.432-.705 2.319.01 1.36.537 2.512 1.567 3.426 1.05.933 2.374 1.653 3.938 2.14.417.131.835.247 1.252.35.076-1.13.059-2.328-.683-3.779z"/>
        </svg>
      ),
      facebook: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
      spotify: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
        </svg>
      ),
      apple: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M23.52 12.275c-.032-3.167-2.588-4.703-2.707-4.775 1.473-2.154.413-5.076.378-5.185-1.817.107-4.01 1.21-5.019 2.734-1.01 1.523-.95 3.72-.938 3.856 1.585.125 3.197-1.081 4.286-2.63zm-11.03-1.458c-1.322 0-2.393.627-3.166 1.254-.629.506-1.238.919-1.98.919-1.125 0-2.588-1.254-3.688-1.254-2.588 0-5.158 2.154-5.158 6.234 0 2.588 1.01 5.317 2.255 7.054 1.125 1.524 2.1 2.735 3.688 2.735 1.01 0 1.77-.627 2.968-.627 1.238 0 1.98.627 3.283.627 1.817 0 2.82-1.524 3.688-2.735.632-.879 1.01-1.524 1.388-2.154-3.166-1.21-3.72-5.775-3.72-6.234 0-.459.032-3.303 2.82-4.819z"/>
        </svg>
      ),
      amazon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M.045 18.02c.072-.116.187-.124.348-.022 3.636 2.11 7.594 3.166 11.87 3.166 2.852 0 5.668-.533 8.447-1.595l.315-.14c.138-.06.234-.1.293-.1.228 0 .29.115.174.362-.638 1.084-1.668 1.901-3.089 2.455-1.429.56-3.03.84-4.811.84-3.14 0-6.295-.873-9.465-2.62-1.822-1.003-3.453-2.18-4.897-3.528-.206-.195-.31-.412-.31-.65 0-.33.214-.497.643-.497.355 0 .77.187 1.243.56z"/>
          <path d="M14.618 14.43c-1.306 0-2.345-.32-3.117-.96-.773-.64-1.16-1.51-1.16-2.61 0-1.17.44-2.11 1.32-2.81.88-.7 2.04-1.05 3.48-1.05h2.48v-.75c0-.83-.23-1.46-.69-1.89-.46-.43-1.16-.64-2.1-.64-.75 0-1.42.14-2.01.42-.59.28-1.07.67-1.44 1.17-.15.21-.31.32-.48.32-.12 0-.23-.05-.33-.15l-.87-.87c-.1-.1-.15-.21-.15-.33 0-.15.08-.31.24-.48.67-.72 1.5-1.28 2.49-1.68.99-.4 2.05-.6 3.18-.6 1.78 0 3.15.43 4.11 1.29.96.86 1.44 2.11 1.44 3.75v7.35c0 .3-.15.45-.45.45h-1.35c-.3 0-.45-.15-.45-.45v-1.2c-.39.54-.95.98-1.68 1.32-.73.34-1.56.51-2.49.51zm.45-1.8c1.02 0 1.88-.32 2.58-.96.7-.64 1.05-1.46 1.05-2.46v-1.05h-2.25c-1.17 0-2.07.21-2.7.63-.63.42-.94 1.02-.94 1.8 0 .66.24 1.17.72 1.53.48.36 1.11.54 1.89.54z"/>
        </svg>
      ),
      deezer: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.81 4.16v3.03h5.19V4.16h-5.19zm0 4.75v3.03h5.19V8.91h-5.19zm0 4.75v3.03h5.19v-3.03h-5.19zm0 4.75v3.03h5.19v-3.03h-5.19zM12.14 4.16v3.03h5.19V4.16h-5.19zm0 4.75v3.03h5.19V8.91h-5.19zm0 4.75v3.03h5.19v-3.03h-5.19zm0 4.75v3.03h5.19v-3.03h-5.19zM5.47 4.16v3.03h5.19V4.16H5.47zm0 4.75v3.03h5.19V8.91H5.47zm0 4.75v3.03h5.19v-3.03H5.47zm0 4.75v3.03h5.19v-3.03H5.47zM0 8.91v3.03h4.09V8.91H0zm0 4.75v3.03h4.09v-3.03H0zm0 4.75v3.03h4.09v-3.03H0z"/>
        </svg>
      )
    };
    return icons[platform] || null;
  };

  return (
    <main className="conecta-page">
      <section className="conecta-hero">
        <div className="container">
          <h1 className="conecta-title">Conecta Conmigo</h1>
          <p className="conecta-subtitle">
            Todas las formas de mantenernos en contacto
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container conecta-container">

          {/* Email/Contact Button */}
          <div className="conecta-primary-action" data-reveal>
            <a
              href="mailto:hola@ismaelguimarais.com"
              className="button conecta-email-button"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
              Enviar un Correo
            </a>
          </div>

          {/* Social Networks Grid */}
          <div className="conecta-social-grid" data-reveal>
            <h2 className="conecta-section-title">Redes Sociales</h2>
            <div className="conecta-platforms">
              {socialPlatforms.map((platform) => (
                <a
                  key={platform.name}
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="conecta-platform-card"
                  data-analytics={`conecta-social-${platform.icon}`}
                >
                  <div className="conecta-platform-icon">
                    {getSocialIcon(platform.icon)}
                  </div>
                  <div className="conecta-platform-info">
                    <h3 className="conecta-platform-name">{platform.name}</h3>
                    <p className="conecta-platform-handle">{platform.handle}</p>
                  </div>
                  <svg className="conecta-platform-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Music Platforms */}
          <div className="conecta-music-section" data-reveal>
            <h2 className="conecta-section-title">Escucha Mi Música</h2>
            <div className="conecta-music-grid">
              {musicPlatforms.map((platform) => (
                <a
                  key={platform.name}
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="conecta-music-card"
                  data-analytics={`conecta-music-${platform.icon}`}
                >
                  <div className="conecta-music-icon">
                    {getSocialIcon(platform.icon)}
                  </div>
                  <span className="conecta-music-name">{platform.name}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Newsletter CTA */}
          <div className="conecta-newsletter-cta" data-reveal>
            <div className="card">
              <h2>Newsletter Semanal</h2>
              <p>Recibe reflexiones, análisis y contenido exclusivo directo en tu inbox.</p>
              <a href="/#newsletter" className="button button--primary">
                Suscribirme al Newsletter
              </a>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}
