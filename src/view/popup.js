import {createPopupTemplate} from './popup-template.js';
import AbstractView from './abstract.js';

export default class Popup extends AbstractView {
  constructor(film) {
    super();
    this._film = film;

    this._closeClickHandler = this._closeClickHandler.bind(this);
  }

  getTemplate() {
    return createPopupTemplate(this._film);
  }

  _closeClickHandler(evt) {
    evt.preventDefault();
    this._callback.closeClick();
  }

  setCloseClickHandler(callback) {
    this._callback.closeClick = callback;
    this.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, this._closeClickHandler);
  }

  setRemoveCloseClickHandler(callback) {
    this._callback.closeClick = callback;
    this.getElement().querySelector(`.film-details__close-btn`).removeEventListener(`click`, this._closeClickHandler);
  }
}
