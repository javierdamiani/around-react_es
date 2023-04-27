import "../index.css";
import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopUpWithForm from "./PopUpWithForm";
import api from "../utils/api";
import ImagePopup from "./ImagePopup";

function App() {
  const [isEditProfilePopUpOpen, setIsEditProfilePopUpOpen] = React.useState(false);
  const [isEditAvatarPopUpOpen, setIsEditAvatarPopUpOpen] = React.useState(false);
  const [isAddPlacePopUpOpen, setIsAddPlacePopUpOpen] = React.useState(false);
  const [isDeleteCardPopUpOpen, setIsDeleteCardPopUpOpen] =
    React.useState(false);

  const [selectedCard, setSelectedCard] = React.useState('{}');
  const [isSelectedCardOpen, setIsSelectedCardOpen] = React.useState(false)

  const [userDescription, setUserDescription] = React.useState("");
  const [userAvatar, setUserAvatar] = React.useState("");
  const [userName, setUserName] = React.useState("");
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api
      .getUserInfo()
      .then((data) => {
        setUserDescription(data.about);
        setUserAvatar(data.avatar);
        setUserName(data.name);
      })
      .catch((error) => console.log(error));
  }, []);

  React.useEffect(() => {
    api
      .getCardList()
      .then((data) => {
        setCards(data);
      })
      .catch((error) => console.log(error));
  }, []);

  function onEditProfileClick() {
    setIsEditProfilePopUpOpen(true);
  }

  function onEditAvatarClick() {
    setIsEditAvatarPopUpOpen(true);
  }

  function onAddPlaceClick() {
    setIsAddPlacePopUpOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsSelectedCardOpen(true)
  }

  function onDeleteCardClick(){
    setIsDeleteCardPopUpOpen(true)
  }

  function closeAllPopups() {
    setIsAddPlacePopUpOpen(false);
    setIsEditAvatarPopUpOpen(false);
    setIsEditProfilePopUpOpen(false);
    setIsSelectedCardOpen(false); 
    setIsDeleteCardPopUpOpen(false)
  }

  return (
    <div className="page">
      <Header />
      <Main
        onEditProfile={onEditProfileClick}
        onEditAvatar={onEditAvatarClick}
        onAddPlace={onAddPlaceClick}
        onCardClick={handleCardClick}
        onDeleteCard={onDeleteCardClick}
        userName={userName}
        userDescription={userDescription}
        userAvatar={userAvatar}
        cards={cards}
      />
      <Footer />
      <PopUpWithForm
        name="profile"
        title="Editar Perfil"
        isOpen={isEditProfilePopUpOpen}
        onClose={closeAllPopups}
      >
        <>
          <label for="popup-input-name" className="popup__field">
            <input
              type="text"
              name="name"
              placeholder="Nombre"
              value="Nombre"
              id="popupName"
              minlength="2"
              maxlength="40"
              className="popup__input popup__input_type_name"
              required
            />
            <span id="popupName-error" className="popup__error"></span>
          </label>
          <label for="popup-input-about" className="popup__field">
            <input
              type="text"
              name="about"
              placeholder="Acerca de mi"
              minlength="2"
              maxlength="200"
              id="popupAbout"
              className="popup__input popup__input_type_about"
              required
            />
            <p id="popupAbout-error" className="popup__error"></p>
          </label>
        </>
      </PopUpWithForm>

      <PopUpWithForm
        name="image_profile"
        title="Cambiar foto de perfil"
        isOpen={isEditAvatarPopUpOpen}
        onClose={closeAllPopups}
      >
        <label for="popup-input-image" className="popup__field">
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
      </PopUpWithForm>

      <PopUpWithForm
        name="card"
        title="Nuevo lugar"
        isOpen={isAddPlacePopUpOpen}
        onClose={closeAllPopups}
      >
        <label for="popup-input-title" className="popup__field">
          <input
            id="title"
            name="title"
            placeholder="Título"
            minlength="2"
            maxlength="30"
            type="text"
            className="popup__input"
            required
          />
          <p id="title-error" className="popup__error"></p>
        </label>
        <label for="popup-input-link" className="popup__field">
          <input
            type="url"
            name="image-link"
            className="popup__input"
            id="linkImg"
            placeholder="Enlace a la imagen"
            required
          />
          <p id="linkImg-error" className="popup__error"></p>
        </label>
      </PopUpWithForm>

      <PopUpWithForm
        name="delete_card"
        title="¿Estás seguro/a?"
        isOpen={isDeleteCardPopUpOpen}
        onClose={closeAllPopups}
      ></PopUpWithForm>

      <ImagePopup
      card={selectedCard}
      isOpen={isSelectedCardOpen}
      onClose={closeAllPopups} />
    </div>
  );
}

export default App;
