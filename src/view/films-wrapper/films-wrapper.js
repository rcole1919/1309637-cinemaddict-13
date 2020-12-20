import AbstractView from '../abstract.js';
import {createFilmsWrapperTemplate} from './films-wrapper-template.js';

export default class FilmsContainer extends AbstractView {
  getTemplate() {
    return createFilmsWrapperTemplate();
  }
}
