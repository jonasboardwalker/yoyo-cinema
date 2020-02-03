import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class FavoritesService {
  /**
   * Name of the local storage variable
   *
   * @memberof FavoritesService
   */
  localStorageId = "themovieapp-favorites";

  constructor() {}

  /**
   * Check if the movie in favorites
   *
   * @param {number} movieId Movie ID
   * @returns {boolean} True if favorite and False if is not favourite
   * @memberof FavoritesService
   */
  isFavorite(movieId: number): boolean {
    const movieIds = this.getMovieIds();
    return movieIds.indexOf(movieId) !== -1;
  }

  /**
   * Add movie to favorites by adding the value to the local storage
   *
   * @param {number} movieId Movie ID to add
   * @memberof FavoritesService
   */
  addToFavorites(movieId: number): void {
    // getting an array of favorite movies from local storage
    const movieIds = this.getMovieIds();
    // push the new value to the array
    movieIds.push(movieId);
    // set the new value to the local storage
    localStorage.setItem(this.localStorageId, JSON.stringify(movieIds));
  }

  /**
   * Remove movie from favorites by adding the value to the local storage
   *
   * @param {number} movieId Movie ID to remove
   * @memberof FavoritesService
   */
  removeFromFavorites(movieId: number): void {
    // getting an array of favorite movies from local storage
    const movieIds = this.getMovieIds();
    // getting the index of the movie ID
    const existingElement = movieIds[movieIds.indexOf(movieId)];
    if (existingElement != null) {
      // splice the movie ID by index
      movieIds.splice(movieIds.indexOf(movieId), 1);
    }
    // set the new value to the local storage
    localStorage.setItem(this.localStorageId, JSON.stringify(movieIds));
  }

  /**
   * Get an array favourive movies IDs from the local storage
   *
   * @returns {number[]} array of favorite movies IDs
   * @memberof FavoritesService
   */
  getMovieIds(): number[] {
    // get the content of local storage
    const favorites = localStorage.getItem(this.localStorageId);
    let movieIds = null;
    if (favorites == null) {
      movieIds = [];
    } else {
      movieIds = JSON.parse(favorites);
    }
    return movieIds;
  }
}
