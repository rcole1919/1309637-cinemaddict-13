import {createFilmListTopTemplate} from './film-list-top-template';
import AbstractView from '../abstract';

export default class FilmListTop extends AbstractView {
  getTemplate() {
    return createFilmListTopTemplate();
  }
}
