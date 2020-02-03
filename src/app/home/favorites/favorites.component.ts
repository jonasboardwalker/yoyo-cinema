import { Component, OnInit } from "@angular/core";
import { Movie } from "src/app/shared/models/movie.model";
import { FavoritesService } from "src/app/shared/services/favorites.service";
import { MovieApiService } from "src/app/shared/services/movie-api.service";
import { PageEvent } from "@angular/material/paginator";

@Component({
  selector: "app-favorites",
  templateUrl: "./favorites.component.html",
  styleUrls: ["./favorites.component.scss"]
})
export class FavoritesComponent implements OnInit {
  /**
   * Field to store favourite movies IDs array
   *
   * @type {Movie[]}
   * @memberof FavoritesComponent
   */
  favoriteMovies: Movie[] = [];

  /**
   * Field to store favorite movies from current page
   *
   * @type {Movie[]}
   * @memberof FavoritesComponent
   */
  currentPageMovies: Movie[] = [];

  /**
   * Hardcoded page size
   *
   * @memberof FavoritesComponent
   */
  pageSize = 10;
  pageIndex = 0;

  constructor(
    private favorites: FavoritesService,
    private moviesApi: MovieApiService
  ) {}

  ngOnInit() {
    // Retrive favorite movies from local storage
    const favoriteMovieIds = this.favorites.getMovieIds();
    // Promises of all favorite movies details
    const apiPromises: Promise<Movie>[] = [];

    favoriteMovieIds.forEach(id => {
      apiPromises.push(this.moviesApi.getMovieById(id));
    });

    // resolve all promises to favoriteMovies array
    Promise.all(apiPromises).then(results => {
      this.favoriteMovies = results;
      if (this.favoriteMovies.length > 0) {
        // if there are favorite movies then show the firs page
        this.showPage(0);
      }
    });
  }

  /**
   * Get the page index from the event and call showPage method
   *
   * @param {PageEvent} event Even emmited by changing a page
   * @memberof FavoritesComponent
   */
  onPageChanged(event: PageEvent) {
    this.showPage(event.pageIndex);
  }

  /**
   * Implementing the pagination functionality. Method calculates the
   * first and the last movie indexes to show on the current page
   * and push them to the currentPageMovies array
   *
   * @private
   * @param {number} pageIndex
   * @memberof FavoritesComponent
   */
  private showPage(pageIndex: number) {
    this.pageIndex = pageIndex;

    // Calculating the first movie index
    const firstIndex = pageIndex * this.pageSize;
    // Calculating the last movie index
    let lastIndex = firstIndex + this.pageSize;

    if (lastIndex >= this.favoriteMovies.length) {
      // If calculated lastIndex is higher than number of all favourite movies then set lastIndex to the length of favorive movies array
      lastIndex = this.favoriteMovies.length;
    }

    // Clear currenPageMovies array
    this.currentPageMovies = [];

    for (let i = firstIndex; i < lastIndex; i++) {
      // Push all the favorite movies from firstIndex to lastIndex to the array of movies on current page
      this.currentPageMovies.push(this.favoriteMovies[i]);
    }
  }

  /**
   * Removing the movie from favoriteMovies array
   *
   * @param {Movie} movie Movie object
   * @memberof FavoritesComponent
   */
  onRemovedFromFavorites(movie: Movie) {
    // Splice the movie object from array of favorite movies
    this.favoriteMovies.splice(this.favoriteMovies.indexOf(movie), 1);
    this.showPage(this.pageIndex);
  }
}
