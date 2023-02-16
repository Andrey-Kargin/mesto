export default class UserInfo {
  constructor({profileName, profileCaption}) {
    this._profileName = profileName;
    this._profileCaption = profileCaption;
  }

  getUserInfo() {
    return {
      profileName: this._profileName.textContent,
      profileCaption: this._profileCaption.textContent
    };
  }

  setUserInfo(profileForm) {
    this._profileName.textContent = profileForm.profileName;
    this._profileCaption.textContent = profileForm.profileCaption;
  }
}