import React from "react";
import closeIcon from "../images/close_icon.svg";

function ImagePopup(props) {
  return (
    <>
      <div
        className={`"popup popup_img ${props.isOpen ? "popup__opened" : ""}`}
        id="modalPopUp"
      >
        <div className="popup__img">
          <div>
            <img
              src={props.card.link}
              alt=""
              className="popup__img-background"
              id="cardPopUp"
            />
            <img
              src={closeIcon}
              alt="Equis para cerrar el formulario"
              className="popup__img-close"
              id="closeImgBtn"
              onClick={props.onClose}
            />
            <p className="popup__img-title" id="popUpImgTitle">{props.card.name} </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default ImagePopup;
