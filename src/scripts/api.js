// API

const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-26",
  headers: {
    authorization: "c9c60273-fc29-4cea-b81c-7e91a6e6ef01",
    "Content-Type": "application/json",
  },
};

function checkResponce(responce) {
  if (responce.ok) {
    return responce.json();
  }
  return Promise.reject(`Ошибка ${responce.status}`);
}

export function authorization() {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  })
    .then((responce) => {
      return checkResponce(responce);
    })
    .then((data) => data);
}

export function fetchCards() {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  })
    .then((responce) => {
      return checkResponce(responce);
    })
    .then((cards) => cards);
}

export function saveProfileData(name, job) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: job,
    }),
  }).then((responce) => {
    return checkResponce(responce);
  });
}

export function addCardAPI(card) {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify(card),
  })
    .then((responce) => {
      return checkResponce(responce);
    })
    .then((card) => card);
}

export function likeCardAPI(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  })
    .then((responce) => {
      return checkResponce(responce);
    })
    .then((data) => data);
}

export function unlikeCardAPI(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  })
    .then((responce) => {
      return checkResponce(responce);
    })
    .then((data) => data);
}

export function changeAvatarAPI(avatar) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar,
    }),
  }).then((responce) => checkResponce(responce));
}

export function deleteCardAPI(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((responce) => checkResponce(responce));
}
