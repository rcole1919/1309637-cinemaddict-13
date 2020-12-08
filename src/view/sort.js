import {createSortTemplate} from './sort-template.js';
import AbstractView from './abstract.js';

export default class Sort extends AbstractView {
  getTemplate() {
    return createSortTemplate();
  }
}
