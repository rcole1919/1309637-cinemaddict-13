import {createFilmNumberTemplate} from './film-number-template';
import AbstractView from '../abstract';

export default class FilmNumber extends AbstractView {
  constructor(num) {
    super();
    this._num = num;
  }

  getTemplate() {
    return createFilmNumberTemplate(this._num);
  }
}
