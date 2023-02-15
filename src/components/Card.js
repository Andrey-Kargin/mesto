export default class Card {
  constructor(data, cardTemplate, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._cardTemplate = cardTemplate;
    this._handleCardClick = handleCardClick;
  }

  _handleLikeBtn() {
    this._likeBtn.classList.toggle('place__like-button_active');
  }

  _handleDeleteBtn() {
    this._card.remove();
    this._card = null;
  }

  _getTemplate() {
    const cardElement = this._cardTemplate
    .content
    .querySelector('.place')
    .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._card = this._getTemplate();
    this._cardImage = this._card.querySelector('.place__image');
    this._likeBtn = this._card.querySelector('.place__like-button');
    this._deleteBtn = this._card.querySelector('.place__trash-button');

    this._cardImage.alt = this._name;
    this._cardImage.src = this._link;
    this._card.querySelector('.place__name').textContent = this._name;

    this._setEventListeners();

    return this._card;
  }
  
  _setEventListeners() {
    this._likeBtn.addEventListener('click', () => {
      this._handleLikeBtn();
    });

    this._deleteBtn.addEventListener('click', () => {
      this._handleDeleteBtn();
    });

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    })
  }
}