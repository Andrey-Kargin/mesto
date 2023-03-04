export default class Section {
  constructor( renderer , containerSelector) {
    this._renderer = renderer;
    this._containerSelector = containerSelector;
  }

  addItem = (element) => {
    this._containerSelector.prepend(element)
  }

  renderCards = (arr) => {
    arr.reverse().forEach(el => {
      this._renderer(el)
    });
  }
}