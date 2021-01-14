import {createFilmListCommentedTemplate} from './list-commented-template';
import AbstractView from '../abstract';

export default class FilmListCommented extends AbstractView {
  getTemplate() {
    return createFilmListCommentedTemplate();
  }
}
