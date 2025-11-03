export default function ContentGrid({ latestVideo, youtubeStats }) {
  return (
    <section className="content-grid-section">
      <div className="container">
        <h2 className="section-title">Contenido gratuito para ti</h2>
        <p className="section-subtitle">Sígueme, escucha y únete a la comunidad</p>

        <div className="content-grid">
          {/* Último video de YouTube - Card grande */}
          {latestVideo && (
            <div className="content-card featured-video">
              <div className="card-badge">Nuevo video</div>
              <a
                href={latestVideo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="video-thumbnail-link"
              >
                <div className="thumbnail-wrapper">
                  <img
                    src={latestVideo.thumbnail}
                    alt={latestVideo.title}
                    className="video-thumbnail"
                  />
                  <div className="play-overlay">
                    <svg className="play-icon" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                </div>
                <div className="video-info">
                  <h3 className="video-title">{latestVideo.title}</h3>
                  <p className="video-views">{latestVideo.views} visualizaciones</p>
                </div>
              </a>
              <a
                href="https://youtube.com/@IsmaelGuimarais"
                target="_blank"
                rel="noopener noreferrer"
                className="cta-button youtube-cta"
              >
                <svg className="icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                Ver todos los videos
              </a>
            </div>
          )}

          {/* Redes Sociales - Grid de botones grandes */}
          <div className="content-card socials-card">
            <div className="card-badge">Sígueme</div>
            <h3 className="card-title">Redes sociales</h3>
            <p className="card-description">Únete a la comunidad en todas las plataformas</p>

            <div className="social-buttons-grid">
              <a
                href="https://youtube.com/@IsmaelGuimarais"
                target="_blank"
                rel="noopener noreferrer"
                className="social-button youtube"
              >
                <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                <span>YouTube</span>
              </a>

              <a
                href="https://instagram.com/ismaguimarais"
                target="_blank"
                rel="noopener noreferrer"
                className="social-button instagram"
              >
                <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                <span>Instagram</span>
              </a>

              <a
                href="https://tiktok.com/@ismaelguimarais"
                target="_blank"
                rel="noopener noreferrer"
                className="social-button tiktok"
              >
                <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
                <span>TikTok</span>
              </a>

              <a
                href="https://x.com/IsmaGuimarais"
                target="_blank"
                rel="noopener noreferrer"
                className="social-button x"
              >
                <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
                <span>X (Twitter)</span>
              </a>

              <a
                href="https://threads.net/@ismaguimarais"
                target="_blank"
                rel="noopener noreferrer"
                className="social-button threads"
              >
                <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.78 3.631 2.693 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.964-.065-1.19.408-2.285 1.33-3.082.88-.76 2.119-1.207 3.583-1.291a13.853 13.853 0 0 1 3.02.142l-.126 2.006c-.877-.108-1.83-.155-2.746-.126-.965.03-1.8.284-2.408.733-.608.45-.92 1.05-.901 1.736.02.687.366 1.27.997 1.683.632.413 1.487.635 2.472.635 1.076-.027 1.933-.39 2.544-1.078.611-.688.977-1.68 1.09-2.95.054-.618.077-1.277.077-1.971 0-2.876-.69-4.79-2.053-5.693-1.364-.903-3.44-1.364-6.185-1.364h-.014z"/>
                </svg>
                <span>Threads</span>
              </a>

              <a
                href="https://facebook.com/IsmaelGuimarais"
                target="_blank"
                rel="noopener noreferrer"
                className="social-button facebook"
              >
                <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <span>Facebook</span>
              </a>

              <a
                href="https://t.me/ismaguimarais"
                target="_blank"
                rel="noopener noreferrer"
                className="social-button telegram"
              >
                <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                </svg>
                <span>Telegram</span>
              </a>
            </div>
          </div>

          {/* Plataformas de Música */}
          <div className="content-card music-platforms-card">
            <div className="card-badge">Escúchame en todas partes</div>
            <h3 className="card-title">Mi música</h3>
            <p className="card-description">Encuentra mis canciones en tu plataforma favorita</p>

            <div className="music-platforms-grid">
              <a
                href="https://open.spotify.com/intl-es/artist/6FBiAmYUgClucZddGctkwd"
                target="_blank"
                rel="noopener noreferrer"
                className="music-platform-button spotify-btn"
              >
                <svg className="platform-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                </svg>
                <span>Spotify</span>
              </a>

              <a
                href="https://music.apple.com/us/album/amor-princesa/1673165177?i=1673165178"
                target="_blank"
                rel="noopener noreferrer"
                className="music-platform-button apple-music-btn"
              >
                <svg className="platform-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.997 6.124c0-.738-.065-1.47-.24-2.19-.317-1.31-1.062-2.31-2.18-3.043C21.003.517 20.373.285 19.7.164c-.517-.093-1.038-.135-1.564-.15-.04-.003-.083-.01-.124-.013H5.988c-.152.01-.303.017-.455.026C4.786.07 4.043.15 3.34.428 2.004.958 1.04 1.88.475 3.208c-.192.448-.292.925-.363 1.408-.056.392-.088.785-.1 1.18 0 .032-.007.062-.01.093v12.223c.01.14.017.283.027.424.05.815.154 1.624.497 2.373.65 1.42 1.738 2.353 3.234 2.801.42.127.856.187 1.293.228.555.055 1.114.091 1.673.1h11.717c.2-.007.4-.01.597-.02.772-.035 1.537-.106 2.265-.34 1.452-.468 2.52-1.4 3.118-2.854.192-.469.286-.96.335-1.457.048-.5.077-1.003.077-1.507.002-4.168 0-8.336 0-12.504zm-4.653 6.457l-.003 4.29c0 1.474-1.057 2.642-2.495 2.76-1.017.083-1.956-.328-2.37-1.19-.374-.78-.148-1.507.528-2.095.497-.432 1.097-.635 1.738-.69.15-.013.302-.015.453-.013.208 0 .414.01.623.026v-3.912l-5.968 1.222v5.207c0 1.483-1.053 2.655-2.5 2.776-1.02.086-1.965-.324-2.382-1.187-.374-.774-.148-1.498.526-2.083.495-.43 1.093-.632 1.732-.687.15-.013.3-.015.45-.013.21 0 .418.01.628.026v-7.108l10.04-2.053v4.524z"/>
                </svg>
                <span>Apple Music</span>
              </a>

              <a
                href="https://music.youtube.com/channel/UCX-0vZliN8aUFGyr_WGxndA"
                target="_blank"
                rel="noopener noreferrer"
                className="music-platform-button youtube-music-btn"
              >
                <svg className="platform-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.376 0 0 5.376 0 12s5.376 12 12 12 12-5.376 12-12S18.624 0 12 0zm0 19.104c-3.924 0-7.104-3.18-7.104-7.104S8.076 4.896 12 4.896s7.104 3.18 7.104 7.104-3.18 7.104-7.104 7.104zm0-13.332c-3.432 0-6.228 2.796-6.228 6.228S8.568 18.228 12 18.228s6.228-2.796 6.228-6.228S15.432 5.772 12 5.772zM9.684 15.54V8.46L15.816 12l-6.132 3.54z"/>
                </svg>
                <span>YouTube Music</span>
              </a>

              <a
                href="https://www.deezer.com/search/Ismael%20Guimarais"
                target="_blank"
                rel="noopener noreferrer"
                className="music-platform-button deezer-btn"
              >
                <svg className="platform-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.81 1.234h5.19v2.994h-5.19V1.234zm0 4.29h5.19v2.994h-5.19V5.524zm0 4.288h5.19v2.996h-5.19V9.812zm0 4.29h5.19v2.995h-5.19v-2.996zm0 4.288h5.19v2.996h-5.19v-2.996zM12.405 9.812h5.19v2.996h-5.19V9.812zm0 4.29h5.19v2.995h-5.19v-2.996zm0 4.288h5.19v2.996h-5.19v-2.996zM6 14.1h5.19v2.995H6V14.1zm0 4.288h5.19v2.996H6v-2.996zM0 18.39h5.19v2.996H0v-2.996z"/>
                </svg>
                <span>Deezer</span>
              </a>

              <a
                href="https://music.amazon.com/search/Ismael%20Guimarais"
                target="_blank"
                rel="noopener noreferrer"
                className="music-platform-button amazon-music-btn"
              >
                <svg className="platform-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3.333 14.235c0-3.897 1.955-6.948 5.53-6.948 2.289 0 3.491 1.357 3.491 1.357V1.191h3.874v15.52c0 .464.189.68.681.68h.244v3.298c-.464.042-.927.085-1.347.127-1.37.127-2.027-.34-2.448-1.399 0 0-1.283 1.655-4.226 1.655C5.415 21.072 3.333 18.9 3.333 14.234zm8.979-.042V11.32c0-.636-.464-1.103-1.103-1.103-1.582 0-2.575 1.442-2.575 4.06 0 2.703.993 4.06 2.575 4.06 1.158 0 1.103-1.358 1.103-1.91v-2.233zm9.282 4.86c-.888 1.358-2.065 2.234-3.787 2.234-2.277 0-3.32-1.442-3.32-3.617V7.356h3.916v9.915c0 .764.255 1.018.764 1.018.721 0 1.485-.721 1.485-1.23V7.356h3.916v10.102c0 .467.127.683.676.683h.296v3.319c-.508.04-.97.085-1.4.127-.845.08-1.59-.178-2.107-1.23l-.439-.628z"/>
                </svg>
                <span>Amazon Music</span>
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
