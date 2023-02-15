export default class Section {
  constructor({ data, renderer }, containerSelector) {
    this._data = data;
    this._renderer = renderer;
    this._containerSelector = containerSelector;
  }

  addItem = (element) => {
    this._containerSelector.prepend(element)
  }

  renderCards = () => {
    this._data.forEach(item => {
      this._renderer(item);
    })
  }
}
