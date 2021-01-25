import dayjs from 'dayjs';
import {FilterType, StatFilterType} from '../const';

export const filter = {
  [FilterType.ALL]: (films) => films,
  [FilterType.WATCHLIST]: (films) => films.filter((film) => film.isInWatchlist),
  [FilterType.HISTORY]: (films) => films.filter((film) => film.isWatched),
  [FilterType.FAVORITES]: (films) => films.filter((film) => film.isFavorite)
};

export const getFiltredWatchedFilms = (films, currentFilter) => {
  const now = dayjs();
  switch (currentFilter) {
    case StatFilterType.TODAY:
      return films.filter((film) => dayjs(film.watchingDate).isAfter(now.subtract(1, `day`)));
    case StatFilterType.WEEK:
      return films.filter((film) => dayjs(film.watchingDate).isAfter(now.subtract(1, `week`)));
    case StatFilterType.MONTH:
      return films.filter((film) => dayjs(film.watchingDate).isAfter(now.subtract(1, `month`)));
    case StatFilterType.YEAR:
      return films.filter((film) => dayjs(film.watchingDate).isAfter(now.subtract(1, `year`)));
    default:
      return films;
  }
};
