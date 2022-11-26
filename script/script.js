let popupBg = document.querySelector('.popup');
let popupOpen = document.querySelector('.profile__edit-button');
let popupClose = document.querySelector('.popup__close-btn');
let profileName = document.querySelector('.profile__info_name');
let profileCaption = document.querySelector('.profile__info_caption');
let inputUsername = document.getElementById('username');
let inputCaption = document.getElementById('caption');

function OpenEdit() {
    inputUsername.value = profileName.textContent;
    inputCaption.value = profileCaption.textContent;
    popupBg.classList.add('popup_opened');
}

function CloseEdit() {
    popupBg.classList.remove('popup_opened');
}

popupOpen.addEventListener('click', OpenEdit);
popupClose.addEventListener('click', CloseEdit);

let popupForm = document.querySelector('.popup__form');

function handleFormSubmit (evt) {
    evt.preventDefault();
    profileName.textContent = inputUsername.value;
    profileCaption.textContent = inputCaption.value;
    CloseEdit();
}

popupForm.addEventListener("submit", handleFormSubmit); 