import {createShowMoreTemplate} from './show-more-template.js';
import AbstractView from './abstract.js';

export default class ShowMore extends AbstractView {
  getTemplate() {
    return createShowMoreTemplate();
  }
}
