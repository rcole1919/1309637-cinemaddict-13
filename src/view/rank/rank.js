import {createRankTemplate} from './rank-template.js';
import AbstractView from '../abstract.js';

export default class Rank extends AbstractView {
  constructor(user) {
    super();
    this._user = user;
  }

  getTemplate() {
    return createRankTemplate(this._user);
  }
}
