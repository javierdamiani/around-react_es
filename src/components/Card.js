import React from "react";
import trashCan from "../images/trashCan.svg";
import likeBtn from "../images/like_button.svg";
import rectangle from "../images/Rectangle.png";

function Card(props) {
  function handleClick() {
    props.onCardClick(props.card);
  }
  return (
    <>
      <div
        key={props.card._id}
        className="elements__template_element"
        id="cities"
      >
        <img
          src={trashCan}
          alt="Imagen de un contenedor de basura para eliminar la tarjeta"
          className="elements__template_element-trash"
          id="trashCan"
          onClick={props.onDeleteCard}

        />
        <div>
          <img
            src={likeBtn}
            alt="Botón de corazón para dar like"
            className="elements__template_element-button"
            id="likeBtn"
          />
          <p className="elements__template_element-counter" id="heartCounter">
            {props.card.likes ? props.card.likes.length : 0}
          </p>
        </div>
        <img
          src={props.card.link}
          alt={props.card.name}
          className="elements__template_element-image"
          id="cardImg"
          onClick={handleClick}
        />
        <p className="elements__template_element-text" id="cardTitle">
          {props.card.name}
        </p>
        <img
          src={rectangle}
          alt="Recángulo blanco que contiene las imágenes de las tarjetas"
          className="elements__template_element-rectangle"
        />
      </div>
    </>
  );
}

export default Card;
