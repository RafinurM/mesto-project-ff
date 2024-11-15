import { deleteCardAPI, likeCardAPI, unlikeCardAPI } from "./api";
import { closeModal, openModal } from "./modal";

const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".places__item");

export function createCard(cardData) {
  const card = cardTemplate.cloneNode(true);
  const cardImg = card.querySelector("img");
  const cardTitle = card.querySelector(".card__title");
  const cardDeleteButton = card.querySelector(".card__delete-button");
  const likeButton = card.querySelector(".card__like-button");
  const likes = card.querySelector(".card__like-count");
  cardTitle.textContent = cardData.card.name; // название карточки
  cardImg.setAttribute("src", cardData.card.link); // url изображения
  cardImg.setAttribute("alt", cardData.card.name); // alt изображения
  likes.textContent = cardData.card.likes.length;

  if (cardData.userId != cardData.card.owner._id) {
    cardDeleteButton.hidden = true;
  }

  cardData.card.likes.forEach((liker) => {
    // show as liked
    if (liker._id == cardData.userId) {
      likeButton.classList.add("card__like-button_is-active");
    }
  });

  cardImg.addEventListener("click", (evt) => {
    cardData.openImg(evt.target);
  });

  cardDeleteButton.addEventListener("click", (evt) => {
    cardData.deleteCard(evt, cardData.card._id);
  });

  likeButton.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("card__like-button_is-active")) {
      unlikeCardAPI(cardData.card._id).then((data) => {
        likes.textContent = data.likes.length;
      });
    } else {
      likeCardAPI(cardData.card._id).then((data) => {
        likes.textContent = data.likes.length;
      });
    }
    likeCard(evt);
  });
  return card;
}

export function deleteCard(evt, cardId) {
  const agreeButton = document.querySelector(".popup__agree-button"); // Кнопка "Да"
  const popupDelete = document.querySelector(".popup_type_agree"); // Попап "Вы уверены?"
  openModal(popupDelete);
  agreeButton.addEventListener("click", (event) => {
    event.preventDefault();
    deleteCardAPI(cardId);
    evt.target.closest(".card").remove();
    closeModal(popupDelete);
  });
}

export function likeCard(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}
