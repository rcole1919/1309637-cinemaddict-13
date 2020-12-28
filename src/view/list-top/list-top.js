import {createfilmListTopTemplate} from './list-top-template';
import AbstractView from '../abstract';

export default class FilmListTop extends AbstractView {
  getTemplate() {
    return createfilmListTopTemplate();
  }
}
