import profileImage from './assets/channels4_profile.webp';

function Profile() {

/*   hacer que img  cambie como si fuera un carrusel de imagenes cada 5 segundos */
  return (
    <div className="profile">
      <img src={profileImage} alt="Foto de perfil" />
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
