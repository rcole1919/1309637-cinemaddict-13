import {createRankTemplate} from './view/rank.js';
import {createSiteMenuTemplate} from './view/site-menu.js';
import {createFilmsTemplate} from './view/films-container.js';
import {createFilmCardTemplate} from './view/film-card.js';
import {createShowMoreTemplate} from './view/show-more.js';
import {createCommentTemplate} from './view/comment-template.js';
import {generateFilm} from './mock/film.js';
import {generateUser} from './mock/user.js';
import {createPopupTemplate} from './view/popup.js';
import {createFilmNumberTemplate} from './view/film-number.js';
import {createfilmListTemplate} from './view/list.js';
import {createfilmListTopTemplate} from './view/list-top.js';
import {createfilmListCommentedTemplate} from './view/list-commented.js';
import {createStatTemplate} from './view/stat.js';
import {createSortTemplate} from './view/sort.js';
import {render} from './utils.js';

const CARD_COUNT = 15;
const CARD_EXTRA_COUNT = 10;

const films = new Array(CARD_COUNT).fill().map(generateFilm);
const topFilms = new Array(CARD_EXTRA_COUNT).fill().map(generateFilm);
const popularFilms = new Array(CARD_EXTRA_COUNT).fill().map(generateFilm);

const user = generateUser();

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);
const footerStatisticsElement = siteFooterElement.querySelector(`.footer__statistics`);

render(siteHeaderElement, createRankTemplate(user), `beforeend`);

render(siteMainElement, createSiteMenuTemplate(), `afterbegin`);

render(siteMainElement, createStatTemplate(user), `beforeend`);

render(siteMainElement, createFilmsTemplate(), `beforeend`);

const filmsElement = document.querySelector(`.films`);

render(filmsElement, createfilmListTemplate(films), `beforeend`);

if (films) {
  render(filmsElement, createSortTemplate(), `beforebegin`);

  render(filmsElement, createfilmListTopTemplate(), `beforeend`);
  render(filmsElement, createfilmListCommentedTemplate(), `beforeend`);

  const filmslistElements = filmsElement.querySelectorAll(`.films-list`);
  const filmsAllContainer = filmslistElements[0].querySelector(`.films-list__container`);
  const filmsTopContainer = filmslistElements[1].querySelector(`.films-list__container`);
  const filmsPopularContainer = filmslistElements[2].querySelector(`.films-list__container`);

  for (let i = 0; i < films.length; i++) {
    render(filmsAllContainer, createFilmCardTemplate(films[i]), `beforeend`);
  }

  for (let i = 0; i < topFilms.length; i++) {
    render(filmsTopContainer, createFilmCardTemplate(topFilms[i]), `beforeend`);
  }

  for (let i = 0; i < popularFilms.length; i++) {
    render(filmsPopularContainer, createFilmCardTemplate(popularFilms[i]), `beforeend`);
  }

  render(filmslistElements[0], createShowMoreTemplate(), `beforeend`);
}

render(footerStatisticsElement, createFilmNumberTemplate(films.length), `beforeend`);

const film = generateFilm();

render(siteFooterElement, createPopupTemplate(film), `afterend`);

const commentListElement = document.querySelector(`.film-details__comments-list`);

for (let i = 0; i < film.comments.length; i++) {
  render(commentListElement, createCommentTemplate(film.comments[i]), `beforeend`);
}
