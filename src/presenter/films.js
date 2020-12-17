import Sort from '../view/sort.js';
import FilmsWrapper from '../view/films-wrapper.js';
import ShowMore from '../view/show-more.js';
import FilmList from '../view/list.js';
import FilmListTop from '../view/list-top.js';
import FilmListCommented from '../view/list-commented.js';
import {render, RenderPosition} from '../utils/render.js';
import {getExtraFilms} from '../utils/common.js';
import {CARD_COUNT} from '../mock/const.js';
import FilmPresenter from './film.js';

export default class Films {
  constructor(filmsContainer, popupContainer, bodyElement) {
    this._filmsContainer = filmsContainer;
    this._popupContainer = popupContainer;
    this._bodyElement = bodyElement;
    this._cardCount = CARD_COUNT;

    this._films = null;

    this._filmsWrapperComponent = new FilmsWrapper();
    this._sortComponent = new Sort();
    this._showMoreComponent = new ShowMore();
    this._filmListComponent = null;
    this._filmListTopComponent = new FilmListTop();
    this._filmListCommentedComponent = new FilmListCommented();
  }

  init(films) {
    this._films = films;

    render(this._filmsContainer, this._filmsWrapperComponent, RenderPosition.BEFOREEND);

    this._renderFilmList();

    if (films.length) {
      this._renderSort();
      this._renderFilmListTop();
      this._renderFilmListCommented();
      this._renderFilms();
      this._renderShowMore();
    }
  }

  _renderSort() {
    render(this._filmsWrapperComponent, this._sortComponent, RenderPosition.BEFOREBEGIN);
  }

  _renderFilm(film, container) {
    const filmPresenter = new FilmPresenter(container, this._popupContainer, this._bodyElement);
    filmPresenter.init(film);
  }

  _renderFilms() {
    this._films.forEach((el) => {
      this._renderFilm(el, this._filmListComponent.getElement().querySelector(`.films-list__container`));
    });

    getExtraFilms(this._films, `rating`).forEach((el) => {
      this._renderFilm(el, this._filmListTopComponent.getElement().querySelector(`.films-list__container`));
    });

    getExtraFilms(this._films, `comments`).forEach((el) => {
      this._renderFilm(el, this._filmListCommentedComponent.getElement().querySelector(`.films-list__container`));
    });
  }

  _renderShowMore() {
    render(this._filmListComponent, this._showMoreComponent, RenderPosition.BEFOREEND);
  }

  _renderFilmList() {
    this._filmListComponent = new FilmList(this._films.length);
    render(this._filmsWrapperComponent, this._filmListComponent, RenderPosition.BEFOREEND);
  }

  _renderFilmListTop() {
    render(this._filmsWrapperComponent, this._filmListTopComponent, RenderPosition.BEFOREEND);
  }

  _renderFilmListCommented() {
    render(this._filmsWrapperComponent, this._filmListCommentedComponent, RenderPosition.BEFOREEND);
  }
}
