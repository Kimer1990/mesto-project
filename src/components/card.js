import {getFullImage} from './modal.js';

const cardContainer = document.querySelector('.places__cards');
const cardTemplate = document.querySelector('#card-template').content;

export function createCard(object) {
  const newCard = cardTemplate.querySelector('li').cloneNode(true);
  const cardImage = newCard.querySelector('.card__image');

  cardImage.setAttribute('src', object.link);
  cardImage.setAttribute('alt', object.name);
  newCard.querySelector('.card__title').textContent = object.name;

  newCard.querySelector('.card__delete-icon').addEventListener('click', function (evt) {
    deleteCard(evt.target);
  });

  newCard.querySelector('.card__like').addEventListener('click', function (evt) {
    changeLike(evt.target);
  });

  cardImage.addEventListener('click', function (evt) {
    getFullImage(evt.target);
  });

  return newCard;
}

export function renderCard(card) {
  cardContainer.prepend(card);
}

function deleteCard(element) {
  element.closest('li').remove();
}

function changeLike(element) {
  element.classList.toggle('card__like_active')
}
