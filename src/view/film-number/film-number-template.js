export const createFilmNumberTemplate = (num) => {
  return `<section class="footer__statistics">
      <p>${num ? num : `0`} movies inside</p>
    </section>`;
};
