import dayjs from 'dayjs';
import {FilterType, StatFilterType} from '../const';

export const filter = {
  [FilterType.ALL]: (films) => films,
  [FilterType.WATCHLIST]: (films) => films.filter((film) => film.isInWatchlist),
  [FilterType.HISTORY]: (films) => films.filter((film) => film.isWatched),
  [FilterType.FAVORITES]: (films) => films.filter((film) => film.isFavorite)
};

export const getFiltredWatchedFilms = (films, currentFilter) => {
  switch (currentFilter) {
    case StatFilterType.TODAY:
      return films.filter((film) => dayjs(film.watchingDate).format(`D M YYYY`) === dayjs().format(`D M YYYY`));
    case StatFilterType.WEEK:
      return films;
    case StatFilterType.MONTH:
      return films.filter((film) => dayjs(film.watchingDate).format(`M YYYY`) === dayjs().format(`M YYYY`));
    case StatFilterType.YEAR:
      return films.filter((film) => dayjs(film.watchingDate).year() === dayjs().year());
    default:
      return films;
  }
};
