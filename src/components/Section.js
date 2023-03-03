export default class Section {
  constructor( {items, renderer} , containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._containerSelector = containerSelector;
  }

  addItem = (element) => {
    this._containerSelector.prepend(this._renderer(element))
  }

  renderCards = (arr) => {
    arr.reverse().forEach((card) => {
      this.addItem(card);
    });
  }
}