export const createRankTemplate = (user) => {
  const {rank, avatar} = user;

  return `<section class="header__profile profile">
    <p class="profile__rating">${rank}</p>
    <img class="profile__avatar" src="images/${avatar}@2x.png" alt="Avatar" width="35" height="35">
  </section>`;
};
