import {createfilmListCommentedTemplate} from './list-commented-template.js';
import AbstractView from './abstract.js';

export default class FilmListCommented extends AbstractView {
  getTemplate() {
    return createfilmListCommentedTemplate();
  }
}
