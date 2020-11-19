import {createRatingTemplate} from './view/rating.js';
import {createSiteMenuTemplate} from './view/site-menu.js';
import {createFilmCardTemplate} from './view/film-card.js';
import {createShowMoreTemplate} from './view/show-more.js';
import {createPopupTemplate} from './view/popup.js';

const CARD_COUNT = 5;
const CARD_EXTRA_COUNT = 2;

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);

render(siteHeaderElement, createRatingTemplate(), `beforeend`);

render(siteMainElement, createSiteMenuTemplate(), `afterbegin`);

const filmsElement = document.querySelector(`.films`);
const filmslistElements = filmsElement.querySelectorAll(`.films-list`);
const filmsAllContainer = filmslistElements[0].querySelector(`.films-list__container`);
const filmsTopContainer = filmslistElements[1].querySelector(`.films-list__container`);
const filmsPopularContainer = filmslistElements[2].querySelector(`.films-list__container`);

for (let i = 0; i < CARD_COUNT; i++) {
  render(filmsAllContainer, createFilmCardTemplate(), `beforeend`);
}

for (let i = 0; i < CARD_EXTRA_COUNT; i++) {
  render(filmsTopContainer, createFilmCardTemplate(), `beforeend`);
}

for (let i = 0; i < CARD_EXTRA_COUNT; i++) {
  render(filmsPopularContainer, createFilmCardTemplate(), `beforeend`);
}

render(filmslistElements[0], createShowMoreTemplate(), `beforeend`);

render(siteFooterElement, createPopupTemplate(), `afterend`);
