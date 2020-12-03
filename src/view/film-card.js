import dayjs from 'dayjs';
import {MAX_DESCRIPTION_SYMBOLS} from '../mock/const.js';
import {createElement} from "../utils.js";

const createFilmCardTemplate = (film) => {
  const {title, poster, description, comments, release, rating, genre, duration} = film;

  const getSmallDescription = (str) => {
    if (str.length <= MAX_DESCRIPTION_SYMBOLS) {
      return str;
    }
    return `${str.split(``).slice(0, MAX_DESCRIPTION_SYMBOLS - 1).join(``)}...`;
  };

  return `<article class="film-card">
    <h3 class="film-card__title">${title}</h3>
    <p class="film-card__rating">${rating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${dayjs(release.toString()).year()}</span>
      <span class="film-card__duration">${duration}</span>
      <span class="film-card__genre">${genre[0]}</span>
    </p>
    <img src="./images/posters/${poster}" alt="${title}" class="film-card__poster">
    <p class="film-card__description">${getSmallDescription(description)}</p>
    <a class="film-card__comments">${comments.length} comments</a>
    <div class="film-card__controls">
      <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist" type="button">Add to watchlist</button>
      <button class="film-card__controls-item button film-card__controls-item--mark-as-watched" type="button">Mark as watched</button>
      <button class="film-card__controls-item button film-card__controls-item--favorite" type="button">Mark as favorite</button>
    </div>
  </article>`;
};

export default class FilmCard {
  constructor(film) {
    this.film = film;
    this._element = null;
  }

  getTemplate() {
    return createFilmCardTemplate(this.film);
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
