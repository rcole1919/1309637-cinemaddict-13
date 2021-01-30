import AbstractView from '../abstract';
import {createStatWrapperTemplate} from './stat-wrapper-template';

export default class StatWrapper extends AbstractView {
  getTemplate() {
    return createStatWrapperTemplate();
  }
}
