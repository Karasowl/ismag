import { useState, useEffect } from 'react';
import Profile from './Profile.jsx';
import SpotifyPlayer from './SpotifyPlayer';
import ButtonsContainer from './ButtonsContainer';
import PreSave from './PreSave.jsx';
import YoutubeLast from './YoutubeLast';
import styled, { keyframes } from 'styled-components';

const BackgroundVideo = styled.video`
  position: fixed;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
  transform: scale(1.1);
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 0.9;
  }
`;

const Overlay = styled.div`
  position: fixed;
  width: 100%;
  height: 100vh;
  background: linear-gradient(to bottom right, #fe391e, #000);
  opacity: 0;
  animation-name: ${fadeIn};
  animation-duration: .5s;
  animation-delay: .25s;
  animation-fill-mode: forwards;
  z-index: -1;
`;

const MainCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  background-clip: padding-box;
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.158);
  gap: 1vw;
  position: relative;

  @media only screen and (max-width: 575px) {
    /* Estilos para dispositivos móviles */
    width: 100%;
    height: 100%;
    margin: 0;
    border-radius: 0;
  }
`;

const AppContainer = styled.main`
  position: relative;
  width: 100%;
  height: 100%;

  ${BackgroundVideo} {
    position: fixed;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: -2;
    transform: scale(1.1);
  }

  ${Overlay} {
    z-index: -1;
  }

  @media only screen and (max-width: 575px) {
    ${Overlay} {
      padding: 10% 0;
    }

    ${BackgroundVideo} {
      position: fixed;
      width: 100%;
      height: 100%;
      object-fit: cover;
      z-index: -2;
      transform: scale(1.6);
    }
  }
`;

function App() {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    window.onload = () => {
      setIsVideoLoaded(true);
    };
  }, [setIsVideoLoaded]);

  return (
    <AppContainer isVideoLoaded={isVideoLoaded}>
      <BackgroundVideo autoPlay muted loop id="bg-video">
        <source src="/video amor princesa background web ismael guimarais music.mp4" type="video/mp4" />
      </BackgroundVideo>
      <Overlay />
      <MainCard>
      <Profile />
        {/* <SpotifyPlayer /> */}
        <PreSave />
        {/* <YoutubeLast/> */}
        <ButtonsContainer />
      </MainCard>
    </AppContainer>
  );
}

export default App;
