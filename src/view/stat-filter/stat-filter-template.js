import {getRank} from '../../utils/common';
import {StatFilterType} from '../../const';

export const createStatFilterTemplate = (watchedFilms, currentStatFilterType) => {
  const rank = getRank(watchedFilms.length);

  return `<div>
    <p class="statistic__rank">
      Your rank
      <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
      <span class="statistic__rank-label">${rank}</span>
    </p>

    <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
      <p class="statistic__filters-description">Show stats:</p>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-all-time" value="all-time"${currentStatFilterType === StatFilterType.ALL_TIME ? ` checked` : ``}>
      <label for="statistic-all-time" class="statistic__filters-label">All time</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-today" value="today"${currentStatFilterType === StatFilterType.TODAY ? ` checked` : ``}>
      <label for="statistic-today" class="statistic__filters-label">Today</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-week" value="week"${currentStatFilterType === StatFilterType.WEEK ? ` checked` : ``}>
      <label for="statistic-week" class="statistic__filters-label">Week</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-month" value="month"${currentStatFilterType === StatFilterType.MONTH ? ` checked` : ``}>
      <label for="statistic-month" class="statistic__filters-label">Month</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-year" value="year"${currentStatFilterType === StatFilterType.YEAR ? ` checked` : ``}>
      <label for="statistic-year" class="statistic__filters-label">Year</label>
    </form>
  </div>`;
};
