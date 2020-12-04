import dayjs from 'dayjs';
import {MIN_PINS} from './mock/const.js';
import {MAX_PINS} from './mock/const.js';

export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
  BEFOREBEGIN: `beforebegin`,
  AFTEREND: `afterend`
};

export const render = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
    case RenderPosition.BEFOREBEGIN:
      container.before(element);
      break;
    case RenderPosition.AFTEREND:
      container.after(element);
      break;
  }
};

export const renderTemplate = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

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
