import dayjs from 'dayjs';
import {createElement} from "../utils.js";

const createCommentTemplate = (comment) => {
  const {message, emoji, author, date} = comment;

  return `<li class="film-details__comment">
    <span class="film-details__comment-emoji">
      <img src="./images/emoji/${emoji}" width="55" height="55" alt="emoji-smile">
    </span>
    <div>
      <p class="film-details__comment-text">${message}</p>
      <p class="film-details__comment-info">
        <span class="film-details__comment-author">${author}</span>
        <span class="film-details__comment-day">${dayjs(date.toString()).format(`YYYY/MM/DD hh:mm`)}</span>
        <button class="film-details__comment-delete">Delete</button>
      </p>
    </div>
  </li>`;
};

export default class Comment {
  constructor(comment) {
    this.comment = comment;
    this._element = null;
  }

  getTemplate() {
    return createCommentTemplate(this.comment);
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
