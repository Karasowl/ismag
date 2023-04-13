import styled from 'styled-components';
import ButtonLink from "./ButtonLink";

const Container = styled.div`
  transition: 0.1s all linear;
  margin-bottom: 65px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: #ffffff71;
  min-width: 45vw;
  border-radius: 10px;

  &:hover {
    background-color: #ffffffb7;
  }

  @media only screen and (max-width: 575px) {
    min-width: 35vw;
    margin-bottom: 25px;
  }
`;

function ButtonsContainer() {
 
  return (
    <Container>
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
    </Container>
  );
}

export default ButtonsContainer;
