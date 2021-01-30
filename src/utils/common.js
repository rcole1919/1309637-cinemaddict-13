import dayjs from 'dayjs';
import {
  CARD_EXTRA_COUNT,
  NOVICE_FILM_COUNT,
  FAN_FILM_COUNT,
  RankType
} from '../const';

export const getFilmDuration = (min) => {
  const hoursValue = Math.floor(min / 60);
  const minValue = min % 60;

  return {
    hours: hoursValue,
    min: minValue
  };
};

export const getRank = (num) => {
  switch (true) {
    case num > 0 && num <= NOVICE_FILM_COUNT:
      return RankType.NOVICE;
    case num > NOVICE_FILM_COUNT && num <= FAN_FILM_COUNT:
      return RankType.FAN;
    case num > FAN_FILM_COUNT:
      return RankType.MOVIE_BUFF;
    default:
      return RankType.NONE;
  }
};

export const onEscKeyDown = (evt, cb) => {
  if (evt.key === `Escape` || evt.key === `Esc`) {
    evt.preventDefault();
    cb();
  }
};

export const onCtrlEnterDown = (evt, cb) => {
  if ((evt.ctrlKey || evt.metaKey) && evt.key === `Enter`) {
    evt.preventDefault();
    cb();
  }
};

export const getExtraFilms = (arr, field) => {
  const extraFilms = arr.slice()
  .sort((a, b) => {
    const x = a[field];
    const y = b[field];
    if (x > y) {
      return -1;
    }
    if (x < y) {
      return 1;
    }
    return 0;
  })
  .slice(0, CARD_EXTRA_COUNT);


  return extraFilms;
};

export const sortByDate = (filmA, filmB) => {
  return dayjs(filmB.release).diff(dayjs(filmA.release));
};

export const sortByRating = (filmA, filmB) => {
  const a = filmA.rating;
  const b = filmB.rating;
  if (a > b) {
    return -1;
  }
  if (a < b) {
    return 1;
  }
  return 0;
};

export const getTopGenre = (films) => {
  if (films.length !== 0) {
    const allGenres = [];
    films.forEach((el) => {
      allGenres.push(...el.genre);
    });

    const genreKeys = Array.from(new Set(allGenres));

    const genresLength = [];

    genreKeys.forEach((el) => {
      genresLength.push({
        genre: el,
        num: allGenres.filter((item) => item === el).length
      });
    });

    return genresLength.sort((a, b) => a.num - b.num)[genresLength.length - 1].genre;
  }
  return ``;
};

export const getChartData = (films) => {
  const allGenres = [];
  films.forEach((el) => {
    allGenres.push(...el.genre);
  });
  const genreKeys = Array.from(new Set(allGenres));
  const genresLength = [];

  genreKeys.forEach((el) => {
    genresLength.push({
      genre: el,
      num: allGenres.filter((item) => item === el).length
    });
  });

  genresLength
    .sort((a, b) => a.num - b.num)
    .reverse();

  const chartLabels = [];
  genresLength.forEach((el) => {
    chartLabels.push(el.genre);
  });
  const chartData = [];
  genresLength.forEach((el) => {
    chartData.push(el.num);
  });
  return {
    labels: chartLabels,
    data: chartData
  };
};

export const isOnline = () => {
  return window.navigator.onLine;
};
