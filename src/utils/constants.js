export const popupEditProfile = document.querySelector('.edit-profile');
export const popupAddCard = document.querySelector('.add-card');
export const buttonAddProfile = document.querySelector('.profile__add-button');
export const buttonEditProfile = document.querySelector('.profile__edit-button');
export const popupCloseEdit = document.querySelector('.popup__close-edit');
export const popupCloseAdd = document.querySelector('.popup__close-add');
export const profileName = document.querySelector('.profile__name');
export const profileCaption = document.querySelector('.profile__caption');
export const inputUsername = document.getElementById('username');
export const inputCaption = document.getElementById('caption');
export const popupFormEdit = document.querySelector('.popup__form-edit');
export const popupFormAdd = document.querySelector('.popup__form-add');
export const placeContainer = document.querySelector('.places');
export const buttonClosePopupImage = document.querySelector('.popup__close-image');
export const cardTemplate = document.querySelector('#place__template');
export const cardName = document.querySelector('.popup__input_add-name');
export const cardLink = document.querySelector('.popup__input_add-link');
export const popups = document.querySelectorAll('.popup');
export const popupOpenImg = document.querySelector('.img');
export const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible'
};
export const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];