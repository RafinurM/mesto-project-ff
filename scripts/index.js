// @todo: Темплейт карточки

const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы

const placesList = document.querySelector(".places__list");
// const addButton = document.querySelector(".profile__add-button");

// @todo: Функция создания карточки

function createCard(cardData, deleteCard) {
  const card = cardTemplate.cloneNode(true);
  const cardImg = card.querySelector("img");
  const cardTitle = card.querySelector(".card__title");
  const cardDeleteButton = card.querySelector(".card__delete-button");
  cardDeleteButton.addEventListener("click", deleteCard);
  cardTitle.textContent = cardData.name; // название карточки
  cardImg.setAttribute("src", cardData.link); // url изображения
  cardImg.setAttribute("alt", cardData.name); // alt изображения
  placesList.append(card);
  return card;
}

// @todo: Функция удаления карточки

function deleteCard(evt) {
  evt.target.closest(".card").remove();
}

// @todo: Вывести карточки на страницу

initialCards.forEach((card) => {
  createCard(card, deleteCard);
});
