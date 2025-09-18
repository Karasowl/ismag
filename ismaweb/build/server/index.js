import { jsx, jsxs } from "react/jsx-runtime";
import { RemixServer, Meta, Links, Outlet, ScrollRestoration, Scripts, useRouteError, isRouteErrorResponse } from "@remix-run/react";
import { Response as Response$1, json } from "@remix-run/node";
import isbot from "isbot";
import { renderToReadableStream } from "react-dom/server";
import { render, screen } from "@testing-library/react";
import { createRemixStub } from "@remix-run/testing";
import { describe, it, expect } from "vitest";
async function handleRequest(request, responseStatusCode, responseHeaders, remixContext) {
  const body = await renderToReadableStream(
    /* @__PURE__ */ jsx(RemixServer, { context: remixContext, url: request.url }),
    {
      signal: request.signal,
      onError(error) {
        console.error(error);
        responseStatusCode = 500;
      }
    }
  );
  if (isbot(request.headers.get("user-agent"))) {
    await body.allReady;
  }
  responseHeaders.set("Content-Type", "text/html");
  return new Response$1(body, {
    headers: responseHeaders,
    status: responseStatusCode
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest
}, Symbol.toStringTag, { value: "Module" }));
const globalStyles = "/assets/global-Sxjdx_E5.css";
const links$1 = () => [{ rel: "stylesheet", href: globalStyles }];
const meta$6 = () => [{ charSet: "utf-8" }, { name: "viewport", content: "width=device-width,initial-scale=1" }];
function App() {
  return /* @__PURE__ */ jsxs("html", { lang: "es", className: "theme", children: [
    /* @__PURE__ */ jsxs("head", { children: [
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
const SITE$5 = process.env.PUBLIC_SITE_URL ?? "https://ismaelguimarais.com";
const OG_IMAGE$5 = `${SITE$5}/og-default.jpg`;
const loader$7 = () => json({ site: SITE$5, ogImage: OG_IMAGE$5 });
const meta$5 = ({ data: data2, location: location2 }) => {
  const site = (data2 == null ? void 0 : data2.site) ?? SITE$5;
  const url = new URL(location2.pathname + location2.search, site).toString();
  const title = "Suscripción confirmada";
  const description = "Gracias por confirmar tu suscripción al newsletter de Ismael Guimarais.";
  const ogImage = (data2 == null ? void 0 : data2.ogImage) ?? OG_IMAGE$5;
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
  loader: loader$7,
  meta: meta$5
}, Symbol.toStringTag, { value: "Module" }));
const SITE$4 = process.env.PUBLIC_SITE_URL ?? "https://ismaelguimarais.com";
const OG_IMAGE$4 = `${SITE$4}/og-default.jpg`;
const loader$6 = () => json({ site: SITE$4, ogImage: OG_IMAGE$4 });
const meta$4 = ({ data: data2, location: location2 }) => {
  const site = (data2 == null ? void 0 : data2.site) ?? SITE$4;
  const url = new URL(location2.pathname + location2.search, site).toString();
  const title = "Gracias por suscribirte";
  const description = "Revisa tu correo para confirmar la suscripción al newsletter.";
  const ogImage = (data2 == null ? void 0 : data2.ogImage) ?? OG_IMAGE$4;
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
  loader: loader$6,
  meta: meta$4
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
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
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
const route4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  loader: loader$4
}, Symbol.toStringTag, { value: "Module" }));
function HeroVideo({
  title,
  subtitle,
  cta,
  ctaHref
}) {
  return /* @__PURE__ */ jsxs("section", { className: "hero", "aria-labelledby": "hero-heading", children: [
    /* @__PURE__ */ jsx(
      "video",
      {
        className: "hero__video",
        "aria-hidden": "true",
        autoPlay: true,
        muted: true,
        loop: true,
        playsInline: true,
        preload: "metadata",
        poster: "/og-default.jpg",
        children: /* @__PURE__ */ jsx("source", { src: "/hero-background.mp4", type: "video/mp4" })
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "hero__overlay", "aria-hidden": "true" }),
    /* @__PURE__ */ jsxs("div", { className: "hero__content", children: [
      /* @__PURE__ */ jsx("h1", { id: "hero-heading", className: "hero__title", children: title }),
      /* @__PURE__ */ jsx("p", { className: "hero__subtitle", children: subtitle }),
      cta && ctaHref ? /* @__PURE__ */ jsx("a", { className: "button", href: ctaHref, children: cta }) : null
    ] })
  ] });
}
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
const SITE$3 = process.env.PUBLIC_SITE_URL ?? "https://ismaelguimarais.com";
const OG_IMAGE$3 = `${SITE$3}/og-default.jpg`;
const loader$3 = () => {
  return json({ site: SITE$3, ogImage: OG_IMAGE$3 });
};
const meta$3 = ({ data: data2, location: location2 }) => {
  const site = (data2 == null ? void 0 : data2.site) ?? SITE$3;
  const ogImage = (data2 == null ? void 0 : data2.ogImage) ?? OG_IMAGE$3;
  const url = new URL(location2.pathname + location2.search, site).toString();
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
function Index() {
  return /* @__PURE__ */ jsxs("main", { children: [
    /* @__PURE__ */ jsx(
      HeroVideo,
      {
        title: "A veces canto, siempre analizo.",
        subtitle: "La razón bien usada lleva a la fe.",
        cta: "Escucha la última canción",
        ctaHref: "/music"
      }
    ),
    /* @__PURE__ */ jsxs("section", { className: "section card", children: [
      /* @__PURE__ */ jsx("h2", { children: "Piensa bien, siente bien, vive bien" }),
      /* @__PURE__ */ jsx("p", { children: "Soy Ismael Guimarais, cantautor y narrador de historias. Desde Cuba hasta el Cono Sur comparto canciones, ensayos y conversaciones que conectan la razón con la espiritualidad. Este sitio reúne mis lanzamientos, newsletters y proyectos especiales." })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "section card", children: [
      /* @__PURE__ */ jsx("h2", { children: "Encuéntrame en redes" }),
      /* @__PURE__ */ jsx("p", { children: "Únete a la comunidad para recibir adelantos, streamings y debates en vivo." }),
      /* @__PURE__ */ jsx(SocialLinks, {})
    ] }),
    /* @__PURE__ */ jsxs("footer", { children: [
      "© ",
      (/* @__PURE__ */ new Date()).getFullYear(),
      " Ismael Guimarais. Todos los derechos reservados."
    ] })
  ] });
}
const route7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Index,
  loader: loader$3,
  meta: meta$3
}, Symbol.toStringTag, { value: "Module" }));
describe("render de Home", () => {
  it("muestra el claim principal", () => {
    const App2 = createRemixStub([
      {
        path: "/",
        Component: Index
      }
    ]);
    render(/* @__PURE__ */ jsx(App2, {}));
    expect(
      screen.getByRole("heading", { name: /A veces canto, siempre analizo\./i })
    ).toBeInTheDocument();
  });
});
const route5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null
}, Symbol.toStringTag, { value: "Module" }));
const data = {
  site: "https://ismaelguimarais.com",
  ogImage: "https://ismaelguimarais.com/og-default.jpg"
};
const location = { pathname: "/", search: "" };
describe("meta de la home", () => {
  it("incluye titulo, description, canonical y JSON-LD", () => {
    const tags = meta$3({ data, location });
    const hasTitle = tags.some((tag) => {
      var _a;
      return (_a = tag == null ? void 0 : tag.title) == null ? void 0 : _a.includes("Ismael Guimarais");
    });
    const hasDescription = tags.some((tag) => (tag == null ? void 0 : tag.name) === "description");
    const hasCanonical = tags.some((tag) => (tag == null ? void 0 : tag.tagName) === "link" && tag.rel === "canonical");
    const hasJsonLd = tags.filter((tag) => tag["script:ld+json"]).length === 2;
    expect(hasTitle).toBe(true);
    expect(hasDescription).toBe(true);
    expect(hasCanonical).toBe(true);
    expect(hasJsonLd).toBe(true);
  });
});
const route6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null
}, Symbol.toStringTag, { value: "Module" }));
const SITE$2 = process.env.PUBLIC_SITE_URL ?? "https://ismaelguimarais.com";
const OG_IMAGE$2 = `${SITE$2}/og-default.jpg`;
const TRACK_URL = "https://youtu.be/eJ4tCKzUQ6I";
const loader$2 = () => json({ site: SITE$2, ogImage: OG_IMAGE$2 });
const meta$2 = ({ data: data2, location: location2 }) => {
  const site = (data2 == null ? void 0 : data2.site) ?? SITE$2;
  const url = new URL(location2.pathname + location2.search, site).toString();
  const title = "Música y lanzamientos";
  const description = 'Escucha "Muy Civilizado" y descubre nuevas canciones y colaboraciones de Ismael Guimarais.';
  const ogImage = (data2 == null ? void 0 : data2.ogImage) ?? OG_IMAGE$2;
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
        "inAlbum": {
          "@type": "MusicAlbum",
          "name": "Muy Civilizado"
        },
        "byArtist": {
          "@type": "Person",
          "name": "Ismael Guimarais"
        },
        "offers": {
          "@type": "Offer",
          "url": TRACK_URL,
          "price": "0",
          "priceCurrency": "USD"
        }
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
const route8 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Music,
  loader: loader$2,
  meta: meta$2
}, Symbol.toStringTag, { value: "Module" }));
const SITE$1 = process.env.PUBLIC_SITE_URL ?? "https://ismaelguimarais.com";
const OG_IMAGE$1 = `${SITE$1}/og-default.jpg`;
const loader$1 = () => json({ site: SITE$1, ogImage: OG_IMAGE$1 });
const meta$1 = ({ data: data2, location: location2 }) => {
  const site = (data2 == null ? void 0 : data2.site) ?? SITE$1;
  const url = new URL(location2.pathname + location2.search, site).toString();
  const title = "Sobre Ismael Guimarais";
  const description = "Biografía, convicciones y recorrido artístico de Ismael Guimarais.";
  const ogImage = (data2 == null ? void 0 : data2.ogImage) ?? OG_IMAGE$1;
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
const route9 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Sobre,
  loader: loader$1,
  meta: meta$1
}, Symbol.toStringTag, { value: "Module" }));
const SITE = process.env.PUBLIC_SITE_URL ?? "https://ismaelguimarais.com";
const OG_IMAGE = `${SITE}/og-default.jpg`;
const loader = () => json({ site: SITE, ogImage: OG_IMAGE });
const meta = ({ data: data2, location: location2 }) => {
  const site = (data2 == null ? void 0 : data2.site) ?? SITE;
  const url = new URL(location2.pathname + location2.search, site).toString();
  const title = "Página no encontrada";
  const description = "Lo sentimos, no encontramos el contenido que estás buscando.";
  const ogImage = (data2 == null ? void 0 : data2.ogImage) ?? OG_IMAGE;
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
const route10 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: NotFound,
  loader,
  meta
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-i2JOf_Kf.js", "imports": ["/assets/jsx-runtime-D58fAJBj.js", "/assets/client-BEbPanTx.js", "/assets/components-DOmHNxYD.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": true, "module": "/assets/root-CNciC-86.js", "imports": ["/assets/jsx-runtime-D58fAJBj.js", "/assets/client-BEbPanTx.js", "/assets/components-DOmHNxYD.js"], "css": [] }, "routes/newsletter.confirmacion": { "id": "routes/newsletter.confirmacion", "parentId": "root", "path": "newsletter/confirmacion", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/newsletter.confirmacion-BXVKVk2a.js", "imports": ["/assets/jsx-runtime-D58fAJBj.js"], "css": [] }, "routes/newsletter.gracias": { "id": "routes/newsletter.gracias", "parentId": "root", "path": "newsletter/gracias", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/newsletter.gracias-BpU0SpIv.js", "imports": ["/assets/jsx-runtime-D58fAJBj.js"], "css": [] }, "routes/sitemap[.]xml": { "id": "routes/sitemap[.]xml", "parentId": "root", "path": "sitemap.xml", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/sitemap_._xml-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/robots[.]txt": { "id": "routes/robots[.]txt", "parentId": "root", "path": "robots.txt", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/robots_._txt-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/render.test": { "id": "routes/render.test", "parentId": "root", "path": "render/test", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/render.test-BySMpU9y.js", "imports": ["/assets/jsx-runtime-D58fAJBj.js", "/assets/components-DOmHNxYD.js", "/assets/client-BEbPanTx.js", "/assets/vi.YFlodzP_-NLhMCwri.js", "/assets/_index-CVvX_IYi.js"], "css": [] }, "routes/_index.test": { "id": "routes/_index.test", "parentId": "routes/_index", "path": "test", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/_index.test-ChyDb9wN.js", "imports": ["/assets/_index-CVvX_IYi.js", "/assets/vi.YFlodzP_-NLhMCwri.js", "/assets/jsx-runtime-D58fAJBj.js"], "css": [] }, "routes/_index": { "id": "routes/_index", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/_index-CVvX_IYi.js", "imports": ["/assets/jsx-runtime-D58fAJBj.js"], "css": [] }, "routes/music": { "id": "routes/music", "parentId": "root", "path": "music", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/music-B2bmIMPV.js", "imports": ["/assets/jsx-runtime-D58fAJBj.js"], "css": [] }, "routes/sobre": { "id": "routes/sobre", "parentId": "root", "path": "sobre", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/sobre-GmRV-hfv.js", "imports": ["/assets/jsx-runtime-D58fAJBj.js"], "css": [] }, "routes/404": { "id": "routes/404", "parentId": "root", "path": "404", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/404-DRd2X-kA.js", "imports": ["/assets/jsx-runtime-D58fAJBj.js"], "css": [] } }, "url": "/assets/manifest-2063a8cb.js", "version": "2063a8cb" };
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
  "routes/sitemap[.]xml": {
    id: "routes/sitemap[.]xml",
    parentId: "root",
    path: "sitemap.xml",
    index: void 0,
    caseSensitive: void 0,
    module: route3
  },
  "routes/robots[.]txt": {
    id: "routes/robots[.]txt",
    parentId: "root",
    path: "robots.txt",
    index: void 0,
    caseSensitive: void 0,
    module: route4
  },
  "routes/render.test": {
    id: "routes/render.test",
    parentId: "root",
    path: "render/test",
    index: void 0,
    caseSensitive: void 0,
    module: route5
  },
  "routes/_index.test": {
    id: "routes/_index.test",
    parentId: "routes/_index",
    path: "test",
    index: void 0,
    caseSensitive: void 0,
    module: route6
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route7
  },
  "routes/music": {
    id: "routes/music",
    parentId: "root",
    path: "music",
    index: void 0,
    caseSensitive: void 0,
    module: route8
  },
  "routes/sobre": {
    id: "routes/sobre",
    parentId: "root",
    path: "sobre",
    index: void 0,
    caseSensitive: void 0,
    module: route9
  },
  "routes/404": {
    id: "routes/404",
    parentId: "root",
    path: "404",
    index: void 0,
    caseSensitive: void 0,
    module: route10
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
