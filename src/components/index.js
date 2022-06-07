import '../pages/index.css';
import {createCard, renderCard} from './card.js';
import {hidePopup, openPopup, clickClosePopup} from './modal.js';
import {hideInputError, enableValidation} from './validate.js';

const properties = {
  formSelector: '.form',
  inputSelector: '.form__field',
  submitButtonSelector: '.form__save-button',
  inactiveButtonClass: 'form__save-button_inactive',
  inputErrorClass: 'form__field_type_error',
  errorClass: 'form__error_active'
}

const profilePopup = document.querySelector('#profile-edite-popup');
const profileEditForm = profilePopup.querySelector('.form');
const profileEditName = profileEditForm.name;
const profileEditAbout = profileEditForm.about;

const cardPopup = document.querySelector('#new-card-popup');
const cardAddForm = cardPopup.querySelector('.form');
const cardAddTitle = cardAddForm.title;
const cardAddLink = cardAddForm.link;

const profile = document.querySelector('.profile');
const profileName = profile.querySelector('.profile__title');
const profileAbout = profile.querySelector('.profile__subtitle');
const buttonProfileEdit = profile.querySelector('.profile__edit-button');
const buttonCardAdd = profile.querySelector('.profile__add-button');

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
  ];

function initialValues() {
  profileEditName.value = profileName.textContent;
  profileEditAbout.value = profileAbout.textContent;
  cardAddTitle.value = '';
  cardAddLink.value = '';
  const formList = Array.from(document.querySelectorAll(properties.formSelector));

  formList.forEach((formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(properties.inputSelector));

    inputList.forEach((inputElement) => {
      hideInputError(formElement, inputElement, properties);
    });
  })
}

buttonProfileEdit.addEventListener('click', function() {
  initialValues();
  openPopup(profilePopup);
});

profileEditForm.addEventListener('submit', function(evt) {
  evt.preventDefault();
  profileName.textContent = profileEditName.value;
  profileAbout.textContent = profileEditAbout.value;
  hidePopup(profilePopup);
});

buttonCardAdd.addEventListener('click', function() {
  initialValues();
  openPopup(cardPopup);
});

cardAddForm.addEventListener('submit', function(evt) {
  evt.preventDefault();
  const newCard = {
    name: cardAddTitle.value,
    link: cardAddLink.value
  };
  renderCard(createCard(newCard));
  hidePopup(cardPopup);
});

initialCards.forEach (function(object) {
  renderCard(createCard(object));
});

initialValues();
enableValidation(properties);
clickClosePopup();
