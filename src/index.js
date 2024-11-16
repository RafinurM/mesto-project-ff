import "./pages/index.css";
import { createCard } from "./scripts/card";
import { openModal, closeModal, overlayClick } from "./scripts/modal";
import { enableValidation, clearValidation } from "./scripts/validation";
import {
  authorization,
  fetchCards,
  saveProfileData,
  addCardAPI,
  changeAvatarAPI,
  deleteCardAPI,
  likeCardAPI,
  unlikeCardAPI,
} from "./scripts/api";

// DOM узлы

const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");
const popups = document.querySelectorAll(".popup"); // all popups
const popupEdit = document.querySelector(".popup_type_edit");
const popupAdd = document.querySelector(".popup_type_new-card");
const popupImage = document.querySelector(".popup_type_image"); // popup image
const popupAvatar = document.querySelector(".popup_type_avatar"); // avatar change popup
const popupDelete = document.querySelector(".popup_type_agree"); // Попап "Вы уверены?"
const placesList = document.querySelector(".places__list"); // card container
const closeButtons = document.querySelectorAll(".popup__close"); // all x
const editForm = document.forms["edit-profile"]; // profile edit form
const addForm = document.forms["new-place"]; // new card add form
const avatarForm = document.forms["avatar-link"]; // avatar form
const deleteForm = document.forms["agree"]; // agree form on delete
const cardImageTitle = document.querySelector(".popup__input_type_card-name");
const cardImageUrl = document.querySelector(".popup__input_type_url");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");
const avatarInput = document.querySelector(".popup__input_type_avatar");
const nameTitle = document.querySelector(".profile__title");
const jobTItle = document.querySelector(".profile__description");
const avatar = document.querySelector(".profile__image");

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};
let userId = null;
let cardID = null; // для API
let cardDOM = null; // для удаления карточки со страницы

function profileEditSubmit(evt) {
  // renew profile information
  evt.preventDefault();
  const name = nameInput.value;
  const job = jobInput.value;
  const savebutton = evt.target.querySelector(".button");
  renderSaving(savebutton, true);
  saveProfileData(name, job)
    .then(() => {
      nameTitle.textContent = name;
      jobTItle.textContent = job;
      closeModal(popupEdit);
    })
    .catch((error) => alert(`Ой! Произошла ошибка: ${error}`))
    .finally(() => {
      renderSaving(savebutton, false);
    });
}

function addNewCardSubmit(evt) {
  evt.preventDefault();
  const savebutton = evt.target.querySelector(".button");
  renderSaving(savebutton, true);
  const card = {
    name: cardImageTitle.value,
    link: cardImageUrl.value,
  };
  addCardAPI(card)
    .then((card) => {
      placesList.prepend(
        createCard({ card, openPopupDelete, openImg, likeCard, userId })
      );
      closeModal(popupAdd);
    })
    .catch((error) => alert(`Ой! Произошла ошибка: ${error}`))
    .finally(() => {
      renderSaving(savebutton, false);
    });
}

function changeAvatar(evt) {
  evt.preventDefault();
  const savebutton = evt.target.querySelector(".button");
  renderSaving(savebutton, true);
  changeAvatarAPI(avatarInput.value)
    .then(() => {
      avatar.style.backgroundImage = `url(${avatarInput.value})`;
      closeModal(popupAvatar);
    })
    .catch((error) => alert(`Ой! Произошла ошибка: ${error}`))
    .finally(() => {
      renderSaving(savebutton, false);
    });
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
  clearValidation(editForm, validationConfig);
}

function openPopupAddCard() {
  addForm.reset();
  openModal(popupAdd);
  clearValidation(addForm, validationConfig);
}

function openPopupAvatarChange() {
  avatarForm.reset();
  clearValidation(avatarForm, validationConfig);
  openModal(popupAvatar);
}

function openPopupDelete(evt, cardId) {
  openModal(popupDelete);
  cardDOM = evt.target.closest(".card"); // выбираем карточку на которой был клик по корзинке
  cardID = cardId; // запоминаем ID карточки для передачи в API
}

function likeCard(evt, cardId) {
  if (evt.target.classList.contains("card__like-button_is-active")) {
    unlikeCardAPI(cardId)
      .then((data) => {
        evt.target.nextElementSibling.textContent = data.likes.length;
        evt.target.classList.toggle("card__like-button_is-active");
      })
      .catch((error) => alert(`Ой! Произошла ошибка: ${error}`));
  } else {
    likeCardAPI(cardId)
      .then((data) => {
        console.log(data);
        evt.target.nextElementSibling.textContent = data.likes.length;
        evt.target.classList.toggle("card__like-button_is-active");
      })
      .catch((error) => alert(`Ой! Произошла ошибка: ${error}`));
  }
}

function deleteCard() {
  deleteCardAPI(cardID).then(() => {
    cardDOM.remove();
    closeModal(popupDelete);
  })
  .catch((error) => alert(`Ой! Произошла ошибка: ${error}`))
}

function renderSaving(button, isSaving) {
  if (isSaving) {
    button.textContent = "Сохранение...";
  } else {
    button.textContent = "Сохранить";
  }
}

function init() {
  // load user info & cards
  Promise.all([authorization(), fetchCards()]).then(
    ([authResponce, fetchCardResponce]) => {
      nameTitle.textContent = authResponce.name;
      jobTItle.textContent = authResponce.about;
      avatar.style.backgroundImage = `url(${authResponce.avatar})`;
      userId = authResponce._id;
      fetchCardResponce.forEach((card) => {
        placesList.append(
          createCard({ card, openPopupDelete, openImg, likeCard, userId })
        );
      });
      return fetchCardResponce;
    }
  );
}

init(); // initialization app

// validation

enableValidation(validationConfig);

// radars

popups.forEach((popup) => {
  popup.addEventListener("click", overlayClick);
  // add click to overlay
});
profileEditButton.addEventListener("click", openPopupProfile);
profileAddButton.addEventListener("click", openPopupAddCard);
avatar.addEventListener("click", openPopupAvatarChange);
editForm.addEventListener("submit", profileEditSubmit);
addForm.addEventListener("submit", addNewCardSubmit);
avatarForm.addEventListener("submit", changeAvatar);
deleteForm.addEventListener("submit", deleteCard);
// close buttons

closeButtons.forEach((button) => {
  const popupContent = button.closest(".popup__content");
  const form = popupContent.querySelector(validationConfig.formSelector);
  button.addEventListener("click", () =>
    closeModal(button.closest(".popup_is-opened"))
  );
});
