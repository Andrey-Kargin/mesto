//Функция открытия карточки
const popupImage = document.querySelector('.popup__image');
const imageDescription = document.querySelector('.popup__description');
const popupOpenImg = document.querySelector('.img');
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
//Открывает попап окно
function openPopup(el) {
    el.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupEsc);
}
const openPopupImage = (name, link) => {
    popupImage.src = link;
    imageDescription.textContent = name;
    popupImage.alt = `${name}.`;
    openPopup(popupOpenImg);
  }

export {openPopupImage, closePopup, openPopup}