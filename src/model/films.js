import Observer from '../utils/observer';

export default class Films extends Observer {
  constructor() {
    super();
    this._films = [];
  }

  setFilms(updateType, films) {
    this._films = films.slice();

    this._notify(updateType);
  }

  getFilms() {
    return this._films;
  }

  updateFilm(updateType, update) {
    const index = this._films.findIndex((film) => film.id === update.id);

    if (index === -1) {
      throw new Error(`Can't update unexisting task`);
    }

    this._tasks = [
      ...this._films.slice(0, index),
      update,
      ...this._films.slice(index + 1)
    ];

    this._notify(updateType, update);
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

  static adaptFilmToClient(film) {
    const adaptedFilm = Object.assign(
        {},
        film,
        {
          id: film.id,
          title: film.film_info.title,
          poster: film.film_info.poster,
          description: film.film_info.description,
          director: film.film_info.director,
          writers: film.film_info.writers,
          actors: film.film_info.actors,
          country: film.film_info.release.release_country,
          comments: film.comments,
          release: film.film_info.release.date !== null ? new Date(film.film_info.release.date) : film.film_info.release.date,
          rating: film.film_info.total_rating,
          genre: film.film_info.genre,
          ageRating: film.film_info.age_rating,
          duration: film.film_info.runtime,
          isInWatchlist: film.user_details.watchlist,
          isWatched: film.user_details.already_watched,
          isFavorite: film.user_details.favorite,
          watchingDate: film.user_details.watching_date !== null ? new Date(film.user_details.watching_date) : film.user_details.watching_date
        }
    );

    return adaptedFilm;
  }

  static adaptCommentToClient(comment) {
    const adaptedComment = Object.assign(
        {},
        comment,
        {
          id: comment.id,
          message: comment.comment,
          date: comment.date !== null ? new Date(comment.date) : comment.date,
          emoji: comment.emotion
        }
    );

    delete adaptedComment.comment;
    delete adaptedComment.emotion;

    return adaptedComment;
  }

  static adaptFilmToServer(film) {
    const adaptedFilm = Object.assign(
        {},
        film,
        {
          "id": film.id,
          "comments": film.comments,
          "film_info": {
            "title": film.title,
            "alternative_title": film.title,
            "total_rating": film.rating,
            "poster": film.poster,
            "age_rating": film.ageRating,
            "director": film.director,
            "writers": film.writers,
            "actors": film.actors,
            "release": {
              "date": film.release instanceof Date ? film.release.toISOString() : null,
              "release_country": film.country
            },
            "runtime": film.duration,
            "genre": film.genre,
            "description": film.description,
          },
          "user_details": {
            "already_watched": film.isWatched,
            "favorite": film.isFavorite,
            "watching_date": film.watchingDate instanceof Date ? film.watchingDate.toISOString() : null,
            "watchlist": film.isInWatchlist
          }
        }
    );

    return adaptedFilm;
  }
}
