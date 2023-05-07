import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopUp({ isOpen, onClose }) {
  return (
    <>
      <PopupWithForm
        name="profile"
        title="Editar Perfil"
        isOpen={isOpen}
        onClose={onClose}
      >
        <>
          <label className="popup__field">
            <input
              type="text"
              name="name"
              placeholder="Nombre"
              id="popupName"
              minLength="2"
              maxLength="40"
              className="popup__input popup__input_type_name"
              required
            />
            <span id="popupName-error" className="popup__error"></span>
          </label>
          <label className="popup__field">
            <input
              type="text"
              name="about"
              placeholder="Acerca de mi"
              minLength="2"
              maxLength="200"
              id="popupAbout"
              className="popup__input popup__input_type_about"
              required
            />
            <p id="popupAbout-error" className="popup__error"></p>
          </label>
        </>
      </PopupWithForm>
    </>
  );
}

export default EditProfilePopUp;
