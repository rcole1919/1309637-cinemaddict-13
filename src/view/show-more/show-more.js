import {createShowMoreTemplate} from './show-more-template';
import AbstractView from '../abstract';

export default class ShowMore extends AbstractView {
  getTemplate() {
    return createShowMoreTemplate();
  }
}
