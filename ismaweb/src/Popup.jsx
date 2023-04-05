import { useState, useEffect } from "react";
import Mailchimp from "./Mailchimp";
import "./Popup.css";

function Popup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Verificar si han pasado al menos 7 días desde la última vez que se mostró el popup
    /* const lastShown = localStorage.getItem("lastShown"); */
    const lastShown = null;
    if (!lastShown || Date.now() - new Date(lastShown) > 2 * 1000) {
      // Mostrar el popup después de 3 segundos
      setTimeout(() => {
        setIsOpen(true);
      }, 3000);
    }
  }, []);

  function handleClose() {
    setIsOpen(false);
  }

  // Actualizar la fecha de la última vez que se mostró el popup
  useEffect(() => {
    if (isOpen) {
      localStorage.setItem("lastShown", Date.now());
    }
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <div className="popup">
          <div className="popup-content">
            <button className="close-button" onClick={handleClose}>
              X
            </button>
            <Mailchimp />
          </div>
        </div>
      )}
    </>
  );
}

export default Popup;
