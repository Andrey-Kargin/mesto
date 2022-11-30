const popupBg = document.querySelector('.popup');
const popupOpen = document.querySelector('.profile__edit-button');
const popupClose = document.querySelector('.popup__close-btn');
const profileName = document.querySelector('.profile__name');
const profileCaption = document.querySelector('.profile__caption');
const inputUsername = document.getElementById('username');
const inputCaption = document.getElementById('caption');
const popupForm = document.querySelector('.popup__form');

function openEdit() {
    inputUsername.value = profileName.textContent;
    inputCaption.value = profileCaption.textContent;
    popupBg.classList.add('popup_opened');
}
//Открывает попап окно с изменением профиля и автозаполняет данные с главной страницы внутри нее

function closeEdit() {
    popupBg.classList.remove('popup_opened');
}
//Закрывает попап окно

function handleFormSubmit (evt) {
    evt.preventDefault();
    profileName.textContent = inputUsername.value;
    profileCaption.textContent = inputCaption.value;
    closeEdit();
}
//Этот код дает возможность изменять данные в имени и описании профиля с сохранением по нажатию кнопки "Сохранить" и далее закрытия окна изменения профиля

popupOpen.addEventListener('click', openEdit);
popupClose.addEventListener('click', closeEdit);
popupForm.addEventListener("submit", handleFormSubmit); 