import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { RemixServer, Link, Meta, Links, Outlet, ScrollRestoration, Scripts, useRouteError, isRouteErrorResponse, useLoaderData, useNavigation, Form } from "@remix-run/react";
import { isbot } from "isbot";
import { PassThrough } from "node:stream";
import { renderToPipeableStream } from "react-dom/server";
import { useState, useEffect } from "react";
import { Sun, Moon, X, Menu, ArrowRight } from "lucide-react";
import { json } from "@remix-run/node";
import { SiSpotify, SiApplemusic, SiAmazonmusic, SiYoutubemusic } from "react-icons/si";
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
const styles = "/assets/index-BLYQzGZw.css";
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
  const label = isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro";
  return /* @__PURE__ */ jsx(
    "button",
    {
      type: "button",
      "aria-label": label,
      onClick: toggle,
      className: `theme-toggle ${className}`,
      children: isDark ? /* @__PURE__ */ jsx(Sun, { size: 20 }) : /* @__PURE__ */ jsx(Moon, { size: 20 })
    }
  );
}
const NAV_LINKS = [
  { label: "Inicio", href: "/" },
  { label: "Sobre mí", href: "/sobre" },
  { label: "Música", href: "/music" },
  { label: "Blog", href: "/blog" },
  { label: "Conecta", href: "/conecta" },
  { label: "Videos", href: "https://www.youtube.com/@IsmaelGuimarais", external: true }
];
function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(ThemeToggle, {}),
    /* @__PURE__ */ jsxs("nav", { className: `mobile-nav ${menuOpen ? "mobile-nav--open" : ""}`, children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          className: "mobile-nav__toggle",
          onClick: () => setMenuOpen((open) => !open),
          "aria-label": menuOpen ? "Cerrar menú" : "Abrir menú",
          children: menuOpen ? /* @__PURE__ */ jsx(X, { size: 24 }) : /* @__PURE__ */ jsx(Menu, { size: 24 })
        }
      ),
      menuOpen && /* @__PURE__ */ jsx("div", { className: "mobile-nav__menu", children: NAV_LINKS.map(({ label, href, external }) => external ? /* @__PURE__ */ jsx(
        "a",
        {
          href,
          target: "_blank",
          rel: "noopener noreferrer",
          onClick: () => setMenuOpen(false),
          children: label
        },
        label
      ) : /* @__PURE__ */ jsx(
        Link,
        {
          to: href,
          onClick: () => setMenuOpen(false),
          children: label
        },
        label
      )) })
    ] })
  ] });
}
const links = () => [
  { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Crimson+Text:ital,wght@0,400;0,600;1,400;1,600&family=Inter:wght@300;400;600;700;800&display=swap"
  },
  { rel: "stylesheet", href: styles }
];
const meta$a = () => [
  { charSet: "utf-8" },
  { name: "viewport", content: "width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes" }
];
function App() {
  return /* @__PURE__ */ jsxs("html", { lang: "es", children: [
    /* @__PURE__ */ jsxs("head", { children: [
      /* @__PURE__ */ jsx("meta", { charSet: "utf-8" }),
      /* @__PURE__ */ jsx("meta", { name: "viewport", content: "width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes" }),
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
      /* @__PURE__ */ jsx(Navigation, {}),
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
  links,
  meta: meta$a
}, Symbol.toStringTag, { value: "Module" }));
const DEFAULT_SITE$6 = "https://ismaelguimarais.com";
const DEFAULT_OG_IMAGE$6 = `${DEFAULT_SITE$6}/og-default.jpg`;
const loader$c = () => {
  const site = process.env.PUBLIC_SITE_URL ?? DEFAULT_SITE$6;
  const ogImage = `${site}/og-default.jpg`;
  return json({ site, ogImage });
};
const meta$9 = ({ data, location }) => {
  const site = (data == null ? void 0 : data.site) ?? DEFAULT_SITE$6;
  const url = new URL(location.pathname + location.search, site).toString();
  const title = "Blog - Artículos y reflexiones | Ismael Guimarais";
  const description = "Artículos profundos sobre cultura, fe, política y filosofía. Un espacio para pensar despacio y reflexionar sobre las ideas que importan.";
  const ogImage = (data == null ? void 0 : data.ogImage) ?? DEFAULT_OG_IMAGE$6;
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
function Blog() {
  return /* @__PURE__ */ jsx("main", { className: "section", children: /* @__PURE__ */ jsxs("article", { className: "blog-article", children: [
    /* @__PURE__ */ jsxs("header", { className: "blog-header", children: [
      /* @__PURE__ */ jsx(
        "img",
        {
          src: "/blog-mensaje-jesus.png",
          alt: "El Mensaje de Jesús - 1 Juan 1:5",
          className: "blog-featured-image"
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "blog-meta", children: [
        /* @__PURE__ */ jsx("time", { children: "2024" }),
        /* @__PURE__ */ jsx("span", { className: "blog-category", children: "Fe y Teología" })
      ] }),
      /* @__PURE__ */ jsx("h1", { className: "blog-title", children: "El Mensaje de Jesús" }),
      /* @__PURE__ */ jsx("p", { className: "blog-subtitle", children: "Cómo Juan resumió tres años de ministerio en una sola frase" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "blog-content card", children: [
      /* @__PURE__ */ jsx("p", { className: "blog-intro", children: "Pareciera imposible resumir la enseñanza de Jesucristo en unas pocas palabras. A fin de cuenta Él es Dios encarnado. ¿Cómo podríamos encapsular su mensaje? Sin embargo, efectivamente en la Biblia se resumieron esos 3 años de ministerio activo en apenas una frase, lo que sucede es que poca atención se le ha prestado." }),
      /* @__PURE__ */ jsx("h2", { children: "El discípulo amado" }),
      /* @__PURE__ */ jsx("p", { children: 'Juan fue quizás el apóstol que mayor relación de amistad mantuvo con el carpintero de Nazaret. A él se le llamó "el discípulo amado", era el que se recostaba en el pecho de Jesús en su última cena y conocía relatos de la vida privada de Cristo (como la historia de Nicodemo) que ningún otro evangelista relató.' }),
      /* @__PURE__ */ jsx("p", { children: "¿Por qué hablamos de Juan cuando intentamos resumir el mensaje de Jesús? Pues porque fue precisamente Juan quien declaró la idea central de la predicación de Cristo." }),
      /* @__PURE__ */ jsx("h2", { children: "El contexto de la primera carta" }),
      /* @__PURE__ */ jsx("p", { children: "Juan era ya muy anciano cuando muchos maestros importantes del cristianismo comenzaron a enseñar falsedades sobre la vida espiritual y sobre la encarnación del Señor. Estas personas decían tener mayor revelación y autoridad, por lo cual mucho desdeñaban la enseñanza de los apóstoles." }),
      /* @__PURE__ */ jsx("p", { children: "En su primera carta universal (1era de Juan), el anciano no discute ya si él es o no apóstol y por tanto debe escucharse su evangelio como venido de la boca de Dios, más bien recurre al centro de todo lo que enseñaba Jesús y de esa manera contrasta la enseñanza de los falsos maestros con el mensaje del Maestro Supremo:" }),
      /* @__PURE__ */ jsxs("blockquote", { className: "blog-quote", children: [
        '"Este es el mensaje que hemos oído de él, y os anunciamos: Dios es luz, y no hay ningunas tinieblas en él."',
        /* @__PURE__ */ jsx("cite", { children: "— 1 Juan 1:5" })
      ] }),
      /* @__PURE__ */ jsx("h2", { children: "El significado de la luz" }),
      /* @__PURE__ */ jsxs("p", { children: [
        "Pareciera ser que esta sentencia no resume para nada el evangelio de Jesucristo. ¿Dónde está el pecado, el arrepentimiento, la vida y la condenación eterna? Pues aunque a simple vista no lo parezca, Juan nos declara el núcleo de todo en esta frase: ",
        /* @__PURE__ */ jsx("strong", { children: "el conflicto entre la luz y las tinieblas" }),
        "."
      ] }),
      /* @__PURE__ */ jsx("p", { children: "¿Es este el mensaje central de Jesús? ¿No es esto muy básico? ¿No se encuentra esto en cada religión?" }),
      /* @__PURE__ */ jsxs("p", { children: [
        "Sí, el mensaje central no se reduce a luz y tinieblas. Lo que distingue al mensaje de Jesús de las demás religiones es el ",
        /* @__PURE__ */ jsx("strong", { children: "significado" }),
        " de esa luz y esas tinieblas."
      ] }),
      /* @__PURE__ */ jsx("h2", { children: "Más allá de la guerra espiritual" }),
      /* @__PURE__ */ jsx("p", { children: "Para algunos cristianos, el conflicto fundamental de sus vidas espirituales se enfoca en la lucha entre seres malignos con seres angélicos o humanos—es una guerra entre criaturas de Dios. Este enfoque no es incorrecto del todo, pero no es lo esencial, pues aquí Juan no está hablando de una luz que contrasta con los demonios sino con el pecado y el desamor." }),
      /* @__PURE__ */ jsxs("blockquote", { className: "blog-quote", children: [
        '"El que dice que está en la luz, y aborrece a su hermano, está todavía en tinieblas."',
        /* @__PURE__ */ jsx("cite", { children: "— 1 Juan 2:9" })
      ] }),
      /* @__PURE__ */ jsxs("p", { children: [
        "¡Allí está el mensaje resumido y central de Jesucristo! ",
        /* @__PURE__ */ jsx("strong", { children: "La santidad y el pecado son los opuestos que definen el problema fundamental que el evangelio soluciona." })
      ] }),
      /* @__PURE__ */ jsx("h2", { children: "La definición del pecado" }),
      /* @__PURE__ */ jsx("p", { children: "Muchos dicen que Dios es santo y que no peca, ¿pero cuál es la definición de pecado según Juan?" }),
      /* @__PURE__ */ jsxs("blockquote", { className: "blog-quote", children: [
        '"Todo aquel que comete pecado, infringe también la ley; pues el pecado es infracción de la ley."',
        /* @__PURE__ */ jsx("cite", { children: "— 1 Juan 3:4" })
      ] }),
      /* @__PURE__ */ jsx("p", { children: "Para Juan el pecado se define como la infracción de la ley de Dios. Decir que Dios no infringe su propia ley en ninguna manera es revolucionario para algunos. ¿No es Dios soberano? ¿Dios no puede cometer homicidio con quién Él decida? ¿No puede mentir y ser sin culpa?" }),
      /* @__PURE__ */ jsxs("p", { children: [
        "Al parecer, Dios está atado a su propia Ley de amor. No hay nada en Él de aquellas cosas que Él mismo condena en nosotros. Dios no puede pecar y cuando mata lo hace bajo la legalidad de su Amor. Los principios de su ley de amor son guardados por Él, porque su ley existe debido a que ",
        /* @__PURE__ */ jsx("strong", { children: "Dios es amor" }),
        " aún antes de que existiera el universo."
      ] }),
      /* @__PURE__ */ jsx("h2", { children: "El verdadero carácter de Dios" }),
      /* @__PURE__ */ jsx("p", { children: 'El mensaje del amor de Dios expresado en su ley y la pureza del carácter de Dios es el mensaje central de Jesucristo. Lucifer ha intentado mediante siglos hacer ver a nuestro Padre como un Señor duro que "recoge donde no sembró", que es recio y que se complace del castigo. Pero nada más lejos de la verdad.' }),
      /* @__PURE__ */ jsx("p", { children: "Dios nos manda a orar por los que nos maldicen, nos manda a dar la otra mejilla, a cuidar de los más débiles y a ser misericordiosos con los que yerran. ¿Acaso él no demostró en Jesús que todo lo que demanda de nosotros es exactamente lo que Él es?" }),
      /* @__PURE__ */ jsxs("blockquote", { className: "blog-quote", children: [
        '"Como hijos obedientes, no os conforméis a los deseos que antes teníais estando en vuestra ignorancia; sino, como aquel que os llamó es santo, sed también vosotros santos en toda vuestra manera de vivir."',
        /* @__PURE__ */ jsx("cite", { children: "— 1 Pedro 1:14-15" })
      ] }),
      /* @__PURE__ */ jsx("h2", { children: "El llamado a la santidad" }),
      /* @__PURE__ */ jsx("p", { children: "Si Dios es luz sin tinieblas, así también lo son sus hijos. Si nosotros decimos que somos cristianos, si decimos que tenemos comunión con un Dios santo, un Dios de amor, pero nosotros somos gustos, caprichos, egoísmos, iras, lujurias—si nosotros no somos luz—entonces somos mentirosos." }),
      /* @__PURE__ */ jsx("p", { children: "Juan nos llama a reconocer que sin Cristo somos pecadores en tinieblas, pero con Cristo llegamos a ser santos en luz." }),
      /* @__PURE__ */ jsxs("blockquote", { className: "blog-quote", children: [
        '"El que dice que permanece en él, debe andar como él anduvo."',
        /* @__PURE__ */ jsx("cite", { children: "— 1 Juan 2:6" })
      ] }),
      /* @__PURE__ */ jsx("h2", { children: "El arrepentimiento es el camino, no el final" }),
      /* @__PURE__ */ jsx("p", { children: "Muchos buenos maestros hoy en día están enseñando que el arrepentimiento es el final y la victoria de la vida cristiana. Sin embargo, esto no es así. El arrepentimiento es el camino a la Santidad, o lo que es lo mismo, el camino al amor." }),
      /* @__PURE__ */ jsxs("div", { className: "blog-callout", children: [
        /* @__PURE__ */ jsx("h3", { children: "¿Quiere decir esto que si peco no soy cristiano?" }),
        /* @__PURE__ */ jsx("p", { children: "No quiere decir eso. Quiere decir que si peco me he separado de Jesús, no estoy siendo cristiano pues estoy lejos de Cristo. Debo arrepentirme como me arrepentí el primer día de mi conversión y recibir de nuevo el poder para vencer que la gracia de Dios otorga." }),
        /* @__PURE__ */ jsx("p", { children: "Ser cristiano no es un estatus incondicional, ser cristiano significa tener el Espíritu de Cristo. Permanecer en Cristo es ser cristiano." })
      ] }),
      /* @__PURE__ */ jsx("h2", { children: "La pregunta definitiva" }),
      /* @__PURE__ */ jsx("p", { children: "El mensaje central de Jesús es el carácter de amor de Dios, un tipo de amor muy específico que está revelado en Su ley." }),
      /* @__PURE__ */ jsx("p", { children: "¿Crees que mediante su gracia y su Sangre tú también puedes ser luz como Dios es luz? ¿Ser amor como Dios es amor? ¿Ser Santo como Dios es santo? ¿O Jesús nos pide cosas imposibles?" }),
      /* @__PURE__ */ jsxs("blockquote", { className: "blog-quote", children: [
        '"Y mirándolos Jesús, les dijo: Para los hombres esto es imposible; más para Dios todo es posible."',
        /* @__PURE__ */ jsx("cite", { children: "— Mateo 19:26" })
      ] }),
      /* @__PURE__ */ jsxs("blockquote", { className: "blog-quote", children: [
        '"Era Abram de edad de noventa y nueve años, cuando le apareció Jehová y le dijo: Yo soy el Dios Todopoderoso; anda delante de mí y sé perfecto."',
        /* @__PURE__ */ jsx("cite", { children: "— Génesis 17:1" })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "blog-closing", children: "¿Acaso tenemos fe para mover montañas pero no para ser santos? No te preocupes, para ambas cosas no es necesaria una fe muy grande. Seremos santos y venceremos todos nuestros defectos de carácter con tan solo la fe del tamaño de un grano de mostaza 😉" }),
      /* @__PURE__ */ jsx("p", { className: "blog-signature", children: /* @__PURE__ */ jsx("strong", { children: "Dios te bendiga mucho!" }) })
    ] }),
    /* @__PURE__ */ jsxs("footer", { className: "blog-footer card", style: { marginTop: "var(--space-8)", background: "var(--gradient-1)", color: "var(--white)" }, children: [
      /* @__PURE__ */ jsx("h3", { style: { fontSize: "var(--text-xl)", marginBottom: "var(--space-4)", color: "var(--white)" }, children: "¿Te gustó este artículo?" }),
      /* @__PURE__ */ jsx("p", { style: { marginBottom: "var(--space-6)", fontSize: "var(--text-base)", fontWeight: "500" }, children: "Suscríbete al newsletter para recibir más reflexiones profundas cada semana." }),
      /* @__PURE__ */ jsx("a", { href: "/newsletter/confirmacion", className: "button", style: { background: "var(--white)", color: "var(--primary)", display: "inline-block" }, children: "Suscribirme al newsletter" })
    ] })
  ] }) });
}
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Blog,
  loader: loader$c,
  meta: meta$9
}, Symbol.toStringTag, { value: "Module" }));
const SITE$2 = process.env.PUBLIC_SITE_URL ?? "https://ismaelguimarais.com";
const OG_IMAGE$2 = `${SITE$2}/og-default.jpg`;
const loader$b = () => json({ site: SITE$2, ogImage: OG_IMAGE$2 });
const meta$8 = ({ data, location }) => {
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
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: NewsletterConfirmacion,
  loader: loader$b,
  meta: meta$8
}, Symbol.toStringTag, { value: "Module" }));
const SITE$1 = process.env.PUBLIC_SITE_URL ?? "https://ismaelguimarais.com";
const OG_IMAGE$1 = `${SITE$1}/og-default.jpg`;
const loader$a = () => json({ site: SITE$1, ogImage: OG_IMAGE$1 });
const meta$7 = ({ data, location }) => {
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
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: NewsletterGracias,
  loader: loader$a,
  meta: meta$7
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
function loader$9() {
  return json({ ok: true });
}
const route4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action,
  loader: loader$9
}, Symbol.toStringTag, { value: "Module" }));
const routes$1 = [
  "/",
  "/sobre",
  "/music",
  "/newsletter/confirmacion",
  "/newsletter/gracias"
];
const loader$8 = () => {
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
const route5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  loader: loader$8
}, Symbol.toStringTag, { value: "Module" }));
const loader$7 = () => {
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
const route6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  loader: loader$7
}, Symbol.toStringTag, { value: "Module" }));
const DEFAULT_SITE$5 = "https://ismaelguimarais.com";
const DEFAULT_OG_IMAGE$5 = `${DEFAULT_SITE$5}/og-default.jpg`;
const BLOG_POSTS = [
  {
    slug: "el-mensaje-de-jesus",
    title: "El Mensaje de Jesús",
    description: "Cómo Juan resumió tres años de ministerio en una sola frase",
    date: "2024-01-15",
    category: "Fe y Teología",
    image: "/blog-mensaje-jesus.png",
    excerpt: "Pareciera imposible resumir la enseñanza de Jesucristo en unas pocas palabras. A fin de cuenta Él es Dios encarnado. ¿Cómo podríamos encapsular su mensaje? Sin embargo, efectivamente en la Biblia se resumieron esos 3 años de ministerio activo en apenas una frase..."
  }
  // Add more blog posts here as they are created
];
const loader$6 = () => {
  const site = process.env.PUBLIC_SITE_URL ?? DEFAULT_SITE$5;
  const ogImage = `${site}/og-default.jpg`;
  return json({ site, ogImage, posts: BLOG_POSTS });
};
const meta$6 = ({ data, location }) => {
  const site = (data == null ? void 0 : data.site) ?? DEFAULT_SITE$5;
  const url = new URL(location.pathname + location.search, site).toString();
  const title = "Blog - Artículos y reflexiones | Ismael Guimarais";
  const description = "Artículos profundos sobre cultura, fe, política y filosofía. Un espacio para pensar despacio y reflexionar sobre las ideas que importan.";
  const ogImage = (data == null ? void 0 : data.ogImage) ?? DEFAULT_OG_IMAGE$5;
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
function BlogIndex() {
  return /* @__PURE__ */ jsxs("main", { className: "section", children: [
    /* @__PURE__ */ jsxs("div", { className: "blog-index-header", children: [
      /* @__PURE__ */ jsx("h1", { className: "page-title", children: "Blog" }),
      /* @__PURE__ */ jsx("p", { className: "page-subtitle", children: "Artículos profundos sobre cultura, fe, política y filosofía. Un espacio para pensar despacio." })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "blog-posts-grid", children: BLOG_POSTS.sort((a, b) => new Date(b.date) - new Date(a.date)).map((post) => /* @__PURE__ */ jsx("article", { className: "blog-post-card card", children: /* @__PURE__ */ jsxs(Link, { to: `/blog/${post.slug}`, className: "blog-post-link", children: [
      post.image && /* @__PURE__ */ jsx("div", { className: "blog-post-image", children: /* @__PURE__ */ jsx("img", { src: post.image, alt: post.title, loading: "lazy" }) }),
      /* @__PURE__ */ jsxs("div", { className: "blog-post-content", children: [
        /* @__PURE__ */ jsxs("div", { className: "blog-post-meta", children: [
          /* @__PURE__ */ jsx("time", { dateTime: post.date, children: new Date(post.date).toLocaleDateString("es-ES", {
            year: "numeric",
            month: "long",
            day: "numeric"
          }) }),
          /* @__PURE__ */ jsx("span", { className: "blog-post-category", children: post.category })
        ] }),
        /* @__PURE__ */ jsx("h2", { className: "blog-post-title", children: post.title }),
        /* @__PURE__ */ jsx("p", { className: "blog-post-description", children: post.description }),
        /* @__PURE__ */ jsx("p", { className: "blog-post-excerpt", children: post.excerpt }),
        /* @__PURE__ */ jsx("span", { className: "link-arrow", children: "Leer artículo" })
      ] })
    ] }) }, post.slug)) })
  ] });
}
const route7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: BlogIndex,
  loader: loader$6,
  meta: meta$6
}, Symbol.toStringTag, { value: "Module" }));
const DEFAULT_SITE$4 = "https://ismaelguimarais.com";
const DEFAULT_OG_IMAGE$4 = `${DEFAULT_SITE$4}/la-soledad-cover.jpg`;
const loader$5 = () => {
  const site = process.env.PUBLIC_SITE_URL ?? DEFAULT_SITE$4;
  const ogImage = `${site}/la-soledad-cover.jpg`;
  return json({ site, ogImage });
};
const meta$5 = ({ data, location }) => {
  const site = (data == null ? void 0 : data.site) ?? DEFAULT_SITE$4;
  const url = new URL(location.pathname + location.search, site).toString();
  const title = "La Soledad - Ismael Guimarais";
  const description = "Escucha 'La Soledad', el nuevo single de Ismael Guimarais. Disponible en todas las plataformas digitales.";
  const ogImage = (data == null ? void 0 : data.ogImage) ?? DEFAULT_OG_IMAGE$4;
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
function LaSoledad() {
  const musicPlatforms = [
    {
      name: "Spotify",
      url: "https://open.spotify.com/intl-es/album/5gAOQdp4eLDVJrIBBReF39",
      icon: /* @__PURE__ */ jsx(SiSpotify, {}),
      className: "spotify"
    },
    {
      name: "Apple Music",
      url: "https://music.apple.com/mx/album/la-soledad-single/1852310177",
      icon: /* @__PURE__ */ jsx(SiApplemusic, {}),
      className: "apple-music"
    },
    {
      name: "Amazon Music",
      url: "https://music.amazon.es/albums/B0G1TZ18L6?marketplaceId=A1RKKUPIHCS9HS&musicTerritory=ES&ref=dm_sh_86sLzfkheGHW1DdqFaFqAwbim",
      icon: /* @__PURE__ */ jsx(SiAmazonmusic, {}),
      className: "amazon-music"
    },
    {
      name: "YouTube Music",
      url: "https://music.youtube.com/watch?v=dVOdtN5Y_Tw&si=SgmMuv0v2YuXRg_J",
      icon: /* @__PURE__ */ jsx(SiYoutubemusic, {}),
      className: "youtube-music"
    },
    {
      name: "Deezer",
      url: "https://link.deezer.com/s/31Ft6t3yz0M38lbMV6o85",
      icon: /* @__PURE__ */ jsx("svg", { viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M18.81 4.16v3.03h5.19V4.16h-5.19zm0 4.75v3.03h5.19V8.91h-5.19zm0 4.75v3.03h5.19v-3.03h-5.19zm0 4.75v3.03h5.19v-3.03h-5.19zM12.14 4.16v3.03h5.19V4.16h-5.19zm0 4.75v3.03h5.19V8.91h-5.19zm0 4.75v3.03h5.19v-3.03h-5.19zm0 4.75v3.03h5.19v-3.03h-5.19zM5.47 4.16v3.03h5.19V4.16H5.47zm0 4.75v3.03h5.19V8.91H5.47zm0 4.75v3.03h5.19v-3.03H5.47zm0 4.75v3.03h5.19v-3.03H5.47zM0 8.91v3.03h4.09V8.91H0zm0 4.75v3.03h4.09v-3.03H0zm0 4.75v3.03h4.09v-3.03H0z" }) }),
      className: "deezer"
    }
  ];
  return /* @__PURE__ */ jsx("main", { className: "song-page", children: /* @__PURE__ */ jsxs("div", { className: "song-container", children: [
    /* @__PURE__ */ jsxs("div", { className: "song-header", "data-reveal": true, children: [
      /* @__PURE__ */ jsx("div", { className: "song-cover-wrapper", children: /* @__PURE__ */ jsx(
        "img",
        {
          src: "/la-soledad-cover.jpg",
          alt: "Portada de La Soledad",
          className: "song-cover"
        }
      ) }),
      /* @__PURE__ */ jsx("h1", { className: "song-title", children: "La Soledad" }),
      /* @__PURE__ */ jsx("p", { className: "song-artist", children: "Ismael Guimarais" }),
      /* @__PURE__ */ jsx("p", { className: "song-release", children: "Single · 2025" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "song-platforms-section", "data-reveal": true, children: [
      /* @__PURE__ */ jsx("h2", { className: "platforms-title", children: "Escucha ahora en tu plataforma favorita" }),
      /* @__PURE__ */ jsx("div", { className: "song-platforms-grid", children: musicPlatforms.map((platform) => /* @__PURE__ */ jsxs(
        "a",
        {
          href: platform.url,
          target: "_blank",
          rel: "noopener noreferrer",
          className: `song-platform-button song-platform-button--${platform.className}`,
          "data-analytics": `song-${platform.className}`,
          children: [
            /* @__PURE__ */ jsx("span", { className: "song-platform-icon", children: platform.icon }),
            /* @__PURE__ */ jsx("span", { className: "song-platform-name", children: platform.name }),
            /* @__PURE__ */ jsx(ArrowRight, { className: "song-platform-arrow", size: 24 })
          ]
        },
        platform.name
      )) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "song-lyrics-section", "data-reveal": true, children: [
      /* @__PURE__ */ jsx("h2", { className: "lyrics-title", children: "Letra" }),
      /* @__PURE__ */ jsxs("div", { className: "lyrics-content", children: [
        /* @__PURE__ */ jsxs("div", { className: "lyrics-verse", children: [
          /* @__PURE__ */ jsx("p", { children: "La soledad es una iglesia sin espíritu" }),
          /* @__PURE__ */ jsx("p", { children: "Una casa sin familia, una máscara, un disfraz" }),
          /* @__PURE__ */ jsx("p", { children: "La soledad es una bomba en el ombligo" }),
          /* @__PURE__ */ jsx("p", { children: "Es tener muchos amigos y nadie con quien llorar" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "lyrics-verse", children: [
          /* @__PURE__ */ jsx("p", { children: "La soledad es una fuerza que te hunde en la más negra de las nubes" }),
          /* @__PURE__ */ jsx("p", { children: "Cuando paras de soñar" }),
          /* @__PURE__ */ jsx("p", { children: "La soledad es un ateo socorrido por algún que otro partido" }),
          /* @__PURE__ */ jsx("p", { children: "Y un diploma en su arsenal" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "lyrics-verse", children: [
          /* @__PURE__ */ jsx("p", { children: "Solo en la multitud" }),
          /* @__PURE__ */ jsx("p", { children: "Está el mundo, estás tú" }),
          /* @__PURE__ */ jsx("p", { children: "Solo en la multitud" }),
          /* @__PURE__ */ jsx("p", { children: "Todo se detiene y piensas" }),
          /* @__PURE__ */ jsx("p", { children: "Solo en la multitud" }),
          /* @__PURE__ */ jsx("p", { children: "Todos ríen menos tú" }),
          /* @__PURE__ */ jsx("p", { children: "Solo en la multitud" }),
          /* @__PURE__ */ jsx("p", { children: "Levanta tu rostro y ve al azul" }),
          /* @__PURE__ */ jsx("p", { children: "De aquel cielo" }),
          /* @__PURE__ */ jsx("p", { children: "Escucha la historia del buen carpintero" }),
          /* @__PURE__ */ jsx("p", { children: "Que murió en la cruz" }),
          /* @__PURE__ */ jsx("p", { children: "Azotado y solo entre la multitud" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "lyrics-verse", children: [
          /* @__PURE__ */ jsx("p", { children: "La soledad es una chica en minifalda que todos quieren mirarla" }),
          /* @__PURE__ */ jsx("p", { children: "Y nadie la quiere amar" }),
          /* @__PURE__ */ jsx("p", { children: "La soledad roba bolsillos en los trenes" }),
          /* @__PURE__ */ jsx("p", { children: "Asesina en los cuarteles y trafica en alta mar" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "lyrics-verse", children: [
          /* @__PURE__ */ jsx("p", { children: "Solo en la multitud" }),
          /* @__PURE__ */ jsx("p", { children: "Está el mundo, estás tú" }),
          /* @__PURE__ */ jsx("p", { children: "Solo en la multitud" }),
          /* @__PURE__ */ jsx("p", { children: "Todo se detiene y piensas" }),
          /* @__PURE__ */ jsx("p", { children: "Solo en la multitud" }),
          /* @__PURE__ */ jsx("p", { children: "Solo en la multitud" }),
          /* @__PURE__ */ jsx("p", { children: "Está el mundo, estás tú" }),
          /* @__PURE__ */ jsx("p", { children: "Solo en la multitud" }),
          /* @__PURE__ */ jsx("p", { children: "Todo se detiene y piensas" }),
          /* @__PURE__ */ jsx("p", { children: "Solo en la multitud" }),
          /* @__PURE__ */ jsx("p", { children: "Todos ríen menos tú" }),
          /* @__PURE__ */ jsx("p", { children: "Solo en la multitud" }),
          /* @__PURE__ */ jsx("p", { children: "Levanta tu rostro y ve al azul" }),
          /* @__PURE__ */ jsx("p", { children: "De aquel cielo" }),
          /* @__PURE__ */ jsx("p", { children: "Escucha la historia del buen carpintero" }),
          /* @__PURE__ */ jsx("p", { children: "Que murió en la cruz" }),
          /* @__PURE__ */ jsx("p", { children: "Azotado y solo (azotado y solo) entre la multitud" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "song-cta-section", "data-reveal": true, children: /* @__PURE__ */ jsxs("div", { className: "song-cta-card", children: [
      /* @__PURE__ */ jsx("h2", { children: "Más música de Ismael Guimarais" }),
      /* @__PURE__ */ jsx("p", { children: "Descubre todas mis canciones y sígueme en tus plataformas favoritas" }),
      /* @__PURE__ */ jsxs("div", { className: "song-cta-buttons", children: [
        /* @__PURE__ */ jsx("a", { href: "/music", className: "button button--primary", children: "Ver toda mi música" }),
        /* @__PURE__ */ jsx("a", { href: "/conecta", className: "button button--secondary", children: "Conecta conmigo" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs("footer", { className: "song-footer", "data-reveal": true, children: [
      /* @__PURE__ */ jsx("p", { children: "© 2025 Ismael Guimarais · Todos los derechos reservados" }),
      /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx("a", { href: "/", children: "Volver al inicio" }) })
    ] })
  ] }) });
}
const route8 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: LaSoledad,
  loader: loader$5,
  meta: meta$5
}, Symbol.toStringTag, { value: "Module" }));
const DEFAULT_SITE$3 = "https://ismaelguimarais.com";
const DEFAULT_OG_IMAGE$3 = `${DEFAULT_SITE$3}/og-default.jpg`;
const loader$4 = () => {
  const site = process.env.PUBLIC_SITE_URL ?? DEFAULT_SITE$3;
  const ogImage = `${site}/og-default.jpg`;
  return json({ site, ogImage });
};
const meta$4 = ({ data, location }) => {
  const site = (data == null ? void 0 : data.site) ?? DEFAULT_SITE$3;
  const url = new URL(location.pathname + location.search, site).toString();
  const title = "Conecta - Ismael Guimarais";
  const description = "Todas las formas de conectar con Ismael Guimarais: redes sociales, música, newsletter y más.";
  const ogImage = (data == null ? void 0 : data.ogImage) ?? DEFAULT_OG_IMAGE$3;
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
function Conecta() {
  const socialLinks = [
    {
      name: "YouTube",
      handle: "@IsmaelGuimarais",
      url: "https://www.youtube.com/@IsmaelGuimarais",
      icon: /* @__PURE__ */ jsx("svg", { viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" }) }),
      className: "youtube"
    },
    {
      name: "Instagram",
      handle: "@ismaguimarais",
      url: "https://www.instagram.com/ismaguimarais/",
      icon: /* @__PURE__ */ jsx("svg", { viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" }) }),
      className: "instagram"
    },
    {
      name: "X (Twitter)",
      handle: "@IsmaGuimarais",
      url: "https://x.com/IsmaGuimarais",
      icon: /* @__PURE__ */ jsx("svg", { viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" }) }),
      className: "x"
    },
    {
      name: "TikTok",
      handle: "@ismaguimarais",
      url: "https://www.tiktok.com/@ismaguimarais",
      icon: /* @__PURE__ */ jsx("svg", { viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" }) }),
      className: "tiktok"
    },
    {
      name: "Threads",
      handle: "@ismaguimarais",
      url: "https://www.threads.net/@ismaguimarais",
      icon: /* @__PURE__ */ jsx("svg", { viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.018-5.06.869-6.395 2.53-1.388 1.728-2.094 4.227-2.1 7.428.006 3.199.713 5.7 2.1 7.427 1.335 1.661 3.486 2.512 6.395 2.53 2.557-.017 4.484-.563 5.73-1.623.987-.844 1.569-1.956 1.729-3.309-.208-.076-.42-.156-.635-.24-1.78-.693-3.326-1.638-4.6-2.812-1.515-1.398-2.288-3.04-2.296-4.876-.005-1.578.503-2.967 1.51-4.133 1.208-1.396 2.966-2.164 5.084-2.222 2.289-.064 4.216.705 5.73 2.288 1.296 1.356 2.023 3.21 2.161 5.517l.003.052v.024c0 1.928-.37 3.59-1.101 4.942-.758 1.404-1.86 2.48-3.277 3.197-1.657.836-3.694 1.263-6.054 1.267zm5.654-11.281c-.01-.87-.24-1.653-.689-2.329-.636-.956-1.639-1.46-2.982-1.497-1.156.037-2.064.498-2.698 1.37-.477.652-.713 1.432-.705 2.319.01 1.36.537 2.512 1.567 3.426 1.05.933 2.374 1.653 3.938 2.14.417.131.835.247 1.252.35.076-1.13.059-2.328-.683-3.779z" }) }),
      className: "threads"
    },
    {
      name: "Facebook",
      handle: "Ismael Guimarais",
      url: "https://www.facebook.com/ismaguimarais/",
      icon: /* @__PURE__ */ jsx("svg", { viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" }) }),
      className: "facebook"
    }
  ];
  const musicPlatforms = [
    {
      name: "Spotify",
      url: "https://open.spotify.com/artist/5t7JJmMzqEp6j39T0tzsSV",
      icon: /* @__PURE__ */ jsx("svg", { viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" }) }),
      className: "spotify-btn"
    },
    {
      name: "Apple Music",
      url: "https://music.apple.com/us/artist/ismael-guimarais/1764726835",
      icon: /* @__PURE__ */ jsx("svg", { viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M23.997 6.124c0-.738-.065-1.47-.24-2.19-.317-1.31-1.062-2.31-2.18-3.043C21.003.517 20.373.285 19.7.164c-.517-.093-1.038-.135-1.564-.15-.04-.003-.083-.01-.124-.013H5.988c-.152.01-.303.017-.455.026C4.786.07 4.043.15 3.34.428 2.004.958 1.04 1.88.475 3.208c-.192.448-.292.925-.363 1.408-.056.392-.088.785-.1 1.18 0 .032-.007.062-.01.093v12.223c.01.14.017.283.027.424.05.815.154 1.624.497 2.373.65 1.42 1.738 2.353 3.234 2.801.42.127.856.187 1.293.228.555.055 1.114.091 1.673.1h11.717c.2-.007.4-.01.597-.02.772-.035 1.537-.106 2.265-.34 1.452-.468 2.52-1.4 3.118-2.854.192-.469.286-.96.335-1.457.048-.5.077-1.003.077-1.507.002-4.168 0-8.336 0-12.504zm-4.653 6.457l-.003 4.29c0 1.474-1.057 2.642-2.495 2.76-1.017.083-1.956-.328-2.37-1.19-.374-.78-.148-1.507.528-2.095.497-.432 1.097-.635 1.738-.69.15-.013.302-.015.453-.013.208 0 .414.01.623.026v-3.912l-5.968 1.222v5.207c0 1.483-1.053 2.655-2.5 2.776-1.02.086-1.965-.324-2.382-1.187-.374-.774-.148-1.498.526-2.083.495-.43 1.093-.632 1.732-.687.15-.013.3-.015.45-.013.21 0 .418.01.628.026v-7.108l10.04-2.053v4.524z" }) }),
      className: "apple-music-btn"
    },
    {
      name: "Amazon Music",
      url: "https://music.amazon.com/artists/B0DM4NY4VZ/ismael-guimarais",
      icon: /* @__PURE__ */ jsx("svg", { viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M3.333 14.235c0-3.897 1.955-6.948 5.53-6.948 2.289 0 3.491 1.357 3.491 1.357V1.191h3.874v15.52c0 .464.189.68.681.68h.244v3.298c-.464.042-.927.085-1.347.127-1.37.127-2.027-.34-2.448-1.399 0 0-1.283 1.655-4.226 1.655C5.415 21.072 3.333 18.9 3.333 14.234zm8.979-.042V11.32c0-.636-.464-1.103-1.103-1.103-1.582 0-2.575 1.442-2.575 4.06 0 2.703.993 4.06 2.575 4.06 1.158 0 1.103-1.358 1.103-1.91v-2.233zm9.282 4.86c-.888 1.358-2.065 2.234-3.787 2.234-2.277 0-3.32-1.442-3.32-3.617V7.356h3.916v9.915c0 .764.255 1.018.764 1.018.721 0 1.485-.721 1.485-1.23V7.356h3.916v10.102c0 .467.127.683.676.683h.296v3.319c-.508.04-.97.085-1.4.127-.845.08-1.59-.178-2.107-1.23l-.439-.628z" }) }),
      className: "amazon-music-btn"
    },
    {
      name: "YouTube Music",
      url: "https://music.youtube.com/channel/UCOxCzNODE1o-tqtZRKYYa6g",
      icon: /* @__PURE__ */ jsx("svg", { viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M12 0C5.376 0 0 5.376 0 12s5.376 12 12 12 12-5.376 12-12S18.624 0 12 0zm0 19.104c-3.924 0-7.104-3.18-7.104-7.104S8.076 4.896 12 4.896s7.104 3.18 7.104 7.104-3.18 7.104-7.104 7.104zm0-13.332c-3.432 0-6.228 2.796-6.228 6.228S8.568 18.228 12 18.228s6.228-2.796 6.228-6.228S15.432 5.772 12 5.772zM9.684 15.54V8.46L15.816 12l-6.132 3.54z" }) }),
      className: "youtube-music-btn"
    },
    {
      name: "Deezer",
      url: "https://www.deezer.com/artist/280355925",
      icon: /* @__PURE__ */ jsx("svg", { viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M18.81 4.16v3.03h5.19V4.16h-5.19zm0 4.75v3.03h5.19V8.91h-5.19zm0 4.75v3.03h5.19v-3.03h-5.19zm0 4.75v3.03h5.19v-3.03h-5.19zM12.14 4.16v3.03h5.19V4.16h-5.19zm0 4.75v3.03h5.19V8.91h-5.19zm0 4.75v3.03h5.19v-3.03h-5.19zm0 4.75v3.03h5.19v-3.03h-5.19zM5.47 4.16v3.03h5.19V4.16H5.47zm0 4.75v3.03h5.19V8.91H5.47zm0 4.75v3.03h5.19v-3.03H5.47zm0 4.75v3.03h5.19v-3.03H5.47zM0 8.91v3.03h4.09V8.91H0zm0 4.75v3.03h4.09v-3.03H0zm0 4.75v3.03h4.09v-3.03H0z" }) }),
      className: "deezer-btn"
    }
  ];
  return /* @__PURE__ */ jsx("main", { className: "conecta-page", children: /* @__PURE__ */ jsxs("div", { className: "conecta-container", children: [
    /* @__PURE__ */ jsxs("div", { className: "conecta-profile-header", "data-reveal": true, children: [
      /* @__PURE__ */ jsx(
        "img",
        {
          src: "/ismael-professional.jpg",
          alt: "Ismael Guimarais",
          className: "conecta-profile-image"
        }
      ),
      /* @__PURE__ */ jsx("h1", { className: "conecta-profile-name", children: "Ismael Guimarais" }),
      /* @__PURE__ */ jsx("p", { className: "conecta-profile-bio", children: "Creador de contenido, músico y analista cultural" }),
      /* @__PURE__ */ jsx("p", { className: "conecta-profile-description", children: "Hacks del buen vivir a través de música, filosofía e historia" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "conecta-email-section", "data-reveal": true, children: /* @__PURE__ */ jsxs(
      "a",
      {
        href: "mailto:hola@ismaelguimarais.com",
        className: "conecta-email-button",
        "data-analytics": "conecta-email",
        children: [
          /* @__PURE__ */ jsxs("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [
            /* @__PURE__ */ jsx("path", { d: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" }),
            /* @__PURE__ */ jsx("polyline", { points: "22,6 12,13 2,6" })
          ] }),
          "Enviar un Correo"
        ]
      }
    ) }),
    /* @__PURE__ */ jsxs("div", { className: "conecta-links-section", "data-reveal": true, children: [
      /* @__PURE__ */ jsx("h2", { className: "conecta-section-title", children: "Redes Sociales" }),
      /* @__PURE__ */ jsx("div", { className: "conecta-social-buttons", children: socialLinks.map((link) => /* @__PURE__ */ jsxs(
        "a",
        {
          href: link.url,
          target: "_blank",
          rel: "noopener noreferrer",
          className: `conecta-social-link conecta-social-link--${link.className}`,
          "data-analytics": `conecta-social-${link.className}`,
          children: [
            /* @__PURE__ */ jsx("span", { className: "conecta-social-icon", children: link.icon }),
            /* @__PURE__ */ jsxs("span", { className: "conecta-social-text", children: [
              /* @__PURE__ */ jsx("span", { className: "conecta-social-name", children: link.name }),
              /* @__PURE__ */ jsx("span", { className: "conecta-social-handle", children: link.handle })
            ] })
          ]
        },
        link.name
      )) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "conecta-music-section", "data-reveal": true, children: [
      /* @__PURE__ */ jsx("h2", { className: "conecta-section-title", children: "Escucha Mi Música" }),
      /* @__PURE__ */ jsx("div", { className: "conecta-music-buttons", children: musicPlatforms.map((platform) => /* @__PURE__ */ jsxs(
        "a",
        {
          href: platform.url,
          target: "_blank",
          rel: "noopener noreferrer",
          className: `conecta-music-link conecta-music-link--${platform.className}`,
          "data-analytics": `conecta-music-${platform.className}`,
          children: [
            /* @__PURE__ */ jsx("span", { className: "conecta-music-icon", children: platform.icon }),
            /* @__PURE__ */ jsx("span", { children: platform.name })
          ]
        },
        platform.name
      )) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "conecta-newsletter-section", "data-reveal": true, children: /* @__PURE__ */ jsxs("div", { className: "conecta-newsletter-card", children: [
      /* @__PURE__ */ jsx("h2", { children: "Newsletter Semanal" }),
      /* @__PURE__ */ jsx("p", { children: "Recibe reflexiones profundas, análisis culturales y contenido exclusivo directo en tu inbox cada semana." }),
      /* @__PURE__ */ jsx("a", { href: "/#newsletter", className: "button button--primary", children: "Suscribirme al Newsletter" })
    ] }) }),
    /* @__PURE__ */ jsx("footer", { className: "conecta-footer", "data-reveal": true, children: /* @__PURE__ */ jsxs("p", { children: [
      "Hecho con ❤️ · ",
      /* @__PURE__ */ jsx("a", { href: "/", children: "ismaelguimarais.com" })
    ] }) })
  ] }) });
}
const route9 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Conecta,
  loader: loader$4,
  meta: meta$4
}, Symbol.toStringTag, { value: "Module" }));
function ContentGrid({ latestVideo, youtubeStats }) {
  return /* @__PURE__ */ jsx("section", { className: "content-grid-section", children: /* @__PURE__ */ jsxs("div", { className: "container", children: [
    /* @__PURE__ */ jsx("h2", { className: "section-title", children: "Contenido gratuito para ti" }),
    /* @__PURE__ */ jsx("p", { className: "section-subtitle", children: "Sígueme, escucha y únete a la comunidad" }),
    /* @__PURE__ */ jsxs("div", { className: "content-grid", children: [
      latestVideo && /* @__PURE__ */ jsxs("div", { className: "content-card featured-video", children: [
        /* @__PURE__ */ jsx("div", { className: "card-badge", children: "Nuevo video" }),
        /* @__PURE__ */ jsxs(
          "a",
          {
            href: latestVideo.url,
            target: "_blank",
            rel: "noopener noreferrer",
            className: "video-thumbnail-link",
            children: [
              /* @__PURE__ */ jsxs("div", { className: "thumbnail-wrapper", children: [
                /* @__PURE__ */ jsx(
                  "img",
                  {
                    src: latestVideo.thumbnail,
                    alt: latestVideo.title,
                    className: "video-thumbnail"
                  }
                ),
                /* @__PURE__ */ jsx("div", { className: "play-overlay", children: /* @__PURE__ */ jsx("svg", { className: "play-icon", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M8 5v14l11-7z" }) }) })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "video-info", children: [
                /* @__PURE__ */ jsx("h3", { className: "video-title", children: latestVideo.title }),
                /* @__PURE__ */ jsxs("p", { className: "video-views", children: [
                  latestVideo.views,
                  " visualizaciones"
                ] })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "a",
          {
            href: "https://youtube.com/@IsmaelGuimarais",
            target: "_blank",
            rel: "noopener noreferrer",
            className: "cta-button youtube-cta",
            children: [
              /* @__PURE__ */ jsx("svg", { className: "icon", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" }) }),
              "Ver todos los videos"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "content-card socials-card", children: [
        /* @__PURE__ */ jsx("div", { className: "card-badge", children: "Sígueme" }),
        /* @__PURE__ */ jsx("h3", { className: "card-title", children: "Redes sociales" }),
        /* @__PURE__ */ jsx("p", { className: "card-description", children: "Únete a la comunidad en todas las plataformas" }),
        /* @__PURE__ */ jsxs("div", { className: "social-buttons-grid", children: [
          /* @__PURE__ */ jsxs(
            "a",
            {
              href: "https://youtube.com/@IsmaelGuimarais",
              target: "_blank",
              rel: "noopener noreferrer",
              className: "social-button youtube",
              children: [
                /* @__PURE__ */ jsx("svg", { className: "social-icon", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" }) }),
                /* @__PURE__ */ jsx("span", { children: "YouTube" })
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "a",
            {
              href: "https://instagram.com/ismaguimarais",
              target: "_blank",
              rel: "noopener noreferrer",
              className: "social-button instagram",
              children: [
                /* @__PURE__ */ jsx("svg", { className: "social-icon", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" }) }),
                /* @__PURE__ */ jsx("span", { children: "Instagram" })
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "a",
            {
              href: "https://tiktok.com/@ismaelguimarais",
              target: "_blank",
              rel: "noopener noreferrer",
              className: "social-button tiktok",
              children: [
                /* @__PURE__ */ jsx("svg", { className: "social-icon", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" }) }),
                /* @__PURE__ */ jsx("span", { children: "TikTok" })
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "a",
            {
              href: "https://x.com/IsmaGuimarais",
              target: "_blank",
              rel: "noopener noreferrer",
              className: "social-button x",
              children: [
                /* @__PURE__ */ jsx("svg", { className: "social-icon", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" }) }),
                /* @__PURE__ */ jsx("span", { children: "X (Twitter)" })
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "a",
            {
              href: "https://threads.net/@ismaguimarais",
              target: "_blank",
              rel: "noopener noreferrer",
              className: "social-button threads",
              children: [
                /* @__PURE__ */ jsx("svg", { className: "social-icon", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.78 3.631 2.693 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.964-.065-1.19.408-2.285 1.33-3.082.88-.76 2.119-1.207 3.583-1.291a13.853 13.853 0 0 1 3.02.142l-.126 2.006c-.877-.108-1.83-.155-2.746-.126-.965.03-1.8.284-2.408.733-.608.45-.92 1.05-.901 1.736.02.687.366 1.27.997 1.683.632.413 1.487.635 2.472.635 1.076-.027 1.933-.39 2.544-1.078.611-.688.977-1.68 1.09-2.95.054-.618.077-1.277.077-1.971 0-2.876-.69-4.79-2.053-5.693-1.364-.903-3.44-1.364-6.185-1.364h-.014z" }) }),
                /* @__PURE__ */ jsx("span", { children: "Threads" })
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "a",
            {
              href: "https://facebook.com/IsmaelGuimarais",
              target: "_blank",
              rel: "noopener noreferrer",
              className: "social-button facebook",
              children: [
                /* @__PURE__ */ jsx("svg", { className: "social-icon", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" }) }),
                /* @__PURE__ */ jsx("span", { children: "Facebook" })
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "a",
            {
              href: "https://t.me/ismaguimarais",
              target: "_blank",
              rel: "noopener noreferrer",
              className: "social-button telegram",
              children: [
                /* @__PURE__ */ jsx("svg", { className: "social-icon", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" }) }),
                /* @__PURE__ */ jsx("span", { children: "Telegram" })
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "content-card music-platforms-card", children: [
        /* @__PURE__ */ jsx("div", { className: "card-badge", children: "Escúchame en todas partes" }),
        /* @__PURE__ */ jsx("h3", { className: "card-title", children: "Mi música" }),
        /* @__PURE__ */ jsx("p", { className: "card-description", children: "Encuentra mis canciones en tu plataforma favorita" }),
        /* @__PURE__ */ jsxs("div", { className: "music-platforms-grid", children: [
          /* @__PURE__ */ jsxs(
            "a",
            {
              href: "https://open.spotify.com/intl-es/artist/6FBiAmYUgClucZddGctkwd",
              target: "_blank",
              rel: "noopener noreferrer",
              className: "music-platform-button spotify-btn",
              children: [
                /* @__PURE__ */ jsx("svg", { className: "platform-icon", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" }) }),
                /* @__PURE__ */ jsx("span", { children: "Spotify" })
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "a",
            {
              href: "https://music.apple.com/us/album/amor-princesa/1673165177?i=1673165178",
              target: "_blank",
              rel: "noopener noreferrer",
              className: "music-platform-button apple-music-btn",
              children: [
                /* @__PURE__ */ jsx("svg", { className: "platform-icon", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M23.997 6.124c0-.738-.065-1.47-.24-2.19-.317-1.31-1.062-2.31-2.18-3.043C21.003.517 20.373.285 19.7.164c-.517-.093-1.038-.135-1.564-.15-.04-.003-.083-.01-.124-.013H5.988c-.152.01-.303.017-.455.026C4.786.07 4.043.15 3.34.428 2.004.958 1.04 1.88.475 3.208c-.192.448-.292.925-.363 1.408-.056.392-.088.785-.1 1.18 0 .032-.007.062-.01.093v12.223c.01.14.017.283.027.424.05.815.154 1.624.497 2.373.65 1.42 1.738 2.353 3.234 2.801.42.127.856.187 1.293.228.555.055 1.114.091 1.673.1h11.717c.2-.007.4-.01.597-.02.772-.035 1.537-.106 2.265-.34 1.452-.468 2.52-1.4 3.118-2.854.192-.469.286-.96.335-1.457.048-.5.077-1.003.077-1.507.002-4.168 0-8.336 0-12.504zm-4.653 6.457l-.003 4.29c0 1.474-1.057 2.642-2.495 2.76-1.017.083-1.956-.328-2.37-1.19-.374-.78-.148-1.507.528-2.095.497-.432 1.097-.635 1.738-.69.15-.013.302-.015.453-.013.208 0 .414.01.623.026v-3.912l-5.968 1.222v5.207c0 1.483-1.053 2.655-2.5 2.776-1.02.086-1.965-.324-2.382-1.187-.374-.774-.148-1.498.526-2.083.495-.43 1.093-.632 1.732-.687.15-.013.3-.015.45-.013.21 0 .418.01.628.026v-7.108l10.04-2.053v4.524z" }) }),
                /* @__PURE__ */ jsx("span", { children: "Apple Music" })
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "a",
            {
              href: "https://music.youtube.com/channel/UCX-0vZliN8aUFGyr_WGxndA",
              target: "_blank",
              rel: "noopener noreferrer",
              className: "music-platform-button youtube-music-btn",
              children: [
                /* @__PURE__ */ jsx("svg", { className: "platform-icon", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M12 0C5.376 0 0 5.376 0 12s5.376 12 12 12 12-5.376 12-12S18.624 0 12 0zm0 19.104c-3.924 0-7.104-3.18-7.104-7.104S8.076 4.896 12 4.896s7.104 3.18 7.104 7.104-3.18 7.104-7.104 7.104zm0-13.332c-3.432 0-6.228 2.796-6.228 6.228S8.568 18.228 12 18.228s6.228-2.796 6.228-6.228S15.432 5.772 12 5.772zM9.684 15.54V8.46L15.816 12l-6.132 3.54z" }) }),
                /* @__PURE__ */ jsx("span", { children: "YouTube Music" })
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "a",
            {
              href: "https://www.deezer.com/search/Ismael%20Guimarais",
              target: "_blank",
              rel: "noopener noreferrer",
              className: "music-platform-button deezer-btn",
              children: [
                /* @__PURE__ */ jsx("svg", { className: "platform-icon", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M18.81 1.234h5.19v2.994h-5.19V1.234zm0 4.29h5.19v2.994h-5.19V5.524zm0 4.288h5.19v2.996h-5.19V9.812zm0 4.29h5.19v2.995h-5.19v-2.996zm0 4.288h5.19v2.996h-5.19v-2.996zM12.405 9.812h5.19v2.996h-5.19V9.812zm0 4.29h5.19v2.995h-5.19v-2.996zm0 4.288h5.19v2.996h-5.19v-2.996zM6 14.1h5.19v2.995H6V14.1zm0 4.288h5.19v2.996H6v-2.996zM0 18.39h5.19v2.996H0v-2.996z" }) }),
                /* @__PURE__ */ jsx("span", { children: "Deezer" })
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "a",
            {
              href: "https://music.amazon.com/search/Ismael%20Guimarais",
              target: "_blank",
              rel: "noopener noreferrer",
              className: "music-platform-button amazon-music-btn",
              children: [
                /* @__PURE__ */ jsx("svg", { className: "platform-icon", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M3.333 14.235c0-3.897 1.955-6.948 5.53-6.948 2.289 0 3.491 1.357 3.491 1.357V1.191h3.874v15.52c0 .464.189.68.681.68h.244v3.298c-.464.042-.927.085-1.347.127-1.37.127-2.027-.34-2.448-1.399 0 0-1.283 1.655-4.226 1.655C5.415 21.072 3.333 18.9 3.333 14.234zm8.979-.042V11.32c0-.636-.464-1.103-1.103-1.103-1.582 0-2.575 1.442-2.575 4.06 0 2.703.993 4.06 2.575 4.06 1.158 0 1.103-1.358 1.103-1.91v-2.233zm9.282 4.86c-.888 1.358-2.065 2.234-3.787 2.234-2.277 0-3.32-1.442-3.32-3.617V7.356h3.916v9.915c0 .764.255 1.018.764 1.018.721 0 1.485-.721 1.485-1.23V7.356h3.916v10.102c0 .467.127.683.676.683h.296v3.319c-.508.04-.97.085-1.4.127-.845.08-1.59-.178-2.107-1.23l-.439-.628z" }) }),
                /* @__PURE__ */ jsx("span", { children: "Amazon Music" })
              ]
            }
          )
        ] })
      ] })
    ] })
  ] }) });
}
const DEFAULT_SITE$2 = "https://ismaelguimarais.com";
const DEFAULT_OG_IMAGE$2 = `${DEFAULT_SITE$2}/og-default.jpg`;
const NUMBER_FORMATTER = new Intl.NumberFormat("es-ES");
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
async function loader$3() {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k;
  const YT_KEY = process.env.YOUTUBE_API_KEY;
  const YT_CHANNEL = process.env.YOUTUBE_CHANNEL_ID;
  const site = process.env.PUBLIC_SITE_URL ?? DEFAULT_SITE$2;
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
      const stats = (_b = (_a = cdata == null ? void 0 : cdata.items) == null ? void 0 : _a[0]) == null ? void 0 : _b.statistics;
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
      const vid = (_e = (_d = (_c = sdata == null ? void 0 : sdata.items) == null ? void 0 : _c[0]) == null ? void 0 : _d.id) == null ? void 0 : _e.videoId;
      if (vid) {
        const vurl = new URL("https://www.googleapis.com/youtube/v3/videos");
        vurl.searchParams.set("key", YT_KEY);
        vurl.searchParams.set("id", vid);
        vurl.searchParams.set("part", "snippet,statistics");
        const vres = await fetch(vurl);
        const vdata = await vres.json();
        const video = (_f = vdata == null ? void 0 : vdata.items) == null ? void 0 : _f[0];
        if (video) {
          const views = Number(((_g = video.statistics) == null ? void 0 : _g.viewCount) || 0);
          const viewsFormatted = new Intl.NumberFormat("es-ES").format(views);
          latest = {
            id: vid,
            title: (_h = video.snippet) == null ? void 0 : _h.title,
            views,
            viewsFormatted,
            thumbnail: (_k = (_j = (_i = video.snippet) == null ? void 0 : _i.thumbnails) == null ? void 0 : _j.high) == null ? void 0 : _k.url,
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
function Index() {
  const loaderData = useLoaderData();
  const youtubeStats = loaderData.youtubeStats ?? null;
  const subscriberCount = (youtubeStats == null ? void 0 : youtubeStats.subscriberCount) ?? 0;
  const videoCount = (youtubeStats == null ? void 0 : youtubeStats.videoCount) ?? 0;
  (youtubeStats == null ? void 0 : youtubeStats.viewCount) ?? 0;
  const formattedSubscriberCount = subscriberCount ? `${NUMBER_FORMATTER.format(subscriberCount)}+` : "—";
  const formattedVideoCount = videoCount ? NUMBER_FORMATTER.format(videoCount) : "—";
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
        /* @__PURE__ */ jsx("h1", { id: "hero-heading", className: "hero__title", children: "Contenido gratuito para pensar mejor" }),
        /* @__PURE__ */ jsx("p", { className: "hero__subtitle", children: "Videoensayos, música y reflexiones. Sígueme en redes y únete a la conversación." }),
        /* @__PURE__ */ jsxs("div", { className: "hero__cta-group", children: [
          /* @__PURE__ */ jsxs(
            "a",
            {
              className: "button button--primary button--large",
              href: "https://youtube.com/@IsmaelGuimarais",
              target: "_blank",
              rel: "noopener noreferrer",
              "data-analytics": "cta_hero_youtube",
              children: [
                /* @__PURE__ */ jsx("svg", { style: { width: "24px", height: "24px", marginRight: "8px" }, viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" }) }),
                "Suscríbete en YouTube"
              ]
            }
          ),
          /* @__PURE__ */ jsx(
            "a",
            {
              className: "button button--secondary button--large",
              href: "#content-grid",
              "data-analytics": "cta_hero_explorar",
              children: "Explorar contenido"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "hero__stats-compact", children: [
          /* @__PURE__ */ jsxs("div", { className: "stat-item-inline", children: [
            /* @__PURE__ */ jsx("strong", { children: formattedSubscriberCount }),
            /* @__PURE__ */ jsx("span", { children: "suscriptores" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "stat-item-inline", children: [
            /* @__PURE__ */ jsx("strong", { children: formattedVideoCount }),
            /* @__PURE__ */ jsx("span", { children: "videos" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "stat-item-inline", children: [
            /* @__PURE__ */ jsx("strong", { children: "100%" }),
            /* @__PURE__ */ jsx("span", { children: "independiente" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "scroll-indicator", "aria-hidden": true })
    ] }),
    /* @__PURE__ */ jsx("div", { id: "content-grid", children: /* @__PURE__ */ jsx(
      ContentGrid,
      {
        latestVideo: loaderData.latestVideo,
        youtubeStats: loaderData.youtubeStats
      }
    ) }),
    /* @__PURE__ */ jsx("section", { className: "section", id: "intro", "data-reveal": true, children: /* @__PURE__ */ jsxs("div", { className: "card split", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h2", { children: "Hola, soy Ismael" }),
        /* @__PURE__ */ jsx("p", { children: "Nací en Cuba y entendí pronto que la libertad de pensamiento no es un lujo, es un derecho. Hoy, desde México, combino análisis cultural con música para explorar qué nos hace humanos. Creo que la razón bien usada fortalece la fe y que podemos tener conversaciones profundas sin perder la esperanza." })
      ] }),
      /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("img", { src: "/ismael-professional.jpg", alt: "Retrato de Ismael Guimarais", className: "intro-image", loading: "lazy" }) })
    ] }) }),
    /* @__PURE__ */ jsxs("section", { className: "section", id: "contenido", "data-reveal": true, children: [
      /* @__PURE__ */ jsx("h2", { children: "Lo que hago" }),
      /* @__PURE__ */ jsxs("div", { className: "three-col", children: [
        /* @__PURE__ */ jsxs("article", { className: "card", children: [
          /* @__PURE__ */ jsx("h3", { children: "Videoensayos" }),
          /* @__PURE__ */ jsx("p", { children: "Análisis semanales sobre transformaciones políticas, culturales y espirituales. Conecto los puntos entre economía y ética, política y principios. Sin filtros partidistas, solo búsqueda honesta de la verdad." }),
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
          /* @__PURE__ */ jsx("p", { children: "Canciones que nacen cuando el análisis no basta. Cada mes, una composición original sobre la búsqueda de propósito en tiempos de cambio." }),
          /* @__PURE__ */ jsxs("div", { className: "music-platforms-compact", children: [
            /* @__PURE__ */ jsx("p", { style: { fontSize: "var(--text-sm)", color: "var(--gray-600)", marginBottom: "var(--space-3)" }, children: "Disponible en:" }),
            /* @__PURE__ */ jsxs("div", { className: "platform-icons-row", children: [
              /* @__PURE__ */ jsx("a", { href: "https://open.spotify.com/intl-es/artist/6FBiAmYUgClucZddGctkwd", target: "_blank", rel: "noopener noreferrer", title: "Spotify", className: "platform-icon-link spotify", children: /* @__PURE__ */ jsx("svg", { viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" }) }) }),
              /* @__PURE__ */ jsx("a", { href: "https://music.apple.com/us/album/amor-princesa/1673165177?i=1673165178", target: "_blank", rel: "noopener noreferrer", title: "Apple Music", className: "platform-icon-link apple", children: /* @__PURE__ */ jsx("svg", { viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M23.997 6.124c0-.738-.065-1.47-.24-2.19-.317-1.31-1.062-2.31-2.18-3.043C21.003.517 20.373.285 19.7.164c-.517-.093-1.038-.135-1.564-.15-.04-.003-.083-.01-.124-.013H5.988c-.152.01-.303.017-.455.026C4.786.07 4.043.15 3.34.428 2.004.958 1.04 1.88.475 3.208c-.192.448-.292.925-.363 1.408-.056.392-.088.785-.1 1.18 0 .032-.007.062-.01.093v12.223c.01.14.017.283.027.424.05.815.154 1.624.497 2.373.65 1.42 1.738 2.353 3.234 2.801.42.127.856.187 1.293.228.555.055 1.114.091 1.673.1h11.717c.2-.007.4-.01.597-.02.772-.035 1.537-.106 2.265-.34 1.452-.468 2.52-1.4 3.118-2.854.192-.469.286-.96.335-1.457.048-.5.077-1.003.077-1.507.002-4.168 0-8.336 0-12.504zm-4.653 6.457l-.003 4.29c0 1.474-1.057 2.642-2.495 2.76-1.017.083-1.956-.328-2.37-1.19-.374-.78-.148-1.507.528-2.095.497-.432 1.097-.635 1.738-.69.15-.013.302-.015.453-.013.208 0 .414.01.623.026v-3.912l-5.968 1.222v5.207c0 1.483-1.053 2.655-2.5 2.776-1.02.086-1.965-.324-2.382-1.187-.374-.774-.148-1.498.526-2.083.495-.43 1.093-.632 1.732-.687.15-.013.3-.015.45-.013.21 0 .418.01.628.026v-7.108l10.04-2.053v4.524z" }) }) }),
              /* @__PURE__ */ jsx("a", { href: "https://music.youtube.com/channel/UCX-0vZliN8aUFGyr_WGxndA", target: "_blank", rel: "noopener noreferrer", title: "YouTube Music", className: "platform-icon-link youtube", children: /* @__PURE__ */ jsx("svg", { viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M12 0C5.376 0 0 5.376 0 12s5.376 12 12 12 12-5.376 12-12S18.624 0 12 0zm0 19.104c-3.924 0-7.104-3.18-7.104-7.104S8.076 4.896 12 4.896s7.104 3.18 7.104 7.104-3.18 7.104-7.104 7.104zm0-13.332c-3.432 0-6.228 2.796-6.228 6.228S8.568 18.228 12 18.228s6.228-2.796 6.228-6.228S15.432 5.772 12 5.772zM9.684 15.54V8.46L15.816 12l-6.132 3.54z" }) }) }),
              /* @__PURE__ */ jsx("a", { href: "https://www.deezer.com/search/Ismael%20Guimarais", target: "_blank", rel: "noopener noreferrer", title: "Deezer", className: "platform-icon-link deezer", children: /* @__PURE__ */ jsx("svg", { viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M18.81 1.234h5.19v2.994h-5.19V1.234zm0 4.29h5.19v2.994h-5.19V5.524zm0 4.288h5.19v2.996h-5.19V9.812zm0 4.29h5.19v2.995h-5.19v-2.996zm0 4.288h5.19v2.996h-5.19v-2.996zM12.405 9.812h5.19v2.996h-5.19V9.812zm0 4.29h5.19v2.995h-5.19v-2.996zm0 4.288h5.19v2.996h-5.19v-2.996zM6 14.1h5.19v2.995H6V14.1zm0 4.288h5.19v2.996H6v-2.996zM0 18.39h5.19v2.996H0v-2.996z" }) }) }),
              /* @__PURE__ */ jsx("a", { href: "https://music.amazon.com/search/Ismael%20Guimarais", target: "_blank", rel: "noopener noreferrer", title: "Amazon Music", className: "platform-icon-link amazon", children: /* @__PURE__ */ jsx("svg", { viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M3.333 14.235c0-3.897 1.955-6.948 5.53-6.948 2.289 0 3.491 1.357 3.491 1.357V1.191h3.874v15.52c0 .464.189.68.681.68h.244v3.298c-.464.042-.927.085-1.347.127-1.37.127-2.027-.34-2.448-1.399 0 0-1.283 1.655-4.226 1.655C5.415 21.072 3.333 18.9 3.333 14.234zm8.979-.042V11.32c0-.636-.464-1.103-1.103-1.103-1.582 0-2.575 1.442-2.575 4.06 0 2.703.993 4.06 2.575 4.06 1.158 0 1.103-1.358 1.103-1.91v-2.233zm9.282 4.86c-.888 1.358-2.065 2.234-3.787 2.234-2.277 0-3.32-1.442-3.32-3.617V7.356h3.916v9.915c0 .764.255 1.018.764 1.018.721 0 1.485-.721 1.485-1.23V7.356h3.916v10.102c0 .467.127.683.676.683h.296v3.319c-.508.04-.97.085-1.4.127-.845.08-1.59-.178-2.107-1.23l-.439-.628z" }) }) })
            ] })
          ] }),
          /* @__PURE__ */ jsx("a", { className: "link-arrow", href: "/music", "data-analytics": "cta_escuchar_mas", children: "Escuchar en todas las plataformas" })
        ] }),
        /* @__PURE__ */ jsxs("article", { className: "card", id: "newsletter", children: [
          /* @__PURE__ */ jsx("h3", { children: "Newsletter" }),
          /* @__PURE__ */ jsx("p", { children: "Reflexiones directas cada semana. Para más de 500 lectores que prefieren pensar por sí mismos. Sin ventas, sin spam. Solo ideas que importan." }),
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
      /* @__PURE__ */ jsx("div", { className: "grid-2x2", children: FEATURED_ITEMS.map(({ badge, badgeTone, title, meta: meta2, href, analytics, thumbnail, icon }) => {
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
              thumbnail && /* @__PURE__ */ jsx("div", { className: "featured-thumbnail", children: /* @__PURE__ */ jsx("img", { src: thumbnail, alt: title, loading: "lazy" }) }),
              /* @__PURE__ */ jsxs("div", { className: "featured-content", children: [
                /* @__PURE__ */ jsx("span", { className: badgeClass, children: badge }),
                /* @__PURE__ */ jsx("strong", { children: title }),
                /* @__PURE__ */ jsxs("div", { className: "featured-meta", children: [
                  icon === "whatsapp" && /* @__PURE__ */ jsx("svg", { style: { width: "18px", height: "18px", marginRight: "6px", verticalAlign: "middle" }, viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" }) }),
                  meta2
                ] })
              ] })
            ]
          },
          title
        );
      }) })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "section", "aria-label": "Redes y footer", children: /* @__PURE__ */ jsxs("footer", { children: [
      /* @__PURE__ */ jsxs("p", { children: [
        '"El camino angosto sigue siendo el correcto."',
        /* @__PURE__ */ jsx("br", {}),
        "— Ismael Guimarais"
      ] }),
      /* @__PURE__ */ jsxs("p", { children: [
        "© ",
        (/* @__PURE__ */ new Date()).getFullYear(),
        " Ismael Guimarais · Cuba 🇨🇺 → México 🇲🇽"
      ] })
    ] }) })
  ] });
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
const route10 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
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
  return /* @__PURE__ */ jsxs("main", { className: "section", children: [
    /* @__PURE__ */ jsxs("div", { className: "card", children: [
      /* @__PURE__ */ jsx("h1", { children: "Música y lanzamientos" }),
      /* @__PURE__ */ jsx("p", { children: 'Cada canción es una crónica sobre cómo la razón y la fe caminan juntas. "Muy Civilizado" es el single más reciente; cuenta la historia de un buscador que necesita reconciliar su corazón con Dios.' })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "card", style: { marginTop: "var(--space-8)" }, children: [
      /* @__PURE__ */ jsx("h2", { style: { fontSize: "var(--text-2xl)", marginBottom: "var(--space-6)" }, children: "Escúchame en todas las plataformas" }),
      /* @__PURE__ */ jsxs("div", { className: "music-platforms-grid", children: [
        /* @__PURE__ */ jsxs(
          "a",
          {
            href: "https://open.spotify.com/intl-es/artist/6FBiAmYUgClucZddGctkwd",
            target: "_blank",
            rel: "noopener noreferrer",
            className: "music-platform-button spotify-btn",
            children: [
              /* @__PURE__ */ jsx("svg", { className: "platform-icon", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" }) }),
              /* @__PURE__ */ jsx("span", { children: "Spotify" })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "a",
          {
            href: "https://music.apple.com/us/album/amor-princesa/1673165177?i=1673165178",
            target: "_blank",
            rel: "noopener noreferrer",
            className: "music-platform-button apple-music-btn",
            children: [
              /* @__PURE__ */ jsx("svg", { className: "platform-icon", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M23.997 6.124c0-.738-.065-1.47-.24-2.19-.317-1.31-1.062-2.31-2.18-3.043C21.003.517 20.373.285 19.7.164c-.517-.093-1.038-.135-1.564-.15-.04-.003-.083-.01-.124-.013H5.988c-.152.01-.303.017-.455.026C4.786.07 4.043.15 3.34.428 2.004.958 1.04 1.88.475 3.208c-.192.448-.292.925-.363 1.408-.056.392-.088.785-.1 1.18 0 .032-.007.062-.01.093v12.223c.01.14.017.283.027.424.05.815.154 1.624.497 2.373.65 1.42 1.738 2.353 3.234 2.801.42.127.856.187 1.293.228.555.055 1.114.091 1.673.1h11.717c.2-.007.4-.01.597-.02.772-.035 1.537-.106 2.265-.34 1.452-.468 2.52-1.4 3.118-2.854.192-.469.286-.96.335-1.457.048-.5.077-1.003.077-1.507.002-4.168 0-8.336 0-12.504zm-4.653 6.457l-.003 4.29c0 1.474-1.057 2.642-2.495 2.76-1.017.083-1.956-.328-2.37-1.19-.374-.78-.148-1.507.528-2.095.497-.432 1.097-.635 1.738-.69.15-.013.302-.015.453-.013.208 0 .414.01.623.026v-3.912l-5.968 1.222v5.207c0 1.483-1.053 2.655-2.5 2.776-1.02.086-1.965-.324-2.382-1.187-.374-.774-.148-1.498.526-2.083.495-.43 1.093-.632 1.732-.687.15-.013.3-.015.45-.013.21 0 .418.01.628.026v-7.108l10.04-2.053v4.524z" }) }),
              /* @__PURE__ */ jsx("span", { children: "Apple Music" })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "a",
          {
            href: "https://music.youtube.com/channel/UCX-0vZliN8aUFGyr_WGxndA",
            target: "_blank",
            rel: "noopener noreferrer",
            className: "music-platform-button youtube-music-btn",
            children: [
              /* @__PURE__ */ jsx("svg", { className: "platform-icon", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M12 0C5.376 0 0 5.376 0 12s5.376 12 12 12 12-5.376 12-12S18.624 0 12 0zm0 19.104c-3.924 0-7.104-3.18-7.104-7.104S8.076 4.896 12 4.896s7.104 3.18 7.104 7.104-3.18 7.104-7.104 7.104zm0-13.332c-3.432 0-6.228 2.796-6.228 6.228S8.568 18.228 12 18.228s6.228-2.796 6.228-6.228S15.432 5.772 12 5.772zM9.684 15.54V8.46L15.816 12l-6.132 3.54z" }) }),
              /* @__PURE__ */ jsx("span", { children: "YouTube Music" })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "a",
          {
            href: "https://www.deezer.com/search/Ismael%20Guimarais",
            target: "_blank",
            rel: "noopener noreferrer",
            className: "music-platform-button deezer-btn",
            children: [
              /* @__PURE__ */ jsx("svg", { className: "platform-icon", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M18.81 1.234h5.19v2.994h-5.19V1.234zm0 4.29h5.19v2.994h-5.19V5.524zm0 4.288h5.19v2.996h-5.19V9.812zm0 4.29h5.19v2.995h-5.19v-2.996zm0 4.288h5.19v2.996h-5.19v-2.996zM12.405 9.812h5.19v2.996h-5.19V9.812zm0 4.29h5.19v2.995h-5.19v-2.996zm0 4.288h5.19v2.996h-5.19v-2.996zM6 14.1h5.19v2.995H6V14.1zm0 4.288h5.19v2.996H6v-2.996zM0 18.39h5.19v2.996H0v-2.996z" }) }),
              /* @__PURE__ */ jsx("span", { children: "Deezer" })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "a",
          {
            href: "https://music.amazon.com/search/Ismael%20Guimarais",
            target: "_blank",
            rel: "noopener noreferrer",
            className: "music-platform-button amazon-music-btn",
            children: [
              /* @__PURE__ */ jsx("svg", { className: "platform-icon", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M3.333 14.235c0-3.897 1.955-6.948 5.53-6.948 2.289 0 3.491 1.357 3.491 1.357V1.191h3.874v15.52c0 .464.189.68.681.68h.244v3.298c-.464.042-.927.085-1.347.127-1.37.127-2.027-.34-2.448-1.399 0 0-1.283 1.655-4.226 1.655C5.415 21.072 3.333 18.9 3.333 14.234zm8.979-.042V11.32c0-.636-.464-1.103-1.103-1.103-1.582 0-2.575 1.442-2.575 4.06 0 2.703.993 4.06 2.575 4.06 1.158 0 1.103-1.358 1.103-1.91v-2.233zm9.282 4.86c-.888 1.358-2.065 2.234-3.787 2.234-2.277 0-3.32-1.442-3.32-3.617V7.356h3.916v9.915c0 .764.255 1.018.764 1.018.721 0 1.485-.721 1.485-1.23V7.356h3.916v10.102c0 .467.127.683.676.683h.296v3.319c-.508.04-.97.085-1.4.127-.845.08-1.59-.178-2.107-1.23l-.439-.628z" }) }),
              /* @__PURE__ */ jsx("span", { children: "Amazon Music" })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "a",
          {
            href: TRACK_URL,
            target: "_blank",
            rel: "noopener noreferrer",
            className: "music-platform-button youtube-music-btn",
            style: { gridColumn: "span 2" },
            children: [
              /* @__PURE__ */ jsx("svg", { className: "platform-icon", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" }) }),
              /* @__PURE__ */ jsx("span", { children: "Ver videoclip en YouTube" })
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "card", style: { marginTop: "var(--space-8)" }, children: [
      /* @__PURE__ */ jsx("p", { children: "Suscríbete al newsletter para recibir letras comentadas, partituras y sesiones acústicas antes del estreno público." }),
      /* @__PURE__ */ jsx("a", { className: "button button--primary", href: "/newsletter/confirmacion", style: { marginTop: "var(--space-4)" }, children: "Quiero unirme al newsletter" })
    ] })
  ] });
}
const route11 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
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
  return /* @__PURE__ */ jsxs("main", { className: "section", children: [
    /* @__PURE__ */ jsx("div", { className: "sobre-header", children: /* @__PURE__ */ jsx("h1", { className: "page-title", children: "Sobre Ismael Guimarais" }) }),
    /* @__PURE__ */ jsxs("div", { className: "sobre-content card", children: [
      /* @__PURE__ */ jsx("div", { className: "sobre-image-section", children: /* @__PURE__ */ jsx(
        "img",
        {
          src: "/ismael-professional.jpg",
          alt: "Ismael Guimarais",
          className: "sobre-image"
        }
      ) }),
      /* @__PURE__ */ jsxs("div", { className: "sobre-text-section", children: [
        /* @__PURE__ */ jsx("p", { className: "sobre-intro", children: 'Nací en Cuba y crecí entre libros, música y conversaciones sobre el sentido de la vida. Hoy extraigo "hacks del buen vivir" analizando música, filosofía, historia y cultura para una audiencia hispana que busca profundidad sin rollos.' }),
        /* @__PURE__ */ jsx("p", { className: "sobre-paragraph", children: "Creo videos semanales en YouTube donde convierto letras de canciones, eventos históricos e ideas filosóficas en lecciones prácticas para la vida cotidiana." }),
        /* @__PURE__ */ jsxs("div", { className: "sobre-cta", children: [
          /* @__PURE__ */ jsxs(
            "a",
            {
              href: "https://youtube.com/@IsmaelGuimarais",
              target: "_blank",
              rel: "noopener noreferrer",
              className: "button button--primary",
              children: [
                /* @__PURE__ */ jsx("svg", { style: { width: "20px", height: "20px", marginRight: "8px" }, viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" }) }),
                "Ver mi canal de YouTube"
              ]
            }
          ),
          /* @__PURE__ */ jsx("a", { href: "/#content-grid", className: "button button--secondary", children: "Explorar contenido" })
        ] })
      ] })
    ] })
  ] });
}
const route12 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
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
const route13 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: NotFound,
  loader,
  meta
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-DOWKz9oc.js", "imports": ["/assets/jsx-runtime-BfF-YriY.js", "/assets/components-BecE-BSL.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": true, "module": "/assets/root-Bl2lPRMC.js", "imports": ["/assets/jsx-runtime-BfF-YriY.js", "/assets/components-BecE-BSL.js", "/assets/createLucideIcon-CtW4PRxQ.js"], "css": [] }, "routes/blog.el-mensaje-de-jesus": { "id": "routes/blog.el-mensaje-de-jesus", "parentId": "root", "path": "blog/el-mensaje-de-jesus", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/blog.el-mensaje-de-jesus-ByinMaKF.js", "imports": ["/assets/jsx-runtime-BfF-YriY.js"], "css": [] }, "routes/newsletter.confirmacion": { "id": "routes/newsletter.confirmacion", "parentId": "root", "path": "newsletter/confirmacion", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/newsletter.confirmacion-qXODh4wG.js", "imports": ["/assets/jsx-runtime-BfF-YriY.js"], "css": [] }, "routes/newsletter.gracias": { "id": "routes/newsletter.gracias", "parentId": "root", "path": "newsletter/gracias", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/newsletter.gracias-B_tAkrat.js", "imports": ["/assets/jsx-runtime-BfF-YriY.js"], "css": [] }, "routes/api.newsletter": { "id": "routes/api.newsletter", "parentId": "root", "path": "api/newsletter", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/api.newsletter-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/sitemap[.]xml": { "id": "routes/sitemap[.]xml", "parentId": "root", "path": "sitemap.xml", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/sitemap_._xml-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/robots[.]txt": { "id": "routes/robots[.]txt", "parentId": "root", "path": "robots.txt", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/robots_._txt-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/blog._index": { "id": "routes/blog._index", "parentId": "root", "path": "blog", "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/blog._index-BjhHzajY.js", "imports": ["/assets/jsx-runtime-BfF-YriY.js", "/assets/components-BecE-BSL.js"], "css": [] }, "routes/la-soledad": { "id": "routes/la-soledad", "parentId": "root", "path": "la-soledad", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/la-soledad-DzmL1XB_.js", "imports": ["/assets/jsx-runtime-BfF-YriY.js", "/assets/createLucideIcon-CtW4PRxQ.js"], "css": [] }, "routes/conecta": { "id": "routes/conecta", "parentId": "root", "path": "conecta", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/conecta-DILHPL36.js", "imports": ["/assets/jsx-runtime-BfF-YriY.js"], "css": [] }, "routes/_index": { "id": "routes/_index", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/_index-C267JlWa.js", "imports": ["/assets/jsx-runtime-BfF-YriY.js", "/assets/components-BecE-BSL.js"], "css": [] }, "routes/music": { "id": "routes/music", "parentId": "root", "path": "music", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/music-BagQUQZu.js", "imports": ["/assets/jsx-runtime-BfF-YriY.js"], "css": [] }, "routes/sobre": { "id": "routes/sobre", "parentId": "root", "path": "sobre", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/sobre-D0qKyUDz.js", "imports": ["/assets/jsx-runtime-BfF-YriY.js"], "css": [] }, "routes/404": { "id": "routes/404", "parentId": "root", "path": "404", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/404-R6RDYBwT.js", "imports": ["/assets/jsx-runtime-BfF-YriY.js"], "css": [] } }, "url": "/assets/manifest-ce163c5d.js", "version": "ce163c5d" };
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
  "routes/blog.el-mensaje-de-jesus": {
    id: "routes/blog.el-mensaje-de-jesus",
    parentId: "root",
    path: "blog/el-mensaje-de-jesus",
    index: void 0,
    caseSensitive: void 0,
    module: route1
  },
  "routes/newsletter.confirmacion": {
    id: "routes/newsletter.confirmacion",
    parentId: "root",
    path: "newsletter/confirmacion",
    index: void 0,
    caseSensitive: void 0,
    module: route2
  },
  "routes/newsletter.gracias": {
    id: "routes/newsletter.gracias",
    parentId: "root",
    path: "newsletter/gracias",
    index: void 0,
    caseSensitive: void 0,
    module: route3
  },
  "routes/api.newsletter": {
    id: "routes/api.newsletter",
    parentId: "root",
    path: "api/newsletter",
    index: void 0,
    caseSensitive: void 0,
    module: route4
  },
  "routes/sitemap[.]xml": {
    id: "routes/sitemap[.]xml",
    parentId: "root",
    path: "sitemap.xml",
    index: void 0,
    caseSensitive: void 0,
    module: route5
  },
  "routes/robots[.]txt": {
    id: "routes/robots[.]txt",
    parentId: "root",
    path: "robots.txt",
    index: void 0,
    caseSensitive: void 0,
    module: route6
  },
  "routes/blog._index": {
    id: "routes/blog._index",
    parentId: "root",
    path: "blog",
    index: true,
    caseSensitive: void 0,
    module: route7
  },
  "routes/la-soledad": {
    id: "routes/la-soledad",
    parentId: "root",
    path: "la-soledad",
    index: void 0,
    caseSensitive: void 0,
    module: route8
  },
  "routes/conecta": {
    id: "routes/conecta",
    parentId: "root",
    path: "conecta",
    index: void 0,
    caseSensitive: void 0,
    module: route9
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route10
  },
  "routes/music": {
    id: "routes/music",
    parentId: "root",
    path: "music",
    index: void 0,
    caseSensitive: void 0,
    module: route11
  },
  "routes/sobre": {
    id: "routes/sobre",
    parentId: "root",
    path: "sobre",
    index: void 0,
    caseSensitive: void 0,
    module: route12
  },
  "routes/404": {
    id: "routes/404",
    parentId: "root",
    path: "404",
    index: void 0,
    caseSensitive: void 0,
    module: route13
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
