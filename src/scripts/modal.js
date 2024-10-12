import { jobTItle, nameTitle } from "..";

const page = document.querySelector(".page");

export function openModal(popup, eventTarget) {
  popup.classList.add("popup_is-opened"); //show modal
  page.addEventListener("keydown", escCloser);
  page.addEventListener("click", overlayClick); // !! here click  for overlay

  if (popup.classList.contains("popup_type_edit")) {
    const elements = popup.querySelector(".popup__form").elements;
    elements[0].value = nameTitle.textContent;
    elements[1].value = jobTItle.textContent;
    return;
  }

  if (popup.classList.contains("popup_type_new-card")) {
    const elements = popup.querySelector(".popup__form").elements;
    elements.link.value = "";
    elements["place-name"].value = "";
    return;
  }

  if (popup.classList.contains("popup_type_image")) {
    document.querySelector(".popup__image").src = eventTarget.src;
    document.querySelector(".popup__caption").textContent = eventTarget.alt;
  }
}

export function closeModal() {
  // close !any modal
  const pops = document.querySelectorAll(".popup");
  pops.forEach((pop) => pop.classList.remove("popup_is-opened")); // remove class
  page.removeEventListener("keydown", escCloser); // delete esc listener
}

export function escCloser(event) {
  // Escape
  if (event.key === "Escape") {
    closeModal();
  }
}

function overlayClick(e) {
  // !!!
  debugger
  //
  
  console.log(e);
}
