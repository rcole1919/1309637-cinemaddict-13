import Sort from '../view/sort/sort';
import Rank from '../view/rank/rank';
import FilmsWrapper from '../view/films-wrapper/films-wrapper';
import StatWrapper from '../view/stat-wrapper/stat-wrapper';
import ShowMore from '../view/show-more/show-more';
import FilmList from '../view/list/list';
import Stat from '../view/stat/stat';
import StatButton from '../view/stat-button/stat-button';
import StatFilter from '../view/stat-filter/stat-filter';
import FilmListTop from '../view/list-top/list-top';
import FilmListCommented from '../view/list-commented/list-commented';
import {render, RenderPosition, remove} from '../utils/render';
import {getExtraFilms, sortByDate, sortByRating} from '../utils/common';
import {CARD_COUNT_PER_STEP} from '../const';
import FilmPresenter from './film';
import {SortType, FilterType, ExtraFilms, UserAction, UpdateType, ViewStateType, StatFilterType} from '../const';
import {filter} from '../utils/filter';
import Filter from '../view/filter/filter';

export default class Films {
  constructor(rankContainer, filmsContainer, popupContainer, navContainer, bodyElement, filmsModel) {
    this._filmsContainer = filmsContainer;
    this._rankContainer = rankContainer;
    this._popupContainer = popupContainer;
    this._navContainer = navContainer;
    this._bodyElement = bodyElement;
    this._renderedFilmCount = CARD_COUNT_PER_STEP;
    this._filmPresenters = [];
    this._currentViewStateType = ViewStateType.FILMS;
    this._currentSortType = SortType.DEFAULT;
    this._currentFilterType = FilterType.ALL;
    this._currentStatFilterType = StatFilterType.ALL_TIME;
    this._activeFilm = null;

    this._filmsModel = filmsModel;

    this._filmsWrapperComponent = new FilmsWrapper();
    this._sortComponent = null;
    this._filterComponent = null;
    this._showMoreComponent = new ShowMore();
    this._filmListComponent = null;
    this._filmListTopComponent = new FilmListTop();
    this._filmListCommentedComponent = new FilmListCommented();
    this._statWrapperComponent = new StatWrapper();
    this._statButtonComponent = null;
    this._statFilterComponent = null;
    this._statComponent = null;
    this._rankComponent = null;

    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onFilterTypeChange = this._onFilterTypeChange.bind(this);
    this._onStatFilterChange = this._onStatFilterChange.bind(this);
    this._setActiveFilm = this._setActiveFilm.bind(this);
    this._onShowMoreClick = this._onShowMoreClick.bind(this);
    this._onStatButtonClick = this._onStatButtonClick.bind(this);
    this._onViewAction = this._onViewAction.bind(this);
    this._onModelEvent = this._onModelEvent.bind(this);

    this._onFilmListUpdate = this._onFilmListUpdate.bind(this);

    this._filmsModel.addObserver(this._onModelEvent);
  }

  init() {
    render(
        this._filmsContainer,
        this._filmsWrapperComponent,
        RenderPosition.BEFOREEND
    );

    render(
        this._filmsContainer,
        this._statWrapperComponent,
        RenderPosition.BEFOREEND
    );

    this._renderRank();

    this._renderFilter();
    this._renderStatButton();

    this._showFilms();

    this._renderFilmList();

    if (this._getFilms().length) {
      this._renderSort();
      this._renderFilmListTop();
      this._renderFilmListCommented();
      this._renderFilms(0, Math.min(this._getFilms().length, CARD_COUNT_PER_STEP));
      if (this._getFilms().length > CARD_COUNT_PER_STEP) {
        this._renderShowMore();
      }
      this._renderExtraFilm();
    }
  }

  _getFilms() {
    const filterType = this._currentFilterType;
    const films = this._filmsModel.getFilms();
    const filtredFilms = filter[filterType](films);

    switch (this._currentSortType) {
      case SortType.DATE:
        return filtredFilms.slice().sort(sortByDate);
      case SortType.RATING:
        return filtredFilms.slice().sort(sortByRating);
      default:
        return filtredFilms;
    }
  }

  _onViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.ADD_COMMENT:
        this._filmsModel.addComment(updateType, update);
        break;
      case UserAction.DELETE_COMMENT:
        this._filmsModel.deleteComment(updateType, update);
        break;
      default:
        return;
    }
  }

  _onModelEvent(updateType) {
    switch (updateType) {
      case UpdateType.PATCH:
        break;
      case UpdateType.MINOR:
        break;
      case UpdateType.MAJOR:
        this._onFilmListUpdate();
    }
  }

  _onSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
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
        RenderPosition.AFTERBEGIN
    );
    this._sortComponent.setOnSortTypeChange(this._onSortTypeChange);
  }

  _onFilterTypeChange(filterType) {
    if (this._currentFilterType === filterType && this._currentViewStateType === ViewStateType.FILMS) {
      return;
    }

    this._showFilms();
    this._currentFilterType = filterType;
    remove(this._filterComponent);
    this._renderFilter();

    this._clearFilms();
    this._renderedFilmCount = CARD_COUNT_PER_STEP;
    this._renderFilms(0, Math.min(this._getFilms().length, CARD_COUNT_PER_STEP));
    remove(this._showMoreComponent);
    if (this._getFilms().length > CARD_COUNT_PER_STEP) {
      this._renderShowMore();
    }
    this._renderExtraFilm();
  }

  _renderFilter() {
    const filters = this._getFilters();
    this._filterComponent = new Filter(filters, this._currentFilterType, this._currentViewStateType);

    render(
        this._navContainer,
        this._filterComponent,
        RenderPosition.AFTERBEGIN
    );

    this._filterComponent.setOnFilterTypeChange(this._onFilterTypeChange);
  }

  _getFilters() {
    const films = this._filmsModel.getFilms();

    return [
      {
        type: FilterType.ALL,
        name: `All movies`,
        count: filter[FilterType.ALL](films).length
      },
      {
        type: FilterType.WATCHLIST,
        name: `Watchlist`,
        count: filter[FilterType.WATCHLIST](films).length
      },
      {
        type: FilterType.HISTORY,
        name: `History`,
        count: filter[FilterType.HISTORY](films).length
      },
      {
        type: FilterType.FAVORITES,
        name: `Favorites`,
        count: filter[FilterType.FAVORITES](films).length
      }
    ];
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
        this._setActiveFilm,
        this._onFilmListUpdate,
        this._onViewAction
    );
    filmPresenter.init(film);
    this._filmPresenters.push(filmPresenter);
  }

  _renderFilms(from, to) {
    this._getFilms()
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
    getExtraFilms(this._getFilms(), ExtraFilms.RATING).forEach((el) => {
      this._renderFilm(
          el,
          this._filmListTopComponent
          .getElement()
          .querySelector(`.films-list__container`)
      );
    });

    getExtraFilms(this._getFilms(), ExtraFilms.COMMENTS).forEach((el) => {
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

    if (this._renderedFilmCount >= this._getFilms().length) {
      remove(this._showMoreComponent);
    }
  }

  _renderFilmList() {
    this._filmListComponent = new FilmList(this._getFilms().length);
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

  _onFilmListUpdate() {
    remove(this._filterComponent);
    this._renderFilter();
    this._clearFilms();
    this._renderFilms(0, this._renderedFilmCount);
    this._renderExtraFilm();
    remove(this._showMoreComponent);
    if (this._getFilms().length > CARD_COUNT_PER_STEP) {
      this._renderShowMore();
    }
    remove(this._rankComponent);
    this._renderRank();
  }

  _renderStatButton() {
    this._statButtonComponent = new StatButton(this._currentViewStateType);
    render(
        this._navContainer,
        this._statButtonComponent,
        RenderPosition.BEFOREEND
    );

    this._statButtonComponent.setOnStatButtonClick(this._onStatButtonClick);
  }

  _onStatFilterChange(statFilterType) {
    if (this._currentStatFilterType === statFilterType) {
      return;
    }

    this._currentStatFilterType = statFilterType;
    remove(this._statComponent);
    this._renderStat();
  }

  _renderStatFilter() {
    const watchedFilms = this._getFilms().filter((film) => film.isWatched);
    this._statFilterComponent = new StatFilter(watchedFilms, this._currentStatFilterType);
    render(
        this._statWrapperComponent,
        this._statFilterComponent,
        RenderPosition.AFTERBEGIN
    );

    this._statFilterComponent.setOnStatFilterChange(this._onStatFilterChange);
  }

  _renderStat() {
    const watchedFilms = this._getFilms().filter((film) => film.isWatched);
    this._statComponent = new Stat(watchedFilms, this._currentStatFilterType);
    render(
        this._statWrapperComponent,
        this._statComponent,
        RenderPosition.BEFOREEND
    );
  }

  _onStatButtonClick() {
    this._showStats();
  }

  _showFilms() {
    if (this._currentViewStateType === ViewStateType.FILMS) {
      return;
    }
    this._filmsWrapperComponent.showElement();
    this._statWrapperComponent.hideElement();
    this._currentViewStateType = ViewStateType.FILMS;
    this._currentStatFilterType = StatFilterType.ALL_TIME;
    remove(this._statButtonComponent);
    this._renderStatButton();
    remove(this._statComponent);
    remove(this._statFilterComponent);
  }

  _showStats() {
    if (this._currentViewStateType === ViewStateType.STATS) {
      return;
    }
    this._filmsWrapperComponent.hideElement();
    this._statWrapperComponent.showElement();
    this._currentViewStateType = ViewStateType.STATS;
    this._currentSortType = SortType.DEFAULT;
    remove(this._sortComponent);
    this._renderSort();
    remove(this._statButtonComponent);
    this._renderStatButton();
    remove(this._filterComponent);
    this._renderFilter();
    this._renderStatFilter();
    this._renderStat();
  }

  _renderRank() {
    this._rankComponent = new Rank(this._getFilms());

    render(
        this._rankContainer,
        this._rankComponent,
        RenderPosition.BEFOREEND
    );
  }
}
