import { json } from "@remix-run/node";
import { useEffect, useState } from "react";
import { useLoaderData, Form, useNavigation } from "@remix-run/react";
import ContentGrid from "../components/ContentGrid.jsx";

// Nota: estas constantes se usan en el cliente también; no deben leer process.env
const DEFAULT_SITE = "https://ismaelguimarais.com";
const DEFAULT_OG_IMAGE = `${DEFAULT_SITE}/og-default.jpg`;

const NUMBER_FORMATTER = new Intl.NumberFormat("es-ES");

const NAV_LINKS = [
  { label: "Inicio", href: "/" },
  { label: "Sobre mí", href: "/sobre" },
  { label: "Música", href: "/music" },
  { label: "Videos", href: "https://www.youtube.com/@IsmaelGuimarais", external: true },
  { label: "Newsletter", href: "#newsletter" }
];

const FEATURED_ITEMS = [
  {
    badge: "Nuevo Single",
    badgeTone: "new-badge",
    title: "La Soledad",
    meta: "Disponible en todas las plataformas",
    href: "/la-soledad",
    thumbnail: "/la-soledad-cover.jpg",
    analytics: "featured_la_soledad"
  },
  {
    badge: "Blog",
    title: "El Mensaje de Jesús",
    meta: "Cómo Juan resumió tres años de ministerio en una sola frase",
    href: "/blog",
    thumbnail: "/blog-mensaje-jesus.png",
    analytics: "featured_blog"
  },
  {
    badge: "Serie",
    title: "Reacciones Canserbero",
    meta: "Análisis sin poses",
    href: "https://youtube.com/playlist?list=PLskI-KkSm7QfKZQgU4ZBiS0eR5WQM-QCf",
    thumbnail: "https://i.ytimg.com/vi/fJH2MpPkGr0/maxresdefault.jpg",
    analytics: "featured_series"
  },
  {
    badge: "Comunidad",
    badgeTone: "community-badge",
    title: "Únete al grupo privado",
    meta: "Conviértete en miembro de YouTube o Patreon y accede al grupo exclusivo de WhatsApp",
    href: "https://www.youtube.com/channel/UCX-0vZliN8aUFGyr_WGxndA/join",
    analytics: "featured_membership",
    icon: "whatsapp"
  }
];

const VALUES = [
  "Curiosidad sobre certeza",
  "Diálogo sobre debate",
  "Comprensión sobre condena",
  "Autenticidad sobre perfección"
];

const FAQ_ITEMS = [
  { question: "¿Cada cuánto publicas?", answer: "Videos semanales, música mensual, newsletter semanal." },
  { question: "¿Dónde puedo ver todo?", answer: "YouTube para videos, Spotify para música." },
  { question: "¿Cómo apoyo tu trabajo?", answer: "Comparte lo que resuene contigo. Las mejores ideas merecen ser discutidas." }
];

export async function loader() {
  const YT_KEY = process.env.YOUTUBE_API_KEY;
  const YT_CHANNEL = process.env.YOUTUBE_CHANNEL_ID;
  const site = process.env.PUBLIC_SITE_URL ?? DEFAULT_SITE;
  const ogImage = `${site}/og-default.jpg`;

  let latest = null;
  let channelStats = null;

  if (YT_KEY && YT_CHANNEL) {
    try {
      const channelUrl = new URL("https://www.googleapis.com/youtube/v3/channels");
      channelUrl.searchParams.set("key", YT_KEY);
      channelUrl.searchParams.set("id", YT_CHANNEL);
      channelUrl.searchParams.set("part", "statistics");
      const cres = await fetch(channelUrl, { headers: { Accept: "application/json" } });
      const cdata = await cres.json();
      const stats = cdata?.items?.[0]?.statistics;
      if (stats) {
        channelStats = {
          subscriberCount: Number(stats.subscriberCount ?? 0),
          videoCount: Number(stats.videoCount ?? 0),
          viewCount: Number(stats.viewCount ?? 0)
        };
      }
    } catch (error) {
      console.warn("YouTube channel stats error", error);
    }

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
    { site, ogImage, latestVideo: latest, youtubeStats: channelStats },
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
          "https://www.tiktok.com/@ismaguimarais",
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
  const loaderData = useLoaderData();
  const youtubeStats = loaderData.youtubeStats ?? null;
  const subscriberCount = youtubeStats?.subscriberCount ?? 0;
  const videoCount = youtubeStats?.videoCount ?? 0;
  const viewCount = youtubeStats?.viewCount ?? 0;
  const formattedSubscriberCount = subscriberCount ? `${NUMBER_FORMATTER.format(subscriberCount)}+` : "—";
  const formattedVideoCount = videoCount ? NUMBER_FORMATTER.format(videoCount) : "—";
  const hoursShared = viewCount ? Math.floor(viewCount / 1000) : 0;
  const formattedHoursShared = hoursShared ? `${hoursShared}K+` : "—";
  const STATS = [
    { value: formattedSubscriberCount, label: "Personas en esta conversación" },
    { value: formattedVideoCount, label: "Videos publicados" },
    { value: formattedHoursShared, label: "Horas compartidas" },
    { value: "100%", label: "Independiente" }
  ];



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
          <h1 id="hero-heading" className="hero__title">
            Contenido gratuito para pensar mejor
          </h1>
          <p className="hero__subtitle">
            Videoensayos, música y reflexiones. Sígueme en redes y únete a la conversación.
          </p>

          <div className="hero__cta-group">
            <a
              className="button button--primary button--large"
              href="https://youtube.com/@IsmaelGuimarais"
              target="_blank"
              rel="noopener noreferrer"
              data-analytics="cta_hero_youtube"
            >
              <svg style={{ width: '24px', height: '24px', marginRight: '8px' }} viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              Suscríbete en YouTube
            </a>
            <a
              className="button button--secondary button--large"
              href="#content-grid"
              data-analytics="cta_hero_explorar"
            >
              Explorar contenido
            </a>
          </div>

          <div className="hero__stats-compact">
            <div className="stat-item-inline">
              <strong>{formattedSubscriberCount}</strong>
              <span>suscriptores</span>
            </div>
            <div className="stat-item-inline">
              <strong>{formattedVideoCount}</strong>
              <span>videos</span>
            </div>
            <div className="stat-item-inline">
              <strong>100%</strong>
              <span>independiente</span>
            </div>
          </div>
        </div>
        <div className="scroll-indicator" aria-hidden />
      </section>

      {/* Nuevo grid visual de contenido - prioridad #1 */}
      <div id="content-grid">
        <ContentGrid
          latestVideo={loaderData.latestVideo}
          youtubeStats={loaderData.youtubeStats}
        />
      </div>

      <section className="section" id="intro" data-reveal>
        <div className="card split">
          <div>
            <h2>Hola, soy Ismael</h2>
            <p>
              Nací en Cuba y entendí pronto que la libertad de pensamiento no es un lujo, es un derecho. Hoy, desde México,
              combino análisis cultural con música para explorar qué nos hace humanos. Creo que la razón bien usada fortalece
              la fe y que podemos tener conversaciones profundas sin perder la esperanza.
            </p>
          </div>
          <div>
            <img src="/ismael-professional.jpg" alt="Retrato de Ismael Guimarais" className="intro-image" loading="lazy" />
          </div>
        </div>
      </section>

      <section className="section" id="contenido" data-reveal>
        <h2>Lo que hago</h2>
        <div className="three-col">
          <article className="card">
            <h3>Videoensayos</h3>
            <p>
              Análisis semanales sobre transformaciones políticas, culturales y espirituales. Conecto los puntos entre economía y ética, política y principios. Sin filtros partidistas, solo búsqueda honesta de la verdad.
            </p>
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
              Canciones que nacen cuando el análisis no basta. Cada mes, una composición original sobre la búsqueda de propósito en tiempos de cambio.
            </p>
            <div className="music-platforms-compact">
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--gray-600)', marginBottom: 'var(--space-3)' }}>
                Disponible en:
              </p>
              <div className="platform-icons-row">
                <a href="https://open.spotify.com/intl-es/artist/6FBiAmYUgClucZddGctkwd" target="_blank" rel="noopener noreferrer" title="Spotify" className="platform-icon-link spotify">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                  </svg>
                </a>
                <a href="https://music.apple.com/us/album/amor-princesa/1673165177?i=1673165178" target="_blank" rel="noopener noreferrer" title="Apple Music" className="platform-icon-link apple">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.997 6.124c0-.738-.065-1.47-.24-2.19-.317-1.31-1.062-2.31-2.18-3.043C21.003.517 20.373.285 19.7.164c-.517-.093-1.038-.135-1.564-.15-.04-.003-.083-.01-.124-.013H5.988c-.152.01-.303.017-.455.026C4.786.07 4.043.15 3.34.428 2.004.958 1.04 1.88.475 3.208c-.192.448-.292.925-.363 1.408-.056.392-.088.785-.1 1.18 0 .032-.007.062-.01.093v12.223c.01.14.017.283.027.424.05.815.154 1.624.497 2.373.65 1.42 1.738 2.353 3.234 2.801.42.127.856.187 1.293.228.555.055 1.114.091 1.673.1h11.717c.2-.007.4-.01.597-.02.772-.035 1.537-.106 2.265-.34 1.452-.468 2.52-1.4 3.118-2.854.192-.469.286-.96.335-1.457.048-.5.077-1.003.077-1.507.002-4.168 0-8.336 0-12.504zm-4.653 6.457l-.003 4.29c0 1.474-1.057 2.642-2.495 2.76-1.017.083-1.956-.328-2.37-1.19-.374-.78-.148-1.507.528-2.095.497-.432 1.097-.635 1.738-.69.15-.013.302-.015.453-.013.208 0 .414.01.623.026v-3.912l-5.968 1.222v5.207c0 1.483-1.053 2.655-2.5 2.776-1.02.086-1.965-.324-2.382-1.187-.374-.774-.148-1.498.526-2.083.495-.43 1.093-.632 1.732-.687.15-.013.3-.015.45-.013.21 0 .418.01.628.026v-7.108l10.04-2.053v4.524z"/>
                  </svg>
                </a>
                <a href="https://music.youtube.com/channel/UCX-0vZliN8aUFGyr_WGxndA" target="_blank" rel="noopener noreferrer" title="YouTube Music" className="platform-icon-link youtube">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.376 0 0 5.376 0 12s5.376 12 12 12 12-5.376 12-12S18.624 0 12 0zm0 19.104c-3.924 0-7.104-3.18-7.104-7.104S8.076 4.896 12 4.896s7.104 3.18 7.104 7.104-3.18 7.104-7.104 7.104zm0-13.332c-3.432 0-6.228 2.796-6.228 6.228S8.568 18.228 12 18.228s6.228-2.796 6.228-6.228S15.432 5.772 12 5.772zM9.684 15.54V8.46L15.816 12l-6.132 3.54z"/>
                  </svg>
                </a>
                <a href="https://www.deezer.com/search/Ismael%20Guimarais" target="_blank" rel="noopener noreferrer" title="Deezer" className="platform-icon-link deezer">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.81 1.234h5.19v2.994h-5.19V1.234zm0 4.29h5.19v2.994h-5.19V5.524zm0 4.288h5.19v2.996h-5.19V9.812zm0 4.29h5.19v2.995h-5.19v-2.996zm0 4.288h5.19v2.996h-5.19v-2.996zM12.405 9.812h5.19v2.996h-5.19V9.812zm0 4.29h5.19v2.995h-5.19v-2.996zm0 4.288h5.19v2.996h-5.19v-2.996zM6 14.1h5.19v2.995H6V14.1zm0 4.288h5.19v2.996H6v-2.996zM0 18.39h5.19v2.996H0v-2.996z"/>
                  </svg>
                </a>
                <a href="https://music.amazon.com/search/Ismael%20Guimarais" target="_blank" rel="noopener noreferrer" title="Amazon Music" className="platform-icon-link amazon">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3.333 14.235c0-3.897 1.955-6.948 5.53-6.948 2.289 0 3.491 1.357 3.491 1.357V1.191h3.874v15.52c0 .464.189.68.681.68h.244v3.298c-.464.042-.927.085-1.347.127-1.37.127-2.027-.34-2.448-1.399 0 0-1.283 1.655-4.226 1.655C5.415 21.072 3.333 18.9 3.333 14.234zm8.979-.042V11.32c0-.636-.464-1.103-1.103-1.103-1.582 0-2.575 1.442-2.575 4.06 0 2.703.993 4.06 2.575 4.06 1.158 0 1.103-1.358 1.103-1.91v-2.233zm9.282 4.86c-.888 1.358-2.065 2.234-3.787 2.234-2.277 0-3.32-1.442-3.32-3.617V7.356h3.916v9.915c0 .764.255 1.018.764 1.018.721 0 1.485-.721 1.485-1.23V7.356h3.916v10.102c0 .467.127.683.676.683h.296v3.319c-.508.04-.97.085-1.4.127-.845.08-1.59-.178-2.107-1.23l-.439-.628z"/>
                  </svg>
                </a>
              </div>
            </div>
            <a className="link-arrow" href="/music" data-analytics="cta_escuchar_mas">
              Escuchar en todas las plataformas
            </a>
          </article>

          <article className="card" id="newsletter">
            <h3>Newsletter</h3>
            <p>
              Reflexiones directas cada semana. Para más de 500 lectores que prefieren pensar por sí mismos. Sin ventas, sin spam. Solo ideas que importan.
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
          {FEATURED_ITEMS.map(({ badge, badgeTone, title, meta, href, analytics, thumbnail, icon }) => {
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
                {thumbnail && (
                  <div className="featured-thumbnail">
                    <img src={thumbnail} alt={title} loading="lazy" />
                  </div>
                )}
                <div className="featured-content">
                  <span className={badgeClass}>{badge}</span>
                  <strong>{title}</strong>
                  <div className="featured-meta">
                    {icon === "whatsapp" && (
                      <svg style={{ width: '18px', height: '18px', marginRight: '6px', verticalAlign: 'middle' }} viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                      </svg>
                    )}
                    {meta}
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </section>

      <section className="section" aria-label="Redes y footer">
        <footer>
          <p>"El camino angosto sigue siendo el correcto."<br />— Ismael Guimarais</p>
          <p>&copy; {new Date().getFullYear()} Ismael Guimarais · Cuba 🇨🇺 → México 🇲🇽</p>
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
