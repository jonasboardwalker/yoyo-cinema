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
  @Input()
  movies: Movie[] = [];
  @Output()
  removedFromFavorites: EventEmitter<Movie> = new EventEmitter<Movie>();

  posterUrl = environment.posterUrl;

  constructor(private favorites: FavoritesService) {}

  ngOnInit() {}

  isFavorite(movieId: number) {
    return this.favorites.isFavorite(movieId);
  }

  onToggleFavorite(movie: Movie) {
    if (!this.isFavorite(movie.id)) {
      this.favorites.addToFavorites(movie.id);
    } else {
      this.favorites.removeFromFavorites(movie.id);
      this.removedFromFavorites.emit(movie);
    }
  }
}
