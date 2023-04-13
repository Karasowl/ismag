import { useState, useEffect } from 'react';
import Profile from './Profile.jsx';
import SpotifyPlayer from './SpotifyPlayer';
import ButtonsContainer from './ButtonsContainer';
import YoutubeLast from './YoutubeLast';
import styled from 'styled-components';

const BackgroundVideo = styled.video`
  position: fixed;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
  transform: scale(1.1);
`;

const Overlay = styled.div`
  width: 100%;
  height: 100%;
  padding: 1% 0;
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0.479) 0%, rgba(186, 90, 224, 0.5) 100%);
`;

const MainCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #dcd0fc8a 10%, #e4cefde0 100%);
  width: 90%;
  height: 90%;
  margin: 5%;
  border-radius: 10px;
  background-clip: padding-box;
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.158);
  gap: 1vw;

  @media only screen and (max-width: 575px) {
    /* Estilos para dispositivos móviles */
    width: 100%;
    height: 100%;
    margin: 0;
    border-radius: 0;
    background: linear-gradient(135deg, #cf87cb8a 10%, #e4cefd94 100%);
  }
`;

const H1 = styled.h1`
  font-size: 24px;
  font-weight: 200;
  line-height: 1.2;
  margin: 10px 0;
`;

const AppContainer = styled.main`
  ${BackgroundVideo} {
    display: ${({ isVideoLoaded }) => (isVideoLoaded ? 'block' : 'none')};
  }

  ${Overlay} {
    position: relative;
  }

  ${MainCard} {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #dcd0fc8a  10%, #e4cefde0 100%);
    width: 90%;
    height: 90%;
    margin: 5%;

    @media only screen and (max-width: 575px) {
      /* Estilos para dispositivos móviles */
      width: 100%;
      height: 100%;
      margin: 0;
      border-radius: 0;
      background: linear-gradient(135deg, #cf87cb8a 10%, #e4cefd94 100%);
    }
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
      z-index: -1;
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
      <Overlay>
        <MainCard>
          <Profile />
          <SpotifyPlayer />
          {/* <YoutubeLast/> */}
          <ButtonsContainer />
        </MainCard>
      </Overlay>
    </AppContainer>
  );
}

export default App;


