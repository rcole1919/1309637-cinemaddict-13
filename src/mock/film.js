import {TITLES} from './const.js';
import {POSTERS} from './const.js';
import {DIRECTORS} from './const.js';
import {WRITERS} from './const.js';
import {ACTORS} from './const.js';
import {DESCRIPTION} from './const.js';
import {MIN_PINS} from './const.js';
import {MAX_PINS} from './const.js';
import {MAX_RATING} from './const.js';
import {GENRES} from './const.js';
import {COUNTRIES} from './const.js';
import {AGE_RATINGS} from './const.js';
import {getRandomInteger} from '../utils/common.js';
import {getRandomRating} from '../utils/common.js';
import {generatePin} from '../utils/common.js';
import {generateDescription} from '../utils/common.js';
import {getRandomDate} from '../utils/common.js';
import {getRandomArray} from '../utils/common.js';
import {generateComment} from './comment.js';

export const generateFilm = () => {
  return {
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
    duration: `${getRandomInteger(0, 4)}h ${getRandomInteger(0, 59)}m`,
    isInWatchlist: Boolean(getRandomInteger(0, 1)),
    isWatched: Boolean(getRandomInteger(0, 1)),
    isFavorite: Boolean(getRandomInteger(0, 1))
  };
};

