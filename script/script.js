const popupEditProfile = document.querySelector('.popup__profile');
const popupAddCard = document.querySelector('.popup__card');
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
const popupOpenImg = document.querySelector('.popup__img');
const closeImageBtn = document.querySelector('.popup__close-image');
const imageDescription = document.querySelector('.popup__description');
const cardTemplate = document.querySelector('#place__template').content;
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

//Открывает попап окно
function openPopup(el) {
    el.classList.add('popup_opened');
}

//Закрывает попап окно
function closePopup(el) {
    el.classList.remove('popup_opened');
}

//-------------Изменение профиля------------

//Функция открытия попапа изменения профиля по нажатию кнопки
profileEditButton.addEventListener('click', function () {
  inputUsername.value = profileName.textContent;
  inputCaption.value = profileCaption.textContent;
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
  openPopup(popupAddCard);
});

//Функция закрытия попапа добавления карточки по нажатию кнопки
popupCloseAdd.addEventListener('click', function () {
  closePopup(popupAddCard);
});

//Создание массива из исходника
const elementInfo = initialCards.map(function(item) {
    return{
        name: item.name,
        link: item.link,
    };
});

//Функция добавления карточек
const addCard = ({name, link}) => {
  const cardElement = cardTemplate.querySelector('.place').cloneNode(true);
  
  cardElement.querySelector('.place__name').textContent = name;
  cardElement.querySelector('.place__image').src = link;
  cardElement.querySelector('.place__image').alt = `${name}.`;
  const cardImage = cardElement.querySelector('.place__image');

  //Функция открытия попап каринки
  cardImage.addEventListener('click', function() {
   popupImage.src = cardImage.src;
   imageDescription.textContent =cardElement.querySelector('.place__name').textContent;
   popupImage.alt = cardElement.querySelector('.place__image').alt;
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
  placeContainer.prepend(cardElement);
};


//Добавление карточек на страницу из исходного массива
elementInfo.reverse().forEach(addCard);

//Добавление новой карточки
function HandleAddSubmit (evt) {
  evt.preventDefault();
  const cardName = document.querySelector('.popup__input_add-name');
  const cardLink = document.querySelector('.popup__input_add-link');
  addCard({name: cardName.value, link: cardLink.value});
  cardName.value = '';
  cardLink.value = '';
  closePopup(popupAddCard);
}

//Добавление новой карточки по нажатию "сохранить"
popupFormAdd.addEventListener("submit", HandleAddSubmit);

//Закрыть попап картинку
closeImageBtn.addEventListener('click', function() {
  closePopup(popupOpenImg);
})

