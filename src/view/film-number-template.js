export const createFilmNumberTemplate = (num) => {
  return `<p>${num ? num : `0`} movies inside</p>`;
};
