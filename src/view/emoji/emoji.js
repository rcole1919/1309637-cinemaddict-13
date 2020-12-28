import {createEmojiTemplate} from './emoji-template';
import AbstractView from '../abstract';

export default class Emoji extends AbstractView {
  constructor(source) {
    super();
    this._source = source;
  }

  getTemplate() {
    return createEmojiTemplate(this._source);
  }
}
