const cardTemplate = document.querySelector("#card-template").content.querySelector(".places__item");
const popupImage = document.querySelector(".popup_type_image"); // popup image

export function createCard(cardData, deleteCard, openModal, likeCard) {
  const card = cardTemplate.cloneNode(true);
  const cardImg = card.querySelector("img");
  const cardTitle = card.querySelector(".card__title");
  const cardDeleteButton = card.querySelector(".card__delete-button");
  const likeButton = card.querySelector(".card__like-button");
  cardTitle.textContent = cardData.name; // название карточки
  cardImg.setAttribute("src", cardData.link); // url изображения
  cardImg.setAttribute("alt", cardData.name); // alt изображения
  cardImg.addEventListener("click", (evt) => {
    openModal(popupImage, evt.target);
  });
  cardDeleteButton.addEventListener("click", deleteCard);
  likeButton.addEventListener("click", likeCard);
  return card;
}

export function deleteCard(evt) {
  evt.target.closest(".card").remove();
}

export function likeCard(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}
