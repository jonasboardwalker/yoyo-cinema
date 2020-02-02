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
  favoriteMovies: Movie[] = [];
  currentPageMovies: Movie[] = [];
  pageSize = 10;
  pageIndex = 0;

  constructor(
    private favorites: FavoritesService,
    private moviesApi: MovieApiService
  ) {}

  ngOnInit() {
    const favoriteMovieIds = this.favorites.getMovieIds();
    const apiPromises: Promise<Movie>[] = [];

    favoriteMovieIds.forEach(id => {
      apiPromises.push(this.moviesApi.getMovieById(id));
    });

    Promise.all(apiPromises).then(results => {
      this.favoriteMovies = results;

      if (this.favoriteMovies.length > 0) {
        this.showPage(0);
      }
    });
  }

  onPageChanged(event: PageEvent) {
    this.showPage(event.pageIndex);
  }

  private showPage(pageIndex: number) {
    this.pageIndex = pageIndex;

    const firstIndex = pageIndex * this.pageSize;
    let lastIndex = firstIndex + this.pageSize;

    if (lastIndex >= this.favoriteMovies.length) {
      lastIndex = this.favoriteMovies.length;
    }

    this.currentPageMovies = [];

    for (var i = firstIndex; i < lastIndex; i++) {
      this.currentPageMovies.push(this.favoriteMovies[i]);
    }
  }

  onRemovedFromFavorites(movie: Movie) {
    this.favoriteMovies.splice(this.favoriteMovies.indexOf(movie), 1);
    this.showPage(this.pageIndex);
  }
}
