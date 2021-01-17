import {createRankTemplate} from './rank-template';
import AbstractView from '../abstract';

export default class Rank extends AbstractView {
  constructor(films) {
    super();
    this._films = films;
  }

  getTemplate() {
    return createRankTemplate(this._films);
  }
}
