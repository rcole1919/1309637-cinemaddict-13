import Observer from "../utils/observer";

export default class Films extends Observer {
  constructor() {
    super();
    this._films = [];
  }

  setFilms(films) {
    this._films = films.slice();
  }

  getFilms() {
    return this._films;
  }

  addComment(updateType, update) {
    const filmIndex = this._films.findIndex((film) => film.id === update.filmId);

    this._films[filmIndex].comments = [
      ...this._films[filmIndex].comments,
      update.comment
    ];

    this._notify(updateType, update);
  }

  deleteComment(updateType, update) {
    const filmIndex = this._films.findIndex((film) => film.id === update.filmId);

    const commentIndex = this._films[filmIndex].comments.findIndex((comment) => comment.id === update.commentId);

    if (commentIndex === -1) {
      throw new Error(`Can't delete unexisting comment`);
    }

    this._films[filmIndex].comments = [
      ...this._films[filmIndex].comments.slice(0, commentIndex),
      ...this._films[filmIndex].comments.slice(commentIndex + 1)
    ];

    this._notify(updateType);
  }
}
