import AbstractView from '../abstract';
import {createStatWrapperTemplate} from './stat-wrapper-template';

export default class StatContainer extends AbstractView {
  getTemplate() {
    return createStatWrapperTemplate();
  }
}
