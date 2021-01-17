import {TITLES, POSTERS, DIRECTORS, WRITERS, ACTORS, DESCRIPTION, MIN_PINS, MAX_PINS, MAX_RATING, GENRES, COUNTRIES, AGE_RATINGS} from './const';
import {getRandomInteger, getRandomRating, generatePin, generateDescription, getRandomDate, getRandomArray, generateId} from '../utils/common.js';
import {generateComment} from './comment.js';

export const generateFilm = () => {
  return {
    id: generateId(),
    title: generatePin(TITLES),
    poster: generatePin(POSTERS),
    description: generateDescription(DESCRIPTION, MIN_PINS, MAX_PINS),
    director: generatePin(DIRECTORS),
    writers: getRandomArray(WRITERS),
    actors: getRandomArray(ACTORS),
    country: generatePin(COUNTRIES),
    comments: new Array(getRandomInteger(MIN_PINS, MAX_PINS)).fill().map(generateComment),
    release: getRandomDate(),
    rating: getRandomRating(0, MAX_RATING),
    genre: getRandomArray(GENRES),
    ageRating: generatePin(AGE_RATINGS),
    duration: getRandomInteger(70, 200),
    isInWatchlist: Boolean(getRandomInteger(0, 1)),
    isWatched: Boolean(getRandomInteger(0, 1)),
    isFavorite: Boolean(getRandomInteger(0, 1)),
    watchingDate: getRandomDate()
  };
};

