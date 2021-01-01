import Sort from '../view/sort/sort';
import FilmsWrapper from '../view/films-wrapper/films-wrapper';
import ShowMore from '../view/show-more/show-more';
import FilmList from '../view/list/list';
import FilmListTop from '../view/list-top/list-top';
import FilmListCommented from '../view/list-commented/list-commented';
import {render, RenderPosition, remove} from '../utils/render';
import {getExtraFilms, sortByDate, sortByRating} from '../utils/common';
import {CARD_COUNT_PER_STEP} from '../const';
import FilmPresenter from './film';
import {SortType, ExtraFilms} from '../const';

export default class Films {
  constructor(filmsContainer, popupContainer, bodyElement, films) {
    this._filmsContainer = filmsContainer;
    this._popupContainer = popupContainer;
    this._bodyElement = bodyElement;
    this._renderedFilmCount = CARD_COUNT_PER_STEP;
    this._filmPresenters = [];
    this._currentSortType = SortType.DEFAULT;

    this._films = films.slice();
    this._sourcedFilms = films.slice();

    this._filmsWrapperComponent = new FilmsWrapper();
    this._sortComponent = null;
    this._showMoreComponent = new ShowMore();
    this._filmListComponent = null;
    this._filmListTopComponent = new FilmListTop();
    this._filmListCommentedComponent = new FilmListCommented();

    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._setActiveFilm = this._setActiveFilm.bind(this);
    this._onShowMoreClick = this._onShowMoreClick.bind(this);
    this._activeFilm = null;
  }

  init() {
    render(
        this._filmsContainer,
        this._filmsWrapperComponent,
        RenderPosition.BEFOREEND
    );

    this._renderFilmList();

    if (this._films.length) {
      this._renderSort();
      this._renderFilmListTop();
      this._renderFilmListCommented();
      this._renderFilms(0, Math.min(this._films.length, CARD_COUNT_PER_STEP));
      if (this._films.length > CARD_COUNT_PER_STEP) {
        this._renderShowMore();
      }
      this._renderExtraFilm();
    }
  }

  _sortFilms(sortType) {
    switch (sortType) {
      case SortType.DATE:
        this._films.sort(sortByDate);
        this._currentSortType = SortType.DATE;
        break;
      case SortType.RATING:
        this._films.sort(sortByRating);
        this._currentSortType = SortType.RATING;
        break;
      default:
        this._films = this._sourcedFilms.slice();
        this._currentSortType = SortType.DEFAULT;
    }
  }

  _onSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._sortFilms(sortType);
    remove(this._sortComponent);
    this._renderSort();
    this._clearFilms();
    this._renderFilms(0, this._renderedFilmCount);
    this._renderExtraFilm();
  }

  _renderSort() {
    this._sortComponent = new Sort(this._currentSortType);
    render(
        this._filmsWrapperComponent,
        this._sortComponent,
        RenderPosition.BEFOREBEGIN
    );
    this._sortComponent.setOnSortTypeChange(this._onSortTypeChange);
  }

  _setActiveFilm(component) {
    if (this._activeFilm) {
      remove(this._activeFilm);
    }
    this._activeFilm = component;
  }

  _renderFilm(film, container) {
    const filmPresenter = new FilmPresenter(
        container,
        this._popupContainer,
        this._bodyElement,
        this._setActiveFilm
    );
    filmPresenter.init(film);
    this._filmPresenters.push(filmPresenter);
  }

  _renderFilms(from, to) {
    this._films
      .slice(from, to)
      .forEach((el) => {
        this._renderFilm(
            el,
            this._filmListComponent
            .getElement()
            .querySelector(`.films-list__container`)
        );
      });
  }

  _renderExtraFilm() {
    getExtraFilms(this._films, ExtraFilms.RATING).forEach((el) => {
      this._renderFilm(
          el,
          this._filmListTopComponent
          .getElement()
          .querySelector(`.films-list__container`)
      );
    });

    getExtraFilms(this._films, ExtraFilms.COMMENTS).forEach((el) => {
      this._renderFilm(
          el,
          this._filmListCommentedComponent
          .getElement()
          .querySelector(`.films-list__container`)
      );
    });
  }

  _renderShowMore() {
    render(
        this._filmListComponent,
        this._showMoreComponent,
        RenderPosition.BEFOREEND
    );
    this._showMoreComponent.setOnShowMoreClick(this._onShowMoreClick);
  }

  _onShowMoreClick() {
    this._renderFilms(this._renderedFilmCount, this._renderedFilmCount + CARD_COUNT_PER_STEP);
    this._renderedFilmCount += CARD_COUNT_PER_STEP;

    if (this._renderedFilmCount >= this._films.length) {
      remove(this._showMoreComponent);
    }
  }

  _renderFilmList() {
    this._filmListComponent = new FilmList(this._films.length);
    render(
        this._filmsWrapperComponent,
        this._filmListComponent,
        RenderPosition.BEFOREEND
    );
  }

  _renderFilmListTop() {
    render(
        this._filmsWrapperComponent,
        this._filmListTopComponent,
        RenderPosition.BEFOREEND
    );
  }

  _renderFilmListCommented() {
    render(
        this._filmsWrapperComponent,
        this._filmListCommentedComponent,
        RenderPosition.BEFOREEND
    );
  }

  _clearFilms() {
    this._filmPresenters.forEach((presenter) => presenter.destroy());
    this._filmPresenters = [];
  }
}
