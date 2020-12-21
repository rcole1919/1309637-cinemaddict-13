import {createCommentTemplate} from './comment-template.js';
import AbstractView from '../abstract.js';

export default class Comment extends AbstractView {
  constructor(comment) {
    super();
    this._comment = comment;
    this._element = null;
  }

  getTemplate() {
    return createCommentTemplate(this._comment);
  }
}
