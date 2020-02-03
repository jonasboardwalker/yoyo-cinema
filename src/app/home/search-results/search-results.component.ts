import { Component, OnInit } from "@angular/core";
import { Movie } from "src/app/shared/models/movie.model";
import { ActivatedRoute } from "@angular/router";
import { MovieApiService } from "src/app/shared/services/movie-api.service";
import { PageEvent } from "@angular/material/paginator";

@Component({
  selector: "app-search-results",
  templateUrl: "./search-results.component.html",
  styleUrls: ["./search-results.component.scss"]
})
export class SearchResultsComponent implements OnInit {
  /**
   * Query field
   *
   * @type {string}
   * @memberof SearchResultsComponent
   */
  query: string;

  /**
   * Array of search results
   *
   * @type {Movie[]}
   * @memberof SearchResultsComponent
   */
  results: Movie[] = [];

  /**
   * Total number on search results
   *
   * @type {number}
   * @memberof SearchResultsComponent
   */
  totalResults: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private movieApi: MovieApiService
  ) {
    // Get the parameter "query" from activated route
    this.activatedRoute.queryParamMap.subscribe(async paramsMap => {
      this.query = paramsMap.get("query");
      if (this.query != null && this.query !== "") {
        // If "query" parameter is provided then utilize search method
        this.search();
      }
    });
  }

  ngOnInit() {}

  /**
   * Searching for movies by calling the API
   *
   * @param {number} [pageNumber=1] Number of pages with results (default = 1)
   * @memberof SearchResultsComponent
   */
  async search(pageNumber: number = 1) {
    // Getting the response from promise
    const response = await this.movieApi.search(this.query, pageNumber);
    // Getting the results from response
    this.results = response.results;
    // Getting the total number of results from response
    this.totalResults = response.total_results;
  }

  /**
   * Implementing the pagination for search results
   *
   * @param {PageEvent} event Paginator event
   * @memberof SearchResultsComponent
   */
  async onPageChanged(event: PageEvent) {
    // Search for page from paginator event
    await this.search(event.pageIndex + 1);
  }
}
