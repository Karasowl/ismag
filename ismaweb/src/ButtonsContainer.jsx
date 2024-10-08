import styled from 'styled-components';
import ButtonLink from "./ButtonLink";

const Container = styled.div`
  color: #fff;
  transition: 0.1s all linear;
  margin-bottom: 65px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  width: 90%;
  max-width: 600px;
  border-radius: 10px;

  &:hover {

  }

  @media only screen and (max-width: 575px) {
    margin-bottom: 25px;
  }
`;

const buttonsData = [
  {
    fabicon: "youtube",
    link: "https://www.youtube.com/channel/UCX-0vZliN8aUFGyr_WGxndA",
    nameButton: "YouTube",
    moreClasses: "important-blue"
  },
  {
    fabicon: "spotify",
    link: "https://open.spotify.com/artist/6FBiAmYUgClucZddGctkwd",
    nameButton: "Spotify",
    moreClasses: ""
  },
  {
    fabicon: "apple",
    link: "https://music.apple.com/us/album/amor-princesa/1673165177?i=1673165178",
    nameButton: "Apple Music",
    moreClasses: ""
  },
  {
    fabicon: "facebook",
    link: "https://www.facebook.com/ismaguimarais",
    nameButton: "Facebook",
    moreClasses: ""
  },
  {
    fabicon: "instagram",
    link: "https://www.instagram.com/ismaguimarais/",
    nameButton: "Instagram",
    moreClasses: ""
  },
  {
    fabicon: "tiktok",
    link: "https://www.tiktok.com/@ismaelguimarais/",
    nameButton: "TikTok",
    moreClasses: ""
  },
  {
    fabicon: "twitter",
    link: "https://www.twitter.com/ismaguimarais",
    nameButton: "Twitter",
    moreClasses: ""
  },
  {
    fabicon: "telegram",
    link: "https://t.me/ismaguimarais",
    nameButton: "Telegram",
    moreClasses: ""
  }
];

function ButtonsContainer() {
  return (
    <Container>
      {buttonsData.map((button) => (
        <ButtonLink 
          link={button.link} 
          fabicon={button.fabicon} 
          nameButton={button.nameButton} 
          moreClasses={button.moreClasses} 
          key={button.fabicon} 
        />
      ))}
    </Container>
  );
}

export default ButtonsContainer;