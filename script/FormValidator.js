//Импортируем функция открытия попапа картинок
import {openPopupImage} from "./utils.js"
export class FormValidator {
  constructor(form, config) {
    this._form = form;
    this._config = config;
    this._inputList = Array.from(this._form.querySelectorAll(this._config.inputSelector));
    this._buttonElement = this._form.querySelector(this._config.submitButtonSelector);
  }

  //Функция показания ошибок инпута, если ошибка = true, если нет = false
  _hasInvalidInput() {
    return this._inputList.some((inputElement) => !inputElement.validity.valid);
  }

  //Функция отключения кнопки при наличии ошибки валидации, и ее активирования при их отсутсвии
  toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._config.inactiveButtonClass);
      this._buttonElement.disabled = true;
    } else {
      this._buttonElement.classList.remove(this._config.inactiveButtonClass);
      this._buttonElement.disabled = false;
    }
  }
  
  //Функция скрытия ошибок
  _hideInputError(inputElement) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._config.inputErrorClass);
    errorElement.classList.remove(this._config.errorClass);
    errorElement.textContent = '';
  }
  
  //Функция отображения ошибок
  _showInputError(inputElement, errorMessage) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._config.errorClass);
  }

  //Функция проверки на ошибки в форме
  _checkInputValidity(inputElement) {
    if(!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage)
    } else {
      this._hideInputError(inputElement)
    }
  }

  //Функция слушателя событий для input
  _setEventListeners() {
    this.toggleButtonState();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this.toggleButtonState();
      })
    })
  }
  
  //Функция проверки для форм на странице
  enableValidation() {
    this._form.addEventListener('submit', (e) => {
      e.preventDefault();
    })
    this._setEventListeners();
  }

  //Функция деакцтивации конпки отправки формы
  disableButton(buttonElement) {
    buttonElement.classList.add(this._config.inactiveButtonClass);
    buttonElement.disabled = true;
  }

  //Функция очищения ошибок валидации формы
  removeValidation(inputList, form) {
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    })
  }

  //Функция проверки на ошибки в форме
  checkInputValidity() {
    this._inputList.forEach(inputElement => {
      this._checkInputValidity(inputElement);
    })
  }
}