import {createFilmNumberTemplate} from './film-number-template.js';
import AbstractView from '../abstract.js';

export default class FilmNumber extends AbstractView {
  constructor(num) {
    super();
    this._num = num;
  }

  getTemplate() {
    return createFilmNumberTemplate(this._num);
  }
}
