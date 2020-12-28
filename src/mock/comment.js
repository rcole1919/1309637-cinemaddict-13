import {EMOJI, WRITERS, MESSAGES} from './const';
import {generatePin, getRandomDate} from '../utils/common';

export const generateComment = () => {
  return {
    message: generatePin(MESSAGES),
    author: generatePin(WRITERS),
    date: getRandomDate(),
    emoji: generatePin(EMOJI)
  };
};
