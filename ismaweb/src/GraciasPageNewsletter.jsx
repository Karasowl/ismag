import styled from 'styled-components';
import profileImg6 from "./assets/612_n.webp";
import { useNavigate } from 'react-router-dom';

const GraciasPageNewsletterContainer = styled.div`
  background: linear-gradient(to bottom right, rgba(58, 134, 255, 0.8), rgba(251, 211, 233, 0.8));
  background-size: cover;
  min-height:  100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0 2rem;
    color: white;
    text-align: center;
    max-width: 500px;
    padding: 20px;
    box-shadow: 0 0 10px #0003;
    border-radius: 10px;
    background: linear-gradient(to bottom right, rgba(58, 134, 255, 0.3), rgba(251, 211, 233, 0.4));
    margin: 1rem;

    &:hover {
      background: linear-gradient(to bottom right, rgba(58, 134, 255, 0.3), rgba(251, 211, 233, 0.8));
    }

    @media (max-width: 480px) {
      max-width: 300px;
      padding: 50px;
    }

    span {
      background: white;
      width: 75px;
      height: 1px;
      margin: 1.5rem 0;

      @media (max-width: 480px) {
        width: 50px;
      
      }
    }

    h1 {
      font-size: 2rem;
      margin-bottom: 20px;

      @media (max-width: 768px) {
        font-size: 1.5rem;
      }

      @media (max-width: 480px) {
        font-size: 1.5rem;
      }
    }

    p {
      font-size: 1.3rem;
      margin-bottom: 40px;

      @media (max-width: 768px) {
        font-size: 1rem;
        margin-bottom: 20px;
      }

      @media (max-width: 480px) {
        font-size: 1.2rem;
        margin-bottom: 10px;
      }
    }

    button {
      background-color: #fff;
      color: #000;
      border: none;
      border-radius: 5px;
      padding: 15px 25px;
      font-size: 1rem;
      cursor: pointer;
      transition: all 0.3s ease;
      margin-bottom: 100px;

      @media (max-width: 768px) {
        margin-bottom: 50px;
      }

      @media (max-width: 480px) {
        margin-bottom: 20px;
        margin-top: 50px;
      }

      &:hover {
        background: linear-gradient(to bottom right, rgba(58, 134, 255, 0.8), rgba(251, 211, 233, 0.0));
        color: #fff;
      }
    }
  }
`;

const ImgProfile = styled.img`
  width: 110px;
  height: 110px;
  object-fit: cover;
  border-radius: 50%;
  margin-bottom: 1rem;
  transition: opacity 0.5s ease-in-out;
  border: 2px solid #fff;
  box-shadow: 0 0 10px #0003;

  @media (max-width: 768px) {
    width: 80px;
    height: 80px;
    margin-bottom: 0.5rem;
  }

  @media (max-width: 480px) {
    width: 100px;
    height: 100px;
  }
`;

function GraciasPageNewsletter({ email }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1);
  };
  
  console.log(email);
  return (
    <GraciasPageNewsletterContainer>
      <div>
        <ImgProfile src={profileImg6} />
        <span></span>
        <h1>Gracias por suscribirte a la newsletter</h1>
        <p>
          Te enviamos un email a <strong>{email}</strong> para que confirmes tu suscripción.
        </p>
        <button onClick={handleClick}>Ir al inicio</button>
      </div>
    </GraciasPageNewsletterContainer>
  );
}

export default GraciasPageNewsletter;