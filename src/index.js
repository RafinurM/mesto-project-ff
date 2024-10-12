import "./pages/index.css";
import { initialCards } from "./scripts/cards"; // first 6 card
import { createCard, deleteCard, likeCard } from "./scripts/card";
import { openModal, closeModal } from "./scripts/modal";

// DOM узлы
const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");
const popupEdit = document.querySelector(".popup_type_edit");
const popupAdd = document.querySelector(".popup_type_new-card");
const placesList = document.querySelector(".places__list"); // card container
const closeButtons = document.querySelectorAll(".popup__close"); // all x
const editForm = document.forms[0]; // profile edit form
const addForm = document.forms[1]; // new card add form
const cardImageTitle = document.querySelector(".popup__input_type_card-name");
const cardImageUrl = document.querySelector(".popup__input_type_url");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");
export const nameTitle = document.querySelector(".profile__title");
export const jobTItle = document.querySelector(".profile__description");

// Выводим карточки на страницу x6

initialCards.forEach((card) => {
  placesList.append(createCard(card, deleteCard, openModal, likeCard));
});

// radars

profileEditButton.addEventListener("click", () => openModal(popupEdit));
profileAddButton.addEventListener("click", () => openModal(popupAdd));
editForm.addEventListener("submit", profileEditSubmit);
addForm.addEventListener("submit", addNewCardSubmit);

// close buttons

closeButtons.forEach((button) => {
  button.addEventListener("click", closeModal);
});

function profileEditSubmit(evt) {
  // renew profile information
  evt.preventDefault();
  const name = nameInput.value;
  const job = jobInput.value;
  nameTitle.textContent = name;
  jobTItle.textContent = job;
  closeModal();
}

function addNewCardSubmit(evt) {
  // add new card
  evt.preventDefault();
  placesList.prepend(
    createCard(
      {
        name: cardImageTitle.value,
        link: cardImageUrl.value,
      },
      deleteCard,
      openModal,
      likeCard
    )
  );
  cardImageTitle.value = "";
  cardImageUrl.value = "";
  closeModal();
}
