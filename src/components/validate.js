const showInputError = (formElement, inputElement, errorMessage, properties) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(properties.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(properties.errorClass);
};

export const hideInputError = (formElement, inputElement, properties) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(properties.inputErrorClass);
  errorElement.classList.remove(properties.errorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, properties) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, properties);
  } else {
    hideInputError(formElement, inputElement, properties);
  }
};

function hasInvalidInput(inputList, properties) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

export function toggleButtonState(inputList, buttonElement, properties) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(properties.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(properties.inactiveButtonClass);
    buttonElement.disabled = false;
  }
}

function setEventListeners(formElement, properties) {
  const inputList = Array.from(formElement.querySelectorAll(properties.inputSelector));
  const buttonElement = formElement.querySelector(properties.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, properties);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, properties);
      toggleButtonState(inputList, buttonElement, properties);
    });
  });
};

export function enableValidation(properties) {
  const formList = Array.from(document.querySelectorAll(properties.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, properties);
  });
};
