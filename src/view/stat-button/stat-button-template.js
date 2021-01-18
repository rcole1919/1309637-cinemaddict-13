import {ViewStateType} from '../../const';

export const createStatButtonTemplate = (viewStateType) => {
  return `<a href="#stats" class="main-navigation__additional${viewStateType === ViewStateType.STATS ? ` main-navigation__additional--active` : ``}">Stats</a>`;
};
