import {createfilmListTemplate} from './list-template.js';
import AbstractView from '../abstract.js';

export default class FilmList extends AbstractView {
  constructor(exist) {
    super();
    this._exist = exist;
  }

  getTemplate() {
    return createfilmListTemplate(this._exist);
  }
}
