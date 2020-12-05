import AbstractView from "./abstract.js";

const createRankTemplate = (user) => {
  const {rank, avatar} = user;

  return `<section class="header__profile profile">
    <p class="profile__rating">${rank}</p>
    <img class="profile__avatar" src="images/${avatar}@2x.png" alt="Avatar" width="35" height="35">
  </section>`;
};

export default class Rank extends AbstractView {
  constructor(user) {
    super();
    this._user = user;
  }

  getTemplate() {
    return createRankTemplate(this._user);
  }
}
