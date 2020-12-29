import {createStatTemplate} from './stat-template';
import AbstractView from '../abstract';

export default class Stat extends AbstractView {
  constructor(user) {
    super();
    this._user = user;
  }

  getTemplate() {
    return createStatTemplate(this._user);
  }
}
