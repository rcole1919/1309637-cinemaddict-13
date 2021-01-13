import {EMOJI, WRITERS, MESSAGES} from './const';
import {generatePin, getRandomDate, generateId} from '../utils/common';

export const generateComment = () => {
  return {
    id: generateId(),
    message: generatePin(MESSAGES),
    author: generatePin(WRITERS),
    date: getRandomDate(),
    emoji: generatePin(EMOJI)
  };
};
