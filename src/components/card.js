import {getFullImage, openPopup} from './modal.js';
import {profileId, setResError, deletePopup} from './index.js';
import {request} from './api.js';

const cardContainer = document.querySelector('.places__cards');
const cardTemplate = document.querySelector('#card-template').content;
export  let targetCard;
export let deleteId;

export function createCard(object) {
  const newCard = cardTemplate.querySelector('li').cloneNode(true);
  const cardImage = newCard.querySelector('.card__image');
  const cardLike = newCard.querySelector('.card__like');
  const cardLikesCount = newCard.querySelector('.card__like-count');
  let requestCard = object;
  const cardOwnerId = requestCard.owner._id;
  const cardId = requestCard._id;

  cardImage.setAttribute('src', requestCard.link);
  cardImage.setAttribute('alt', requestCard.name);
  newCard.querySelector('.card__title').textContent = requestCard.name;
  cardLikesCount.textContent = requestCard.likes.length;

  initialLike(cardLike, requestCard);

  if (cardOwnerId === profileId) {
    const deleteIcon = newCard.querySelector('.card__delete-icon');
    deleteIcon.classList.add('card__delete-icon_active');
    deleteIcon.addEventListener('click', function (evt) {
      openPopup(deletePopup);
      targetCard = evt.target;
      deleteId = cardId;
    });
  };

  newCard.querySelector('.card__like').addEventListener('click', function (evt) {
    if (checkLike(requestCard)) {
      request(`cards/likes/${cardId}`, 'DELETE')
        .then((res) => {
          cardLikesCount.textContent = res.likes.length;
          deleteLike(evt.target);
          requestCard = res;
        })
        .catch((err) => {
          setResError(err);
        });
    } else {
      request(`cards/likes/${cardId}`, 'PUT')
        .then((res) => {
          cardLikesCount.textContent = res.likes.length;
          addLike(evt.target);
          requestCard = res;
        })
        .catch((err) => {
          setResError(err);
        });
    }
  });

  cardImage.addEventListener('click', function (evt) {
    getFullImage(evt.target);
  });

  return newCard;
}

export function renderCard(card) {
  cardContainer.prepend(card);
}

export function deleteCard(element, id) {
  request(`cards/${id}`, 'DELETE')
  .then(() => {
    element.closest('li').remove();
    hidePopup(deletePopup);
  })
  .catch((err) => {
    setResError(err);
  });
}

function addLike(like) {
  like.classList.add('card__like_active')
}

function deleteLike(like) {
  like.classList.remove('card__like_active')
}

function initialLike(like, object) {
  if (checkLike(object)) {
    addLike(like);
  }
}

function checkLike(object) {
  return object.likes.some((element) => {
    return element._id === profileId;
  })
}
