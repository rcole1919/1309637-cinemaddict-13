import AbstractView from './abstract.js';
import {createFilmsTemplate} from './film-container-template.js';

export default class FilmsContainer extends AbstractView {
  getTemplate() {
    return createFilmsTemplate();
  }
}
