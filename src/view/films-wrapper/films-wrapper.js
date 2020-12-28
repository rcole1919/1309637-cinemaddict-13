import AbstractView from '../abstract';
import {createFilmsWrapperTemplate} from './films-wrapper-template';

export default class FilmsContainer extends AbstractView {
  getTemplate() {
    return createFilmsWrapperTemplate();
  }
}
