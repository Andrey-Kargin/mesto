import Popup from "./Popup"

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector)
    this._popupButton = this._popup.querySelector('.popup__button')
    this._handleFormSubmit = handleFormSubmit;
    
  }
  
  setEventListeners() {
    super.setEventListeners()
  
    this._popupButton.addEventListener('click', () => {
    this._handleFormSubmit(this._card)
    })
  }

  
  setDeleteCard(card) {
    this._card = card;
  }
}