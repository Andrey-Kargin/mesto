const config = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_visible'
  };

  const showInputError = (form, input, config) => {
    const error = form.querySelector(`.${input.id}-error`);
    input.classList.add(config.inputErrorClass);
    error.textContent = input.validationMessage;
    error.classList.add(config.errorClass);
  };
  
  const hideInputError = (form, input, config) => {
    const error = form.querySelector(`.${input.id}-error`);
    input.classList.remove(config.inputErrorClass);
    error.classList.remove(config.errorClass);
    error.textContent = '';
  };

  const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  }); 
  }
  
  const checkInputValidity = (form, input, config) => {
    if (!input.validity.valid) {
      showInputError(form, input, config);
    } else {
      hideInputError(form, input, config);
    }
  };
  
  const setEventListeners = (form, config) => {
    const inputList = Array.from(form.querySelectorAll(config.inputSelector));
    const buttonElement = form.querySelector(config.submitButtonSelector);
  
    toggleButtonState(inputList, buttonElement, config);
  
    inputList.forEach((input) => {
      input.addEventListener('input', function () {
        checkInputValidity(form, input, config);
        toggleButtonState(inputList, buttonElement, config);
      });
    });
  }; 
  
  const enableValidation = (config) => {
    const formList = Array.from(document.querySelectorAll(config.formSelector));
    formList.forEach((formElement) => {
      setEventListeners(formElement, config);
      });
  };
  
  const toggleButtonState = (inputList, buttonElement, config) => {
    if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(config.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(config.inactiveButtonClass);
    buttonElement.disabled = false;
  } 
  }
  enableValidation(config);
