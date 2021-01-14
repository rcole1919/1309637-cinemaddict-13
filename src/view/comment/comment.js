import {createCommentTemplate} from './comment-template';
import AbstractView from '../abstract';

export default class Comment extends AbstractView {
  constructor(comment) {
    super();
    this._comment = comment;
    this._element = null;

    this._onCommentDelete = this._onCommentDelete.bind(this);
  }

  get commentId() {
    return this._comment.id;
  }

  getTemplate() {
    return createCommentTemplate(this._comment);
  }

  _onCommentDelete(evt) {
    evt.preventDefault();
    this._callback.deleteComment();
  }

  setOnCommentDelete(callback) {
    this._callback.deleteComment = callback;
    this.getElement().querySelector(`.film-details__comment-delete`).addEventListener(`click`, this._onCommentDelete);
  }
}
