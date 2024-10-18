import "./pages/index.css";
import { initialCards } from "./scripts/cards"; // first 6 card
import { createCard, deleteCard, likeCard } from "./scripts/card";
import { openModal, closeModal, overlayClick } from "./scripts/modal";

// DOM узлы

const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");
const popupEdit = document.querySelector(".popup_type_edit");
const popupAdd = document.querySelector(".popup_type_new-card");
const popupImage = document.querySelector(".popup_type_image"); // popup image
const placesList = document.querySelector(".places__list"); // card container
const closeButtons = document.querySelectorAll(".popup__close"); // all x
const editForm = document.forms['edit-profile']; // profile edit form
const addForm = document.forms['new-place']; // new card add form
const cardImageTitle = document.querySelector(".popup__input_type_card-name");
const cardImageUrl = document.querySelector(".popup__input_type_url");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");
const nameTitle = document.querySelector(".profile__title");
const jobTItle = document.querySelector(".profile__description");

// Выводим карточки на страницу x6

initialCards.forEach((card) => {
  placesList.append(createCard({ card, deleteCard, openImg, likeCard }));
});

function profileEditSubmit(evt) {
  // renew profile information
  evt.preventDefault();
  const name = nameInput.value;
  const job = jobInput.value;
  nameTitle.textContent = name;
  jobTItle.textContent = job;
  closeModal(popupEdit);
}

function addNewCardSubmit(evt) {
  evt.preventDefault();
  const card = {
    name: cardImageTitle.value,
    link: cardImageUrl.value,
  };
  placesList.prepend(createCard({card, deleteCard, openImg, likeCard}));
  closeModal(popupAdd);
}

function openImg(item) {
  const img = popupImage.querySelector("img");
  const caption = popupImage.querySelector(".popup__caption");
  img.src = item.src;
  img.alt = item.alt;
  caption.textContent = item.alt;
  openModal(popupImage);
}

function openPopupProfile() {
  const name = document.querySelector(".popup__input_type_name");
  const job = document.querySelector(".popup__input_type_description");
  name.value = nameTitle.textContent;
  job.value = jobTItle.textContent;
  openModal(popupEdit);
}

function openPopupAddCard() {
  addForm.reset();
  openModal(popupAdd);
}

// radars

document.addEventListener("click", overlayClick); // add click to overlay
profileEditButton.addEventListener("click", () => openPopupProfile());
profileAddButton.addEventListener("click", () => openPopupAddCard());
editForm.addEventListener("submit", profileEditSubmit);
addForm.addEventListener("submit", addNewCardSubmit);

// close buttons

closeButtons.forEach((button) => {
  button.addEventListener("click", () =>
    closeModal(button.closest(".popup_is-opened"))
  );
});
