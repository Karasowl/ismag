import coverImg from "./assets/MIL MARES COVER (1) [Ancho Máximo 320 Altura Máxima 240].webp";

const PreSave = () => {
  return (
    <div className='preSave'>
    <img src={coverImg}></img>
      <p>¡Mil Mares llega este viernes!</p>
      <button>
        <a href="https://found.ee/ismaelguimarais-milmares" target="_blank" rel="noopener noreferrer">
          PRE SALVAR AHORA
        </a>
      </button>
    </div>
  );
}

export default PreSave;
