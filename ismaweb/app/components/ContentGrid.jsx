import { SiYoutube, SiInstagram, SiX, SiTiktok, SiThreads, SiFacebook, SiTelegram, SiSpotify, SiApplemusic, SiYoutubemusic, SiAmazonmusic } from "react-icons/si";
import { Play } from "lucide-react";

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
                    <Play className="play-icon" size={48} />
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
                <SiYoutube className="icon" />
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
                <SiYoutube className="social-icon" />
                <span>YouTube</span>
              </a>

              <a
                href="https://instagram.com/ismaguimarais"
                target="_blank"
                rel="noopener noreferrer"
                className="social-button instagram"
              >
                <SiInstagram className="social-icon" />
                <span>Instagram</span>
              </a>

              <a
                href="https://tiktok.com/@ismaelguimarais"
                target="_blank"
                rel="noopener noreferrer"
                className="social-button tiktok"
              >
                <SiTiktok className="social-icon" />
                <span>TikTok</span>
              </a>

              <a
                href="https://x.com/IsmaGuimarais"
                target="_blank"
                rel="noopener noreferrer"
                className="social-button x"
              >
                <SiX className="social-icon" />
                <span>X (Twitter)</span>
              </a>

              <a
                href="https://threads.net/@ismaguimarais"
                target="_blank"
                rel="noopener noreferrer"
                className="social-button threads"
              >
                <SiThreads className="social-icon" />
                <span>Threads</span>
              </a>

              <a
                href="https://facebook.com/IsmaelGuimarais"
                target="_blank"
                rel="noopener noreferrer"
                className="social-button facebook"
              >
                <SiFacebook className="social-icon" />
                <span>Facebook</span>
              </a>

              <a
                href="https://t.me/ismaguimarais"
                target="_blank"
                rel="noopener noreferrer"
                className="social-button telegram"
              >
                <SiTelegram className="social-icon" />
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
                <SiSpotify className="platform-icon" />
                <span>Spotify</span>
              </a>

              <a
                href="https://music.apple.com/us/album/amor-princesa/1673165177?i=1673165178"
                target="_blank"
                rel="noopener noreferrer"
                className="music-platform-button apple-music-btn"
              >
                <SiApplemusic className="platform-icon" />
                <span>Apple Music</span>
              </a>

              <a
                href="https://music.youtube.com/channel/UCX-0vZliN8aUFGyr_WGxndA"
                target="_blank"
                rel="noopener noreferrer"
                className="music-platform-button youtube-music-btn"
              >
                <SiYoutubemusic className="platform-icon" />
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
                <SiAmazonmusic className="platform-icon" />
                <span>Amazon Music</span>
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
