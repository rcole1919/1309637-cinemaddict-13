import {createFilmCardTemplate} from './film-card-template.js';
import AbstractView from './abstract.js';

export default class FilmCard extends AbstractView {
  constructor(film) {
    super();
    this._film = film;

    this._showClickHandler = this._showClickHandler.bind(this);
  }

  getTemplate() {
    return createFilmCardTemplate(this._film);
  }

  _showClickHandler(evt) {
    evt.preventDefault();
    if (!document.querySelector(`.film-details`)) {
      this._callback.showClick();
    }
  }

  setShowClickHandler(callback) {
    this._callback.showClick = callback;
    this.getElement().querySelector(`.film-card__title`).addEventListener(`click`, this._showClickHandler);
    this.getElement().querySelector(`.film-card__poster`).addEventListener(`click`, this._showClickHandler);
    this.getElement().querySelector(`.film-card__comments`).addEventListener(`click`, this._showClickHandler);
  }
}
