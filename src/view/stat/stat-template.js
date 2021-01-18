import {getFilmDuration, getTopGenre} from '../../utils/common';
import {getFiltredWatchedFilms} from '../../utils/filter';

export const createStatTemplate = (watchedFilms, currentStatFilterType) => {
  const filtredWatchedFilms = getFiltredWatchedFilms(watchedFilms, currentStatFilterType);
  const initValue = 0;
  const totalMinDuration = filtredWatchedFilms.reduce((a, b) => a + b.duration, initValue);
  const totalDuration = getFilmDuration(totalMinDuration);
  return `<div>
    <ul class="statistic__text-list">
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">You watched</h4>
        <p class="statistic__item-text">${filtredWatchedFilms.length} <span class="statistic__item-description">movies</span></p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Total duration</h4>
        <p class="statistic__item-text">${totalDuration.hours !== 0 ? `${totalDuration.hours} <span class="statistic__item-description">h</span>` : ``} ${totalDuration.min.toString().length === 1 ? `0${totalDuration.min}` : totalDuration.min} <span class="statistic__item-description">m</span></p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Top genre</h4>
        <p class="statistic__item-text">${getTopGenre(filtredWatchedFilms)}</p>
      </li>
    </ul>

    <div class="statistic__chart-wrap">
      <canvas class="statistic__chart" width="1000"></canvas>
    </div>
  </div>`;
};
