import { useState, useEffect } from "react";
import "./SpotifyPlayer.css";

function SpotifyPlayer() {
  const [isUserFromCuba, setIsUserFromCuba] = useState(false);

  useEffect(() => {
    fetch("https://ipapi.co/json/")
      .then((response) => response.json())
      .then((data) => {
        if (data.country_name === "Cuba") {
          setIsUserFromCuba(true);
        } else {
          setIsUserFromCuba(false);
        }
      });
  }, []);

  return (
    <div className="spotify-player">
      {!isUserFromCuba && (
        <>
          <h2 className="">Escucha mi más reciente canción en Spotify:</h2>
          <iframe
            src="https://open.spotify.com/embed/track/3cWkIYNstZUq6vmzZbnUXo?utm_source=generator"
            frameBorder="0"
            allowFullScreen=""
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          ></iframe>
        </>
      )}
    </div>
  );
}

export default SpotifyPlayer;
