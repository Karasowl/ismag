import { json } from "@remix-run/node";
import { useState } from "react";

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
  const title = "Apoya Mi Trabajo | Ismael Guimarais";
  const description = "Ayúdame a seguir creando contenido gratuito y de calidad. Tu apoyo mantiene este proyecto 100% independiente.";
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
    { tagName: "link", rel: "canonical", href: url },
  ];
};

export default function Apoyame() {
  const [copiedBTC, setCopiedBTC] = useState(false);

  // Aquí colocarás tu dirección de Bitcoin real
  const btcAddress = "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh";

  const handleCopyBTC = () => {
    navigator.clipboard.writeText(btcAddress);
    setCopiedBTC(true);
    setTimeout(() => setCopiedBTC(false), 2000);
  };

  return (
    <main className="section">
      {/* Hero Section */}
      <div className="apoyame-hero" data-reveal>
        <h1 className="apoyame-title">Apoya Mi Trabajo</h1>
        <p className="apoyame-subtitle">
          Mantén este contenido libre, independiente y sin anuncios
        </p>
      </div>

      {/* Story Section */}
      <section className="apoyame-story card" data-reveal>
        <div className="apoyame-story-content">
          <h2>Por qué necesito tu apoyo</h2>
          <p>
            Soy cubano, actualmente en México en proceso de solicitud de refugio. Esto significa que, aunque trabajo
            incansablemente creando contenido que inspire y haga pensar, enfrento limitaciones legales para recibir
            ingresos de forma convencional.
          </p>
          <p>
            Todo el contenido que produzco —videoensayos semanales, música mensual, newsletter— es
            <strong> completamente gratuito</strong>. Sin paywalls, sin anuncios invasivos, sin compromisos con marcas
            que puedan influir en lo que digo.
          </p>
          <p>
            Tu apoyo mantiene esta independencia viva y me permite dedicar tiempo completo a crear contenido
            de calidad que desafíe, inspire y conecte.
          </p>
        </div>

        <div className="apoyame-impact">
          <h3>Tu apoyo me permite:</h3>
          <ul className="impact-list">
            <li>
              <svg className="impact-icon" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Seguir produciendo videos semanales de alta calidad</span>
            </li>
            <li>
              <svg className="impact-icon" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Invertir en mejor equipo y producción</span>
            </li>
            <li>
              <svg className="impact-icon" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Dedicar más tiempo a la investigación profunda</span>
            </li>
            <li>
              <svg className="impact-icon" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Mantener mi independencia editorial total</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Payment Methods */}
      <section className="apoyame-payment-section" data-reveal>
        <h2 className="payment-section-title">Elige cómo apoyar</h2>
        <p className="payment-section-subtitle">
          Cualquier cantidad ayuda. Tu aporte va directamente a mantener este proyecto vivo.
        </p>

        <div className="payment-methods">
          {/* PayPal */}
          <div className="payment-card card">
            <div className="payment-card-header">
              <div className="payment-icon paypal-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.541c-.013.076-.026.175-.041.254-.93 4.778-4.005 7.201-9.138 7.201h-2.19a.563.563 0 0 0-.556.479l-1.187 7.527h-.506l-.24 1.516a.56.56 0 0 0 .554.647h3.882c.46 0 .85-.334.922-.788.06-.26.76-4.852.76-4.852a.932.932 0 0 1 .924-.788h.58c3.76 0 6.705-1.528 7.565-5.946.36-1.847.174-3.388-.746-4.46z"/>
                </svg>
              </div>
              <h3>PayPal</h3>
              <p className="payment-badge">Más usado</p>
            </div>
            <p className="payment-description">
              La forma más rápida y segura. Acepta tarjetas de crédito/débito.
            </p>
            <a
              href="https://paypal.me/tuusuario"
              target="_blank"
              rel="noopener noreferrer"
              className="button button--primary button--large payment-button"
              data-analytics="donate_paypal"
            >
              Donar con PayPal
            </a>
            <p className="payment-note">
              Nota: Esta es la cuenta de un familiar que me ayuda a recibir fondos.
            </p>
          </div>

          {/* Bitcoin */}
          <div className="payment-card card">
            <div className="payment-card-header">
              <div className="payment-icon bitcoin-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.638 14.904c-1.602 6.43-8.113 10.34-14.542 8.736C2.67 22.05-1.244 15.525.362 9.105 1.962 2.67 8.475-1.243 14.9.358c6.43 1.605 10.342 8.115 8.738 14.548v-.002zm-6.35-4.613c.24-1.59-.974-2.45-2.64-3.03l.54-2.153-1.315-.33-.525 2.107c-.345-.087-.705-.167-1.064-.25l.526-2.127-1.32-.33-.54 2.165c-.285-.067-.565-.132-.84-.2l-1.815-.45-.35 1.407s.975.225.955.236c.535.136.63.486.615.766l-1.477 5.92c-.075.166-.24.406-.614.314.015.02-.96-.24-.96-.24l-.66 1.51 1.71.426.93.242-.54 2.19 1.32.327.54-2.17c.36.1.705.19 1.05.273l-.51 2.154 1.32.33.545-2.19c2.24.427 3.93.257 4.64-1.774.57-1.637-.03-2.58-1.217-3.196.854-.193 1.5-.76 1.68-1.93h.01zm-3.01 4.22c-.404 1.64-3.157.75-4.05.53l.72-2.9c.896.23 3.757.67 3.33 2.37zm.41-4.24c-.37 1.49-2.662.735-3.405.55l.654-2.64c.744.18 3.137.524 2.75 2.084v.006z"/>
                </svg>
              </div>
              <h3>Bitcoin</h3>
              <p className="payment-badge recommended-badge">Recomendado</p>
            </div>
            <p className="payment-description">
              Sin intermediarios, sin comisiones. La forma más directa de apoyar.
            </p>

            <div className="btc-address-container">
              <div className="btc-qr">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${btcAddress}`}
                  alt="Bitcoin QR Code"
                  loading="lazy"
                />
              </div>
              <div className="btc-address-wrapper">
                <label htmlFor="btc-address" className="btc-label">Dirección Bitcoin:</label>
                <div className="btc-copy-group">
                  <input
                    id="btc-address"
                    type="text"
                    value={btcAddress}
                    readOnly
                    className="btc-address"
                  />
                  <button
                    onClick={handleCopyBTC}
                    className="button button--secondary btc-copy-button"
                    aria-label="Copiar dirección Bitcoin"
                  >
                    {copiedBTC ? (
                      <>
                        <svg style={{ width: '20px', height: '20px' }} viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        ¡Copiado!
                      </>
                    ) : (
                      <>
                        <svg style={{ width: '20px', height: '20px' }} viewBox="0 0 20 20" fill="currentColor">
                          <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                          <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                        </svg>
                        Copiar
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
            <p className="payment-note">
              Escanea el código QR o copia la dirección para enviar Bitcoin.
            </p>
          </div>

          {/* QvaPay */}
          <div className="payment-card card">
            <div className="payment-card-header">
              <div className="payment-icon qvapay-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-1.11-.64-1.87-2.22-1.87-1.5 0-2.4.68-2.4 1.64 0 .84.65 1.39 2.67 1.91s4.18 1.39 4.18 3.91c-.01 1.83-1.38 2.83-3.12 3.16z"/>
                </svg>
              </div>
              <h3>QvaPay</h3>
              <p className="payment-badge">Para Latinoamérica</p>
            </div>
            <p className="payment-description">
              Ideal para cubanos y latinoamericanos. Acepta múltiples métodos de pago.
            </p>
            <a
              href="https://qvapay.com/payme/tuusuario"
              target="_blank"
              rel="noopener noreferrer"
              className="button button--primary button--large payment-button"
              data-analytics="donate_qvapay"
            >
              Donar con QvaPay
            </a>
            <p className="payment-note">
              Acepta tarjetas, transferencias y criptomonedas.
            </p>
          </div>
        </div>
      </section>

      {/* Transparency Section */}
      <section className="apoyame-transparency card" data-reveal>
        <h2>100% Transparente</h2>
        <div className="transparency-grid">
          <div className="transparency-item">
            <div className="transparency-icon">📊</div>
            <h3>Sin intermediarios</h3>
            <p>Tu dinero va directo a mí, sin plataformas que se queden con un porcentaje grande.</p>
          </div>
          <div className="transparency-item">
            <div className="transparency-icon">🎯</div>
            <h3>100% Independiente</h3>
            <p>No acepto patrocinios que comprometan mi libertad editorial.</p>
          </div>
          <div className="transparency-item">
            <div className="transparency-icon">🔓</div>
            <h3>Siempre gratis</h3>
            <p>Todo mi contenido seguirá siendo gratuito, sin importar si aportas o no.</p>
          </div>
          <div className="transparency-item">
            <div className="transparency-icon">❤️</div>
            <h3>Con gratitud</h3>
            <p>Cada aporte, sin importar la cantidad, es profundamente apreciado.</p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="apoyame-faq card" data-reveal>
        <h2>Preguntas frecuentes</h2>
        <div className="faq-list">
          <details className="faq-item">
            <summary className="faq-question">¿Cuánto debería donar?</summary>
            <p className="faq-answer">
              Cualquier cantidad ayuda. Lo que sea cómodo para ti es perfecto. Algunas personas donan $5, otras $50.
              No hay mínimo ni máximo. Lo importante es el gesto.
            </p>
          </details>

          <details className="faq-item">
            <summary className="faq-question">¿Puedo hacer donaciones recurrentes?</summary>
            <p className="faq-answer">
              Por ahora, solo acepto donaciones únicas. Pero puedes apoyar cuando quieras, tantas veces como quieras.
              En el futuro planeo implementar membresías recurrentes.
            </p>
          </details>

          <details className="faq-item">
            <summary className="faq-question">¿Por qué no usas Patreon o plataformas similares?</summary>
            <p className="faq-answer">
              Mi situación migratoria limita las plataformas que puedo usar. Además, estas opciones me permiten
              recibir apoyo con comisiones más bajas y mayor flexibilidad.
            </p>
          </details>

          <details className="faq-item">
            <summary className="faq-question">¿Mi donación es anónima?</summary>
            <p className="faq-answer">
              Depende del método. Con Bitcoin eres completamente anónimo. Con PayPal y QvaPay,
              veré tu nombre pero no lo compartiré públicamente a menos que me des permiso.
            </p>
          </details>

          <details className="faq-item">
            <summary className="faq-question">¿Qué pasa si no puedo donar?</summary>
            <p className="faq-answer">
              ¡No hay problema! Compartir mi contenido, dejar comentarios y recomendarme a otros ya es una forma
              increíble de apoyo. Tu presencia en la comunidad es valiosa.
            </p>
          </details>
        </div>
      </section>

      {/* CTA Final */}
      <section className="apoyame-cta-final" data-reveal>
        <div className="card cta-final-card">
          <h2>Gracias por considerar apoyarme</h2>
          <p>
            Cada aporte, por pequeño que sea, me acerca a poder dedicarme completamente a crear
            el contenido que amas. Tu apoyo no solo me ayuda a mí, ayuda a mantener viva una voz
            independiente en español.
          </p>
          <div className="cta-final-buttons">
            <a href="#" className="button button--primary button--large">
              Volver arriba para donar
            </a>
            <a href="/" className="button button--secondary button--large">
              Explorar contenido
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
