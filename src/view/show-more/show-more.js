import {createShowMoreTemplate} from './show-more-template';
import AbstractView from '../abstract';

export default class ShowMore extends AbstractView {
  constructor() {
    super();

    this._onShowMoreClick = this._onShowMoreClick.bind(this);
  }
  getTemplate() {
    return createShowMoreTemplate();
  }

  _onShowMoreClick() {
    this._callback.showMoreFilms();
  }

  setOnShowMoreClick(callback) {
    this._callback.showMoreFilms = callback;
    this.getElement().addEventListener(`click`, this._onShowMoreClick);
  }
}
