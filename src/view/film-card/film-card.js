import {createFilmCardTemplate} from './film-card-template.js';
import AbstractView from '../abstract.js';

export default class FilmCard extends AbstractView {
  constructor(film) {
    super();
    this._film = film;

    this._onFilmComponentClick = this._onFilmComponentClick.bind(this);
    this._onWatchlistButtonClick = this._onWatchlistButtonClick.bind(this);
    this._onWatchedButtonClick = this._onWatchedButtonClick.bind(this);
    this._onFavoriteButtonClick = this._onFavoriteButtonClick.bind(this);
  }

  getTemplate() {
    return createFilmCardTemplate(this._film);
  }

  _onFilmComponentClick(evt) {
    evt.preventDefault();
    const TARGET_CLASSES = [
      `film-card__title`,
      `film-card__poster`,
      `film-card__comments`
    ];
    const shouldShowPopup = TARGET_CLASSES.some((cl) => evt.target.classList.contains(cl));
    if (shouldShowPopup) {
      this._callback.showPopup();
    }
  }
  setOnFilmComponentClick(callback) {
    this._callback.showPopup = callback;
    this.getElement().addEventListener(`click`, this._onFilmComponentClick);
  }

  _onWatchlistButtonClick(evt) {
    evt.preventDefault();
    this._callback.changeWatchlist();
  }
  setOnWatchlistButtonClick(callback) {
    this._callback.changeWatchlist = callback;
    this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`).addEventListener(`click`, this._onWatchlistButtonClick);
  }

  _onWatchedButtonClick(evt) {
    evt.preventDefault();
    this._callback.changeWatched();
  }
  setOnWatchedButtonClick(callback) {
    this._callback.changeWatched = callback;
    this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`).addEventListener(`click`, this._onWatchedButtonClick);
  }

  _onFavoriteButtonClick(evt) {
    evt.preventDefault();
    this._callback.changeFavorite();
  }
  setOnFavoriteButtonClick(callback) {
    this._callback.changeFavorite = callback;
    this.getElement().querySelector(`.film-card__controls-item--favorite`).addEventListener(`click`, this._onFavoriteButtonClick);
  }
}
