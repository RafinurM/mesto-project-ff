(()=>{"use strict";var e=document.querySelector("#card-template").content.querySelector(".places__item");function t(t){var n=e.cloneNode(!0),r=n.querySelector("img"),o=n.querySelector(".card__title"),c=n.querySelector(".card__delete-button"),u=n.querySelector(".card__like-button"),a=n.querySelector(".card__like-count");return o.textContent=t.card.name,r.setAttribute("src",t.card.link),r.setAttribute("alt",t.card.name),a.textContent=t.card.likes.length,t.userId!=t.card.owner._id&&(c.hidden=!0),t.card.likes.forEach((function(e){e._id==t.userId&&u.classList.add("card__like-button_is-active")})),r.addEventListener("click",(function(e){t.openImg(e.target)})),c.addEventListener("click",(function(e){t.openPopupDelete(e,t.card._id)})),u.addEventListener("click",(function(e){t.likeCard(e,t.card._id)})),n}function n(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",o)}function r(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",o)}function o(e){"Escape"===e.key&&r(document.querySelector(".popup_is-opened"))}function c(e){var t=document.querySelector(".popup_is-opened");e.target==t&&r(t)}function u(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.disabled=!1,t.classList.remove(n.inactiveButtonClass)):(t.disabled=!0,t.classList.add(n.inactiveButtonClass))}function a(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);console.log(r),n.forEach((function(n){var r=e.querySelector(".".concat(n.id,"-error"));n.classList.remove(t.inputErrorClass),r.textContent=""})),u(n,r,t)}var i={baseUrl:"https://nomoreparties.co/v1/wff-cohort-26",headers:{authorization:"c9c60273-fc29-4cea-b81c-7e91a6e6ef01","Content-Type":"application/json"}};function l(e){return e.ok?e.json():Promise.reject("Ошибка ".concat(e.status))}function s(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}var d,p=document.querySelector(".profile__edit-button"),f=document.querySelector(".profile__add-button"),_=document.querySelectorAll(".popup"),m=document.querySelector(".popup_type_edit"),y=document.querySelector(".popup_type_new-card"),h=document.querySelector(".popup_type_image"),v=document.querySelector(".popup_type_avatar"),S=document.querySelector(".popup_type_agree"),b=document.querySelector(".places__list"),g=document.querySelectorAll(".popup__close"),q=document.forms["edit-profile"],E=document.forms["new-place"],k=document.forms["avatar-link"],C=document.forms.agree,L=document.querySelector(".popup__input_type_card-name"),x=document.querySelector(".popup__input_type_url"),A=document.querySelector(".popup__input_type_name"),I=document.querySelector(".popup__input_type_description"),U=document.querySelector(".popup__input_type_avatar"),w=document.querySelector(".profile__title"),D=document.querySelector(".profile__description"),P=document.querySelector(".profile__image"),T={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"},j=null,O=null,B=null;function M(e){var t=h.querySelector("img"),r=h.querySelector(".popup__caption");t.src=e.src,t.alt=e.alt,r.textContent=e.alt,n(h)}function N(e,t){n(S),B=e.target.closest(".card"),O=t}function J(e,t){e.target.classList.contains("card__like-button_is-active")?function(e){return fetch("".concat(i.baseUrl,"/cards/likes/").concat(e),{method:"DELETE",headers:i.headers}).then((function(e){return l(e)})).then((function(e){return e}))}(t).then((function(t){e.target.nextElementSibling.textContent=t.likes.length,e.target.classList.toggle("card__like-button_is-active")})).catch((function(e){return alert("Ой! Произошла ошибка: ".concat(e))})):function(e){return fetch("".concat(i.baseUrl,"/cards/likes/").concat(e),{method:"PUT",headers:i.headers}).then((function(e){return l(e)})).then((function(e){return e}))}(t).then((function(t){console.log(t),e.target.nextElementSibling.textContent=t.likes.length,e.target.classList.toggle("card__like-button_is-active")})).catch((function(e){return alert("Ой! Произошла ошибка: ".concat(e))}))}function H(e,t){e.textContent=t?"Сохранение...":"Сохранить"}Promise.all([fetch("".concat(i.baseUrl,"/users/me"),{headers:i.headers}).then((function(e){return l(e)})).then((function(e){return e})),fetch("".concat(i.baseUrl,"/cards"),{headers:i.headers}).then((function(e){return l(e)})).then((function(e){return e}))]).then((function(e){var n,r,o=(r=2,function(e){if(Array.isArray(e))return e}(n=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c,u,a=[],i=!0,l=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;i=!1}else for(;!(i=(r=c.call(n)).done)&&(a.push(r.value),a.length!==t);i=!0);}catch(e){l=!0,o=e}finally{try{if(!i&&null!=n.return&&(u=n.return(),Object(u)!==u))return}finally{if(l)throw o}}return a}}(n,r)||function(e,t){if(e){if("string"==typeof e)return s(e,t);var n={}.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?s(e,t):void 0}}(n,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),c=o[0],u=o[1];return w.textContent=c.name,D.textContent=c.about,P.style.backgroundImage="url(".concat(c.avatar,")"),j=c._id,u.forEach((function(e){b.append(t({card:e,openPopupDelete:N,openImg:M,likeCard:J,userId:j}))})),u})),d=T,Array.from(document.querySelectorAll(d.formSelector)).forEach((function(e){e.addEventListener("submit",(function(e){e.preventDefault()})),function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);u(n,r,t),n.forEach((function(o){o.addEventListener("input",(function(){!function(e,t,n){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?function(e,t,n){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(n.inputErrorClass),r.textContent=""}(e,t,n):function(e,t,n,r){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.add(r.inputErrorClass),o.textContent=n}(e,t,t.validationMessage,n)}(e,o,t),u(n,r,t)}))}))}(e,d)})),_.forEach((function(e){e.addEventListener("click",c)})),p.addEventListener("click",(function(){var e=document.querySelector(".popup__input_type_name"),t=document.querySelector(".popup__input_type_description");e.value=w.textContent,t.value=D.textContent,n(m),a(q,T)})),f.addEventListener("click",(function(){E.reset(),n(y),a(E,T)})),P.addEventListener("click",(function(){k.reset(),a(k,T),n(v)})),q.addEventListener("submit",(function(e){e.preventDefault();var t=A.value,n=I.value,o=e.target.querySelector(".button");H(o,!0),function(e,t){return fetch("".concat(i.baseUrl,"/users/me"),{method:"PATCH",headers:i.headers,body:JSON.stringify({name:e,about:t})}).then((function(e){return l(e)}))}(t,n).then((function(){w.textContent=t,D.textContent=n,r(m)})).catch((function(e){return alert("Ой! Произошла ошибка: ".concat(e))})).finally((function(){H(o,!1)}))})),E.addEventListener("submit",(function(e){e.preventDefault();var n,o=e.target.querySelector(".button");H(o,!0),(n={name:L.value,link:x.value},fetch("".concat(i.baseUrl,"/cards"),{method:"POST",headers:i.headers,body:JSON.stringify(n)}).then((function(e){return l(e)})).then((function(e){return e}))).then((function(e){b.prepend(t({card:e,openPopupDelete:N,openImg:M,likeCard:J,userId:j})),r(y)})).catch((function(e){return alert("Ой! Произошла ошибка: ".concat(e))})).finally((function(){H(o,!1)}))})),k.addEventListener("submit",(function(e){e.preventDefault();var t=e.target.querySelector(".button");H(t,!0),function(e){return fetch("".concat(i.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:i.headers,body:JSON.stringify({avatar:e})}).then((function(e){return l(e)}))}(U.value).then((function(){P.style.backgroundImage="url(".concat(U.value,")"),r(v)})).catch((function(e){return alert("Ой! Произошла ошибка: ".concat(e))})).finally((function(){H(t,!1)}))})),C.addEventListener("submit",(function(){var e;(e=O,fetch("".concat(i.baseUrl,"/cards/").concat(e),{method:"DELETE",headers:i.headers}).then((function(e){return l(e)}))).then((function(){B.remove(),r(S)})).catch((function(e){return alert("Ой! Произошла ошибка: ".concat(e))}))})),g.forEach((function(e){e.closest(".popup__content").querySelector(T.formSelector),e.addEventListener("click",(function(){return r(e.closest(".popup_is-opened"))}))}))})();