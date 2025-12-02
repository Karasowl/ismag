import { json } from "@remix-run/node";
import { SiYoutube, SiInstagram, SiX, SiTiktok, SiThreads, SiFacebook, SiSpotify, SiApplemusic, SiAmazonmusic, SiYoutubemusic } from "react-icons/si";
import { Mail } from "lucide-react";

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
  const title = "Conecta con Ismael Guimarais | Redes sociales y música";
  const description = "Sígueme en YouTube, Instagram, TikTok y X. Escucha mi música en Spotify y Apple Music. Únete al newsletter semanal con reflexiones sobre fe, cultura y propósito.";
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
      icon: <SiYoutube />,
      className: "youtube"
    },
    {
      name: "Instagram",
      handle: "@ismaguimarais",
      url: "https://www.instagram.com/ismaguimarais/",
      icon: <SiInstagram />,
      className: "instagram"
    },
    {
      name: "X (Twitter)",
      handle: "@IsmaGuimarais",
      url: "https://x.com/IsmaGuimarais",
      icon: <SiX />,
      className: "x"
    },
    {
      name: "TikTok",
      handle: "@ismaguimarais",
      url: "https://www.tiktok.com/@ismaguimarais",
      icon: <SiTiktok />,
      className: "tiktok"
    },
    {
      name: "Threads",
      handle: "@ismaguimarais",
      url: "https://www.threads.net/@ismaguimarais",
      icon: <SiThreads />,
      className: "threads"
    },
    {
      name: "Facebook",
      handle: "Ismael Guimarais",
      url: "https://www.facebook.com/ismaguimarais/",
      icon: <SiFacebook />,
      className: "facebook"
    }
  ];

  const musicPlatforms = [
    {
      name: "Spotify",
      url: "https://open.spotify.com/artist/5t7JJmMzqEp6j39T0tzsSV",
      icon: <SiSpotify />,
      className: "spotify-btn"
    },
    {
      name: "Apple Music",
      url: "https://music.apple.com/us/artist/ismael-guimarais/1764726835",
      icon: <SiApplemusic />,
      className: "apple-music-btn"
    },
    {
      name: "Amazon Music",
      url: "https://music.amazon.com/artists/B0DM4NY4VZ/ismael-guimarais",
      icon: <SiAmazonmusic />,
      className: "amazon-music-btn"
    },
    {
      name: "YouTube Music",
      url: "https://music.youtube.com/channel/UCOxCzNODE1o-tqtZRKYYa6g",
      icon: <SiYoutubemusic />,
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
          <picture>
            <source srcSet="/ismael-professional.webp" type="image/webp" />
            <img
              src="/ismael-professional.jpg"
              alt="Ismael Guimarais"
              className="conecta-profile-image"
              width="150"
              height="150"
              loading="eager"
            />
          </picture>
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
            <Mail size={20} />
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

        {/* Donation Section */}
        <div className="donation-section" data-reveal>
          <h3 className="donation-section__title">Apoya mi trabajo</h3>
          <p className="donation-section__description">
            Todo mi contenido es gratuito. Si te aporta valor, considera apoyarme con un pequeño gesto.
          </p>
          <a
            href="https://www.paypal.com/paypalme/miguelitoism"
            target="_blank"
            rel="noopener noreferrer"
            className="donation-badge donation-badge--paypal"
            data-analytics="donation_conecta"
            title="Apoyar mi trabajo con PayPal"
          >
            <span className="donation-badge__emoji">❤️</span>
            <span className="donation-badge__text">Donar via PayPal</span>
          </a>
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
