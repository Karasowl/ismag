import { json } from "@remix-run/node";
import { Link } from "@remix-run/react";

const DEFAULT_SITE = "https://ismaelguimarais.com";
const DEFAULT_OG_IMAGE = `${DEFAULT_SITE}/og-default.jpg`;

// Blog posts database - Add new articles here
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

export const loader = () => {
  const site = process.env.PUBLIC_SITE_URL ?? DEFAULT_SITE;
  const ogImage = `${site}/og-default.jpg`;
  return json({ site, ogImage, posts: BLOG_POSTS });
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

export default function BlogIndex() {
  return (
    <main className="section">
      <div className="blog-index-header">
        <h1 className="page-title">Blog</h1>
        <p className="page-subtitle">
          Artículos profundos sobre cultura, fe, política y filosofía. Un espacio para pensar despacio.
        </p>
      </div>

      <div className="blog-posts-grid">
        {BLOG_POSTS.sort((a, b) => new Date(b.date) - new Date(a.date)).map((post) => (
          <article key={post.slug} className="blog-post-card card">
            <Link to={`/blog/${post.slug}`} className="blog-post-link">
              {post.image && (
                <div className="blog-post-image">
                  <img src={post.image} alt={post.title} loading="lazy" />
                </div>
              )}
              <div className="blog-post-content">
                <div className="blog-post-meta">
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString('es-ES', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </time>
                  <span className="blog-post-category">{post.category}</span>
                </div>
                <h2 className="blog-post-title">{post.title}</h2>
                <p className="blog-post-description">{post.description}</p>
                <p className="blog-post-excerpt">{post.excerpt}</p>
                <span className="link-arrow">Leer artículo</span>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </main>
  );
}
