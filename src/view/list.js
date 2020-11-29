export const createfilmListTemplate = (exist) => {
  return `<section class="films-list">
    <h2 class="films-list__title">${exist ? `All movies. Upcoming` : `There are no movies in our database`}</h2>
    <div class="films-list__container"></div>
  </section>`;
};
