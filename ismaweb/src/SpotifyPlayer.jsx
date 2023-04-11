import { useEffect, useState } from "react";
import "./SpotifyPlayer.css";

function SpotifyPlayer() {
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [iframeError, setIframeError] = useState(false);
  const [isUserFromCuba, setIsUserFromCuba] = useState(false);
  const api_Key = "9cc4ed0ac1e34a74a948bf5a0a7c2a0c";


  useEffect(() => {
    fetch(`https://api.ipgeolocation.io/ipgeo?apiKey=${api_Key}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.country_name === "Cuba") {
          setIsUserFromCuba(true);
        } else {
          setIsUserFromCuba(false);
        }
      });
  }, []);

  const handleIframeLoad = () => {
    setIframeLoaded(true);
  };

  const handleIframeError = () => {
    setIframeError(true);
  };

  return (
    <div>
      {!isUserFromCuba && !iframeLoaded && (
        <div className="loading">
          <p>Cargando...</p>
          <div className="dots">
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
        </div>
      ) }
      {!isUserFromCuba &&!iframeError && (
      <div className="spotify-player">
      <h2 className="">Escucha mi más reciente canción en Spotify:</h2>
      <iframe
        src="https://open.spotify.com/embed/track/3cWkIYNstZUq6vmzZbnUXo?utm_source=generator"
        allowFullScreen=""
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        onLoad={handleIframeLoad}
        onError={handleIframeError}
        sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-top-navigation"
      ></iframe>
      </div>
      )}
    </div>
  );
}

export default SpotifyPlayer;