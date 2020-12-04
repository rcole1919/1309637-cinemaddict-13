import {createElement} from "../utils.js";

const createFilmNumberTemplate = (num) => {
  return `<p>${num ? num : `0`} movies inside</p>`;
};

export default class FilmNumber {
  constructor(num) {
    this._num = num;
    this._element = null;
  }

  getTemplate() {
    return createFilmNumberTemplate(this._num);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
