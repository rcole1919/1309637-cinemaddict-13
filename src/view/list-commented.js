import {createElement} from "../utils.js";

export const createfilmListCommentedTemplate = () => {
  return `<section class="films-list films-list--extra">
    <h2 class="films-list__title">Most commented</h2>
    <div class="films-list__container"></div>
  </section>`;
};

export default class FilmListCommented {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createfilmListCommentedTemplate();
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
