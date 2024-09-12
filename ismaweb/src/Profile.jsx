import { useState, useEffect } from "react";
import profileImg1 from "./assets/channels4_profile.webp";
import profileImg2 from "./assets/profile.webp";
import profileImg3 from "./assets/27_n.webp";
import profileImg4 from "./assets/112_n.webp";
import profileImg5 from "./assets/295_n.webp";
import profileImg6 from "./assets/612_n.webp";
import Typed from 'react-typed';
import styled from 'styled-components';

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 2rem 1rem 0 1rem;
  z-index: 1;

  h2 {
    font-size: 1rem;
    font-weight: 400;
    margin-top: 1rem;
    margin-bottom: 0.5rem;
    color: white;
  }

  .sentence {
    font-size: 0.90rem;
    font-weight: 300;
    text-align: center;
    margin-top: 0;
    color: white;
  }
`;

const ProfileImage = styled.img`
  width: 110px;
  height: 110px;
  object-fit: cover;
  border-radius: 50%;
  margin-bottom: 1rem;
  transition: opacity 0.5s ease-in-out;
  border: 2px solid #fff;
  box-shadow: 0 0 10px #0003;

  &.fade-in {
    opacity: 1;
    transition: opacity 0.5s;
  }

  &.fade-out {
    opacity: 0;
    transition: opacity 0.5s;
  }
`;

function Profile() {
  const [profileImage, setProfileImage] = useState(profileImg1);
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndex((prevIndex) => (prevIndex + 1) % 6);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const images = [
      profileImg1,
      profileImg2,
      profileImg3,
      profileImg4,
      profileImg5,
      profileImg6,
    ];
    const nextImage = images[imageIndex];
    const currentImage = document.getElementById("profile-image");

    currentImage.classList.remove("fade-in");
    currentImage.classList.add("fade-out");

    setTimeout(() => {
      setProfileImage(nextImage);
      currentImage.classList.remove("fade-out");
      currentImage.classList.add("fade-in");
    }, 500);
  }, [imageIndex]);

  return (
    <ProfileContainer>
      <ProfileImage
        id="profile-image"
        loading="lazy"
        src={profileImage}
        alt="Foto de perfil"
        className="fade-in"
      />
      <h2>ISMAEL GUIMARAIS</h2>
      <Typed className="sentence"
        strings={[
          'Cantautor, canto sobre: ❤️ El amor',
          'Cantautor, canto sobre: ✝️ La Adoración',
          'Cantautor, canto sobre: 🧠 La vida',
          '¿Me acompañas?'
        ]}
        typeSpeed={50}
        backSpeed={50}
        loop
      />
    </ProfileContainer>
  );
}

export default Profile;