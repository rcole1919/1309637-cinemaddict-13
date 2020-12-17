import FilmCard from '../view/film-card.js';
import Comment from '../view/comment.js';
import Popup from '../view/popup.js';
import {render, remove, RenderPosition} from '../utils/render.js';
import {onEscKeyDown} from '../utils/common.js';

export default class Film {
  constructor(filmListContainer, popupContainer, bodyElement) {
    this._filmListContainer = filmListContainer;
    this._popupContainer = popupContainer;
    this._bodyElement = bodyElement;

    this._film = null;

    this._filmComponent = null;
    this._popupComponent = null;

    this._onFilmComponentClick = this._onFilmComponentClick.bind(this);

    this._onWatchlistChange = this._onWatchlistChange.bind(this);
    this._onWatchedChange = this._onWatchedChange.bind(this);
    this._onFavoriteChange = this._onFavoriteChange.bind(this);

    this._onClosePopupComponent = this._onClosePopupComponent.bind(this);
    this._onPopupPressEsc = this._onPopupPressEsc.bind(this);
  }

  init(film) {
    this._film = film;

    this._filmComponent = new FilmCard(film);

    this._filmComponent.setOnFilmComponentClick(this._onFilmComponentClick);
    this._filmComponent.setOnWatchlistButtonClick(this._onWatchlistChange);
    this._filmComponent.setOnWatchedButtonClick(this._onWatchedChange);
    this._filmComponent.setOnFavoriteButtonClick(this._onFavoriteChange);

    render(this._filmListContainer, this._filmComponent, RenderPosition.BEFOREEND);
  }

  _renderPopup() {
    this._popupComponent = new Popup(this._film);
    render(this._popupContainer, this._popupComponent, RenderPosition.AFTEREND);

    this._film.comments.forEach((el) => {
      render(this._popupComponent.getElement().querySelector(`.film-details__comments-list`), new Comment(el), RenderPosition.BEFOREEND);
    });

    this._bodyElement.classList.add(`hide-overflow`);

    this._popupComponent.setOnCloseClick(this._onClosePopupComponent);

    this._popupComponent.setOnWatchlistChange(this._onWatchlistChange);
    this._popupComponent.setOnWatchedChange(this._onWatchedChange);
    this._popupComponent.setOnFavoriteChange(this._onFavoriteChange);

    document.addEventListener(`keydown`, this._onPopupPressEsc);
  }

  _onFilmComponentClick() {
    if (!document.querySelector(`.film-details`)) {
      this._renderPopup();
    }
  }

  _onWatchlistChange() {
    this._film.isInWatchlist = !this._film.isInWatchlist;
  }
  _onWatchedChange() {
    this._film.isWatched = !this._film.isWatched;
  }
  _onFavoriteChange() {
    this._film.isFavorite = !this._film.isFavorite;
  }

  _onClosePopupComponent() {
    this._popupComponent.setRemoveOnCloseClick(this._onClosePopupComponent);
    remove(this._popupComponent);
    this._bodyElement.classList.remove(`hide-overflow`);
  }

  _onPopupPressEsc(evt) {
    onEscKeyDown(evt, this._onClosePopupComponent);
    document.removeEventListener(`keydown`, this._onPopupPressEsc);
  }
}
