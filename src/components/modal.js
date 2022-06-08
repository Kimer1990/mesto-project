const allPopups = Array.from(document.querySelectorAll('.popup'));

const imagePopup = document.querySelector('#full-image-popup');
const fullImage = imagePopup.querySelector('.popup__full-image');
const fullImageCaption = imagePopup.querySelector('.popup__image-caption');

function escapeClosePopup(evt) {
  if (evt.key === 'Escape') {
    const activePopup = document.querySelector('.popup_active');
    hidePopup(activePopup);
  }
}

export function hidePopup(popup) {
  popup.classList.remove('popup_active');

  document.removeEventListener('keydown', escapeClosePopup);
}

export function openPopup(popup) {
  popup.classList.add('popup_active');

  document.addEventListener('keydown', escapeClosePopup);
}

export function clickClosePopup() {
  allPopups.forEach((popup) => {
    const closeButton = popup.querySelector('.popup__close-button');

    popup.addEventListener ('mousedown', function(evt) {
      if (evt.target === popup || evt.target === closeButton) {
        hidePopup(popup);
      }
    });
  })
}

export function getFullImage(element) {
  fullImage.setAttribute('src', element.getAttribute('src'));
  fullImage.setAttribute('alt', element.getAttribute('alt'));
  fullImageCaption.textContent = element.getAttribute('alt');
  openPopup(imagePopup);
}
