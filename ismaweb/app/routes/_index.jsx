import { json } from "@remix-run/node";
import { useEffect, useState } from "react";
import { useLoaderData, Form, useNavigation } from "@remix-run/react";
import SocialLinks from "../components/SocialLinks.jsx";
import ThemeToggle from "../components/ThemeToggle.jsx";

// Nota: estas constantes se usan en el cliente también; no deben leer process.env
const DEFAULT_SITE = "https://ismaelguimarais.com";
const DEFAULT_OG_IMAGE = `${DEFAULT_SITE}/og-default.jpg`;

const NAV_LINKS = [
  { label: "Inicio", href: "/" },
  { label: "Sobre mí", href: "/sobre" },
  { label: "Música", href: "/music" },
  { label: "Videos", href: "https://www.youtube.com/@IsmaelGuimarais", external: true },
  { label: "Newsletter", href: "#newsletter" }
];

const STATS = [
  { value: "4.6K+", label: "Suscriptores" },
  { value: "167", label: "Videos" },
  { value: "50K+", label: "Horas vistas" },
  { value: "1", label: "Misión clara" }
];

const FEATURED_ITEMS = [
  {
    badge: "Más visto",
    title: "¿Por qué buscamos significado?",
    meta: "15 min · 12K vistas · YouTube",
    href: "https://www.youtube.com/watch?v=ZyQjr1YL0zg",
    analytics: "featured_most_viewed"
  },
  {
    badge: "Nuevo",
    badgeTone: "new-badge",
    title: "Muy Civilizado",
    meta: "3:45 · Disponible en todas las plataformas",
    href: "/music",
    analytics: "featured_latest_song"
  },
  {
    badge: "Lectura",
    title: "La paradoja de la libertad moderna",
    meta: "5 min de lectura · Ensayo",
    href: "https://ismaelguimarais.com/newsletter",
    analytics: "featured_article"
  },
  {
    badge: "Serie",
    title: "Reacciones Canserbero",
    meta: "10 episodios · Conversaciones honestas",
    href: "https://www.youtube.com/playlist?list=PL",
    analytics: "featured_series"
  }
];

const VALUES = [
  "Curiosidad sobre certeza",
  "Diálogo sobre debate",
  "Comprensión sobre condena",
  "Autenticidad sobre perfección"
];

const FAQ_ITEMS = [
  { question: "¿Cada cuánto publicas?", answer: "Videos semanales, música mensual." },
  { question: "¿Dónde puedo ver todo?", answer: "YouTube es mi plataforma principal." },
  { question: "¿Cómo apoyo tu trabajo?", answer: "Suscríbete, comparte y comenta." }
];

export async function loader() {
  const YT_KEY = process.env.YOUTUBE_API_KEY;
  const YT_CHANNEL = process.env.YOUTUBE_CHANNEL_ID;
  const SPOTIFY_TRACK_ID = process.env.SPOTIFY_TRACK_ID || "";
  const site = process.env.PUBLIC_SITE_URL ?? DEFAULT_SITE;
  const ogImage = `${site}/og-default.jpg`;

  let latest = null;
  if (YT_KEY && YT_CHANNEL) {
    try {
      const searchUrl = new URL("https://www.googleapis.com/youtube/v3/search");
      searchUrl.searchParams.set("key", YT_KEY);
      searchUrl.searchParams.set("channelId", YT_CHANNEL);
      searchUrl.searchParams.set("maxResults", "1");
      searchUrl.searchParams.set("order", "date");
      searchUrl.searchParams.set("type", "video");
      const sres = await fetch(searchUrl, { headers: { Accept: "application/json" } });
      const sdata = await sres.json();
      const vid = sdata?.items?.[0]?.id?.videoId;
      if (vid) {
        const vurl = new URL("https://www.googleapis.com/youtube/v3/videos");
        vurl.searchParams.set("key", YT_KEY);
        vurl.searchParams.set("id", vid);
        vurl.searchParams.set("part", "snippet,statistics");
        const vres = await fetch(vurl);
        const vdata = await vres.json();
        const video = vdata?.items?.[0];
        if (video) {
          const views = Number(video.statistics?.viewCount || 0);
          const viewsFormatted = new Intl.NumberFormat('es-ES').format(views);
          latest = {
            id: vid,
            title: video.snippet?.title,
            views,
            viewsFormatted,
            thumbnail: video.snippet?.thumbnails?.high?.url,
            url: `https://www.youtube.com/watch?v=${vid}`
          };
        }
      }
    } catch (error) {
      console.warn("YouTube API error", error);
    }
  }

  return json(
    { site, ogImage, latestVideo: latest, spotifyTrackId: SPOTIFY_TRACK_ID },
    { headers: { "Cache-Control": "public, max-age=60" } }
  );
}

export const meta = ({ data, location }) => {
  const site = data?.site ?? DEFAULT_SITE;
  const ogImage = data?.ogImage ?? DEFAULT_OG_IMAGE;
  const pathname = (location && location.pathname) || "/";
  const search = (location && location.search) || "";
  const url = new URL(pathname + search, site).toString();
  const title = "Ismael Guimarais - Siente bien, piensa bien, vive bien";
  const description =
    "Exploro ideas complejas con videoensayos semanales y canciones mensuales. Sin respuestas fáciles, solo conversaciones que importan.";

  return [
    { title },
    { name: "description", content: description },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
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
        "jobTitle": "Analista cultural y músico",
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
        "publisher": { "@type": "Person", "name": "Ismael Guimarais" }
      }
    }
  ];
};

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);


  useEffect(() => {
    const revealables = Array.from(document.querySelectorAll('[data-reveal]'));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, idx) => {
          if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('revealed'), idx * 60);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -80px 0px' }
    );

    revealables.forEach((node) => {
      node.classList.add('reveal');
      observer.observe(node);
    });

    const handleClick = (event) => {
      const element = event.target.closest('[data-analytics]');
      if (element) {
        window.dataLayer?.push({ event: 'cta', id: element.getAttribute('data-analytics') });
      }
    };

    const handleMouseMove = (event) => {
      const card = event.target.closest('.card');
      if (card) {
        const rect = card.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * 100;
        const y = ((event.clientY - rect.top) / rect.height) * 100;
        card.style.setProperty('--mouse-x', `${x}%`);
        card.style.setProperty('--mouse-y', `${y}%`);
      }
    };

    document.addEventListener('click', handleClick);
    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      observer.disconnect();
      document.removeEventListener('click', handleClick);
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <main>
      <ThemeToggle />

      <nav className={`mobile-nav ${menuOpen ? 'mobile-nav--open' : ''}`}>
        <button
          className="mobile-nav__toggle"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="Abrir menú"
        >
          <span />
          <span />
          <span />
        </button>
        {menuOpen && (
          <div className="mobile-nav__menu">
            {NAV_LINKS.map(({ label, href, external }) => (
              <a
                key={label}
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </a>
            ))}
          </div>
        )}
      </nav>

      <section className="hero" aria-labelledby="hero-heading">
        <video
          className="hero__video"
          aria-hidden
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/og-default.jpg"
        >
          <source src="/hero-background.mp4" type="video/mp4" />
        </video>
        <div className="hero__overlay" aria-hidden />
        <div className="hero__content">
          <h1 id="hero-heading" className="hero__title">Siente bien, piensa bien, vive bien</h1>
          <p className="hero__subtitle">Analista cultural · Músico · Pensador</p>
          <div className="hero__cta-row">
            <a className="button button--primary" href="#contenido" data-analytics="cta_hero_explorar">
              Explorar contenido
            </a>
            <a className="button button--secondary" href="/sobre" data-analytics="cta_hero_sobre">
              Sobre mí
            </a>
          </div>
        </div>
        <div className="scroll-indicator" aria-hidden />
      </section>

      <section className="section" id="intro" data-reveal>
        <div className="card split">
          <div>
            <h2>Hola, soy Ismael</h2>
            <p>
              Nací en Cuba y entendí pronto que la libertad de pensamiento no es un lujo, es un derecho. Hoy, desde México,
              combino análisis cultural con música para explorar qué nos hace humanos. Creo que la razón bien usada fortalece
              la fe y que podemos tener conversaciones profundas sin perder la esperanza.
            </p>
            <p>
              Mi trabajo conecta tres mundos: el rigor de un gestor de proyectos, la sensibilidad de un músico y la búsqueda
              honesta de alguien que ha vivido ambos lados de la historia.
            </p>
            <div className="stats" aria-label="Datos destacados de Ismael">
              {STATS.map((item) => (
                <div key={item.label} className="stat-card">
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <img src="/og-default.webp" alt="Retrato de Ismael Guimarais" className="intro-image" loading="lazy" />
          </div>
        </div>
      </section>

      <section className="section" id="contenido" data-reveal>
        <h2>Lo que hago</h2>
        <div className="three-col">
          <article className="card">
            <h3>Videoensayos</h3>
            <p>
              Ideas que importan, cada semana. Análisis cultural, filosofía práctica y fe pensada, sin sermones ni extremos.
            </p>
            <LatestVideo />
            <a
              className="link-arrow"
              href="https://www.youtube.com/@IsmaelGuimarais"
              target="_blank"
              rel="noopener noreferrer"
              data-analytics="cta_ver_videos"
            >
              Ver todos los videos
            </a>
          </article>

          <article className="card">
            <h3>Música</h3>
            <p>
              Canciones con sustancia, cada mes. Letras que piensan y melodías que conectan con algo más profundo.
            </p>
            <SpotifyEmbed />
            <a className="link-arrow" href="/music" data-analytics="cta_escuchar_mas">
              Escuchar más
            </a>
          </article>

          <article className="card" id="newsletter">
            <h3>Newsletter</h3>
            <p>
              Reflexiones que solo envío por correo. Sin spam, sin ventas agresivas; solo ideas que ayudan a pensar y sentir.
            </p>
            <NewsletterForm />
            <p className="newsletter-info">
              <span className="newsletter-count">500+</span> lectores activos · Un email semanal
            </p>
          </article>
        </div>
      </section>

      <section className="section featured-section" data-reveal>
        <h2>Contenido seleccionado</h2>
        <div className="grid-2x2">
          {FEATURED_ITEMS.map(({ badge, badgeTone, title, meta, href, analytics }) => {
            const className = ["card", "featured-card", badgeTone].filter(Boolean).join(" ");
            const badgeClass = ["featured-badge", badgeTone].filter(Boolean).join(" ");
            const isExternal = href.startsWith("http");
            return (
              <a
                key={title}
                className={className}
                href={href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                data-analytics={analytics}
              >
                <span className={badgeClass}>{badge}</span>
                <strong>{title}</strong>
                <div className="featured-meta">{meta}</div>
              </a>
            );
          })}
        </div>
      </section>

      <section className="section card" data-reveal>
        <p className="quote">“La razón bien usada lleva a la fe”</p>
        <p>
          No creo en respuestas fáciles ni en verdades impuestas. Creo en la búsqueda honesta, en cuestionar con respeto y
          en construir puentes donde otros levantan muros. Este espacio es para quienes desean profundidad sin perder la
          esperanza.
        </p>
        <ul className="list">
          {VALUES.map((value) => (
            <li key={value}>{value}</li>
          ))}
        </ul>
      </section>

      <section className="section card" data-reveal>
        <h2>Únete a la conversación</h2>
        <SocialLinks />
      </section>

      <section className="section card split" data-reveal>
        <div>
          <h2>Trabajemos juntos</h2>
          <p>
            Abierto a podcasts, entrevistas, colaboraciones creativas, charlas y proyectos con propósito. Si buscas una voz
            que conecte fe, cultura y música, hablemos.
          </p>
          <a className="button button--primary" href="mailto:hola@ismaelguimarais.com" data-analytics="cta_contacto">
            Enviar propuesta
          </a>
        </div>
        <div>
          <h3>FAQ rápido</h3>
          <ul className="list">
            {FAQ_ITEMS.map((item) => (
              <li key={item.question}>
                <strong>{item.question}</strong> {item.answer}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" aria-label="Redes y footer">
        <footer>
          &copy; {new Date().getFullYear()} Ismael Guimarais · Cuba 🇨🇺 → México 🇲🇽
        </footer>
      </section>
    </main>
  );
}

function LatestVideo() {
  const data = useLoaderData();
  const video = data.latestVideo;
  if (!video) {
    return <div className="video-placeholder">Conecta la YouTube API para mostrar tu último video aquí.</div>;
  }

  return (
    <a href={video.url} className="video-link" target="_blank" rel="noopener noreferrer" data-analytics="yt_latest">
      <img src={video.thumbnail} alt={video.title} className="video-thumb" loading="lazy" />
      <div className="video-info">
        <strong>{video.title}</strong>
        <small suppressHydrationWarning>{video.viewsFormatted} vistas</small>
      </div>
    </a>
  );
}

function SpotifyEmbed() {
  const { spotifyTrackId } = useLoaderData();
  if (!spotifyTrackId) {
    return <div className="spotify-placeholder">Configura SPOTIFY_TRACK_ID para mostrar el reproductor.</div>;
  }

  const src = `https://open.spotify.com/embed/track/${spotifyTrackId}?utm_source=generator&theme=0`;
  return (
    <iframe
      title="Reproductor de Spotify"
      className="spotify-embed"
      src={src}
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      loading="lazy"
    />
  );
}

function NewsletterForm() {
  const nav = useNavigation();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const busy = nav.state === "submitting";

  useEffect(() => {
    if (nav.state === "idle" && status === "submitting") {
      setStatus("success");
      setEmail("");
      setTimeout(() => setStatus(""), 5000);
    }
  }, [nav.state, status]);

  const handleSubmit = (event) => {
    const value = email.trim();
    if (!value || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value)) {
      event.preventDefault();
      setError("Por favor ingresa un correo válido");
      return;
    }
    setError("");
    setStatus("submitting");
  };

  return (
    <div>
      <Form method="post" action="/api/newsletter" onSubmit={handleSubmit} noValidate>
        <label htmlFor="email" className="visually-hidden">
          Tu correo electrónico
        </label>
        <div className="newsletter-form">
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="tu@email.com"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              setError("");
            }}
            className={`newsletter-input ${error ? "newsletter-input--error" : ""}`}
            aria-invalid={error ? "true" : "false"}
            aria-describedby={error ? "newsletter-error" : undefined}
            disabled={busy}
          />
          <button className="button button--primary newsletter-button" type="submit" disabled={busy} aria-busy={busy}>
            {busy ? (
              <>
                <span className="spinner" aria-hidden="true"></span>
                Enviando…
              </>
            ) : (
              "Unirme"
            )}
          </button>
        </div>
      </Form>
      {error ? (
        <p id="newsletter-error" className="newsletter-error" role="alert">
          {error}
        </p>
      ) : null}
      {status === "success" ? (
        <div className="success-message" role="status" aria-live="polite">
          ¡Gracias! Revisa tu bandeja para confirmar la suscripción.
        </div>
      ) : null}
    </div>
  );
}
