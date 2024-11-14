// API

const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-26",
  headers: {
    authorization: "c9c60273-fc29-4cea-b81c-7e91a6e6ef01",
    "Content-Type": "application/json",
  },
};

export function authorization() {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  })
    .then((res) => res.json())
    .then((data) => {
      return data;
    })
    .catch((error) => alert(`Ой! Произошла ошибка: ${error}`));
}

export function fetchCards() {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  })
    .then((res) => res.json())
    .then((cards) => {
      return cards;
    })
    .catch((error) => alert(`Ой! Произошла ошибка: ${error}`));
}

export function saveProfileData(name, job) {
  fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: job,
    }),
  }).catch((error) => alert(`Ой! Произошла ошибка: ${error}`));
}

export function addCardAPI(card) {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify(card),
  })
    .then((res) => res.json())
    .then((card) => card)
    .catch((error) => alert(`Ой! Произошла ошибка: ${error}`));
}

export function likeCardAPI(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  })
    .then((responce) => responce.json())
    .then((data) => data);
}

export function unlikeCardAPI(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  })
    .then((responce) => responce.json())
    .then((data) => data);
}

export function changeAvatarAPI(avatar) {
  fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar,
    }),
  });
}
