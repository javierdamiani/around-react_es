import "../index.css";
import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import api from "../utils/api";
import ImagePopup from "./ImagePopup";
import { CurrentUserContext } from "../contexts/CurrentContext";
import EditProfilePopUp from "./EditProfilePopUp";
import EditAvatarPopup from "./EditAvatarPopup";

function App() {
  const [isEditProfilePopUpOpen, setIsEditProfilePopUpOpen] =
    React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopUpOpen] =
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

  function handleCardDelete(card) {
    api
      .removeCard(card._id)
      .then(() => {
        const newCards = cards.filter((c) => c._id !== card._id);
        setCards(newCards);
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateUser({ name, about }) {
    api
      .setUserInfo({ name, about })
      .then((data) => {
        setCurrentUser(data);
        setIsEditProfilePopUpOpen(false);
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateAvatar(avatar){
    api
    .setUserAvatar(avatar)
    .then((data)=> {
      console.log("hola");
      setCurrentUser(data);
      setIsEditAvatarPopUpOpen(false);
    })
    .catch((err) => console.log(err))
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
          onCardDelete={handleCardDelete}
          cards={cards}
        />
        <Footer />

        <EditProfilePopUp
          isOpen={isEditProfilePopUpOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

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
