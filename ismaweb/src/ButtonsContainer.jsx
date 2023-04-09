import React, { useEffect } from "react";
import "./ButtonsContainer.css";
import ButtonLink from "./ButtonLink";


function ButtonsContainer() {
  useEffect(() => {
    const container = document.querySelector(".container");

    function handleMouseMove(e) {
      const xAxis = (window.innerWidth / 2 - e.pageX) / 95;
      const yAxis = (window.innerHeight / 2 - e.pageY) / 95;
      container.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
    }

   
    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", () => {
      container.style.transform = "none";
    });

    
  }, []);

  function handleButtonClick(event, buttonName) {
    // Agregar evento de seguimiento a Google Analytics
    window.gtag('event', 'boton_click', {
      'event_category': 'botones',
      'event_label': buttonName,
      'transport_type': 'beacon'
    });
  }

 return (
  <div className="container">
    <ButtonLink 
      link="https://www.youtube.com/channel/UCX-0vZliN8aUFGyr_WGxndA" 
      fabicon="youtube" 
      nameButton="YouTube" 
      moreClasses="important-blue"
    />
    <ButtonLink 
      link="https://open.spotify.com/artist/6FBiAmYUgClucZddGctkwd" 
      fabicon="spotify" 
      nameButton="Spotify" 
      moreClasses="important-blue"
    />
    <ButtonLink 
      link="https://music.apple.com/us/album/amor-princesa/1673165177?i=1673165178" 
      fabicon="apple" 
      nameButton="Apple Music" 
      moreClasses=""
    />
    <ButtonLink 
      link="https://www.facebook.com/ismaguimarais" 
      fabicon="facebook" 
      nameButton="Facebook" 
      moreClasses=""
    />
    <ButtonLink 
      link="https://www.instagram.com/ismaguimarais/" 
      fabicon="instagram" 
      nameButton="Instagram" 
      moreClasses=""
    />
    <ButtonLink 
      link="https://www.twitter.com/ismaguimarais" 
      fabicon="twitter" 
      nameButton="Twitter" 
      moreClasses=""
    />
    <ButtonLink 
      link="https://t.me/ismaguimarais" 
      fabicon="telegram" 
      nameButton="Telegram" 
      moreClasses=""
    />
  </div>
);

}

export default ButtonsContainer;
