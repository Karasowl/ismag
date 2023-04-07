import { useState, useEffect } from 'react';
import './App.css'
import Profile from './Profile.jsx'
import SpotifyPlayer from './SpotifyPlayer'
import ButtonsContainer from './ButtonsContainer'
/* import Mailchimp from './Mailchimp'
import Popup from './Popup'
import TestApiMongo from './TestApiMongo'
import YoutubeVideo from './YoutubeVideo' */


function App() {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    window.onload = () => {
      setIsVideoLoaded(true);
    };
  }, [ setIsVideoLoaded]);

  return (
    <main>
      {isVideoLoaded && (
        <video autoPlay muted loop id="bg-video">
          <source src="/video amor princesa background web ismael guimarais music.mp4" type="video/mp4"/>
        </video>
      )}
      <div className="overlay">
        <div className="main-card">
          <Profile />
          <SpotifyPlayer/>
          <ButtonsContainer/>
        </div>
      </div>
    </main>
  )
}

export default App;


