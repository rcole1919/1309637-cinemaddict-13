import dayjs from 'dayjs';
import {MIN_PINS, MAX_PINS} from '../mock/const';
import {CARD_EXTRA_COUNT} from '../const';

export const generateId = () => Date.now() + parseInt(Math.random() * 10000, 10);

export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
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
  return dayjs(Math.random() * (dayjs() - dayjs(`01/01/1900`)) + dayjs(`01/01/1900`));
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
      return `novice`;
    case num >= 11 && num <= 20:
      return `fan`;
    case num >= 21:
      return `movie buff`;
    default:
      return ``;
  }
};

export const onEscKeyDown = (evt, cb) => {
  if (evt.key === `Escape` || evt.key === `Esc`) {
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
