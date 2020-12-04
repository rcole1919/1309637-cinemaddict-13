import {createElement} from "../utils.js";

const createRankTemplate = (user) => {
  const {rank, avatar} = user;

  return `<section class="header__profile profile">
    <p class="profile__rating">${rank}</p>
    <img class="profile__avatar" src="images/${avatar}@2x.png" alt="Avatar" width="35" height="35">
  </section>`;
};

export default class Rank {
  constructor(user) {
    this._user = user;
    this._element = null;
  }

  getTemplate() {
    return createRankTemplate(this._user);
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
