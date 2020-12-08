import {createStatTemplate} from './stat-template.js';
import AbstractView from './abstract.js';

export default class Stat extends AbstractView {
  constructor(user) {
    super();
    this._user = user;
  }

  getTemplate() {
    return createStatTemplate(this._user);
  }
}
