import coverImg from "./assets/MIL MARES COVER (1) [Ancho Máximo 320 Altura Máxima 240].webp";

const PreSave = () => {
  return (
    <div className='preSave'>
    <img src={coverImg}></img>
      <p>¡Mil Mares está aquí!</p>
      <button>
        <a href="https://youtu.be/r3jAJTQENBw?si=EyeYwkR6jo8zPfoh" target="_blank" rel="noopener noreferrer">
          VER VIDEOCLIP AHORA
        </a>
      </button>
    </div>
  );
}

export default PreSave;
