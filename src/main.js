import {UpdateType} from './const';
import {
  AUTHORIZATION,
  END_POINT,
  STORE_NAME
} from './api/const';
import FilmsPresenter from './presenter/films';
import FilmsModel from './model/films';
import Api from './api/api';
import Store from './api/store';
import Provider from './api/provider';

const api = new Api(END_POINT, AUTHORIZATION);
const store = new Store(STORE_NAME, window.localStorage);
const apiWithProvider = new Provider(api, store);

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

const filmsPresenter = new FilmsPresenter(siteHeaderElement, siteMainElement, siteFooterElement, mainNavigationElement, bodyElement, filmsModel, apiWithProvider);

filmsPresenter.init();

// window.addEventListener(`load`, () => {
//   navigator.serviceWorker.register(`/sw.js`);
// });

window.addEventListener(`online`, () => {
  document.title = document.title.replace(` [offline]`, ``);
  apiWithProvider.sync();
});

window.addEventListener(`offline`, () => {
  document.title += ` [offline]`;
});
