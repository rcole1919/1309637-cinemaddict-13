import {createElement} from "../utils.js";

const createfilmListTemplate = (exist) => {
  return `<section class="films-list">
    <h2 class="films-list__title">${exist ? `All movies. Upcoming` : `There are no movies in our database`}</h2>
    <div class="films-list__container"></div>
  </section>`;
};

export default class FilmList {
  constructor(exist) {
    this._exist = exist;
    this._element = null;
  }

  getTemplate() {
    return createfilmListTemplate(this._exist);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
