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
  const title = "Blog - Artículos y reflexiones | Ismael Guimarais";
  const description = "Artículos profundos sobre cultura, fe, política y filosofía. Un espacio para pensar despacio y reflexionar sobre las ideas que importan.";
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

export default function Blog() {
  return (
    <main className="section">
      <article className="blog-article">
        <header className="blog-header">
          <img
            src="/blog-mensaje-jesus.png"
            alt="El Mensaje de Jesús - 1 Juan 1:5"
            className="blog-featured-image"
          />
          <div className="blog-meta">
            <time>2024</time>
            <span className="blog-category">Fe y Teología</span>
          </div>
          <h1 className="blog-title">El Mensaje de Jesús</h1>
          <p className="blog-subtitle">Cómo Juan resumió tres años de ministerio en una sola frase</p>
        </header>

        <div className="blog-content card">
          <p className="blog-intro">
            Pareciera imposible resumir la enseñanza de Jesucristo en unas pocas palabras. A fin de cuenta Él es Dios encarnado. ¿Cómo podríamos encapsular su mensaje? Sin embargo, efectivamente en la Biblia se resumieron esos 3 años de ministerio activo en apenas una frase, lo que sucede es que poca atención se le ha prestado.
          </p>

          <h2>El discípulo amado</h2>
          <p>
            Juan fue quizás el apóstol que mayor relación de amistad mantuvo con el carpintero de Nazaret. A él se le llamó "el discípulo amado", era el que se recostaba en el pecho de Jesús en su última cena y conocía relatos de la vida privada de Cristo (como la historia de Nicodemo) que ningún otro evangelista relató.
          </p>
          <p>
            ¿Por qué hablamos de Juan cuando intentamos resumir el mensaje de Jesús? Pues porque fue precisamente Juan quien declaró la idea central de la predicación de Cristo.
          </p>

          <h2>El contexto de la primera carta</h2>
          <p>
            Juan era ya muy anciano cuando muchos maestros importantes del cristianismo comenzaron a enseñar falsedades sobre la vida espiritual y sobre la encarnación del Señor. Estas personas decían tener mayor revelación y autoridad, por lo cual mucho desdeñaban la enseñanza de los apóstoles.
          </p>
          <p>
            En su primera carta universal (1era de Juan), el anciano no discute ya si él es o no apóstol y por tanto debe escucharse su evangelio como venido de la boca de Dios, más bien recurre al centro de todo lo que enseñaba Jesús y de esa manera contrasta la enseñanza de los falsos maestros con el mensaje del Maestro Supremo:
          </p>

          <blockquote className="blog-quote">
            "Este es el mensaje que hemos oído de él, y os anunciamos: Dios es luz, y no hay ningunas tinieblas en él."
            <cite>— 1 Juan 1:5</cite>
          </blockquote>

          <h2>El significado de la luz</h2>
          <p>
            Pareciera ser que esta sentencia no resume para nada el evangelio de Jesucristo. ¿Dónde está el pecado, el arrepentimiento, la vida y la condenación eterna? Pues aunque a simple vista no lo parezca, Juan nos declara el núcleo de todo en esta frase: <strong>el conflicto entre la luz y las tinieblas</strong>.
          </p>
          <p>
            ¿Es este el mensaje central de Jesús? ¿No es esto muy básico? ¿No se encuentra esto en cada religión?
          </p>
          <p>
            Sí, el mensaje central no se reduce a luz y tinieblas. Lo que distingue al mensaje de Jesús de las demás religiones es el <strong>significado</strong> de esa luz y esas tinieblas.
          </p>

          <h2>Más allá de la guerra espiritual</h2>
          <p>
            Para algunos cristianos, el conflicto fundamental de sus vidas espirituales se enfoca en la lucha entre seres malignos con seres angélicos o humanos—es una guerra entre criaturas de Dios. Este enfoque no es incorrecto del todo, pero no es lo esencial, pues aquí Juan no está hablando de una luz que contrasta con los demonios sino con el pecado y el desamor.
          </p>

          <blockquote className="blog-quote">
            "El que dice que está en la luz, y aborrece a su hermano, está todavía en tinieblas."
            <cite>— 1 Juan 2:9</cite>
          </blockquote>

          <p>
            ¡Allí está el mensaje resumido y central de Jesucristo! <strong>La santidad y el pecado son los opuestos que definen el problema fundamental que el evangelio soluciona.</strong>
          </p>

          <h2>La definición del pecado</h2>
          <p>
            Muchos dicen que Dios es santo y que no peca, ¿pero cuál es la definición de pecado según Juan?
          </p>

          <blockquote className="blog-quote">
            "Todo aquel que comete pecado, infringe también la ley; pues el pecado es infracción de la ley."
            <cite>— 1 Juan 3:4</cite>
          </blockquote>

          <p>
            Para Juan el pecado se define como la infracción de la ley de Dios. Decir que Dios no infringe su propia ley en ninguna manera es revolucionario para algunos. ¿No es Dios soberano? ¿Dios no puede cometer homicidio con quién Él decida? ¿No puede mentir y ser sin culpa?
          </p>
          <p>
            Al parecer, Dios está atado a su propia Ley de amor. No hay nada en Él de aquellas cosas que Él mismo condena en nosotros. Dios no puede pecar y cuando mata lo hace bajo la legalidad de su Amor. Los principios de su ley de amor son guardados por Él, porque su ley existe debido a que <strong>Dios es amor</strong> aún antes de que existiera el universo.
          </p>

          <h2>El verdadero carácter de Dios</h2>
          <p>
            El mensaje del amor de Dios expresado en su ley y la pureza del carácter de Dios es el mensaje central de Jesucristo. Lucifer ha intentado mediante siglos hacer ver a nuestro Padre como un Señor duro que "recoge donde no sembró", que es recio y que se complace del castigo. Pero nada más lejos de la verdad.
          </p>
          <p>
            Dios nos manda a orar por los que nos maldicen, nos manda a dar la otra mejilla, a cuidar de los más débiles y a ser misericordiosos con los que yerran. ¿Acaso él no demostró en Jesús que todo lo que demanda de nosotros es exactamente lo que Él es?
          </p>

          <blockquote className="blog-quote">
            "Como hijos obedientes, no os conforméis a los deseos que antes teníais estando en vuestra ignorancia; sino, como aquel que os llamó es santo, sed también vosotros santos en toda vuestra manera de vivir."
            <cite>— 1 Pedro 1:14-15</cite>
          </blockquote>

          <h2>El llamado a la santidad</h2>
          <p>
            Si Dios es luz sin tinieblas, así también lo son sus hijos. Si nosotros decimos que somos cristianos, si decimos que tenemos comunión con un Dios santo, un Dios de amor, pero nosotros somos gustos, caprichos, egoísmos, iras, lujurias—si nosotros no somos luz—entonces somos mentirosos.
          </p>
          <p>
            Juan nos llama a reconocer que sin Cristo somos pecadores en tinieblas, pero con Cristo llegamos a ser santos en luz.
          </p>

          <blockquote className="blog-quote">
            "El que dice que permanece en él, debe andar como él anduvo."
            <cite>— 1 Juan 2:6</cite>
          </blockquote>

          <h2>El arrepentimiento es el camino, no el final</h2>
          <p>
            Muchos buenos maestros hoy en día están enseñando que el arrepentimiento es el final y la victoria de la vida cristiana. Sin embargo, esto no es así. El arrepentimiento es el camino a la Santidad, o lo que es lo mismo, el camino al amor.
          </p>

          <div className="blog-callout">
            <h3>¿Quiere decir esto que si peco no soy cristiano?</h3>
            <p>
              No quiere decir eso. Quiere decir que si peco me he separado de Jesús, no estoy siendo cristiano pues estoy lejos de Cristo. Debo arrepentirme como me arrepentí el primer día de mi conversión y recibir de nuevo el poder para vencer que la gracia de Dios otorga.
            </p>
            <p>
              Ser cristiano no es un estatus incondicional, ser cristiano significa tener el Espíritu de Cristo. Permanecer en Cristo es ser cristiano.
            </p>
          </div>

          <h2>La pregunta definitiva</h2>
          <p>
            El mensaje central de Jesús es el carácter de amor de Dios, un tipo de amor muy específico que está revelado en Su ley.
          </p>
          <p>
            ¿Crees que mediante su gracia y su Sangre tú también puedes ser luz como Dios es luz? ¿Ser amor como Dios es amor? ¿Ser Santo como Dios es santo? ¿O Jesús nos pide cosas imposibles?
          </p>

          <blockquote className="blog-quote">
            "Y mirándolos Jesús, les dijo: Para los hombres esto es imposible; más para Dios todo es posible."
            <cite>— Mateo 19:26</cite>
          </blockquote>

          <blockquote className="blog-quote">
            "Era Abram de edad de noventa y nueve años, cuando le apareció Jehová y le dijo: Yo soy el Dios Todopoderoso; anda delante de mí y sé perfecto."
            <cite>— Génesis 17:1</cite>
          </blockquote>

          <p className="blog-closing">
            ¿Acaso tenemos fe para mover montañas pero no para ser santos? No te preocupes, para ambas cosas no es necesaria una fe muy grande. Seremos santos y venceremos todos nuestros defectos de carácter con tan solo la fe del tamaño de un grano de mostaza 😉
          </p>

          <p className="blog-signature">
            <strong>Dios te bendiga mucho!</strong>
          </p>
        </div>

        <footer className="blog-footer card" style={{ marginTop: 'var(--space-8)', background: 'var(--gradient-1)', color: 'var(--white)' }}>
          <h3 style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-4)', color: 'var(--white)' }}>¿Te gustó este artículo?</h3>
          <p style={{ marginBottom: 'var(--space-6)', fontSize: 'var(--text-base)', fontWeight: '500' }}>
            Suscríbete al newsletter para recibir más reflexiones profundas cada semana.
          </p>
          <a href="/newsletter/confirmacion" className="button" style={{ background: 'var(--white)', color: 'var(--primary)', display: 'inline-block' }}>
            Suscribirme al newsletter
          </a>
        </footer>
      </article>
    </main>
  );
}
