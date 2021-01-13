import {CARD_COUNT} from './mock/const';
import Rank from './view/rank/rank';
import {generateFilm} from './mock/film';
import {generateUser} from './mock/user';
import FilmNumber from './view/film-number/film-number';
import {render, RenderPosition} from './utils/render';
import FilmsPresenter from './presenter/films';
import FilmsModel from './model/films';

const films = new Array(CARD_COUNT).fill().map(generateFilm);

const filmsModel = new FilmsModel();
filmsModel.setFilms(films);

const user = generateUser();

const bodyElement = document.querySelector(`body`);
const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);
const footerStatisticsElement = siteFooterElement.querySelector(`.footer__statistics`);
const mainNavigationElement = siteMainElement.querySelector(`.main-navigation`);

render(
    siteHeaderElement,
    new Rank(user),
    RenderPosition.BEFOREEND
);

const filmsPresenter = new FilmsPresenter(siteMainElement, siteFooterElement, mainNavigationElement, bodyElement, filmsModel);

filmsPresenter.init();

render(
    footerStatisticsElement,
    new FilmNumber(films.length),
    RenderPosition.BEFOREEND
);
