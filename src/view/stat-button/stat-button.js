import {createStatButtonTemplate} from './stat-button-template';
import Abstarct from '../abstract';

export default class StatButton extends Abstarct {
  constructor(currentViewStateType) {
    super();
    this._currentViewStateType = currentViewStateType;

    this._onStatButtonClick = this._onStatButtonClick.bind(this);
  }

  getTemplate() {
    return createStatButtonTemplate(this._currentViewStateType);
  }

  _onStatButtonClick(evt) {
    evt.preventDefault();
    this._callback.showStats();
  }

  setOnStatButtonClick(callback) {
    this._callback.showStats = callback;
    this.getElement().addEventListener(`click`, this._onStatButtonClick);
  }
}
