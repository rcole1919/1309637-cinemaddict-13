import {GENRES} from './const';
import {getRandomInteger, generatePin, getRank} from '../utils/common';

export const generateUser = () => {
  const watched = getRandomInteger(0, 30);

  return {
    watched,
    rank: getRank(watched),
    avatar: `bitmap`,
    topGenre: generatePin(GENRES)
  };
};
