import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  localStorageId = 'themovieapp-favorites';

  constructor() { }

  isFavorite(movieId: number): boolean {
    const movieIds = this.getMovieIds();

    return movieIds.indexOf(movieId) != -1;
  }

  addToFavorites(movieId: number) {    
    const movieIds = this.getMovieIds();

    movieIds.push(movieId);
    localStorage.setItem(this.localStorageId, JSON.stringify(movieIds));
  }

  removeFromFavorites(movieId: number) {
    const movieIds = this.getMovieIds();
    const existingElement = movieIds[movieIds.indexOf(movieId)];

    if(existingElement != null) {
      movieIds.splice(movieIds.indexOf(movieId), 1);
    }

    localStorage.setItem(this.localStorageId, JSON.stringify(movieIds));
  }

  getMovieIds(): number[] {
    const favorites = localStorage.getItem(this.localStorageId);

    let movieIds = null;

    if(favorites == null) {
      movieIds = [];
    } else {
      movieIds = JSON.parse(favorites); 
    }

    return movieIds;
  }
}
