import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { RemixServer, Meta, Links, Outlet, ScrollRestoration, Scripts, useRouteError, isRouteErrorResponse, useLoaderData, useNavigation, Form } from "@remix-run/react";
import { isbot } from "isbot";
import { PassThrough } from "node:stream";
import { renderToPipeableStream } from "react-dom/server";
import { json } from "@remix-run/node";
import { useState, useEffect } from "react";
function handleRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let didError = false;
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(RemixServer, { context: remixContext, url: request.url }),
      {
        onAllReady() {
          const body = new PassThrough();
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(body, {
              headers: responseHeaders,
              status: didError ? 500 : responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          didError = true;
          console.error(error);
        }
      }
    );
    if (isbot(request.headers.get("user-agent"))) {
      setTimeout(abort, 1e4);
    } else {
      setTimeout(abort, 5e3);
    }
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest
}, Symbol.toStringTag, { value: "Module" }));
const globalStyles = "/assets/global-Byk0SHvW.css";
const links$1 = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Crimson+Text:ital,wght@0,400;0,600;1,400;1,600&family=Inter:wght@300;400;600;700;800&display=swap"
  },
  { rel: "stylesheet", href: globalStyles }
];
const meta$6 = () => [
  { charSet: "utf-8" },
  { name: "viewport", content: "width=device-width,initial-scale=1" }
];
function App() {
  return /* @__PURE__ */ jsxs("html", { lang: "es", children: [
    /* @__PURE__ */ jsxs("head", { children: [
      /* @__PURE__ */ jsx("meta", { charSet: "utf-8" }),
      /* @__PURE__ */ jsx(
        "script",
        {
          dangerouslySetInnerHTML: {
            __html: "(function(){try{var s=localStorage.getItem('theme');var m=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';var t=s||m;document.documentElement.dataset.theme=t;}catch(e){}})();"
          }
        }
      ),
      /* @__PURE__ */ jsx(Meta, {}),
      /* @__PURE__ */ jsx(Links, {})
    ] }),
    /* @__PURE__ */ jsxs("body", { children: [
      /* @__PURE__ */ jsx(Outlet, {}),
      /* @__PURE__ */ jsx(ScrollRestoration, {}),
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
function ErrorBoundary() {
  const error = useRouteError();
  let status = 500;
  let message = "Ha ocurrido un error inesperado.";
  if (isRouteErrorResponse(error)) {
    status = error.status;
    message = error.statusText;
  }
  return /* @__PURE__ */ jsxs("html", { lang: "es", children: [
    /* @__PURE__ */ jsxs("head", { children: [
      /* @__PURE__ */ jsx(Meta, {}),
      /* @__PURE__ */ jsx(Links, {})
    ] }),
    /* @__PURE__ */ jsxs("body", { className: "error", children: [
      /* @__PURE__ */ jsxs("main", { children: [
        /* @__PURE__ */ jsxs("h1", { children: [
          "Error ",
          status
        ] }),
        /* @__PURE__ */ jsx("p", { children: message })
      ] }),
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  default: App,
  links: links$1,
  meta: meta$6
}, Symbol.toStringTag, { value: "Module" }));
const SITE$2 = process.env.PUBLIC_SITE_URL ?? "https://ismaelguimarais.com";
const OG_IMAGE$2 = `${SITE$2}/og-default.jpg`;
const loader$8 = () => json({ site: SITE$2, ogImage: OG_IMAGE$2 });
const meta$5 = ({ data, location }) => {
  const site = (data == null ? void 0 : data.site) ?? SITE$2;
  const url = new URL(location.pathname + location.search, site).toString();
  const title = "Suscripción confirmada";
  const description = "Gracias por confirmar tu suscripción al newsletter de Ismael Guimarais.";
  const ogImage = (data == null ? void 0 : data.ogImage) ?? OG_IMAGE$2;
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
    { tagName: "link", rel: "canonical", href: url },
    {
      "script:ld+json": {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": title,
        "url": url,
        "description": description
      }
    }
  ];
};
function NewsletterConfirmacion() {
  return /* @__PURE__ */ jsxs("main", { className: "section card", children: [
    /* @__PURE__ */ jsx("h1", { children: "¡Bienvenido al círculo!" }),
    /* @__PURE__ */ jsx("p", { children: "Gracias por confirmar tu suscripción. Desde ahora recibirás adelantos, detrás de cámaras y apuntes que preparo exclusivamente para la comunidad del newsletter." }),
    /* @__PURE__ */ jsx("p", { children: "Añade mi correo a tu lista de contactos y revisa la carpeta de promociones para no perderte ninguna entrega." }),
    /* @__PURE__ */ jsx("a", { className: "button", href: "/", children: "Volver al inicio" })
  ] });
}
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: NewsletterConfirmacion,
  loader: loader$8,
  meta: meta$5
}, Symbol.toStringTag, { value: "Module" }));
const SITE$1 = process.env.PUBLIC_SITE_URL ?? "https://ismaelguimarais.com";
const OG_IMAGE$1 = `${SITE$1}/og-default.jpg`;
const loader$7 = () => json({ site: SITE$1, ogImage: OG_IMAGE$1 });
const meta$4 = ({ data, location }) => {
  const site = (data == null ? void 0 : data.site) ?? SITE$1;
  const url = new URL(location.pathname + location.search, site).toString();
  const title = "Gracias por suscribirte";
  const description = "Revisa tu correo para confirmar la suscripción al newsletter.";
  const ogImage = (data == null ? void 0 : data.ogImage) ?? OG_IMAGE$1;
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
    { tagName: "link", rel: "canonical", href: url },
    {
      "script:ld+json": {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": title,
        "url": url,
        "description": description
      }
    }
  ];
};
function NewsletterGracias() {
  return /* @__PURE__ */ jsxs("main", { className: "section card", children: [
    /* @__PURE__ */ jsx("h1", { children: "Confirma tu correo" }),
    /* @__PURE__ */ jsx("p", { children: "Te acabamos de enviar un mensaje con el enlace de confirmación. Haz clic para activar tu suscripción y recibir materiales exclusivos antes que nadie." }),
    /* @__PURE__ */ jsxs("div", { className: "links-grid", children: [
      /* @__PURE__ */ jsxs("a", { className: "social-link", href: "/newsletter/confirmacion", children: [
        /* @__PURE__ */ jsx("span", { children: "¿Ya confirmé?" }),
        /* @__PURE__ */ jsx("span", { children: "Continuar" })
      ] }),
      /* @__PURE__ */ jsxs("a", { className: "social-link", href: "/", children: [
        /* @__PURE__ */ jsx("span", { children: "Volver al inicio" }),
        /* @__PURE__ */ jsx("span", { children: "Explorar" })
      ] })
    ] })
  ] });
}
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: NewsletterGracias,
  loader: loader$7,
  meta: meta$4
}, Symbol.toStringTag, { value: "Module" }));
async function action({ request }) {
  const form = await request.formData();
  const email = String(form.get("email") || "").trim();
  if (!email) return json({ ok: false, error: "Email requerido" }, { status: 400 });
  const CK_KEY = process.env.CONVERTKIT_API_KEY;
  const CK_FORM = process.env.CONVERTKIT_FORM_ID;
  if (CK_KEY && CK_FORM) {
    try {
      const res = await fetch(`https://api.convertkit.com/v3/forms/${CK_FORM}/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ api_key: CK_KEY, email })
      });
      if (!res.ok) throw new Error(await res.text());
      return json({ ok: true, provider: "convertkit" });
    } catch (e) {
      return json({ ok: false, error: "Error en ConvertKit" }, { status: 502 });
    }
  }
  const MC_KEY = process.env.MAILCHIMP_API_KEY;
  const MC_LIST = process.env.MAILCHIMP_AUDIENCE_ID;
  if (MC_KEY && MC_LIST) {
    try {
      const [, dc] = MC_KEY.split("-");
      const url = `https://${dc}.api.mailchimp.com/3.0/lists/${MC_LIST}/members`;
      const res = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `apikey ${MC_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email_address: email, status: "pending" })
      });
      if (!res.ok) throw new Error(await res.text());
      return json({ ok: true, provider: "mailchimp" });
    } catch (e) {
      return json({ ok: false, error: "Error en Mailchimp" }, { status: 502 });
    }
  }
  console.log("Newsletter signup (no provider configured):", email);
  return json({ ok: true, provider: "none" });
}
function loader$6() {
  return json({ ok: true });
}
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action,
  loader: loader$6
}, Symbol.toStringTag, { value: "Module" }));
const routes$1 = [
  "/",
  "/sobre",
  "/music",
  "/newsletter/confirmacion",
  "/newsletter/gracias"
];
const loader$5 = () => {
  const host = process.env.PUBLIC_SITE_URL ?? "https://ismaelguimarais.com";
  const items = routes$1.map((path) => `<url><loc>${host}${path}</loc><changefreq>weekly</changefreq><priority>${path === "/" ? "1.0" : "0.8"}</priority></url>`).join("");
  const xml = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${items}</urlset>`;
  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=300"
    }
  });
};
const route4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  loader: loader$5
}, Symbol.toStringTag, { value: "Module" }));
const loader$4 = () => {
  const site = process.env.PUBLIC_SITE_URL ?? "https://ismaelguimarais.com";
  const body = `User-agent: *
Allow: /
Sitemap: ${site}/sitemap.xml
`;
  return new Response(body, {
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "public, max-age=300"
    }
  });
};
const route5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  loader: loader$4
}, Symbol.toStringTag, { value: "Module" }));
const links = [
  {
    id: "youtube",
    label: "YouTube",
    handle: "@IsmaelGuimarais",
    href: "https://www.youtube.com/@IsmaelGuimarais"
  },
  {
    id: "x",
    label: "X (Twitter)",
    handle: "@IsmaGuimarais",
    href: "https://x.com/IsmaGuimarais"
  },
  {
    id: "instagram",
    label: "Instagram",
    handle: "@ismaguimarais",
    href: "https://www.instagram.com/ismaguimarais/"
  },
  {
    id: "tiktok",
    label: "TikTok",
    handle: "@ismaelguimarais",
    href: "https://www.tiktok.com/@ismaelguimarais"
  },
  {
    id: "threads",
    label: "Threads",
    handle: "@ismaguimarais",
    href: "https://www.threads.net/@ismaguimarais"
  },
  {
    id: "facebook",
    label: "Facebook",
    handle: "IsmaGuimarais",
    href: "https://www.facebook.com/ismaguimarais"
  }
];
function SocialLinks() {
  return /* @__PURE__ */ jsx("div", { className: "links-grid", "aria-label": "Redes sociales de Ismael Guimarais", children: links.map((link) => /* @__PURE__ */ jsxs("a", { className: "social-link", href: link.href, target: "_blank", rel: "noopener noreferrer", children: [
    /* @__PURE__ */ jsx("span", { children: link.label }),
    /* @__PURE__ */ jsx("span", { children: link.handle })
  ] }, link.id)) });
}
function ThemeToggle({ className = "" }) {
  const [theme, setTheme] = useState("dark");
  useEffect(() => {
    const stored = (() => {
      try {
        return localStorage.getItem("theme");
      } catch {
        return null;
      }
    })();
    const prefersDark = typeof window !== "undefined" && window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)").matches : true;
    const initial = stored || (prefersDark ? "dark" : "light");
    document.documentElement.dataset.theme = initial;
    setTheme(initial);
  }, []);
  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
    }
    setTheme(next);
  };
  const isDark = theme === "dark";
  const icon = isDark ? "☀️" : "🌙";
  const label = isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro";
  return /* @__PURE__ */ jsx(
    "button",
    {
      type: "button",
      "aria-label": label,
      onClick: toggle,
      className: `theme-toggle ${className}`,
      children: icon
    }
  );
}
const DEFAULT_SITE$2 = "https://ismaelguimarais.com";
const DEFAULT_OG_IMAGE$2 = `${DEFAULT_SITE$2}/og-default.jpg`;
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
async function loader$3() {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i;
  const YT_KEY = process.env.YOUTUBE_API_KEY;
  const YT_CHANNEL = process.env.YOUTUBE_CHANNEL_ID;
  const SPOTIFY_TRACK_ID = process.env.SPOTIFY_TRACK_ID || "";
  const site = process.env.PUBLIC_SITE_URL ?? DEFAULT_SITE$2;
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
      const vid = (_c = (_b = (_a = sdata == null ? void 0 : sdata.items) == null ? void 0 : _a[0]) == null ? void 0 : _b.id) == null ? void 0 : _c.videoId;
      if (vid) {
        const vurl = new URL("https://www.googleapis.com/youtube/v3/videos");
        vurl.searchParams.set("key", YT_KEY);
        vurl.searchParams.set("id", vid);
        vurl.searchParams.set("part", "snippet,statistics");
        const vres = await fetch(vurl);
        const vdata = await vres.json();
        const video = (_d = vdata == null ? void 0 : vdata.items) == null ? void 0 : _d[0];
        if (video) {
          const views = Number(((_e = video.statistics) == null ? void 0 : _e.viewCount) || 0);
          const viewsFormatted = new Intl.NumberFormat("es-ES").format(views);
          latest = {
            id: vid,
            title: (_f = video.snippet) == null ? void 0 : _f.title,
            views,
            viewsFormatted,
            thumbnail: (_i = (_h = (_g = video.snippet) == null ? void 0 : _g.thumbnails) == null ? void 0 : _h.high) == null ? void 0 : _i.url,
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
const meta$3 = ({ data, location }) => {
  const site = (data == null ? void 0 : data.site) ?? DEFAULT_SITE$2;
  const ogImage = (data == null ? void 0 : data.ogImage) ?? DEFAULT_OG_IMAGE$2;
  const pathname = location && location.pathname || "/";
  const search = location && location.search || "";
  const url = new URL(pathname + search, site).toString();
  const title = "Ismael Guimarais - Siente bien, piensa bien, vive bien";
  const description = "Exploro ideas complejas con videoensayos semanales y canciones mensuales. Sin respuestas fáciles, solo conversaciones que importan.";
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
function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const revealables = Array.from(document.querySelectorAll("[data-reveal]"));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry2, idx) => {
          if (entry2.isIntersecting) {
            setTimeout(() => entry2.target.classList.add("revealed"), idx * 60);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -80px 0px" }
    );
    revealables.forEach((node) => {
      node.classList.add("reveal");
      observer.observe(node);
    });
    const handleClick = (event) => {
      var _a;
      const element = event.target.closest("[data-analytics]");
      if (element) {
        (_a = window.dataLayer) == null ? void 0 : _a.push({ event: "cta", id: element.getAttribute("data-analytics") });
      }
    };
    const handleMouseMove = (event) => {
      const card = event.target.closest(".card");
      if (card) {
        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width * 100;
        const y = (event.clientY - rect.top) / rect.height * 100;
        card.style.setProperty("--mouse-x", `${x}%`);
        card.style.setProperty("--mouse-y", `${y}%`);
      }
    };
    document.addEventListener("click", handleClick);
    document.addEventListener("mousemove", handleMouseMove);
    return () => {
      observer.disconnect();
      document.removeEventListener("click", handleClick);
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);
  return /* @__PURE__ */ jsxs("main", { children: [
    /* @__PURE__ */ jsx(ThemeToggle, {}),
    /* @__PURE__ */ jsxs("nav", { className: `mobile-nav ${menuOpen ? "mobile-nav--open" : ""}`, children: [
      /* @__PURE__ */ jsxs(
        "button",
        {
          className: "mobile-nav__toggle",
          onClick: () => setMenuOpen((open) => !open),
          "aria-label": "Abrir menú",
          children: [
            /* @__PURE__ */ jsx("span", {}),
            /* @__PURE__ */ jsx("span", {}),
            /* @__PURE__ */ jsx("span", {})
          ]
        }
      ),
      menuOpen && /* @__PURE__ */ jsx("div", { className: "mobile-nav__menu", children: NAV_LINKS.map(({ label, href, external }) => /* @__PURE__ */ jsx(
        "a",
        {
          href,
          target: external ? "_blank" : void 0,
          rel: external ? "noopener noreferrer" : void 0,
          onClick: () => setMenuOpen(false),
          children: label
        },
        label
      )) })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "hero", "aria-labelledby": "hero-heading", children: [
      /* @__PURE__ */ jsx(
        "video",
        {
          className: "hero__video",
          "aria-hidden": true,
          autoPlay: true,
          muted: true,
          loop: true,
          playsInline: true,
          preload: "metadata",
          poster: "/og-default.jpg",
          children: /* @__PURE__ */ jsx("source", { src: "/hero-background.mp4", type: "video/mp4" })
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "hero__overlay", "aria-hidden": true }),
      /* @__PURE__ */ jsxs("div", { className: "hero__content", children: [
        /* @__PURE__ */ jsx("h1", { id: "hero-heading", className: "hero__title", children: "Siente bien, piensa bien, vive bien" }),
        /* @__PURE__ */ jsx("p", { className: "hero__subtitle", children: "Analista cultural · Músico · Pensador" }),
        /* @__PURE__ */ jsxs("div", { className: "hero__cta-row", children: [
          /* @__PURE__ */ jsx("a", { className: "button button--primary", href: "#contenido", "data-analytics": "cta_hero_explorar", children: "Explorar contenido" }),
          /* @__PURE__ */ jsx("a", { className: "button button--secondary", href: "/sobre", "data-analytics": "cta_hero_sobre", children: "Sobre mí" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "scroll-indicator", "aria-hidden": true })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "section card split", id: "intro", "data-reveal": true, children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h2", { children: "Hola, soy Ismael" }),
        /* @__PURE__ */ jsx("p", { children: "Nací en Cuba y entendí pronto que la libertad de pensamiento no es un lujo, es un derecho. Hoy, desde México, combino análisis cultural con música para explorar qué nos hace humanos. Creo que la razón bien usada fortalece la fe y que podemos tener conversaciones profundas sin perder la esperanza." }),
        /* @__PURE__ */ jsx("p", { children: "Mi trabajo conecta tres mundos: el rigor de un gestor de proyectos, la sensibilidad de un músico y la búsqueda honesta de alguien que ha vivido ambos lados de la historia." }),
        /* @__PURE__ */ jsx("div", { className: "stats", "aria-label": "Datos destacados de Ismael", children: STATS.map((item) => /* @__PURE__ */ jsxs("div", { className: "stat-card", children: [
          /* @__PURE__ */ jsx("strong", { children: item.value }),
          /* @__PURE__ */ jsx("span", { children: item.label })
        ] }, item.label)) })
      ] }),
      /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("img", { src: "/og-default.webp", alt: "Retrato de Ismael Guimarais", className: "intro-image", loading: "lazy" }) })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "section", id: "contenido", "data-reveal": true, children: [
      /* @__PURE__ */ jsx("h2", { children: "Lo que hago" }),
      /* @__PURE__ */ jsxs("div", { className: "three-col", children: [
        /* @__PURE__ */ jsxs("article", { className: "card", children: [
          /* @__PURE__ */ jsx("h3", { children: "Videoensayos" }),
          /* @__PURE__ */ jsx("p", { children: "Ideas que importan, cada semana. Análisis cultural, filosofía práctica y fe pensada, sin sermones ni extremos." }),
          /* @__PURE__ */ jsx(LatestVideo, {}),
          /* @__PURE__ */ jsx(
            "a",
            {
              className: "link-arrow",
              href: "https://www.youtube.com/@IsmaelGuimarais",
              target: "_blank",
              rel: "noopener noreferrer",
              "data-analytics": "cta_ver_videos",
              children: "Ver todos los videos"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("article", { className: "card", children: [
          /* @__PURE__ */ jsx("h3", { children: "Música" }),
          /* @__PURE__ */ jsx("p", { children: "Canciones con sustancia, cada mes. Letras que piensan y melodías que conectan con algo más profundo." }),
          /* @__PURE__ */ jsx(SpotifyEmbed, {}),
          /* @__PURE__ */ jsx("a", { className: "link-arrow", href: "/music", "data-analytics": "cta_escuchar_mas", children: "Escuchar más" })
        ] }),
        /* @__PURE__ */ jsxs("article", { className: "card", id: "newsletter", children: [
          /* @__PURE__ */ jsx("h3", { children: "Newsletter" }),
          /* @__PURE__ */ jsx("p", { children: "Reflexiones que solo envío por correo. Sin spam, sin ventas agresivas; solo ideas que ayudan a pensar y sentir." }),
          /* @__PURE__ */ jsx(NewsletterForm, {}),
          /* @__PURE__ */ jsxs("p", { className: "newsletter-info", children: [
            /* @__PURE__ */ jsx("span", { className: "newsletter-count", children: "500+" }),
            " lectores activos · Un email semanal"
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "section featured-section", "data-reveal": true, children: [
      /* @__PURE__ */ jsx("h2", { children: "Contenido seleccionado" }),
      /* @__PURE__ */ jsx("div", { className: "grid-2x2", children: FEATURED_ITEMS.map(({ badge, badgeTone, title, meta: meta2, href, analytics }) => {
        const className = ["card", "featured-card", badgeTone].filter(Boolean).join(" ");
        const badgeClass = ["featured-badge", badgeTone].filter(Boolean).join(" ");
        const isExternal = href.startsWith("http");
        return /* @__PURE__ */ jsxs(
          "a",
          {
            className,
            href,
            target: isExternal ? "_blank" : void 0,
            rel: isExternal ? "noopener noreferrer" : void 0,
            "data-analytics": analytics,
            children: [
              /* @__PURE__ */ jsx("span", { className: badgeClass, children: badge }),
              /* @__PURE__ */ jsx("strong", { children: title }),
              /* @__PURE__ */ jsx("div", { className: "featured-meta", children: meta2 })
            ]
          },
          title
        );
      }) })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "section card", "data-reveal": true, children: [
      /* @__PURE__ */ jsx("p", { className: "quote", children: "“La razón bien usada lleva a la fe”" }),
      /* @__PURE__ */ jsx("p", { children: "No creo en respuestas fáciles ni en verdades impuestas. Creo en la búsqueda honesta, en cuestionar con respeto y en construir puentes donde otros levantan muros. Este espacio es para quienes desean profundidad sin perder la esperanza." }),
      /* @__PURE__ */ jsx("ul", { className: "list", children: VALUES.map((value) => /* @__PURE__ */ jsx("li", { children: value }, value)) })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "section card", "data-reveal": true, children: [
      /* @__PURE__ */ jsx("h2", { children: "Únete a la conversación" }),
      /* @__PURE__ */ jsx(SocialLinks, {})
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "section card split", "data-reveal": true, children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h2", { children: "Trabajemos juntos" }),
        /* @__PURE__ */ jsx("p", { children: "Abierto a podcasts, entrevistas, colaboraciones creativas, charlas y proyectos con propósito. Si buscas una voz que conecte fe, cultura y música, hablemos." }),
        /* @__PURE__ */ jsx("a", { className: "button button--primary", href: "mailto:hola@ismaelguimarais.com", "data-analytics": "cta_contacto", children: "Enviar propuesta" })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h3", { children: "FAQ rápido" }),
        /* @__PURE__ */ jsx("ul", { className: "list", children: FAQ_ITEMS.map((item) => /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: item.question }),
          " ",
          item.answer
        ] }, item.question)) })
      ] })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "section", "aria-label": "Redes y footer", children: /* @__PURE__ */ jsxs("footer", { children: [
      "© ",
      (/* @__PURE__ */ new Date()).getFullYear(),
      " Ismael Guimarais · Cuba 🇨🇺 → México 🇲🇽"
    ] }) })
  ] });
}
function LatestVideo() {
  const data = useLoaderData();
  const video = data.latestVideo;
  if (!video) {
    return /* @__PURE__ */ jsx("div", { className: "video-placeholder", children: "Conecta la YouTube API para mostrar tu último video aquí." });
  }
  return /* @__PURE__ */ jsxs("a", { href: video.url, className: "video-link", target: "_blank", rel: "noopener noreferrer", "data-analytics": "yt_latest", children: [
    /* @__PURE__ */ jsx("img", { src: video.thumbnail, alt: video.title, className: "video-thumb", loading: "lazy" }),
    /* @__PURE__ */ jsxs("div", { className: "video-info", children: [
      /* @__PURE__ */ jsx("strong", { children: video.title }),
      /* @__PURE__ */ jsxs("small", { suppressHydrationWarning: true, children: [
        video.viewsFormatted,
        " vistas"
      ] })
    ] })
  ] });
}
function SpotifyEmbed() {
  const { spotifyTrackId } = useLoaderData();
  if (!spotifyTrackId) {
    return /* @__PURE__ */ jsx("div", { className: "spotify-placeholder", children: "Configura SPOTIFY_TRACK_ID para mostrar el reproductor." });
  }
  const src = `https://open.spotify.com/embed/track/${spotifyTrackId}?utm_source=generator&theme=0`;
  return /* @__PURE__ */ jsx(
    "iframe",
    {
      title: "Reproductor de Spotify",
      className: "spotify-embed",
      src,
      allow: "autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture",
      loading: "lazy"
    }
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
      setTimeout(() => setStatus(""), 5e3);
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
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs(Form, { method: "post", action: "/api/newsletter", onSubmit: handleSubmit, noValidate: true, children: [
      /* @__PURE__ */ jsx("label", { htmlFor: "email", className: "visually-hidden", children: "Tu correo electrónico" }),
      /* @__PURE__ */ jsxs("div", { className: "newsletter-form", children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            id: "email",
            name: "email",
            type: "email",
            required: true,
            placeholder: "tu@email.com",
            value: email,
            onChange: (event) => {
              setEmail(event.target.value);
              setError("");
            },
            className: `newsletter-input ${error ? "newsletter-input--error" : ""}`,
            "aria-invalid": error ? "true" : "false",
            "aria-describedby": error ? "newsletter-error" : void 0,
            disabled: busy
          }
        ),
        /* @__PURE__ */ jsx("button", { className: "button button--primary newsletter-button", type: "submit", disabled: busy, "aria-busy": busy, children: busy ? /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx("span", { className: "spinner", "aria-hidden": "true" }),
          "Enviando…"
        ] }) : "Unirme" })
      ] })
    ] }),
    error ? /* @__PURE__ */ jsx("p", { id: "newsletter-error", className: "newsletter-error", role: "alert", children: error }) : null,
    status === "success" ? /* @__PURE__ */ jsx("div", { className: "success-message", role: "status", "aria-live": "polite", children: "¡Gracias! Revisa tu bandeja para confirmar la suscripción." }) : null
  ] });
}
const route6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Index,
  loader: loader$3,
  meta: meta$3
}, Symbol.toStringTag, { value: "Module" }));
const DEFAULT_SITE$1 = "https://ismaelguimarais.com";
const DEFAULT_OG_IMAGE$1 = `${DEFAULT_SITE$1}/og-default.jpg`;
const TRACK_URL = "https://youtu.be/eJ4tCKzUQ6I";
const loader$2 = () => {
  const site = process.env.PUBLIC_SITE_URL ?? DEFAULT_SITE$1;
  const ogImage = `${site}/og-default.jpg`;
  return json({ site, ogImage });
};
const meta$2 = ({ data, location }) => {
  const site = (data == null ? void 0 : data.site) ?? DEFAULT_SITE$1;
  const url = new URL(location.pathname + location.search, site).toString();
  const title = "Música y lanzamientos";
  const description = 'Escucha "Muy Civilizado" y descubre nuevas canciones y colaboraciones de Ismael Guimarais.';
  const ogImage = (data == null ? void 0 : data.ogImage) ?? DEFAULT_OG_IMAGE$1;
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
function Music() {
  return /* @__PURE__ */ jsxs("main", { className: "section card", children: [
    /* @__PURE__ */ jsx("h1", { children: "Música y lanzamientos" }),
    /* @__PURE__ */ jsx("p", { children: 'Cada canción es una crónica sobre cómo la razón y la fe caminan juntas. "Muy Civilizado" es el single más reciente; cuenta la historia de un buscador que necesita reconciliar su corazón con Dios.' }),
    /* @__PURE__ */ jsxs("div", { className: "links-grid", children: [
      /* @__PURE__ */ jsxs("a", { className: "social-link", href: "https://open.spotify.com/track/0iFchlTEV8u0LtcXb2aJjQ", target: "_blank", rel: "noopener noreferrer", children: [
        /* @__PURE__ */ jsx("span", { children: "Escuchar en Spotify" }),
        /* @__PURE__ */ jsx("span", { children: "stream" })
      ] }),
      /* @__PURE__ */ jsxs("a", { className: "social-link", href: "https://music.apple.com/us/album/amor-princesa/1673165177?i=1673165178", target: "_blank", rel: "noopener noreferrer", children: [
        /* @__PURE__ */ jsx("span", { children: "Escuchar en Apple Music" }),
        /* @__PURE__ */ jsx("span", { children: "single" })
      ] }),
      /* @__PURE__ */ jsxs("a", { className: "social-link", href: TRACK_URL, target: "_blank", rel: "noopener noreferrer", children: [
        /* @__PURE__ */ jsx("span", { children: "Ver videoclip" }),
        /* @__PURE__ */ jsx("span", { children: "YouTube" })
      ] })
    ] }),
    /* @__PURE__ */ jsx("p", { children: "Suscríbete al newsletter para recibir letras comentadas, partituras y sesiones acústicas antes del estreno público." }),
    /* @__PURE__ */ jsx("a", { className: "button", href: "/newsletter/confirmacion", children: "Quiero unirme al newsletter" })
  ] });
}
const route7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Music,
  loader: loader$2,
  meta: meta$2
}, Symbol.toStringTag, { value: "Module" }));
const DEFAULT_SITE = "https://ismaelguimarais.com";
const DEFAULT_OG_IMAGE = `${DEFAULT_SITE}/og-default.jpg`;
const loader$1 = () => {
  const site = process.env.PUBLIC_SITE_URL ?? DEFAULT_SITE;
  const ogImage = `${site}/og-default.jpg`;
  return json({ site, ogImage });
};
const meta$1 = ({ data, location }) => {
  const site = (data == null ? void 0 : data.site) ?? DEFAULT_SITE;
  const url = new URL(location.pathname + location.search, site).toString();
  const title = "Sobre Ismael Guimarais";
  const description = "Biografía, convicciones y recorrido artístico de Ismael Guimarais.";
  const ogImage = (data == null ? void 0 : data.ogImage) ?? DEFAULT_OG_IMAGE;
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
function Sobre() {
  return /* @__PURE__ */ jsxs("main", { className: "section card", children: [
    /* @__PURE__ */ jsx("h1", { children: "Sobre Ismael Guimarais" }),
    /* @__PURE__ */ jsx("p", { children: "Nací en Cuba y crecí entre acordes, lecturas y conversaciones sobre fe. Mis canciones mezclan pop alternativo con letras que invitan a pensar y sanar. He compartido escenarios en América Latina, colaborado con líderes comunitarios y facilitado espacios donde la duda se convierte en diálogo." }),
    /* @__PURE__ */ jsx("p", { children: "Además de la música, produzco newsletters y podcasts donde analizo cultura, biblia y sociedad desde una perspectiva honesta. Creo en la búsqueda intelectual como camino hacia la esperanza." }),
    /* @__PURE__ */ jsxs("ul", { className: "list", children: [
      /* @__PURE__ */ jsx("li", { children: "500K+ reproducciones en plataformas digitales." }),
      /* @__PURE__ */ jsx("li", { children: "Conciertos íntimos y encuentros formativos en Argentina, Chile, República Dominicana y Cuba." }),
      /* @__PURE__ */ jsx("li", { children: "Mentor de equipos creativos y líderes juveniles." })
    ] })
  ] });
}
const route8 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Sobre,
  loader: loader$1,
  meta: meta$1
}, Symbol.toStringTag, { value: "Module" }));
const SITE = process.env.PUBLIC_SITE_URL ?? "https://ismaelguimarais.com";
const OG_IMAGE = `${SITE}/og-default.jpg`;
const loader = () => json({ site: SITE, ogImage: OG_IMAGE });
const meta = ({ data, location }) => {
  const site = (data == null ? void 0 : data.site) ?? SITE;
  const url = new URL(location.pathname + location.search, site).toString();
  const title = "Página no encontrada";
  const description = "Lo sentimos, no encontramos el contenido que estás buscando.";
  const ogImage = (data == null ? void 0 : data.ogImage) ?? OG_IMAGE;
  return [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:url", content: url },
    { property: "og:image", content: ogImage },
    { property: "og:type", content: "website" },
    { tagName: "link", rel: "canonical", href: url }
  ];
};
function NotFound() {
  return /* @__PURE__ */ jsxs("main", { className: "section card", children: [
    /* @__PURE__ */ jsx("h1", { children: "Página no encontrada" }),
    /* @__PURE__ */ jsx("p", { children: "El enlace podría haber cambiado o quizá hay un error tipográfico. Regresa al inicio o visita las secciones principales." }),
    /* @__PURE__ */ jsxs("div", { className: "links-grid", children: [
      /* @__PURE__ */ jsxs("a", { className: "social-link", href: "/", children: [
        /* @__PURE__ */ jsx("span", { children: "Ir al inicio" }),
        /* @__PURE__ */ jsx("span", { children: "Inicio" })
      ] }),
      /* @__PURE__ */ jsxs("a", { className: "social-link", href: "/music", children: [
        /* @__PURE__ */ jsx("span", { children: "Explorar música" }),
        /* @__PURE__ */ jsx("span", { children: "Descubrir" })
      ] }),
      /* @__PURE__ */ jsxs("a", { className: "social-link", href: "/sobre", children: [
        /* @__PURE__ */ jsx("span", { children: "Conocer la historia" }),
        /* @__PURE__ */ jsx("span", { children: "Sobre mí" })
      ] })
    ] })
  ] });
}
const route9 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: NotFound,
  loader,
  meta
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-Dq2yLiQa.js", "imports": ["/assets/jsx-runtime-BlSqMCxk.js", "/assets/components-BjEdrlDl.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": true, "module": "/assets/root-sdCEG-C1.js", "imports": ["/assets/jsx-runtime-BlSqMCxk.js", "/assets/components-BjEdrlDl.js"], "css": [] }, "routes/newsletter.confirmacion": { "id": "routes/newsletter.confirmacion", "parentId": "root", "path": "newsletter/confirmacion", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/newsletter.confirmacion-CNjTt5r-.js", "imports": ["/assets/jsx-runtime-BlSqMCxk.js"], "css": [] }, "routes/newsletter.gracias": { "id": "routes/newsletter.gracias", "parentId": "root", "path": "newsletter/gracias", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/newsletter.gracias-C1wsR2Cu.js", "imports": ["/assets/jsx-runtime-BlSqMCxk.js"], "css": [] }, "routes/api.newsletter": { "id": "routes/api.newsletter", "parentId": "root", "path": "api/newsletter", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/api.newsletter-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/sitemap[.]xml": { "id": "routes/sitemap[.]xml", "parentId": "root", "path": "sitemap.xml", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/sitemap_._xml-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/robots[.]txt": { "id": "routes/robots[.]txt", "parentId": "root", "path": "robots.txt", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/robots_._txt-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/_index": { "id": "routes/_index", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/_index-CndEtlfx.js", "imports": ["/assets/jsx-runtime-BlSqMCxk.js", "/assets/components-BjEdrlDl.js"], "css": [] }, "routes/music": { "id": "routes/music", "parentId": "root", "path": "music", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/music-4F2h1DiA.js", "imports": ["/assets/jsx-runtime-BlSqMCxk.js"], "css": [] }, "routes/sobre": { "id": "routes/sobre", "parentId": "root", "path": "sobre", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/sobre-CoHsE7NU.js", "imports": ["/assets/jsx-runtime-BlSqMCxk.js"], "css": [] }, "routes/404": { "id": "routes/404", "parentId": "root", "path": "404", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/404-BsTbPS1E.js", "imports": ["/assets/jsx-runtime-BlSqMCxk.js"], "css": [] } }, "url": "/assets/manifest-29ca8746.js", "version": "29ca8746" };
const mode = "production";
const assetsBuildDirectory = "build\\client";
const basename = "/";
const future = { "v3_fetcherPersist": false, "v3_relativeSplatPath": false, "v3_throwAbortReason": false, "v3_routeConfig": false, "v3_singleFetch": false, "v3_lazyRouteDiscovery": false, "unstable_optimizeDeps": false };
const isSpaMode = false;
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/newsletter.confirmacion": {
    id: "routes/newsletter.confirmacion",
    parentId: "root",
    path: "newsletter/confirmacion",
    index: void 0,
    caseSensitive: void 0,
    module: route1
  },
  "routes/newsletter.gracias": {
    id: "routes/newsletter.gracias",
    parentId: "root",
    path: "newsletter/gracias",
    index: void 0,
    caseSensitive: void 0,
    module: route2
  },
  "routes/api.newsletter": {
    id: "routes/api.newsletter",
    parentId: "root",
    path: "api/newsletter",
    index: void 0,
    caseSensitive: void 0,
    module: route3
  },
  "routes/sitemap[.]xml": {
    id: "routes/sitemap[.]xml",
    parentId: "root",
    path: "sitemap.xml",
    index: void 0,
    caseSensitive: void 0,
    module: route4
  },
  "routes/robots[.]txt": {
    id: "routes/robots[.]txt",
    parentId: "root",
    path: "robots.txt",
    index: void 0,
    caseSensitive: void 0,
    module: route5
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route6
  },
  "routes/music": {
    id: "routes/music",
    parentId: "root",
    path: "music",
    index: void 0,
    caseSensitive: void 0,
    module: route7
  },
  "routes/sobre": {
    id: "routes/sobre",
    parentId: "root",
    path: "sobre",
    index: void 0,
    caseSensitive: void 0,
    module: route8
  },
  "routes/404": {
    id: "routes/404",
    parentId: "root",
    path: "404",
    index: void 0,
    caseSensitive: void 0,
    module: route9
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  mode,
  publicPath,
  routes
};
