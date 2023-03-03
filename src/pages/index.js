//Импорт стилей
import './index.css';

import Api from "../components/Api.js";

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
import PopupWithConfirm from '../components/popupWithConfirm';

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-60',
  headers: {
    authorization: 'b9d4b089-ef11-4d7a-8991-a414b8ba06c9',
    'Content-Type': 'application/json'
  }
});

Promise.all([api.getUserInfo(), api.getInitialCards()])
.then(res => {
    const [ userData, cardsArray ] = res;
    
    userInfo.setUserInfo(userData);
    cardList.renderCards(cardsArray);
  })
  .catch(err => console.log(err));

//Создание классов
const validatorAvatar = new FormValidator(all.popupFormAvatar, all.config);
const validatorAdd = new FormValidator(all.popupFormAdd, all.config);
const validatorEdit = new FormValidator(all.popupFormEdit, all.config);
const popupWithImage = new PopupWithImage(all.popupOpenImg);
const popupWithConfirm = new PopupWithConfirm(all.popupDeleteConfirm,card => {
  api.deleteCard(card._id)
    .then(() => {
      card.deleteCard();
      popupWithConfirm.close();
    })
    .catch(err => console.log(`Ошибка: ${err}`))
});
const userInfo = new UserInfo({
  name : all.profileName, 
  about: all.profileCaption,
  avatar: all.profileAvatar
});

function handleLikeBtn(card) {
  if (card.isLike) {
    api.deleteLike(card._id)
    .then(res => {
      card.numberOfLikes(res.likes);
      card.likeStatus();
      card.toggleLike();
    })
    .catch(err => console.log(`Ошибка: ${err}`));
  } else {
    api.setLike(card._id)
    .then(res => {
      card.numberOfLikes(res.likes);
      card.likeStatus();
      card.toggleLike();
    })
    .catch(err => console.log(`Ошибка: ${err}`));
  }
}

function handleConfirmDelete(card) {
  popupWithConfirm.setDeleteCard(card);
  popupWithConfirm.open();
}

const cardList = new Section({
  items: [],
  renderer: (item) => {
    const card = new Card( 
      item, 
      all.cardTemplate,
       () => { popupWithImage.open(item.name, item.link) },
       handleLikeBtn,
       handleConfirmDelete,
       userInfo.getUserId(),
      )
      
    const cardElement = card.generateCard();
    return cardElement
  }
}, all.placeContainer)

const profilePopup = new PopupWithForm(
  all.popupEditProfile, (data) => {
    api.setUserInfo(data)
      .then((res) => {
        userInfo.setUserInfo(res);
      profilePopup.close();
      })
    .catch(err => console.log(`Ошибка: ${err}`))
    .finally(() => {
      profilePopup.stopLoading();
    })
  }
);

const cardsAdd = new PopupWithForm(
  all.popupAddCard, data => {
    api.addNewCard(data)
      .then((res) => {
        cardList.addItem(res)
        cardsAdd.close();
      })
    .catch(err => console.log(`Ошибка: ${err}`))
    .finally(() => {
      cardsAdd.stopLoading();
    })
  }
);

const avatarPopup = new PopupWithForm( all.popupEditAvatar, data => {
  api.updateAvatar(data)
    .then((data) => {
      userInfo.setUserInfo(data)
      console.log(data)
      avatarPopup.close()
    })
  .catch((err) => console.log(`Ошибка: ${err}`))
  .finally(() => {
    avatarPopup.stopLoading();
  })
})


all.profileAvatarEdit.addEventListener('click', () => {
  validatorAvatar.removeValidation();
  validatorEdit.toggleButtonState();
  avatarPopup.open();
})

//Функция открытия попапа изменения профиля по нажатию кнопки
all.buttonEditProfile.addEventListener('click', function () {
  profilePopup.setInputValues(userInfo.getUserInfo())
  validatorEdit.toggleButtonState();
  profilePopup.open();
});

//Функция открытия попапа добавления карточки по нажатию кнопки
all.buttonAddProfile.addEventListener('click', () => {
  validatorAdd.toggleButtonState();
  validatorAdd.removeValidation();
  cardsAdd.open();
});

//


//Добавляем обработчики
avatarPopup.setEventListeners();
cardsAdd.setEventListeners();
profilePopup.setEventListeners();
popupWithImage.setEventListeners();
popupWithConfirm.setEventListeners();



//Запуск функции проверки ошибок валиации форм на странице
validatorAdd.enableValidation();
validatorEdit.enableValidation();
validatorAvatar.enableValidation()