import {CARD_COUNT} from './mock/const.js';
import Rank from './view/rank.js';
import SiteMenuView from './view/site-menu.js';
import FilmsContainer from './view/films-container.js';
import FilmCard from './view/film-card.js';
import ShowMore from './view/show-more.js';
import Comment from './view/comment.js';
import {generateFilm} from './mock/film.js';
import {generateUser} from './mock/user.js';
import Popup from './view/popup.js';
import FilmNumber from './view/film-number.js';
import FilmList from './view/list.js';
import FilmListTop from './view/list-top.js';
import FilmListCommented from './view/list-commented.js';
// import Stat from './view/stat.js';
import Sort from './view/sort.js';
import {render, remove, RenderPosition} from './utils/render.js';
import {onEscKeyDown, getExtraFilms} from './utils/common.js';

const films = new Array(CARD_COUNT).fill().map(generateFilm);

const topFilms = getExtraFilms(films, `rating`);

const popularFilms = getExtraFilms(films, `comments`);

const user = generateUser();

const bodyElement = document.querySelector(`body`);
const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);
const footerStatisticsElement = siteFooterElement.querySelector(`.footer__statistics`);

render(siteHeaderElement, new Rank(user), RenderPosition.BEFOREEND);

render(siteMainElement, new SiteMenuView(), RenderPosition.AFTERBEGIN);

render(siteMainElement, new FilmsContainer(), RenderPosition.BEFOREEND);

const filmsElement = document.querySelector(`.films`);

render(filmsElement, new FilmList(films.length), RenderPosition.BEFOREEND);

if (films.length) {
  render(filmsElement, new Sort(), RenderPosition.BEFOREBEGIN);

  render(filmsElement, new FilmListTop(), RenderPosition.BEFOREEND);
  render(filmsElement, new FilmListCommented(), RenderPosition.BEFOREEND);

  const filmslistElements = filmsElement.querySelectorAll(`.films-list`);
  const filmsAllContainer = filmslistElements[0].querySelector(`.films-list__container`);
  const filmsTopContainer = filmslistElements[1].querySelector(`.films-list__container`);
  const filmsPopularContainer = filmslistElements[2].querySelector(`.films-list__container`);

  const renderPopup = (film) => {
    const popupComponent = new Popup(film);

    render(bodyElement, popupComponent, RenderPosition.BEFOREEND);

    const commentListElement = popupComponent.getElement().querySelector(`.film-details__comments-list`);

    film.comments.forEach((el) => {
      render(commentListElement, new Comment(el), RenderPosition.BEFOREEND);
    });

    bodyElement.classList.add(`hide-overflow`);

    const onPopupClose = () => {
      popupComponent.setRemoveCloseClickHandler(onPopupClose);
      remove(popupComponent);
      bodyElement.classList.remove(`hide-overflow`);
    };

    const onPopupPressEsc = (evt) => {
      onEscKeyDown(evt, onPopupClose);
      document.removeEventListener(`keydown`, onPopupPressEsc);
    };

    popupComponent.setCloseClickHandler(onPopupClose);
    document.addEventListener(`keydown`, onPopupPressEsc);
  };

  const renderFilm = (filmsContainer, film) => {
    const filmComponent = new FilmCard(film);

    filmComponent.setShowClickHandler(() => {
      renderPopup(film);
    });

    render(filmsContainer, filmComponent, RenderPosition.BEFOREEND);
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

  render(filmslistElements[0], new ShowMore(), RenderPosition.BEFOREEND);
}

render(footerStatisticsElement, new FilmNumber(films.length), RenderPosition.BEFOREEND);

