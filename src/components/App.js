import "../index.css";
import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import api from "../utils/api";
import ImagePopup from "./ImagePopup";
import { CurrentUserContext } from "../contexts/CurrentContext";

function App() {
  const [isEditProfilePopUpOpen, setIsEditProfilePopUpOpen] =
    React.useState(false);
  const [isEditAvatarPopUpOpen, setIsEditAvatarPopUpOpen] =
    React.useState(false);
  const [isAddPlacePopUpOpen, setIsAddPlacePopUpOpen] = React.useState(false);
  const [isDeleteCardPopUpOpen, setIsDeleteCardPopUpOpen] =
    React.useState(false);

  const [selectedCard, setSelectedCard] = React.useState("{}");
  const [isSelectedCardOpen, setIsSelectedCardOpen] = React.useState(false);

  const [cards, setCards] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState({});

  React.useEffect(() => {
    api
      .getCardList()
      .then((data) => {
        setCards(data);
      })
      .catch((error) => console.log(error));
  }, []);

  React.useEffect(() => {
    api
      .getUserInfo()
      .then((data) => {
        setCurrentUser(data);
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
    setIsSelectedCardOpen(true);
  }

  function onDeleteCardClick() {
    setIsDeleteCardPopUpOpen(true);
  }

  function closeAllPopups() {
    setIsAddPlacePopUpOpen(false);
    setIsEditAvatarPopUpOpen(false);
    setIsEditProfilePopUpOpen(false);
    setIsSelectedCardOpen(false);
    setIsDeleteCardPopUpOpen(false);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        const newCards = cards.map((c) => (c._id === card._id ? newCard : c));
        setCards(newCards);
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header />
        <Main
          onEditProfile={onEditProfileClick}
          onEditAvatar={onEditAvatarClick}
          onAddPlace={onAddPlaceClick}
          onCardClick={handleCardClick}
          onDeleteCard={onDeleteCardClick}
          onCardLike={handleCardLike}
          cards={cards}
        />
        <Footer />
        <PopupWithForm
          name="profile"
          title="Editar Perfil"
          isOpen={isEditProfilePopUpOpen}
          onClose={closeAllPopups}
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

        <PopupWithForm
          name="image_profile"
          title="Cambiar foto de perfil"
          isOpen={isEditAvatarPopUpOpen}
          onClose={closeAllPopups}
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

        <PopupWithForm
          name="card"
          title="Nuevo lugar"
          isOpen={isAddPlacePopUpOpen}
          onClose={closeAllPopups}
        >
          <label className="popup__field">
            <input
              id="title"
              name="title"
              placeholder="Título"
              minLength="2"
              maxLength="30"
              type="text"
              className="popup__input"
              required
            />
            <p id="title-error" className="popup__error"></p>
          </label>
          <label className="popup__field">
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
        </PopupWithForm>

        <PopupWithForm
          name="delete_card"
          title="¿Estás seguro/a?"
          isOpen={isDeleteCardPopUpOpen}
          onClose={closeAllPopups}
        ></PopupWithForm>

        <ImagePopup
          card={selectedCard}
          isOpen={isSelectedCardOpen}
          onClose={closeAllPopups}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
