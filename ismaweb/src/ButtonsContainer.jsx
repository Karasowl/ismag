import React, { useEffect } from "react";
import "./ButtonsContainer.css";

function ButtonsContainer() {
  useEffect(() => {
    const container = document.querySelector(".container");

    function handleMouseMove(e) {
      const xAxis = (window.innerWidth / 2 - e.pageX) / 45;
      const yAxis = (window.innerHeight / 2 - e.pageY) / 45;
      container.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
    }

    function handleTouchMove(e) {
      const firstTouch = e.touches[0];
      const xAxis = (window.innerWidth / 2 - firstTouch.pageX) / 15;
      const yAxis = (window.innerHeight / 2 - firstTouch.pageY) / 15;
      container.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
    }

    function handleScroll() {
      const yAxis = window.scrollY / 25;
      container.style.transform = `rotateY(0deg) rotateX(${yAxis}deg)`;
    }

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", () => {
      container.style.transform = "none";
    });

    container.addEventListener("touchmove", handleTouchMove);
    container.addEventListener("touchend", () => {
      container.style.transform = "none";
    });

    window.addEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="container">
      <a
        href="https://www.youtube.com/channel/UCX-0vZliN8aUFGyr_WGxndA"
        target="_blank"
      >
        <button type="button" className="btn-link important-blue">
          <i className="fab fa-youtube"></i> YouTube
        </button>
      </a>
      <a
        href="https://open.spotify.com/artist/6FBiAmYUgClucZddGctkwd"
        target="_blank"
      >
        <button type="button" className="btn-link important-blue">
          <i className="fab fa-spotify"></i> Spotify
        </button>
      </a>
      <a
        href="https://music.apple.com/us/album/amor-princesa/1673165177?i=1673165178"
        target="_blank"
      >
        <button type="button" className="btn-link">
          <i className="fab fa-apple"></i> Apple Music
        </button>
      </a>
      <a href="https://www.facebook.com/ismaguimarais" target="_blank">
        <button type="button" className="btn-link">
          <i className="fab fa-facebook"></i> Facebook
        </button>
      </a>
      <a href="https://www.instagram.com/ismaguimarais/" target="_blank">
        <button type="button" className="btn-link">
          <i className="fab fa-instagram"></i> Instagram
        </button>
      </a>
      <a href="https://www.twitter.com/ismaguimarais" target="_blank">
        <button type="button" className="btn-link">
          <i className="fab fa-twitter"></i> Twitter
        </button>
      </a>
      <a href="https://t.me/ismaguimarais" target="_blank">
        <button type="button" className="btn-link">
          <i className="fab fa-telegram"></i> Telegram
        </button>
      </a>
    </div>
  );
}

export default ButtonsContainer;
