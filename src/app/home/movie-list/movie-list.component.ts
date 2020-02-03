import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Movie } from "src/app/shared/models/movie.model";
import { environment } from "src/environments/environment";
import { FavoritesService } from "src/app/shared/services/favorites.service";

@Component({
  selector: "app-movie-list",
  templateUrl: "./movie-list.component.html",
  styleUrls: ["./movie-list.component.scss"]
})
export class MovieListComponent implements OnInit {
  /**
   * Array of movies from the current page
   *
   * @type {Movie[]}
   * @memberof MovieListComponent
   */
  @Input()
  movies: Movie[] = [];

  /**
   * Event emitter to set the value from child to parent
   *
   * @type {EventEmitter<Movie>}
   * @memberof MovieListComponent
   */
  @Output()
  removedFromFavorites: EventEmitter<Movie> = new EventEmitter<Movie>();

  /**
   * Poster Url field
   *
   * @memberof MovieListComponent
   */
  posterUrl = environment.posterUrl;

  constructor(private favorites: FavoritesService) {}

  ngOnInit() {}

  /**
   * Check if the movie in favorites
   *
   * @param {number} movieId Movie ID
   * @returns {boolean} If movie in favourites or not
   * @memberof MovieListComponent
   */
  isFavorite(movieId: number): boolean {
    return this.favorites.isFavorite(movieId);
  }

  /**
   * Toggle/untoggle favorite button
   *
   * @param {Movie} movie
   * @memberof MovieListComponent
   */
  onToggleFavorite(movie: Movie): void {
    if (!this.isFavorite(movie.id)) {
      // if the movie is not in favorites then add to favorites
      this.favorites.addToFavorites(movie.id);
    } else {
      // If the movie in favorites then remove from favorites
      this.favorites.removeFromFavorites(movie.id);
      // Emit event to the parent component
      this.removedFromFavorites.emit(movie);
    }
  }
}
