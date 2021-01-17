import {ViewStateType} from '../../const';

const createFilterItemTemplate = (filter, currentFilterType, currentViewStateType) => {
  const {type, name, count} = filter;

  return (
    `<a href="#${type}" data-filter="${type}" class="main-navigation__item${type === currentFilterType && currentViewStateType === ViewStateType.FILMS ? ` main-navigation__item--active` : ``}">${name} ${type === `all` ? `` : `<span class="main-navigation__item-count">${count}</span>`}</a>`
  );
};

export const createFilterTemplate = (filterItems, currentFilterType, currentViewStateType) => {
  const filterItemsTemplate = filterItems
    .map((filter) => createFilterItemTemplate(filter, currentFilterType, currentViewStateType))
    .join(``);

  return `<div class="main-navigation__items">
      ${filterItemsTemplate}
    </div>`;
};
