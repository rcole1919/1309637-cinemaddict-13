import FilmCard from '../view/film-card/film-card';
import Comment from '../view/comment/comment';
import Emoji from '../view/emoji/emoji';
import Popup from '../view/popup/popup';
import {render, remove, RenderPosition} from '../utils/render';
import {onEscKeyDown, onCtrlEnterDown, generateId} from '../utils/common';
import {UserAction, UpdateType} from '../const';
import dayjs from 'dayjs';

export default class Film {
  constructor(filmListContainer, popupContainer, bodyElement, setActiveFilm, onFilmListUpdate, onViewAction) {
    this._filmListContainer = filmListContainer;
    this._popupContainer = popupContainer;
    this._bodyElement = bodyElement;

    this._film = null;

    this._filmComponent = null;
    this._popupComponent = null;
    this._commentComponents = [];
    this._emojiComponent = null;

    this._onFilmComponentClick = this._onFilmComponentClick.bind(this);

    this._onEmojiChange = this._onEmojiChange.bind(this);

    this._onWatchlistChange = this._onWatchlistChange.bind(this);
    this._onWatchedChange = this._onWatchedChange.bind(this);
    this._onFavoriteChange = this._onFavoriteChange.bind(this);
    this._onCommentDelete = this._onCommentDelete.bind(this);
    this._onCommentAdd = this._onCommentAdd.bind(this);

    this._onClosePopupComponent = this._onClosePopupComponent.bind(this);
    this._onPopupPressEsc = this._onPopupPressEsc.bind(this);
    this._onPopupPressCtrlEnter = this._onPopupPressCtrlEnter.bind(this);
    this._setActiveFilm = setActiveFilm;
    this._onFilmListUpdate = onFilmListUpdate;
    this._onViewAction = onViewAction;
  }

  init(film) {
    this._film = film;

    this._filmComponent = new FilmCard(film);

    this._filmComponent.setOnFilmComponentClick(this._onFilmComponentClick);
    this._filmComponent.setOnWatchlistButtonClick(this._onWatchlistChange);
    this._filmComponent.setOnWatchedButtonClick(this._onWatchedChange);
    this._filmComponent.setOnFavoriteButtonClick(this._onFavoriteChange);

    render(
        this._filmListContainer,
        this._filmComponent,
        RenderPosition.BEFOREEND);
  }

  _renderPopup() {
    this._popupComponent = new Popup(this._film);
    this._setActiveFilm(this._popupComponent);
    render(
        this._popupContainer,
        this._popupComponent,
        RenderPosition.AFTEREND
    );

    this._renderComments();

    this._bodyElement.classList.add(`hide-overflow`);

    this._popupComponent.setOnCloseClick(this._onClosePopupComponent);

    this.setOnEmojiChange();

    this._popupComponent.setOnWatchlistChange(this._onWatchlistChange);
    this._popupComponent.setOnWatchedChange(this._onWatchedChange);
    this._popupComponent.setOnFavoriteChange(this._onFavoriteChange);

    document.addEventListener(`keydown`, this._onPopupPressEsc);
    document.addEventListener(`keydown`, this._onPopupPressCtrlEnter);
  }

  _onCommentDelete(el) {
    this._onViewAction(
        UserAction.DELETE_COMMENT,
        UpdateType.MAJOR,
        {
          filmId: this._film.id,
          commentId: el.commentId
        }
    );
    this._updateComments();
  }

  _onCommentAdd() {
    if (
      this._popupComponent.getElement().querySelector(`.film-details__comment-input`).value &&
      this._popupComponent.getElement().querySelector(`.film-details__add-emoji-label img`) &&
      this._popupComponent.getElement().querySelector(`.film-details__comment-input`) === document.activeElement
    ) {
      const commentText = this._popupComponent.getElement().querySelector(`.film-details__comment-input`).value;
      const commentEmoji = this._popupComponent.getElement().querySelector(`.film-details__add-emoji-label img`).dataset.emoji;
      this._onViewAction(
          UserAction.ADD_COMMENT,
          UpdateType.MAJOR,
          {
            filmId: this._film.id,
            comment: {
              id: generateId(),
              message: commentText,
              author: `Some Author`,
              date: dayjs(),
              emoji: commentEmoji
            }
          }
      );
      this._updateComments();
      this._popupComponent.getElement().querySelector(`.film-details__comment-input`).value = ``;
      this._popupComponent.getElement().querySelectorAll(`.film-details__emoji-item`).forEach((el) => {
        el.checked = false;
      });
      remove(this._emojiComponent);
      this._emojiComponent = null;
    }
  }

  _renderComments() {
    this._film.comments.forEach((el, i) => {
      this._commentComponents.push(new Comment(el));
      render(
          this._popupComponent
          .getElement()
          .querySelector(`.film-details__comments-list`),
          this._commentComponents[i],
          RenderPosition.BEFOREEND);
    });

    this._popupComponent
        .getElement()
        .querySelector(`.film-details__comments-count`)
        .textContent = this._film.comments.length;

    this._commentComponents.forEach((el) => {
      el.setOnCommentDelete(() => this._onCommentDelete(el));
    });
  }

  _updateComments() {
    this._commentComponents.forEach((el) => {
      remove(el);
    });
    this._commentComponents = [];
    this._renderComments();
  }

  _onEmojiChange(evt) {
    const emoji = evt.currentTarget.value;
    if (this._emojiComponent !== null) {
      this._emojiComponent.removeElement();
    }
    this._emojiComponent = new Emoji(emoji);
    const emojiContainer = this._popupComponent.getElement().querySelector(`.film-details__add-emoji-label`);
    emojiContainer.textContent = ``;
    render(emojiContainer, this._emojiComponent, RenderPosition.AFTERBEGIN);
  }

  setOnEmojiChange() {
    this._popupComponent.getElement().querySelectorAll(`.film-details__emoji-item`).forEach((el) => {
      el.addEventListener(`change`, this._onEmojiChange);
    });
  }

  _onFilmComponentClick() {
    this._renderPopup();
  }

  _onWatchlistChange() {
    this._film.isInWatchlist = !this._film.isInWatchlist;
    this._filmComponent.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`).classList.toggle(`film-card__controls-item--active`);
    this._onFilmListUpdate();
  }
  _onWatchedChange() {
    this._film.isWatched = !this._film.isWatched;
    this._filmComponent.getElement().querySelector(`.film-card__controls-item--mark-as-watched`).classList.toggle(`film-card__controls-item--active`);
    this._onFilmListUpdate();
  }
  _onFavoriteChange() {
    this._film.isFavorite = !this._film.isFavorite;
    this._filmComponent.getElement().querySelector(`.film-card__controls-item--favorite`).classList.toggle(`film-card__controls-item--active`);
    this._onFilmListUpdate();
  }

  _onClosePopupComponent() {
    this._popupComponent.setRemoveOnCloseClick(this._onClosePopupComponent);
    remove(this._popupComponent);
    this._bodyElement.classList.remove(`hide-overflow`);
    document.removeEventListener(`keydown`, this._onPopupPressCtrlEnter);
  }

  _onPopupPressEsc(evt) {
    onEscKeyDown(evt, this._onClosePopupComponent);
    document.removeEventListener(`keydown`, this._onPopupPressEsc);
  }

  _onPopupPressCtrlEnter(evt) {
    onCtrlEnterDown(evt, this._onCommentAdd);
  }

  destroy() {
    remove(this._filmComponent);
  }
}
