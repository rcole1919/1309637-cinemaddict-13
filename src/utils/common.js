import dayjs from 'dayjs';
import {CARD_EXTRA_COUNT, RankType} from '../const';

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
    case num >= 1 && num <= 10:
      return RankType.NOVICE;
    case num >= 11 && num <= 20:
      return RankType.FAN;
    case num >= 21:
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
  if (evt.ctrlKey && evt.key === `Enter`) {
    evt.preventDefault();
    cb();
  }
};

export const getExtraFilms = (arr, field) => {
  const extraFilms = arr.slice()
  .sort((a, b) => {
    let x = a[field];
    let y = b[field];
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
  let a = filmA.rating;
  let b = filmB.rating;
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
    let allGenres = [];
    films.forEach((el) => {
      allGenres.push(...el.genre);
    });

    let genreKeys = Array.from(new Set(allGenres));

    let genresLength = [];

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
  let allGenres = [];
  films.forEach((el) => {
    allGenres.push(...el.genre);
  });
  let genreKeys = Array.from(new Set(allGenres));
  let genresLength = [];

  genreKeys.forEach((el) => {
    genresLength.push({
      genre: el,
      num: allGenres.filter((item) => item === el).length
    });
  });

  genresLength
    .sort((a, b) => a.num - b.num)
    .reverse();

  let chartLabels = [];
  genresLength.forEach((el) => {
    chartLabels.push(el.genre);
  });
  let chartData = [];
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
