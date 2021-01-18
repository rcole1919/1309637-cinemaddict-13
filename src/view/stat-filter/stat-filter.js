import {createStatFilterTemplate} from './stat-filter-template';
import AbstractView from '../abstract';

export default class StatFilter extends AbstractView {
  constructor(films, currentStatFilterType) {
    super();
    this._films = films;
    this._currentStatFilterType = currentStatFilterType;

    this._onStatFilterChange = this._onStatFilterChange.bind(this);
  }

  getTemplate() {
    return createStatFilterTemplate(this._films, this._currentStatFilterType);
  }

  _onStatFilterChange(evt) {
    evt.preventDefault();
    this._callback.statFilterChange(evt.target.value);
  }

  setOnStatFilterChange(callback) {
    this._callback.statFilterChange = callback;
    this
        .getElement()
        .querySelectorAll(`.statistic__filters-input`)
        .forEach((el) => {
          el.addEventListener(`change`, this._onStatFilterChange);
        });
  }
}
