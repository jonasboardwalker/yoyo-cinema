import { Component, OnInit } from "@angular/core";
import { Movie } from "src/app/shared/models/movie.model";
import { MovieApiService } from "src/app/shared/services/movie-api.service";
import { ActivatedRoute } from "@angular/router";
import { environment } from "src/environments/environment";
import { FavoritesService } from "src/app/shared/services/favorites.service";

@Component({
  selector: "app-detail",
  templateUrl: "./detail.component.html",
  styleUrls: ["./detail.component.scss"]
})
export class DetailComponent implements OnInit {
  /**
   * Movie details field
   *
   * @type {Movie}
   * @memberof DetailComponent
   */
  movie: Movie = null;

  /**
   * Backdrop picture Url field
   *
   * @memberof DetailComponent
   */
  backdropUrl = environment.backdropUrl;

  /**
   * Poster Url field
   *
   * @memberof DetailComponent
   */
  posterUrl = environment.posterUrl;

  /**
   * Field to store favorite statement
   *
   * @memberof DetailComponent
   */
  isFavorite = false;

  constructor(
    private movieApi: MovieApiService,
    private activatedRoute: ActivatedRoute,
    private favorites: FavoritesService
  ) {
    // Get the parameter "movieId" from activated route
    this.activatedRoute.queryParamMap.subscribe(async paramsMap => {
      const movieId = Number(paramsMap.get("movieId"));
      if (movieId !== null && movieId !== 0) {
        // if movie ID specified then load movie details
        this.loadMovieDetails(movieId);
      }
    });
  }

  /**
   * Loading movie details from api
   *
   * @param {number} movieId Movie ID
   * @memberof DetailComponent
   */
  async loadMovieDetails(movieId: number) {
    // getting movie details into movie field
    this.movie = await this.movieApi.getMovieById(movieId);
    // check if movie in favorites
    this.isFavorite = this.favorites.isFavorite(this.movie.id);
  }

  /**
   * Toggle/untoggle favorite button
   *
   * @memberof DetailComponent
   */
  onToggleFavorite() {
    this.isFavorite = !this.isFavorite;
    if (this.isFavorite) {
      // if after toggle movie is favorite then add to the local storage
      this.favorites.addToFavorites(this.movie.id);
    } else {
      // if after toggle movie is not in favorite list then remove from local storage
      this.favorites.removeFromFavorites(this.movie.id);
    }
  }

  ngOnInit() {}
}
