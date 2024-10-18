export function openModal(popup) {
  popup.classList.add("popup_is-opened"); //show modal
  document.addEventListener("keydown", escCloser);
}

export function closeModal(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", escCloser);
}

export function escCloser(event) {
  // Escape
  if (event.key === "Escape") {
    const popup = document.querySelector(".popup_is-opened");
    closeModal(popup);
  }
}

export function overlayClick(e) {
  const popup = document.querySelector(".popup_is-opened");
  if (e.target == popup) {
    closeModal(popup);
  }
}
