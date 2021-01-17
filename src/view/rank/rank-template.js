import {getRank} from '../../utils/common';

export const createRankTemplate = (films) => {
  const watched = films.filter((film) => film.isWatched).length;
  const rank = getRank(watched);

  return `<section class="header__profile profile">
    <p class="profile__rating">${rank}</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`;
};
