import {MESSAGES} from './const.js';
import {EMOJI} from './const.js';
import {WRITERS} from './const.js';
import {generatePin} from '../utils.js';
import {getRandomDate} from '../utils.js';

export const generateComment = () => {
  return {
    message: generatePin(MESSAGES),
    author: generatePin(WRITERS),
    date: getRandomDate(),
    emoji: generatePin(EMOJI)
  };
};
