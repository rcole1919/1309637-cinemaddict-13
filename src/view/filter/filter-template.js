const createFilterItemTemplate = (filter, currentFilterType) => {
  const {type, name, count} = filter;

  return (
    `<a href="#${type}" data-filter="${type}" class="main-navigation__item${type === currentFilterType ? ` main-navigation__item--active` : ``}">${name} ${type === `all` ? `` : `<span class="main-navigation__item-count">${count}</span>`}</a>`
  );
};

export const createFilterTemplate = (filterItems, currentFilterType) => {
  const filterItemsTemplate = filterItems
    .map((filter) => createFilterItemTemplate(filter, currentFilterType))
    .join(``);

  return `<div class="main-navigation__items">
      ${filterItemsTemplate}
    </div>`;
};
