import FilmsModel from '../model/films';
import {isOnline} from '../utils/common.js';

const getSyncedFilms = (items) => {
  return items.filter(({success}) => success)
    .map(({payload}) => payload.film);
};

const createStoreStructure = (items) => {
  return items.reduce((acc, current) => {
    return Object.assign({}, acc, {
      [current.id]: current,
    });
  }, {});
};

export default class Provider {
  constructor(api, store) {
    this._api = api;
    this._store = store;
  }

  getFilms() {
    if (isOnline()) {
      return this._api.getFilms()
        .then((films) => {
          const items = createStoreStructure(films.map(FilmsModel.adaptFilmToServer));
          this._store.setItems(items);
          return films;
        });
    }

    const storeFilms = Object.values(this._store.getItems());

    return Promise.resolve(storeFilms.map(FilmsModel.adaptFilmToClient));
  }

  updateFilms(film) {
    if (isOnline()) {
      return this._api.updateFilms(film)
        .then((updatedFilm) => {
          this._store.setItem(updatedFilm.id, FilmsModel.adaptFilmToServer(updatedFilm));
          return updatedFilm;
        });
    }

    this._store.setItem(film.id, FilmsModel.adaptFilmToServer(Object.assign({}, film)));

    return Promise.resolve(film);
  }

  deleteComment(commentId) {
    if (isOnline()) {
      return this._api.deleteComment(commentId);
    }

    return Promise.reject(new Error(`Delete comment failed`));
  }

  addComment(filmId, comment) {
    if (isOnline()) {
      return this._api.addComment(filmId, comment);
    }

    return Promise.reject(new Error(`Add comment failed`));
  }

  getComments(film) {
    if (isOnline()) {
      return this._api.getComments(film);
    }

    return Promise.reject(new Error(`Upload comment failed`));
  }

  sync() {
    if (isOnline()) {
      const storeFilms = Object.values(this._store.getItems());

      return this._api.sync(storeFilms)
        .then((response) => {
          const createdFilms = getSyncedFilms(response.created);
          const updatedFilms = getSyncedFilms(response.updated);

          const items = createStoreStructure([...createdFilms, ...updatedFilms]);

          this._store.setItems(items);
        });
    }

    return Promise.reject(new Error(`Sync data failed`));
  }
}
