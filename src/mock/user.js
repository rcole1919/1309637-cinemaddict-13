import {GENRES} from './const.js';
import {getRandomInteger} from '../utils.js';
import {generatePin} from '../utils.js';
import {getRank} from '../utils.js';

export const generateUser = () => {
  const watched = getRandomInteger(0, 30);

  return {
    watched,
    rank: getRank(watched),
    avatar: `bitmap`,
    topGenre: generatePin(GENRES)
  };
};
