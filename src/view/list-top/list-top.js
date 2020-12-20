import {createfilmListTopTemplate} from './list-top-template.js';
import AbstractView from '../abstract.js';

export default class FilmListTop extends AbstractView {
  getTemplate() {
    return createfilmListTopTemplate();
  }
}
