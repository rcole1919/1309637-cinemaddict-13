import AbstractView from '../abstract';
import {createLoadingTemplate} from './loading-template';

export default class Loading extends AbstractView {
  getTemplate() {
    return createLoadingTemplate();
  }
}
