import {createFilterTemplate} from './filter-template';
import AbstractView from '../abstract';

export default class Filter extends AbstractView {
  constructor(filters, currentFilterType) {
    super();
    this._filters = filters;
    this._currentFilter = currentFilterType;

    this._onFilterTypeChange = this._onFilterTypeChange.bind(this);
  }

  getTemplate() {
    return createFilterTemplate(this._filters, this._currentFilter);
  }

  _onFilterTypeChange(evt) {
    if (evt.target.className !== `main-navigation__item`) {
      return;
    }
    evt.preventDefault();
    this._callback.changeFilterType(evt.target.dataset.filter);
  }

  setOnFilterTypeChange(callback) {
    this._callback.changeFilterType = callback;
    this
      .getElement().addEventListener(`click`, this._onFilterTypeChange);
  }
}
