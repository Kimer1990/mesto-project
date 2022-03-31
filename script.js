const profilePopup = document.querySelector('#profile-edite-popup');
const buttonProfileClose = profilePopup.querySelector('.popup__close-button');
const profileEditForm = profilePopup.querySelector('.edit-form');
const profileEditName = profileEditForm.name;
const profileEditAbout = profileEditForm.about;

const cardPopup = document.querySelector('#new-card-popup');
const buttonCardClose = cardPopup.querySelector('.popup__close-button');
const cardAddForm = cardPopup.querySelector('.add-card-form');
const cardAddName = cardAddForm.name;
const cardAddLink = cardAddForm.link;

const imagePopup = document.querySelector('#full-image-popup');
const buttonImageClose = imagePopup.querySelector('.popup__close-button');
const fullImage = imagePopup.querySelector('.popup__full-image');
const fullImageCaption = imagePopup.querySelector('.popup__image-caption');

const profile = document.querySelector('.profile');
const profileName = profile.querySelector('.profile__title');
const profileAbout = profile.querySelector('.profile__subtitle');
const buttonProfileEdit = profile.querySelector('.profile__edit-button');
const buttonCardAdd = profile.querySelector('.profile__add-button');

const cardContainer = document.querySelector('.places__cards');
const cardTemplate = document.querySelector('#card-template').content;

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

function createCard(object) {
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

function renderCard(card) {
  cardContainer.prepend(card);
}

function deleteCard(element) {
  element.closest('li').remove();
}

function changeLike(element) {
  element.classList.toggle('card__like_active')
}

function openPopup(popup) {
  popup.classList.add('popup_active');
}

function closePopup(popup) {
  popup.classList.remove('popup_active');
}

function getFullImage(element) {
  fullImage.setAttribute('src', element.getAttribute('src'));
  fullImage.setAttribute('alt', element.getAttribute('alt'));
  fullImageCaption.textContent = element.getAttribute('alt');
  openPopup(imagePopup);
}

buttonProfileEdit.addEventListener('click', function() {
  profileEditName.value = profileName.textContent;
  profileEditAbout.value = profileAbout.textContent;
  openPopup(profilePopup);
});

profileEditForm.addEventListener('submit', function(evt) {
  evt.preventDefault();
  profileName.textContent = profileEditName.value;
  profileAbout.textContent = profileEditAbout.value;
  closePopup(profilePopup);
});

buttonCardAdd.addEventListener('click', function() {
  cardAddName.value = '';
  cardAddLink.value = '';
  openPopup(cardPopup);
});

cardAddForm.addEventListener('submit', function(evt) {
  evt.preventDefault();
  const newCard = {
    name: cardAddName.value,
    link: cardAddLink.value
  };
  renderCard(createCard(newCard));
  closePopup(cardPopup);
});

buttonProfileClose.addEventListener ('click', function() {
  closePopup(profilePopup);
});

buttonCardClose.addEventListener ('click', function() {
  closePopup(cardPopup);
});

buttonImageClose.addEventListener ('click', function() {
  closePopup(imagePopup);
});

initialCards.forEach (function(object) {
  renderCard(createCard(object));
});
