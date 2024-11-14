import { likeCardAPI, unlikeCardAPI } from "./api";

const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".places__item");

export function createCard(cardData) {
  // console.log(cardData);
  const card = cardTemplate.cloneNode(true);
  const cardImg = card.querySelector("img");
  const cardTitle = card.querySelector(".card__title");
  const cardDeleteButton = card.querySelector(".card__delete-button");
  const likeButton = card.querySelector(".card__like-button");
  const likes = card.querySelector(".card__like-count");
  likes.textContent = cardData.card.likes.length;
  cardTitle.textContent = cardData.card.name; // название карточки
  cardImg.setAttribute("src", cardData.card.link); // url изображения
  cardImg.setAttribute("alt", cardData.card.name); // alt изображения
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

    cardData.card.likes.forEach((liker) => {
      if (liker && liker._id == cardData.userId) {
        unlikeCardAPI(cardData.card._id).then((data) => {
          likes.textContent = data.likes.length;
        });
      } else {
        likeCardAPI(cardData.card._id).then((data) => {
          likes.textContent = data.likes.length;
        });
      }
    });

    likeCardAPI(cardData.card._id).then((data) => {
      likes.textContent = data.likes.length;
    });

    likeCard(evt);
  });
  return card;
}

export function deleteCard(evt, cardId) {
  fetch(`https://nomoreparties.co/v1/wff-cohort-26/cards/${cardId}`, {
    method: "DELETE",
    headers: {
      authorization: "c9c60273-fc29-4cea-b81c-7e91a6e6ef01",
      "Content-Type": "application/json",
    },
  });
  evt.target.closest(".card").remove();
}

export function likeCard(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}
