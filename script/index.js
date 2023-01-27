const popupEditProfile = document.querySelector('.edit-profile');
const popupAddCard = document.querySelector('.add-card');
const buttonAddProfile = document.querySelector('.profile__add-button');
const buttonEditProfile = document.querySelector('.profile__edit-button');
const popupCloseEdit = document.querySelector('.popup__close-edit');
const popupCloseAdd = document.querySelector('.popup__close-add');
const popupAddButton = document.querySelector('.popup__add-button')
const profileName = document.querySelector('.profile__name');
const profileCaption = document.querySelector('.profile__caption');
const inputUsername = document.getElementById('username');
const inputCaption = document.getElementById('caption');
const popupFormEdit = document.querySelector('.popup__form-edit');
const popupFormAdd = document.querySelector('.popup__form-add');
const placeContainer = document.querySelector('.places');
const popupImage = document.querySelector('.popup__image');
const popupOpenImg = document.querySelector('.img');
const buttonClosePopupImage = document.querySelector('.popup__close-image');
const imageDescription = document.querySelector('.popup__description');
const cardTemplate = document.querySelector('#place__template');
const cardName = document.querySelector('.popup__input_add-name');
const cardLink = document.querySelector('.popup__input_add-link');
const popup = document.querySelectorAll('.popup');
const formEditProfileList = Array.from(popupFormEdit.querySelectorAll('.popup__input'));
const formAddCardList = Array.from(popupFormAdd.querySelectorAll('.popup__input'));
const popupButton = popupFormEdit.querySelector('.popup__button');
const initialCards = [
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
const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible'
};
const validatorAdd = new FormValidator(popupFormAdd, config);
const validatorEdit = new FormValidator(popupFormEdit, config);


//Импортируем класс Карт
import {Card} from "./Card.js";

//Импортируем класс ФормВалидатор
import { FormValidator } from "./FormValidator.js";

//Открывает попап окно
function openPopup(el) {
    el.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupEsc);
}

//Закрывает попап окно
function closePopup(el) {
    el.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupEsc);
}

//Функция закрытия попапа по нажатию на Esc
function closePopupEsc(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

//-------------Изменение профиля------------

//Этот код дает возможность изменять данные в имени и описании профиля с сохранением по нажатию кнопки "Сохранить" и далее закрытия окна изменения профиля
function handleFormSubmit (evt) {
    evt.preventDefault();
    profileName.textContent = inputUsername.value;
    profileCaption.textContent = inputCaption.value;
    closePopup(popupEditProfile);
}

//------------Карточки-------------------

//Функция открытия карточки
export const openPopupImage = (name, link) => {
  popupImage.src = link;
  imageDescription.textContent = name;
  popupImage.alt = `${name}.`;
  openPopup(popupOpenImg);
}

//Функция "Рендера" карточки
function renderCard(name, link) {
  const card = new Card({name, link}, cardTemplate)
  placeContainer.prepend(card.generateCard());
}

//Добавление новой карточки
function handleAddSubmit (evt) {
  evt.preventDefault();
  renderCard(cardName.value, cardLink.value);
  closePopup(popupAddCard);
}

//Добавление новой карточки по нажатию "сохранить"
popupFormAdd.addEventListener("submit", handleAddSubmit);

//Закрыть попап картинку
buttonClosePopupImage.addEventListener('click', function() {
  closePopup(popupOpenImg);
})

//Функция открытия попапа изменения профиля по нажатию кнопки
buttonEditProfile.addEventListener('click', function () {
  const validator = new FormValidator(popupFormEdit, config)
  inputUsername.value = profileName.textContent;
  inputCaption.value = profileCaption.textContent;
  validator._toggleButtonState();
  validator.removeValidation(formEditProfileList, popupFormEdit);
  openPopup(popupEditProfile);
});

//Функция закрытия попапа изменения профиля по нажатию кнопки
popupCloseEdit.addEventListener('click', function () {
  closePopup(popupEditProfile);
});

//Добавление изменений профиля по нажатию "Сохранить"
popupFormEdit.addEventListener("submit", handleFormSubmit);

//Функция открытия попапа добавления карточки по нажатию кнопки
buttonAddProfile.addEventListener('click', function () {
  const validator = new FormValidator(popupFormAdd, config)
  validator._toggleButtonState();
  popupFormAdd.reset();
  validator.disableButton(popupAddButton);
  validator.removeValidation(formAddCardList, popupFormAdd);
  openPopup(popupAddCard);
});

//Функция закрытия попапа добавления карточки по нажатию кнопки
popupCloseAdd.addEventListener('click', function () {
  closePopup(popupAddCard);
});

//Закрывает попапы понажатию на оверлэй
popup.forEach((item) =>{
  item.addEventListener('click', (evt)=>{
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(item)
    }
  });
});

//Добавление карточек на страницу из исходного массива
initialCards.forEach((element) => {
  renderCard(element.name, element.link);
})

//Запуск функции проверки ошибок валиации форм на странице
validatorAdd.enableValidation();
validatorEdit.enableValidation();