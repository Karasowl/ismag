import { useState, useEffect } from "react";
import profileImg1 from "./assets/channels4_profile.webp";
import profileImg2 from "./assets/profile.webp";
import profileImg3 from "./assets/27_n.webp";
import profileImg4 from "./assets/112_n.webp";
import profileImg5 from "./assets/295_n.webp";
import profileImg6 from "./assets/612_n.webp";
import "./Profile.css";

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
    <div className="profile">
      <img
        id="profile-image" loading="lazy"
        src={profileImage}
        alt="Foto de perfil"
        className="fade-in"
      />
      <h2>ISMAEL GUIMARAIS</h2>
      <p>
        || 🎤Cantautor || canto sobre: ❤️ El amor/ ✝️ La Adoración/ 🧠 La vida
        <br />
        🙃 ¿Me acompañas?
      </p>
    </div>
  );
}

export default Profile;
