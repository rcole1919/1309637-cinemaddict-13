import {CARD_EXTRA_COUNT} from './const.js';
import {CARD_COUNT} from './mock/const.js';
import Rank from './view/rank.js';
import SiteMenuView from './view/site-menu.js';
import FilmsContainer from './view/films-container.js';
import FilmCard from './view/film-card.js';
import ShowMore from './view/show-more.js';
import Comment from './view/comment-template.js';
import {generateFilm} from './mock/film.js';
import {generateUser} from './mock/user.js';
import Popup from './view/popup.js';
import FilmNumber from './view/film-number.js';
import FilmList from './view/list.js';
import FilmListTop from './view/list-top.js';
import FilmListCommented from './view/list-commented.js';
// import Stat from './view/stat.js';
import Sort from './view/sort.js';
import {render, RenderPosition, onEscKeyDown} from './utils.js';

const films = new Array(CARD_COUNT).fill().map(generateFilm);

const topFilms = films
  .slice()
  .sort((a, b) => {
    if (a.rating > b.rating) {
      return -1;
    }
    if (a.rating < b.rating) {
      return 1;
    }
    return 0;
  })
  .slice(0, CARD_EXTRA_COUNT);

const popularFilms = films
  .slice()
  .sort((a, b) => {
    if (a.comments.length > b.comments.length) {
      return -1;
    }
    if (a.comments.length < b.comments.length) {
      return 1;
    }
    return 0;
  })
  .slice(0, CARD_EXTRA_COUNT);

const user = generateUser();

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);
const footerStatisticsElement = siteFooterElement.querySelector(`.footer__statistics`);

render(siteHeaderElement, new Rank(user).getElement(), RenderPosition.BEFOREEND);

render(siteMainElement, new SiteMenuView().getElement(), RenderPosition.AFTERBEGIN);

render(siteMainElement, new FilmsContainer().getElement(), RenderPosition.BEFOREEND);

const filmsElement = document.querySelector(`.films`);

render(filmsElement, new FilmList(films.length).getElement(), RenderPosition.BEFOREEND);

if (films.length) {
  render(filmsElement, new Sort().getElement(), RenderPosition.BEFOREBEGIN);

  render(filmsElement, new FilmListTop().getElement(), RenderPosition.BEFOREEND);
  render(filmsElement, new FilmListCommented().getElement(), RenderPosition.BEFOREEND);

  const filmslistElements = filmsElement.querySelectorAll(`.films-list`);
  const filmsAllContainer = filmslistElements[0].querySelector(`.films-list__container`);
  const filmsTopContainer = filmslistElements[1].querySelector(`.films-list__container`);
  const filmsPopularContainer = filmslistElements[2].querySelector(`.films-list__container`);

  const renderPopup = (film) => {
    const popupComponent = new Popup(film);

    render(siteFooterElement, popupComponent.getElement(), RenderPosition.AFTEREND);

    const commentListElement = popupComponent.getElement().querySelector(`.film-details__comments-list`);

    film.comments.forEach((el) => {
      render(commentListElement, new Comment(el).getElement(), RenderPosition.BEFOREEND);
    });

    document.querySelector(`body`).classList.add(`hide-overflow`);

    const onPopupClose = () => {
      popupComponent.getElement().querySelector(`.film-details__close-btn`).removeEventListener(`click`, onPopupClose);
      popupComponent.getElement().remove();
      document.querySelector(`body`).classList.remove(`hide-overflow`);
    };

    const onPopupPressEsc = (evt) => {
      onEscKeyDown(evt, onPopupClose);
      document.removeEventListener(`keydown`, onPopupPressEsc);
    };

    popupComponent.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, onPopupClose);
    document.addEventListener(`keydown`, onPopupPressEsc);
  };

  const renderFilm = (filmsContainer, film) => {
    const filmComponent = new FilmCard(film);

    filmComponent.getElement().querySelector(`.film-card__title`).addEventListener(`click`, () => {
      renderPopup(film);
    });
    filmComponent.getElement().querySelector(`.film-card__poster`).addEventListener(`click`, () => {
      renderPopup(film);
    });
    filmComponent.getElement().querySelector(`.film-card__comments`).addEventListener(`click`, () => {
      renderPopup(film);
    });

    render(filmsContainer, filmComponent.getElement(), RenderPosition.BEFOREEND);
  };

  films.forEach((el) => {
    renderFilm(filmsAllContainer, el);
  });

  topFilms.forEach((el) => {
    renderFilm(filmsTopContainer, el);
  });

  popularFilms.forEach((el) => {
    renderFilm(filmsPopularContainer, el);
  });

  render(filmslistElements[0], new ShowMore().getElement(), RenderPosition.BEFOREEND);
}

render(footerStatisticsElement, new FilmNumber(films.length).getElement(), RenderPosition.BEFOREEND);

