import AbstractView from './abstract.js';
import {createFilmsWrapperTemplate} from './film-wrapper-template.js';

export default class FilmsContainer extends AbstractView {
  getTemplate() {
    return createFilmsWrapperTemplate();
  }
}
