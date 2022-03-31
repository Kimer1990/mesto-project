let closeButton;

const editButton = document.querySelector('.profile__edit-button');
const editForm = document.querySelector('.edit-form');

const addButton = document.querySelector('.profile__add-button');
const addForm = document.querySelector('.add-card-form');

const fullImage = document.querySelector('.popup__full-image');
const cardContainer = document.querySelector('.places__cards');

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

function changeLike(element) {
    element.classList.toggle('card__like_active')
  }

function addCard(object) {
  const cardTemplate = document.querySelector('#card-template').content;
  const newCard = cardTemplate.querySelector('li').cloneNode(true);

  newCard.querySelector('.card__image').setAttribute('src', object.link);
  newCard.querySelector('.card__title').textContent = object.name;
  newCard.querySelector('.card__delete-icon').addEventListener('click', function (evt) {
    deleteCard(evt.target);
  });

  newCard.querySelector('.card__like').addEventListener('click', function (evt) {
    changeLike(evt.target);
  });

  cardContainer.prepend(newCard);
}

function deleteCard(element) {
  element.parentElement.parentElement.remove();
}

function openPopup(element) {
  element.parentElement.parentElement.classList.add('popup_active');
  closeButton = element.parentElement.querySelector('.popup__close-button');
  closeButton.addEventListener ('click', function() {
    closePopup(element);
  });
}

function closePopup(element) {
  element.parentElement.parentElement.classList.remove('popup_active');
}

function getFull(element) {
  fullImage.setAttribute('src', element.getAttribute('src'));
  fullImage.nextElementSibling.textContent = element.nextElementSibling.querySelector('.card__title').textContent;
  openPopup(fullImage);
}
editButton.addEventListener('click', function() {
  editForm.name.value = document.querySelector('.profile__title').textContent;
  editForm.about.value = document.querySelector('.profile__subtitle').textContent;
  openPopup(editForm);
});

editForm.addEventListener('submit', function(evt) {
  evt.preventDefault();
  document.querySelector('.profile__title').textContent = editForm.name.value;
  document.querySelector('.profile__subtitle').textContent = editForm.about.value;
  closePopup(editForm);
});

addButton.addEventListener('click', function() {
  openPopup(addForm);
});

addForm.addEventListener('submit', function(evt) {
  evt.preventDefault();
  const newCard = {
    name: addForm.name.value,
    link: addForm.link.value
  };
  addCard(newCard);
  closePopup(addForm);
});

initialCards.forEach (function(object) {
  addCard(object);
});
