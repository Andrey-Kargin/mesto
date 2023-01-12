const popupEditProfile = document.querySelector('.edit-profile');
const popupAddCard = document.querySelector('.add-card');
const profileAddButton = document.querySelector('.profile__add-button');
const profileEditButton = document.querySelector('.profile__edit-button');
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
const closeImageBtn = document.querySelector('.popup__close-image');
const imageDescription = document.querySelector('.popup__description');
const cardTemplate = document.querySelector('#place__template').content;
const cardName = document.querySelector('.popup__input_add-name');
const cardLink = document.querySelector('.popup__input_add-link');
const popup = document.querySelectorAll('.popup');
const profileEditFormList = Array.from(popupFormEdit.querySelectorAll('.popup__input'));
const addCardFormList = Array.from(popupFormAdd.querySelectorAll('.popup__input'));
const popupButton = popupFormEdit.querySelector('.popup__button')

//Закрывает попапы понажатию на оверлэй
popup.forEach((item) =>{
  item.addEventListener('click', (evt)=>{
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(item)
    }
  });
});

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
  const openedPopup = document.querySelector('.popup_opened');
  if (evt.key === "Escape") {
    closePopup(openedPopup);
  }
}

//-------------Изменение профиля------------

//Функция открытия попапа изменения профиля по нажатию кнопки
profileEditButton.addEventListener('click', function () {
  inputUsername.value = profileName.textContent;
  inputCaption.value = profileCaption.textContent;
  toggleButtonState(profileEditFormList, popupButton, config);
  profileEditFormList.forEach((input) =>{
  hideInputError(popupFormEdit, input, config)
});
  openPopup(popupEditProfile);
});

//Функция закрытия попапа изменения профиля по нажатию кнопки
popupCloseEdit.addEventListener('click', function () {
  closePopup(popupEditProfile);
});

//Этот код дает возможность изменять данные в имени и описании профиля с сохранением по нажатию кнопки "Сохранить" и далее закрытия окна изменения профиля
function handleFormSubmit (evt) {
    evt.preventDefault();
    profileName.textContent = inputUsername.value;
    profileCaption.textContent = inputCaption.value;
    closePopup(popupEditProfile);
}

//Добавление изменений профиля по нажатию "Сохранить"
popupFormEdit.addEventListener("submit", handleFormSubmit);

//------------Карточки-------------------

//Функция открытия попапа добавления карточки по нажатию кнопки
profileAddButton.addEventListener('click', function () {
  toggleButtonState(addCardFormList, popupButton, config);
  addCardFormList.forEach((input) =>{
  hideInputError(popupFormAdd, input, config)
});
  openPopup(popupAddCard);
});

//Функция закрытия попапа добавления карточки по нажатию кнопки
popupCloseAdd.addEventListener('click', function () {
  closePopup(popupAddCard);
});

//Функция создания и возвращения готового элемента карточки
const createCard = ({name, link}) => {
  const cardElement = cardTemplate.querySelector('.place').cloneNode(true);
  const cardImage = cardElement.querySelector('.place__image');
  const cardName = cardElement.querySelector('.place__name');

  cardName.textContent = name;
  cardImage.src = link;
  cardImage.alt = `${name}.`;
  
  //Функция открытия попап каринки
  cardImage.addEventListener('click', function() {
   popupImage.src = cardImage.src;
   imageDescription.textContent = cardName.textContent;
   popupImage.alt = cardImage.alt;
   openPopup(popupOpenImg);
  })

  //Поставить и убрать лайк
  cardElement.querySelector('.place__like-button').addEventListener('click', function(event) {
    event.target.classList.toggle('place__like-button_active');
  })

 //Удаление карточки по нажатию на урну
  cardElement.querySelector('.place__trash-button').addEventListener('click', function() {
    cardElement.remove();
  })
  return cardElement;
  //placeContainer.prepend(cardElement);
};

//Функция добавления карточки
const addCard = ({name, link}) => {
  placeContainer.prepend(createCard({name, link}));
}

//Добавление карточек на страницу из исходного массива
initialCards.reverse().forEach(addCard);

//Добавление новой карточки
function handleAddSubmit (evt) {
  evt.preventDefault();
  addCard({name: cardName.value, link: cardLink.value});
  cardName.value = '';
  cardLink.value = '';
  closePopup(popupAddCard);
}

//Добавление новой карточки по нажатию "сохранить"
popupFormAdd.addEventListener("submit", handleAddSubmit);

//Закрыть попап картинку
closeImageBtn.addEventListener('click', function() {
  closePopup(popupOpenImg);
})