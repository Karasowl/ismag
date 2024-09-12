import coverImg from "./assets/Muy Civilizado cover.webp";

const PreSave = () => {
  return (
    <div className='preSave'>
    <img src={coverImg}></img>
      <p>"Un ateo, un bohemio, un intelectual, un tipo muy civilizado, un tipo que llora solo, un tipo que NECESITA ENCONTRARSE CON DIOS."</p>
      <button>
        <a href="https://youtu.be/eJ4tCKzUQ6I" target="_blank" rel="noopener noreferrer">
          VER VIDEOCLIP AHORA
        </a>
      </button>
    </div>
  );
}

export default PreSave;
