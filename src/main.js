import {AUTHORIZATION, END_POINT, UpdateType} from './const';
import FilmNumber from './view/film-number/film-number';
import {render, RenderPosition} from './utils/render';
import FilmsPresenter from './presenter/films';
import FilmsModel from './model/films';
import Api from './api';

const api = new Api(END_POINT, AUTHORIZATION);

const filmsModel = new FilmsModel();

api.getFilms()
  .then((films) => {
    filmsModel.setFilms(UpdateType.INIT, films);
  })
  .catch(() => {
    filmsModel.setFilms(UpdateType.INIT, []);
  });

const bodyElement = document.querySelector(`body`);
const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);
const footerStatisticsElement = siteFooterElement.querySelector(`.footer__statistics`);
const mainNavigationElement = siteMainElement.querySelector(`.main-navigation`);

const filmsPresenter = new FilmsPresenter(siteHeaderElement, siteMainElement, siteFooterElement, mainNavigationElement, bodyElement, filmsModel, api);

filmsPresenter.init();

render(
    footerStatisticsElement,
    new FilmNumber(filmsModel.getFilms().length),
    RenderPosition.BEFOREEND
);


