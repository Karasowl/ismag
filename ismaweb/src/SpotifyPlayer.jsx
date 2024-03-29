import { useEffect, useState } from "react";
import styled from 'styled-components';

const SpotifyPlayerContainer = styled.div`

max-height: 90px;
margin-bottom: 5px;

  h2 {
    padding: 1%;
    color: #962525;
    text-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19);
    border-radius: 4px;
    text-align: center;
    font-size: medium;
  }

  iframe {
    width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px 0;
  border: none;
  }

  .loading {
    text-align: center;
    margin-top: 10px;
  }

  .loading p {
    margin: 0;
    font-size: 14px;
    color: #333;
  }

  .loading .dots {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
  }

  .loading .dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: #1db954;
    margin: 0 4px;
    animation: jump 0.5s ease-in-out infinite;
  }

  .loading .dot:nth-child(1) {
    animation-delay: 0s;
  }

  .loading .dot:nth-child(2) {
    animation-delay: 0.1s;
  }

  .loading .dot:nth-child(3) {
    animation-delay: 0.2s;
  }

  @keyframes jump {
    0% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
    100% {
      transform: translateY(0);
    }
  }

  @media only screen and (max-width: 280px) {
    max-height: 170px;
  }

  @media only screen and (min-width: 281px) and (max-width: 575px) {
    max-height: 110px;
    margin-bottom: 40px;

    h2 {
      font-size: 13.7px;
      margin-bottom: 0px;
    }
  }

  @media only screen and (min-width: 576px) and (max-width: 767px) {
    max-height: 130px;

    h2 {
      font-size: 13.7px;
      margin-bottom: 10px;
    }
  }

  @media only screen and (min-width: 768px) and (max-width: 991px) {
    margin-bottom: 25px;
    h2 {
      font-size: 13.7px;
      margin-bottom: 10px;
    }
  }

  @media only screen and (min-width: 992px) and (max-width: 1199px) {
    margin-bottom: 25px;
    h2 {
      font-size: 13.7px;
      margin-bottom: 10px;
    }
  }

  @media only screen and (min-width: 1200px) {
    margin-bottom: 25px;
    h2 {
      font-size: 13.7px;
      margin-bottom: 10px;
    }
  }
`;


function SpotifyPlayer() {
  const [urlSpotify, setUrlSpotify ] = useState("0iFchlTEV8u0LtcXb2aJjQ");
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [isUserFromCuba, setIsUserFromCuba] = useState(false);
  const api_Key = "9cc4ed0ac1e34a74a948bf5a0a7c2a0c"; // API Key from ipgeolocation.io


  async function fetchUserLocation() {
    try {
      const response = await fetch(`https://api.ipgeolocation.io/ipgeo?apiKey=${api_Key}`);
      const data = await response.json();
      if (data.country_name === "Cuba") {
        setIsUserFromCuba(true);
      } else {
        setIsUserFromCuba(false);
      }
    } catch (error) {
      console.log(error);
    }
  }
  
  useEffect(() => {
    fetchUserLocation();
  }, []);


  const handleIframeLoad = () => {
    setIframeLoaded(true);
  };

  return (
    <SpotifyPlayerContainer>
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
      {!isUserFromCuba && (
      <div className="spotify-player">
      <h2 className="">Escucha mi más reciente canción en Spotify:</h2>
      <iframe
        src={`https://open.spotify.com/embed/track/${urlSpotify}?utm_source=generator`}
        allowFullScreen=""
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        onLoad={handleIframeLoad}
        sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-top-navigation"
      ></iframe>
      </div>
      )}
    </SpotifyPlayerContainer>
  );
}

export default SpotifyPlayer;