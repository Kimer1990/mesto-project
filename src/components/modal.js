const allPopups = Array.from(document.querySelectorAll('.popup'));

const imagePopup = document.querySelector('#full-image-popup');
const fullImage = imagePopup.querySelector('.popup__full-image');
const fullImageCaption = imagePopup.querySelector('.popup__image-caption');

function EscapeClosePopup(popup, evt) {
  if (evt.key === 'Escape') {
    hidePopup(popup);
  }
}

export function hidePopup(popup) {
  popup.classList.remove('popup_active');

  window.removeEventListener('keydown', EscapeClosePopup.bind(null, popup));
}

export function openPopup(popup) {
  popup.classList.add('popup_active');

  window.addEventListener('keydown', EscapeClosePopup.bind(null, popup));
}

export function clickClosePopup() {
  allPopups.forEach((popup) => {
    const closeButton = popup.querySelector('.popup__close-button');

    popup.addEventListener ('click', function(evt) {
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
