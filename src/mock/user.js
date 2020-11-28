import {GENRES} from '../const.js';
import {getRandomInteger} from '../utils.js';
import {generatePin} from '../utils.js';

export const generateUser = () => {
  const watched = getRandomInteger(0, 30);

  const getRank = (num) => {
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

  const rank = getRank(watched);

  return {
    watched,
    rank,
    avatar: `bitmap`,
    topGenre: generatePin(GENRES)
  };
};
