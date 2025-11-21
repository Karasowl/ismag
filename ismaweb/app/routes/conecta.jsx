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
  const socialLinks = [
    {
      name: "YouTube",
      handle: "@IsmaelGuimarais",
      url: "https://www.youtube.com/@IsmaelGuimarais",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      ),
      className: "youtube"
    },
    {
      name: "Instagram",
      handle: "@ismaguimarais",
      url: "https://www.instagram.com/ismaguimarais/",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      ),
      className: "instagram"
    },
    {
      name: "X (Twitter)",
      handle: "@IsmaGuimarais",
      url: "https://x.com/IsmaGuimarais",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      ),
      className: "x"
    },
    {
      name: "TikTok",
      handle: "@ismaguimarais",
      url: "https://www.tiktok.com/@ismaguimarais",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
        </svg>
      ),
      className: "tiktok"
    },
    {
      name: "Threads",
      handle: "@ismaguimarais",
      url: "https://www.threads.net/@ismaguimarais",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.018-5.06.869-6.395 2.53-1.388 1.728-2.094 4.227-2.1 7.428.006 3.199.713 5.7 2.1 7.427 1.335 1.661 3.486 2.512 6.395 2.53 2.557-.017 4.484-.563 5.73-1.623.987-.844 1.569-1.956 1.729-3.309-.208-.076-.42-.156-.635-.24-1.78-.693-3.326-1.638-4.6-2.812-1.515-1.398-2.288-3.04-2.296-4.876-.005-1.578.503-2.967 1.51-4.133 1.208-1.396 2.966-2.164 5.084-2.222 2.289-.064 4.216.705 5.73 2.288 1.296 1.356 2.023 3.21 2.161 5.517l.003.052v.024c0 1.928-.37 3.59-1.101 4.942-.758 1.404-1.86 2.48-3.277 3.197-1.657.836-3.694 1.263-6.054 1.267zm5.654-11.281c-.01-.87-.24-1.653-.689-2.329-.636-.956-1.639-1.46-2.982-1.497-1.156.037-2.064.498-2.698 1.37-.477.652-.713 1.432-.705 2.319.01 1.36.537 2.512 1.567 3.426 1.05.933 2.374 1.653 3.938 2.14.417.131.835.247 1.252.35.076-1.13.059-2.328-.683-3.779z"/>
        </svg>
      ),
      className: "threads"
    },
    {
      name: "Facebook",
      handle: "Ismael Guimarais",
      url: "https://www.facebook.com/ismaguimarais/",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
      className: "facebook"
    }
  ];

  const musicPlatforms = [
    {
      name: "Spotify",
      url: "https://open.spotify.com/artist/5t7JJmMzqEp6j39T0tzsSV",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
        </svg>
      ),
      className: "spotify-btn"
    },
    {
      name: "Apple Music",
      url: "https://music.apple.com/us/artist/ismael-guimarais/1764726835",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M23.997 6.124c0-.738-.065-1.47-.24-2.19-.317-1.31-1.062-2.31-2.18-3.043C21.003.517 20.373.285 19.7.164c-.517-.093-1.038-.135-1.564-.15-.04-.003-.083-.01-.124-.013H5.988c-.152.01-.303.017-.455.026C4.786.07 4.043.15 3.34.428 2.004.958 1.04 1.88.475 3.208c-.192.448-.292.925-.363 1.408-.056.392-.088.785-.1 1.18 0 .032-.007.062-.01.093v12.223c.01.14.017.283.027.424.05.815.154 1.624.497 2.373.65 1.42 1.738 2.353 3.234 2.801.42.127.856.187 1.293.228.555.055 1.114.091 1.673.1h11.717c.2-.007.4-.01.597-.02.772-.035 1.537-.106 2.265-.34 1.452-.468 2.52-1.4 3.118-2.854.192-.469.286-.96.335-1.457.048-.5.077-1.003.077-1.507.002-4.168 0-8.336 0-12.504zm-4.653 6.457l-.003 4.29c0 1.474-1.057 2.642-2.495 2.76-1.017.083-1.956-.328-2.37-1.19-.374-.78-.148-1.507.528-2.095.497-.432 1.097-.635 1.738-.69.15-.013.302-.015.453-.013.208 0 .414.01.623.026v-3.912l-5.968 1.222v5.207c0 1.483-1.053 2.655-2.5 2.776-1.02.086-1.965-.324-2.382-1.187-.374-.774-.148-1.498.526-2.083.495-.43 1.093-.632 1.732-.687.15-.013.3-.015.45-.013.21 0 .418.01.628.026v-7.108l10.04-2.053v4.524z"/>
        </svg>
      ),
      className: "apple-music-btn"
    },
    {
      name: "Amazon Music",
      url: "https://music.amazon.com/artists/B0DM4NY4VZ/ismael-guimarais",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M3.333 14.235c0-3.897 1.955-6.948 5.53-6.948 2.289 0 3.491 1.357 3.491 1.357V1.191h3.874v15.52c0 .464.189.68.681.68h.244v3.298c-.464.042-.927.085-1.347.127-1.37.127-2.027-.34-2.448-1.399 0 0-1.283 1.655-4.226 1.655C5.415 21.072 3.333 18.9 3.333 14.234zm8.979-.042V11.32c0-.636-.464-1.103-1.103-1.103-1.582 0-2.575 1.442-2.575 4.06 0 2.703.993 4.06 2.575 4.06 1.158 0 1.103-1.358 1.103-1.91v-2.233zm9.282 4.86c-.888 1.358-2.065 2.234-3.787 2.234-2.277 0-3.32-1.442-3.32-3.617V7.356h3.916v9.915c0 .764.255 1.018.764 1.018.721 0 1.485-.721 1.485-1.23V7.356h3.916v10.102c0 .467.127.683.676.683h.296v3.319c-.508.04-.97.085-1.4.127-.845.08-1.59-.178-2.107-1.23l-.439-.628z"/>
        </svg>
      ),
      className: "amazon-music-btn"
    },
    {
      name: "YouTube Music",
      url: "https://music.youtube.com/channel/UCOxCzNODE1o-tqtZRKYYa6g",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.376 0 0 5.376 0 12s5.376 12 12 12 12-5.376 12-12S18.624 0 12 0zm0 19.104c-3.924 0-7.104-3.18-7.104-7.104S8.076 4.896 12 4.896s7.104 3.18 7.104 7.104-3.18 7.104-7.104 7.104zm0-13.332c-3.432 0-6.228 2.796-6.228 6.228S8.568 18.228 12 18.228s6.228-2.796 6.228-6.228S15.432 5.772 12 5.772zM9.684 15.54V8.46L15.816 12l-6.132 3.54z"/>
        </svg>
      ),
      className: "youtube-music-btn"
    },
    {
      name: "Deezer",
      url: "https://www.deezer.com/artist/280355925",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.81 4.16v3.03h5.19V4.16h-5.19zm0 4.75v3.03h5.19V8.91h-5.19zm0 4.75v3.03h5.19v-3.03h-5.19zm0 4.75v3.03h5.19v-3.03h-5.19zM12.14 4.16v3.03h5.19V4.16h-5.19zm0 4.75v3.03h5.19V8.91h-5.19zm0 4.75v3.03h5.19v-3.03h-5.19zm0 4.75v3.03h5.19v-3.03h-5.19zM5.47 4.16v3.03h5.19V4.16H5.47zm0 4.75v3.03h5.19V8.91H5.47zm0 4.75v3.03h5.19v-3.03H5.47zm0 4.75v3.03h5.19v-3.03H5.47zM0 8.91v3.03h4.09V8.91H0zm0 4.75v3.03h4.09v-3.03H0zm0 4.75v3.03h4.09v-3.03H0z"/>
        </svg>
      ),
      className: "deezer-btn"
    }
  ];

  return (
    <main className="conecta-page">
      <div className="conecta-container">
        {/* Profile Header */}
        <div className="conecta-profile-header" data-reveal>
          <img
            src="/ismael-professional.jpg"
            alt="Ismael Guimarais"
            className="conecta-profile-image"
          />
          <h1 className="conecta-profile-name">Ismael Guimarais</h1>
          <p className="conecta-profile-bio">
            Creador de contenido, músico y analista cultural
          </p>
          <p className="conecta-profile-description">
            Hacks del buen vivir a través de música, filosofía e historia
          </p>
        </div>

        {/* Email Button */}
        <div className="conecta-email-section" data-reveal>
          <a
            href="mailto:hola@ismaelguimarais.com"
            className="conecta-email-button"
            data-analytics="conecta-email"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
            Enviar un Correo
          </a>
        </div>

        {/* Social Links */}
        <div className="conecta-links-section" data-reveal>
          <h2 className="conecta-section-title">Redes Sociales</h2>
          <div className="conecta-social-buttons">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`conecta-social-link conecta-social-link--${link.className}`}
                data-analytics={`conecta-social-${link.className}`}
              >
                <span className="conecta-social-icon">{link.icon}</span>
                <span className="conecta-social-text">
                  <span className="conecta-social-name">{link.name}</span>
                  <span className="conecta-social-handle">{link.handle}</span>
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Music Platforms */}
        <div className="conecta-music-section" data-reveal>
          <h2 className="conecta-section-title">Escucha Mi Música</h2>
          <div className="conecta-music-buttons">
            {musicPlatforms.map((platform) => (
              <a
                key={platform.name}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`conecta-music-link conecta-music-link--${platform.className}`}
                data-analytics={`conecta-music-${platform.className}`}
              >
                <span className="conecta-music-icon">{platform.icon}</span>
                <span>{platform.name}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Newsletter CTA */}
        <div className="conecta-newsletter-section" data-reveal>
          <div className="conecta-newsletter-card">
            <h2>Newsletter Semanal</h2>
            <p>
              Recibe reflexiones profundas, análisis culturales y contenido
              exclusivo directo en tu inbox cada semana.
            </p>
            <a href="/#newsletter" className="button button--primary">
              Suscribirme al Newsletter
            </a>
          </div>
        </div>

        {/* Footer */}
        <footer className="conecta-footer" data-reveal>
          <p>
            Hecho con ❤️ · <a href="/">ismaelguimarais.com</a>
          </p>
        </footer>
      </div>
    </main>
  );
}
