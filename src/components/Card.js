export default class Card {
  constructor(data, cardTemplate, handleCardClick, handleLikeBtn, handleConfirmDelete, handleDeleteCard, userId) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;

    this._handleCardClick = handleCardClick;
    this._handleLikeBtn = handleLikeBtn;
    this._handleConfirmDelete = handleConfirmDelete;
    this._handleDeleteCard = handleDeleteCard;

    this._cardTemplate = cardTemplate;
    
    this._owner = data.owner;
    this._userId = userId;
    this._id = data._id;
    this._isLike = false;
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
    this._likeCard = this._card.querySelector('.place__like-counter');
    this._deleteBtn = this._card.querySelector('.place__trash-button');
    
    this._cardImage.alt = this._name;
    this._cardImage.src = this._link;
    this._card.querySelector('.place__name').textContent = this._name;

    this._likeCard.textContent = this._likes.length;

    if (this._userId !== this._owner._id) this._deleteBtn.remove();

    this._likeBtn = this._card.querySelector('.place__like-button');

    if (this._likes.find(item => item._id === this._userId)) {
      this._likeBtn.classList.add('place__like-button_active');
      this._isLike = true;
    }    
    this._setEventListeners();

    return this._card;
  }
  
  _setEventListeners() {
    this._likeBtn.addEventListener('click', () => {
      this._handleLikeBtn(this);
    });

    this._deleteBtn.addEventListener('click', () => {
      this._handleConfirmDelete(this);
    });

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    })
  }

  get isLike() {
    return this._isLike;
  }

  numberOfLikes(newLikes) {
    this._likes = newLikes;
    this._likeCard.textContent = this._likes.length;
  }

  likeStatus() {
    this._isLike = !this._isLike;
  }

  toggleLike() {
    this._likeBtn.classList.toggle('place__like-button_active');
  }

  deleteCard() {
    this._card.remove();
    this._card = null;
  }

  // добавляем или убираем лайк
  toggleLikeCard(data) {
    this._likes = data.likes;
    this.likeCard.textContent = this._likes.length;
    this.likeBtn.classList.toggle("place__like-button_active");
  }
}