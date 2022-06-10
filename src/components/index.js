import '../pages/index.css';
import {createCard, renderCard, targetCard, deleteId, deleteCard} from './card.js';
import {hidePopup, openPopup, clickClosePopup} from './modal.js';
import {hideInputError, enableValidation} from './validate.js';
import {request} from './api.js';

const properties = {
  formSelector: '.form',
  inputSelector: '.form__field',
  submitButtonSelector: '.form__save-button',
  inactiveButtonClass: 'form__save-button_inactive',
  inputErrorClass: 'form__field_type_error',
  errorClass: 'form__error_active'
}

export const deletePopup = document.querySelector('#delete-card-popup');
const cardDeleteForm = deletePopup.querySelector('.form');

const avatarPopup = document.querySelector('#avatar-edit-popup');
const avatarEditForm = avatarPopup.querySelector('.form');
const avatarEditLink = avatarEditForm.avatarLink;
const avatarSubmitButton = avatarEditForm.querySelector('.form__save-button')

const profilePopup = document.querySelector('#profile-edit-popup');
const profileEditForm = profilePopup.querySelector('.form');
const profileEditName = profileEditForm.name;
const profileEditAbout = profileEditForm.about;
const profileSubmitButton = profileEditForm.querySelector('.form__save-button')

const cardPopup = document.querySelector('#new-card-popup');
const cardAddForm = cardPopup.querySelector('.form');
const cardAddTitle = cardAddForm.title;
const cardAddLink = cardAddForm.imageLink;
const cardSubmitButton = cardAddForm.querySelector('.form__save-button')

const profile = document.querySelector('.profile');
const profileName = profile.querySelector('.profile__title');
const profileAbout = profile.querySelector('.profile__subtitle');
const profileAvatar = profile.querySelector('.profile__avatar');
const buttonAvatarEdit = profile.querySelector('.profile__avatar-mask');
const buttonProfileEdit = profile.querySelector('.profile__edit-button');
const buttonCardAdd = profile.querySelector('.profile__add-button');
export let profileId;

function setUser(res) {
  profileName.textContent = res.name;
  profileAbout.textContent = res.about;
  profileAvatar.setAttribute('src', res.avatar);
  profileId = res._id;
}

export function setResError(err) {
  console.log(err);
}

function initialValues() {
  profileEditName.value = profileName.textContent;
  profileEditAbout.value = profileAbout.textContent;
  cardAddTitle.value = '';
  cardAddLink.value = '';
  avatarEditLink.value = '';
  const formList = Array.from(document.querySelectorAll(properties.formSelector));

  formList.forEach((formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(properties.inputSelector));

    inputList.forEach((inputElement) => {
      hideInputError(formElement, inputElement, properties);
    });
  })
}

function renderLoading(isLoading, button) {
  if (isLoading) {
    button.textContent = "Сохранение...";
  } else {
    button.textContent = "Сохранить";
  }
}

cardDeleteForm.addEventListener('submit', function(evt) {
  evt.preventDefault();
  deleteCard(targetCard, deleteId);
  hidePopup(deletePopup);
})

buttonAvatarEdit.addEventListener('click', function() {
  openPopup(avatarPopup);
  avatarEditForm.querySelector(properties.submitButtonSelector).classList.add(properties.inactiveButtonClass);
  avatarEditForm.querySelector(properties.submitButtonSelector).disabled = true;
  initialValues();
});

avatarEditForm.addEventListener('submit', function(evt) {
  evt.preventDefault();
  renderLoading(true, avatarSubmitButton);
  const newAvatar = JSON.stringify({
    avatar: avatarEditLink.value
  });
  request('users/me/avatar', 'PATCH', newAvatar)
    .then((res) => {
      profileAvatar.setAttribute('src', res.avatar);
    })
    .catch((err) => {
      setResError(err)
    })
    .finally(() => {
      renderLoading(false, avatarSubmitButton);
    });
  hidePopup(avatarPopup);
})

buttonProfileEdit.addEventListener('click', function() {
  openPopup(profilePopup);
  profileEditForm.querySelector(properties.submitButtonSelector).classList.remove(properties.inactiveButtonClass);
  profileEditForm.querySelector(properties.submitButtonSelector).disabled = false;
  initialValues();
});

profileEditForm.addEventListener('submit', function(evt) {
  evt.preventDefault();
  renderLoading(true, profileSubmitButton);
  const newDate = JSON.stringify({
    name: profileEditName.value,
    about: profileEditAbout.value
  });
  request('users/me', 'PATCH', newDate)
    .then((res) => {
      profileName.textContent = res.name;
      profileAbout.textContent = res.about;
    })
    .catch((err) => {
      setResError(err)
    })
    .finally(() => {
      renderLoading(false, profileSubmitButton);
    });
  hidePopup(profilePopup);
});

buttonCardAdd.addEventListener('click', function() {
    openPopup(cardPopup);
    cardAddForm.querySelector(properties.submitButtonSelector).classList.add(properties.inactiveButtonClass);
    cardAddForm.querySelector(properties.submitButtonSelector).disabled = true;
    initialValues();
});

cardAddForm.addEventListener('submit', function(evt) {
  evt.preventDefault();
  renderLoading(true, cardSubmitButton);
  const newCard = JSON.stringify({
    name: cardAddTitle.value,
    link: cardAddLink.value
  });
  request('cards ', 'POST', newCard)
    .then((res) => {
      renderCard(createCard(res));
    })
    .catch((err) => {
      setResError(err)
    })
    .finally(() => {
      renderLoading(false, cardSubmitButton);
    });
  hidePopup(cardPopup);
});

request('users/me', 'GET')
  .then((res) => {
    setUser(res);
  })
  .catch((err) => {
    setResError(err);
  });

request('cards', 'GET')
  .then((res) => {
    res.forEach(function(object) {
      renderCard(createCard(object));
    })
  })
  .catch((err) => {
    setResError(err);
  });

initialValues();
enableValidation(properties);
clickClosePopup();
