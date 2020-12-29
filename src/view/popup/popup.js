import {createPopupTemplate} from './popup-template';
import SmartView from '../smart';

export default class Popup extends SmartView {
  constructor(film) {
    super();
    this._film = film;

    this._onCloseClick = this._onCloseClick.bind(this);
    this._onWatchlistChange = this._onWatchlistChange.bind(this);
    this._onWatchedChange = this._onWatchedChange.bind(this);
    this._onFavoriteChange = this._onFavoriteChange.bind(this);
  }

  restoreHandlers() {

  }

  getTemplate() {
    return createPopupTemplate(this._film);
  }

  _onCloseClick(evt) {
    evt.preventDefault();
    this._callback.hidePopup();
  }

  setOnCloseClick(callback) {
    this._callback.hidePopup = callback;
    this.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, this._onCloseClick);
  }

  setRemoveOnCloseClick(callback) {
    this._callback.closeClick = callback;
    this.getElement().querySelector(`.film-details__close-btn`).removeEventListener(`click`, this._onCloseClick);
  }

  _onWatchlistChange() {
    this._callback.changeWatchlist();
  }
  setOnWatchlistChange(callback) {
    this._callback.changeWatchlist = callback;
    this.getElement().querySelector(`input[name=watchlist]`).addEventListener(`change`, this._onWatchlistChange);
  }

  _onWatchedChange() {
    this._callback.changeWatched();
  }
  setOnWatchedChange(callback) {
    this._callback.changeWatched = callback;
    this.getElement().querySelector(`input[name=watched]`).addEventListener(`change`, this._onWatchedChange);
  }

  _onFavoriteChange() {
    this._callback.changeFavorite();
  }
  setOnFavoriteChange(callback) {
    this._callback.changeFavorite = callback;
    this.getElement().querySelector(`input[name=favorite]`).addEventListener(`change`, this._onFavoriteChange);
  }
}
