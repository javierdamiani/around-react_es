import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  return (
    <>
      <PopupWithForm
        name="image_profile"
        title="Cambiar foto de perfil"
        isOpen={props.isOpen}
        onClose={props.onClose}
      >
        <label className="popup__field">
          <input
            type="url"
            name="image-link"
            placeholder="Imagen URL"
            id="popUpInputImage"
            className="popup__input"
            required
          />
          <p
            id="popUpInputImage-error"
            className="popup__error popup-input-image-error"
          ></p>
        </label>
      </PopupWithForm>
    </>
  );
}

export default EditAvatarPopup;
