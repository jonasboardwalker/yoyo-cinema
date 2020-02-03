import { Component, OnInit } from "@angular/core";
import { Movie } from "src/app/shared/models/movie.model";
import { MovieApiService } from "src/app/shared/services/movie-api.service";
import { PageEvent } from "@angular/material/paginator";

@Component({
  selector: "app-trending",
  templateUrl: "./trending.component.html",
  styleUrls: ["./trending.component.scss"]
})
export class TrendingComponent implements OnInit {
  /**
   * Array of trending movies
   *
   * @type {Movie[]}
   * @memberof TrendingComponent
   */
  results: Movie[] = [];

  /**
   * Total amount of trending movies
   *
   * @type {number}
   * @memberof TrendingComponent
   */
  totalResults: number;

  constructor(private movieApi: MovieApiService) {
    // Call the ShowTrendingMovies method
    this.showTrendingMovies();
  }

  ngOnInit() {}

  /**
   * Searching for trending movies by calling the API
   *
   * @param {number} [pageNumber=1] Number of pages with results (default = 1)
   * @memberof TrendingComponent
   */
  async showTrendingMovies(pageNumber: number = 1) {
    // Getting the response from promise
    const response = await this.movieApi.getTrendingMovies(pageNumber);
    // Getting the results from response
    this.results = response.results;
    // Getting the total number of results from response
    this.totalResults = response.total_results;
  }

  /**
   * Implementing the pagination for trending results
   *
   * @param {PageEvent} event Paginator event
   * @memberof TrendingComponent
   */
  async onPageChanged(event: PageEvent) {
    await this.showTrendingMovies(event.pageIndex + 1);
  }
}
