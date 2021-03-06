import FilmCard from '../view/film-card/film-card';
import Comment from '../view/comment/comment';
import Emoji from '../view/emoji/emoji';
import Popup from '../view/popup/popup';
import {
  render,
  remove,
  RenderPosition
} from '../utils/render';
import {
  onEscKeyDown,
  onCtrlEnterDown,
  isOnline
} from '../utils/common';
import {UserAction, UpdateType} from '../const';
import dayjs from 'dayjs';
import {
  ERROR_COMMENTS_UPLOAD,
  ERROR_COMMENTS_DELETE,
  COMMENT_DELETING
} from '../const';
import {toast} from "../utils/toast.js";

export default class Film {
  constructor(filmListContainer, popupContainer, bodyElement, setActiveFilm, onFilmListUpdate, onViewAction, api) {
    this._filmListContainer = filmListContainer;
    this._popupContainer = popupContainer;
    this._bodyElement = bodyElement;

    this._film = null;
    this._comments = null;
    this._api = api;

    this._filmComponent = null;
    this._popupComponent = null;
    this._commentComponents = [];
    this._emojiComponent = null;

    this._setActiveFilm = setActiveFilm;
    this._onFilmListUpdate = onFilmListUpdate;
    this._onViewAction = onViewAction;

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

  setComments(comments) {
    this._comments = comments.slice();
  }

  setOnEmojiChange() {
    this._popupComponent.getElement().querySelectorAll(`.film-details__emoji-item`).forEach((el) => {
      el.addEventListener(`change`, this._onEmojiChange);
    });
  }

  destroy() {
    remove(this._filmComponent);
  }

  _renderPopup(isCommentUpload) {
    this._popupComponent = new Popup(this._film);
    this._setActiveFilm(this._popupComponent);
    render(
        this._popupContainer,
        this._popupComponent,
        RenderPosition.AFTEREND
    );

    if (isCommentUpload) {
      this._renderComments();
    } else {
      this._popupComponent.getElement().querySelector(`.film-details__comments-count`).textContent = ERROR_COMMENTS_UPLOAD;
      this._popupComponent.getElement().querySelector(`.film-details__new-comment`).style.display = `none`;
    }

    this._bodyElement.classList.add(`hide-overflow`);

    this._popupComponent.setOnCloseClick(this._onClosePopupComponent);

    this.setOnEmojiChange();

    this._popupComponent.setOnWatchlistChange(this._onWatchlistChange);
    this._popupComponent.setOnWatchedChange(this._onWatchedChange);
    this._popupComponent.setOnFavoriteChange(this._onFavoriteChange);

    document.addEventListener(`keydown`, this._onPopupPressEsc);
    document.addEventListener(`keydown`, this._onPopupPressCtrlEnter);
  }

  _renderComments() {
    this._comments.forEach((el, i) => {
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
    this._api.getComments(this._film)
      .then((comments) => {
        this.setComments(comments);
        this._commentComponents.forEach((el) => {
          remove(el);
        });
        this._commentComponents = [];
        this._renderComments();
      });
  }

  _onCommentDelete(el) {
    if (!isOnline()) {
      toast(`You can't delete comment offline`);
      return;
    }
    const delButtonElement = el.getElement().querySelector(`.film-details__comment-delete`);
    delButtonElement.textContent = COMMENT_DELETING;
    this._api.deleteComment(el.commentId)
      .then(() => {
        this._onViewAction(
            UserAction.DELETE_COMMENT,
            UpdateType.MAJOR,
            {
              filmId: this._film.id,
              commentId: el.commentId
            }
        );
        this._updateComments();
      })
      .catch(() => {
        delButtonElement.textContent = ERROR_COMMENTS_DELETE;
      });
  }

  _onCommentAdd() {
    if (!isOnline()) {
      toast(`You can't add comment offline`);
      return;
    }
    const addCommentElement = this._popupComponent.getElement().querySelector(`.film-details__new-comment`);
    if (addCommentElement.classList.contains(`shake`)) {
      addCommentElement.classList.remove(`shake`);
    }

    const inputElement = this._popupComponent.getElement().querySelector(`.film-details__comment-input`);
    const imgElement = this._popupComponent.getElement().querySelector(`.film-details__add-emoji-label img`);
    if (
      inputElement.value &&
      imgElement &&
      inputElement === document.activeElement
    ) {
      const commentText = inputElement.value;
      const commentEmoji = imgElement.dataset.emoji;
      const newComment = {
        message: commentText,
        date: new Date(),
        emoji: commentEmoji
      };

      inputElement.disabled = true;

      this._api.addComment(this._film.id, newComment)
        .then((response) => {
          this._onViewAction(
              UserAction.ADD_COMMENT,
              UpdateType.MAJOR,
              {
                filmId: this._film.id,
                comments: response.movie.comments
              }
          );
          this._updateComments();
          this._popupComponent.getElement().querySelector(`.film-details__comment-input`).value = ``;
          this._popupComponent.getElement().querySelectorAll(`.film-details__emoji-item`).forEach((el) => {
            el.checked = false;
          });
          remove(this._emojiComponent);
          this._emojiComponent = null;
          inputElement.disabled = false;
        })
        .catch(() => {
          inputElement.disabled = false;
          addCommentElement.classList.add(`shake`);
        });
    }
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

  _onFilmComponentClick() {
    this._api.getComments(this._film)
      .then((comments) => {
        this.setComments(comments);
        this._renderPopup(true);
      })
      .catch(() => {
        this.setComments([]);
        this._renderPopup(false);
      });
  }

  _onWatchlistChange() {
    this._film.isInWatchlist = !this._film.isInWatchlist;
    this._filmComponent.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`).classList.toggle(`film-card__controls-item--active`);
    this._onViewAction(
        UserAction.UPDATE_FILM,
        UpdateType.MAJOR,
        this._film
    );
    this._onFilmListUpdate();
  }
  _onWatchedChange() {
    this._film.isWatched = !this._film.isWatched;
    if (this._film.isWatched) {
      this._film.watchingDate = dayjs();
    } else {
      this._film.watchingDate = ``;
    }
    this._filmComponent.getElement().querySelector(`.film-card__controls-item--mark-as-watched`).classList.toggle(`film-card__controls-item--active`);
    this._onViewAction(
        UserAction.UPDATE_FILM,
        UpdateType.MAJOR,
        this._film
    );
    this._onFilmListUpdate();
  }
  _onFavoriteChange() {
    this._film.isFavorite = !this._film.isFavorite;
    this._filmComponent.getElement().querySelector(`.film-card__controls-item--favorite`).classList.toggle(`film-card__controls-item--active`);
    this._onViewAction(
        UserAction.UPDATE_FILM,
        UpdateType.MAJOR,
        this._film
    );
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
}
