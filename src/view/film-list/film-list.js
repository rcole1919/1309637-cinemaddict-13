import {createFilmListTemplate} from './film-list-template';
import AbstractView from '../abstract';

export default class FilmList extends AbstractView {
  constructor(exist) {
    super();
    this._exist = exist;
  }

  getTemplate() {
    return createFilmListTemplate(this._exist);
  }
}
