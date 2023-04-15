import styled, { keyframes } from 'styled-components';

const ButtonLinkStyled = styled.a`
  transition: all 0.07s ease-in-out;
  background-color: #0068b5;
  color: #fff;
  width: 100%;
  padding: 15px;
  margin: 10px;
  font-size: 14px;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  cursor: pointer;
  border: 1px solid transparent;
  border-radius: 4px;
  user-select: none;

  &:hover {
    background-color: #00aaff;
    animation: none;
    transform: scale(1.03);
    transition: all 0.1s ease-in-out;
    border: solid white 1.5px;
  }

  &:active {
    background-color: #005d8b;
    animation: none;
    transform: scale(1);
    transition: all 0..8s ease-in-out;
  }

  color: var(--main);
  text-decoration: none;

  /* Extra Small Devices, Phones */
  @media only screen and (max-width: 575px) {
    /* Estilos para dispositivos móviles */

    padding: 10px;
    font-size: 16px;
    font-weight: 200;
    line-height: 1.2;
  }
`;

function ButtonLink({link, fabicon, nameButton, moreClasses}) {
  const classes = `btn-link ${moreClasses} ${fabicon}`;

  return (
    <ButtonLinkStyled 
      href={link} 
      target="_blank" 
      className={classes} 
      id={`${fabicon}_ButtonLink`}
    >
      <i className={`fab fa-${fabicon}`}></i> {nameButton}
    </ButtonLinkStyled>
  );
}

export default ButtonLink;