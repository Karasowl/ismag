import React, { useEffect } from "react";
import "./ButtonsContainer.css";
import ButtonLink from "./ButtonLink";


function ButtonsContainer() {
  useEffect(() => {
    const container = document.querySelector(".container");

    function handleMouseMove(e) {
      const xAxis = (window.innerWidth / 2 - e.pageX) / 45;
      const yAxis = (window.innerHeight / 2 - e.pageY) / 45;
      container.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
    }

    /* function handleTouchMove(e) {
      const firstTouch = e.touches[0];
      const xAxis = (window.innerWidth / 2 - firstTouch.pageX) / 15;
      const yAxis = (window.innerHeight / 2 - firstTouch.pageY) / 15;
      container.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
    }

    function handleScroll() {
      const yAxis = window.scrollY / 25;
      container.style.transform = `rotateY(0deg) rotateX(${yAxis}deg)`;
    } */

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", () => {
      container.style.transform = "none";
    });

    /* container.addEventListener("touchmove", handleTouchMove);
    container.addEventListener("touchend", () => {
      container.style.transform = "none";
    });

    window.addEventListener("scroll", handleScroll); */
  }, []);

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
