import AbstractView from "./abstract.js";

const createFilmNumberTemplate = (num) => {
  return `<p>${num ? num : `0`} movies inside</p>`;
};

export default class FilmNumber extends AbstractView {
  constructor(num) {
    super();
    this._num = num;
  }

  getTemplate() {
    return createFilmNumberTemplate(this._num);
  }
}
