import {createSortTemplate} from './sort-template';
import AbstractView from '../abstract';

export default class Sort extends AbstractView {
  constructor(currentSortType) {
    super();
    this._currentSortType = currentSortType;

    this._onSortTypeChange = this._onSortTypeChange.bind(this);
  }
  getTemplate() {
    return createSortTemplate(this._currentSortType);
  }

  _onSortTypeChange(evt) {
    if (evt.target.className !== `sort__button`) {
      return;
    }

    evt.preventDefault();
    this._callback.sortTypeChange(evt.target.dataset.sortType);
  }

  setOnSortTypeChange(callback) {
    this._callback.sortTypeChange = callback;
    this.getElement().addEventListener(`click`, this._onSortTypeChange);
  }
}
