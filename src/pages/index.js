//Импорт стилей
import './index.css';

//Импортируем класс Card
import Card from "../components/Card.js";

//Импортируем класс FormValidator
import FormValidator from "../components/FormValidator.js";

//Импортируем класс UserInfo
import UserInfo from '../components/UserInfo.js';

//Импортируем класс Section
import Section from '../components/Section.js';

//Импортируем класс PopupWithForm
import PopupWithForm from '../components/PopupWithForm.js';

//Импортируем класс PopuoWithImage
import PopupWithImage from '../components/PopupWithImage.js';

//Импортируем все константы
import * as all from '../utils/constants.js';

//Создание классовcd Desktop/dev
const validatorAdd = new FormValidator(all.popupFormAdd, all.config);
const validatorEdit = new FormValidator(all.popupFormEdit, all.config);
const userInfo = new UserInfo({
  profileName : all.profileName, 
  profileCaption: all.profileCaption
});
const popupWithImage = new PopupWithImage(all.popupOpenImg);

const cardList = new Section({
  data: all.initialCards,
  renderer: (item) => {
    const card = new Card(item, all.cardTemplate, () => {popupWithImage.open(item.name, item.link)});
    const cardElement =card.generateCard();
    cardList.addItem(cardElement);  
  }
}, all.placeContainer)

const profilePopup = new PopupWithForm(
  all.popupEditProfile, 
  (profileForm) => {
    userInfo.setUserInfo(profileForm);
  }
);

const cardsAdd = new PopupWithForm(
  all.popupAddCard,
  (item) => {
    const card = new Card(item, all.cardTemplate, () => {popupWithImage.open(item.name, item.link)});
    const cardElement = card.generateCard();
    cardList.addItem(cardElement);
  }
);

//Функция открытия попапа изменения профиля по нажатию кнопки
all.buttonEditProfile.addEventListener('click', function () {
  const {profileName, profileCaption} = userInfo.getUserInfo();
  all.inputUsername.value = profileName;
  all.inputCaption.value = profileCaption;
  validatorEdit.toggleButtonState();
  validatorEdit.removeValidation();
  profilePopup.open();
});

//Функция открытия попапа добавления карточки по нажатию кнопки
all.buttonAddProfile.addEventListener('click', () => {
  validatorAdd.toggleButtonState();
  all.popupFormAdd.reset();
  validatorAdd.removeValidation();
  cardsAdd.open();
});

//Добавляем обработчики
cardsAdd.setEventListeners();
profilePopup.setEventListeners();
popupWithImage.setEventListeners();

//Добавление карточек на страницу
cardList.renderCards();

//Запуск функции проверки ошибок валиации форм на странице
validatorAdd.enableValidation();
validatorEdit.enableValidation();