import {GENRES} from './const.js';
import {getRandomInteger} from '../utils/common.js';
import {generatePin} from '../utils/common.js';
import {getRank} from '../utils/common.js';

export const generateUser = () => {
  const watched = getRandomInteger(0, 30);

  return {
    watched,
    rank: getRank(watched),
    avatar: `bitmap`,
    topGenre: generatePin(GENRES)
  };
};
