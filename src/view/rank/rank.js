import {createRankTemplate} from './rank-template';
import AbstractView from '../abstract';

export default class Rank extends AbstractView {
  constructor(user) {
    super();
    this._user = user;
  }

  getTemplate() {
    return createRankTemplate(this._user);
  }
}
