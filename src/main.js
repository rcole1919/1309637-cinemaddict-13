import {CARD_COUNT} from './mock/const';
import {generateFilm} from './mock/film';
import FilmNumber from './view/film-number/film-number';
import {render, RenderPosition} from './utils/render';
import FilmsPresenter from './presenter/films';
import FilmsModel from './model/films';

const films = new Array(CARD_COUNT).fill().map(generateFilm);

const filmsModel = new FilmsModel();
filmsModel.setFilms(films);

const bodyElement = document.querySelector(`body`);
const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);
const footerStatisticsElement = siteFooterElement.querySelector(`.footer__statistics`);
const mainNavigationElement = siteMainElement.querySelector(`.main-navigation`);

const filmsPresenter = new FilmsPresenter(siteHeaderElement, siteMainElement, siteFooterElement, mainNavigationElement, bodyElement, filmsModel);

filmsPresenter.init();

render(
    footerStatisticsElement,
    new FilmNumber(films.length),
    RenderPosition.BEFOREEND
);
