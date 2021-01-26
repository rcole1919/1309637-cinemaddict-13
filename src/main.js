import {UpdateType} from './const';
import {AUTHORIZATION, END_POINT} from './api/const';
import FilmsPresenter from './presenter/films';
import FilmsModel from './model/films';
import Api from './api/api';

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
const mainNavigationElement = siteMainElement.querySelector(`.main-navigation`);

const filmsPresenter = new FilmsPresenter(siteHeaderElement, siteMainElement, siteFooterElement, mainNavigationElement, bodyElement, filmsModel, api);

filmsPresenter.init();


