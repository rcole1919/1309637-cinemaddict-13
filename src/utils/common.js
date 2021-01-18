import dayjs from 'dayjs';
import {MIN_PINS, MAX_PINS} from '../mock/const';
import {CARD_EXTRA_COUNT, RankType} from '../const';

export const generateId = () => Date.now() + parseInt(Math.random() * 10000, 10);

export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getFilmDuration = (min) => {
  const hoursValue = Math.floor(min / 60);
  const minValue = min % 60;

  return {
    hours: hoursValue,
    min: minValue
  };
};

export const getRandomRating = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return (lower + Math.random() * (upper - lower)).toFixed(1);
};

export const generatePin = (array) => {
  const randomIndex = getRandomInteger(0, array.length - 1);

  return array[randomIndex];
};

export const generateDescription = (str, min, max) => {
  const sentences = str.split(`. `);
  const randomDescription = [];
  for (let i = 0; i < getRandomInteger(min, max); i++) {
    randomDescription.push(generatePin(sentences));
  }
  return randomDescription.join(`. `) + `.`;
};

export const getRandomDate = () => {
  return dayjs(Math.random() * (dayjs() - dayjs(`12/12/2019`)) + dayjs(`12/12/2019`));
};

export const getRandomArray = (array) => {
  let randomArray = [];
  for (let i = MIN_PINS; i <= getRandomInteger(MIN_PINS, MAX_PINS); i++) {
    randomArray.push(generatePin(array));
  }
  return randomArray;
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
