import "./pages/index.css";
import { createCard, deleteCard, likeCard } from "./scripts/card";
import { openModal, closeModal, overlayClick } from "./scripts/modal";
import { enableValidation, clearValidation } from "./scripts/validation";
import {
  authorization,
  fetchCards,
  saveProfileData,
  addCardAPI,
  changeAvatarAPI,
} from "./scripts/api";

// DOM узлы

const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");
const agreeButton = document.querySelector(".popup__agree-button"); // Кнопка "Да"
// const avatarSaveButton = document.querySelector(".popup__");
const popups = document.querySelectorAll(".popup"); // all popups
const popupEdit = document.querySelector(".popup_type_edit");
const popupAdd = document.querySelector(".popup_type_new-card");
const popupImage = document.querySelector(".popup_type_image"); // popup image
const popupDelete = document.querySelector(".popup_type_agree"); // Попап "Вы уверены?"
const popupAvatar = document.querySelector(".popup_type_avatar"); // avatar change popup
const placesList = document.querySelector(".places__list"); // card container
const closeButtons = document.querySelectorAll(".popup__close"); // all x
const editForm = document.forms["edit-profile"]; // profile edit form
const addForm = document.forms["new-place"]; // new card add form
const avatarForm = document.forms["avatar-link"]; // avatar form
const cardImageTitle = document.querySelector(".popup__input_type_card-name");
const cardImageUrl = document.querySelector(".popup__input_type_url");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");
const avatarInput = document.querySelector(".popup__input_type_avatar");
const nameTitle = document.querySelector(".profile__title");
const jobTItle = document.querySelector(".profile__description");
const avatar = document.querySelector(".profile__image");

let userId = null;
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

function profileEditSubmit(evt) {
  // renew profile information
  evt.preventDefault();
  const name = nameInput.value;
  const job = jobInput.value;
  nameTitle.textContent = name;
  jobTItle.textContent = job;
  saveProfileData(name, job);
  closeModal(popupEdit);
}

function addNewCardSubmit(evt) {
  evt.preventDefault();
  const card = {
    name: cardImageTitle.value,
    link: cardImageUrl.value,
  };
  addCardAPI(card).then((card) => {
    placesList.prepend(
      createCard({ card, deleteCard, openImg, likeCard, userId })
    );
  });

  // placesList.prepend(createCard({ returnedCard, deleteCard, openImg, likeCard }));

  closeModal(popupAdd);
}

function changeAvatar(evt) {
  evt.preventDefault();
  changeAvatarAPI(avatarInput.value);
  avatar.style.backgroundImage = `url(${avatarInput.value})`;
  closeModal(popupAvatar);
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

function openPopupDeleteCard() {
  openModal(popupDelete);
}

function openPopupAvatarChange() {
  avatarForm.reset();
  openModal(popupAvatar);
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
          createCard({ card, deleteCard, openImg, likeCard, userId })
        );
      });
      return fetchCardResponce;
    }
  );
}

init();

// authorization().then((data) => {
//   nameTitle.textContent = data.name;
//   jobTItle.textContent = data.about;
//   avatar.style.backgroundImage = `url(${data.avatar})`;
//   userId = data._id;
// });

// fetchCards().then((cards) => {
//   cards.forEach((card) => {
//     placesList.append(createCard({ card, deleteCard, openImg, likeCard, userId }));
//   });
//   return cards
// });

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
agreeButton.addEventListener("submit", () => {
  console.log("da");
}); // delete

// close buttons

closeButtons.forEach((button) => {
  const popupContent = button.closest(".popup__content");
  const form = popupContent.querySelector(validationConfig.formSelector);
  button.addEventListener("click", () =>
    closeModal(button.closest(".popup_is-opened"))
  );

  // clearValidation(form, validationConfig) ???
});
