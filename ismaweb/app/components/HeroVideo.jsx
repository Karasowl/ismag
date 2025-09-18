export default function HeroVideo({
  title,
  subtitle,
  cta,
  ctaHref
}) {
  return (
    <section className="hero" aria-labelledby="hero-heading">
      <video
        className="hero__video"
        aria-hidden="true"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/og-default.jpg"
      >
        <source src="/hero-background.mp4" type="video/mp4" />
      </video>
      <div className="hero__overlay" aria-hidden="true" />
      <div className="hero__content">
        <h1 id="hero-heading" className="hero__title">
          {title}
        </h1>
        <p className="hero__subtitle">{subtitle}</p>
        {cta && ctaHref ? (
          <a className="button" href={ctaHref}>
            {cta}
          </a>
        ) : null}
      </div>
    </section>
  );
}
