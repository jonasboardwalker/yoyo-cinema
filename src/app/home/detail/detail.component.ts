import { Component, OnInit } from "@angular/core";
import { Movie } from "src/app/shared/models/movie.model";
import { MovieApiService } from "src/app/shared/services/movie-api.service";
import { ActivatedRoute } from "@angular/router";
import { environment } from 'src/environments/environment';
import { FavoritesService } from 'src/app/shared/services/favorites.service';

@Component({
  selector: "app-detail",
  templateUrl: "./detail.component.html",
  styleUrls: ["./detail.component.scss"]
})
export class DetailComponent implements OnInit {
  movie: Movie = null;
  backdropUrl = environment.backdropUrl;
  posterUrl = environment.posterUrl;
  isFavorite = false;

  constructor(
    private movieApi: MovieApiService,
    private activatedRoute: ActivatedRoute,
    private favorites: FavoritesService
  ) {
    this.activatedRoute.queryParamMap.subscribe(async paramsMap => {
      const movieId = Number(paramsMap.get("movieId"));

      if (movieId != null && movieId != 0) {
        this.loadMovieDetails(movieId);
      }
    });
  }

  async loadMovieDetails(movieId: number) {
    this.movie = await this.movieApi.getMovieById(movieId);
    this.isFavorite = this.favorites.isFavorite(this.movie.id);
  }

  onToggleFavorite() {
    this.isFavorite = !this.isFavorite;

    if(this.isFavorite) {
      this.favorites.addToFavorites(this.movie.id);
    } else { 
      this.favorites.removeFromFavorites(this.movie.id);
    }
  }

  ngOnInit() {}
}
