import {createElement} from "../utils/render";

export default class Abstract {
  constructor() {
    if (new.target === Abstract) {
      throw new Error(`Can't instantiate Abstract, only concrete one.`);
    }

    this._element = null;
    this._callback = {};
  }

  getTemplate() {
    throw new Error(`Abstract method not implemented: getTemplate`);
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

  showElement() {
    if (this._element && this._element.classList.contains(`visually-hidden`)) {
      this._element.classList.remove(`visually-hidden`);
    }
  }

  hideElement() {
    if (this._element && !this._element.classList.contains(`visually-hidden`)) {
      this._element.classList.add(`visually-hidden`);
    }
  }
}
