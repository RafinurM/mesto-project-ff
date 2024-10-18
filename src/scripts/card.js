const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".places__item");

export function createCard(cardActions) {
  const card = cardTemplate.cloneNode(true);
  const cardImg = card.querySelector("img");
  const cardTitle = card.querySelector(".card__title");
  const cardDeleteButton = card.querySelector(".card__delete-button");
  const likeButton = card.querySelector(".card__like-button");
  cardTitle.textContent = cardActions.card.name; // название карточки
  cardImg.setAttribute("src", cardActions.card.link); // url изображения
  cardImg.setAttribute("alt", cardActions.card.name); // alt изображения
  cardImg.addEventListener("click", (evt) => {
    cardActions.openImg(evt.target);
  });
  cardDeleteButton.addEventListener("click", cardActions.deleteCard);
  likeButton.addEventListener("click", cardActions.likeCard);
  return card;
}

export function deleteCard(evt) {
  evt.target.closest(".card").remove();
}

export function likeCard(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}
