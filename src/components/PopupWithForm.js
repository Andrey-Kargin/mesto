import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector('.popup__form');
    this._inputList = this._form.querySelectorAll('.popup__input');
    this._submitBtn = this._popup.querySelector('.popup__button');
    this._submitBtnText = this._submitBtn.textContent
    this._textSubmit = 'Сохранение...';
  }

  _getInputValues() {
    const inputFormValues = {};
    this._inputList.forEach(inputItem => {
      inputFormValues[inputItem.name] = inputItem.value;
    })
    return inputFormValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', () => {
      this.startLoading();
      this._handleFormSubmit(this._getInputValues());
      this.close();
    });
  }

  close() {
    super.close();
    this._form.reset();
  }

  startLoading() {
    this._submitBtn.disabled = false;
    this._submitBtn.textContent = this._textSubmit;
  }

  stopLoading() {
    this._submitBtn.disabled = true;
    this._submitBtn.textContent = this._submitBtnText;
  }

  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name];
    });
  }
}