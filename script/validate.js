//Список всех дефолтных классов и настроек для форм
const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible'
};

//Функция отображения ошибок
const showInputError = (form, input, config) => {
  const error = form.querySelector(`.${input.id}-error`);
  input.classList.add(config.inputErrorClass);
  error.textContent = input.validationMessage;
  error.classList.add(config.errorClass);
};


//Функция скрытия ошибок
const hideInputError = (form, input, config) => {
  const error = form.querySelector(`.${input.id}-error`);
  input.classList.remove(config.inputErrorClass);
  error.classList.remove(config.errorClass);
  error.textContent = '';
};


//Функция показания ошибок инпута, если ошибка = true, если нет = false
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  }); 
}


//Функция проверки на ошибки в форме
const checkInputValidity = (form, input, config) => {
  if (!input.validity.valid) {
      showInputError(form, input, config);
  } else {
      hideInputError(form, input, config);
  }
};


//Функция слушателя событий для всех input
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

//Функция проверки для всех форм на странице
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, config);
    });
};


//Функция отключения кнопки при наличии ошибки валидации, и ее активирования при их отсутсвии
const toggleButtonState = (inputList, buttonElement, config) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(config.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(config.inactiveButtonClass);
    buttonElement.disabled = false;
  } 
}

//Функция деакцтивации формы после нажатия на кнопку
const resetButton = (buttonElement) => {
  toggleButtonState (formAddCardList, buttonElement, config);
}

//Функция очищения ошибок валидации формы
const removeValidation = (inputList, form) => {
  inputList.forEach((input) => {
    hideInputError(form, input, config);
  })
}

//Запуск функции проверки ошибок валиации форм на странице
enableValidation(config);