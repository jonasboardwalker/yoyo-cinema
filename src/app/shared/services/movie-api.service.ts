import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { PagedResults } from "../models/paged-results.model";
import { Movie } from "../models/movie.model";

@Injectable({
  providedIn: "root"
})
export class MovieApiService {
  constructor(private http: HttpClient) {}

  /**
   *
   *
   * @param {string} query Movie name
   * @param {number} [pageNumber=null] Number of the search result page
   * @returns {Promise<PagedResults<Movie>>} Promise of search results
   * @memberof MovieApiService
   */
  search(
    query: string,
    pageNumber: number = null
  ): Promise<PagedResults<Movie>> {
    // forming api url to retrieve movie list
    let url = `${environment.apiSearchUrl}?api_key=${environment.apiKey}&query=${query}`;
    // if number of the page is specified, then add page parameter to the api url string
    if (pageNumber != null) {
      url += `&page=${pageNumber}`;
    }
    return this.http.get<PagedResults<Movie>>(url).toPromise();
  }

  /**
   * Getting details of the movie
   *
   * @param {number} movieId Movie ID to get details of
   * @returns {Promise<Movie>} Promise with movie details
   * @memberof MovieApiService
   */
  getMovieById(movieId: number): Promise<Movie> {
    // forming api url to get movie details
    const url = `${environment.movieDetailUrl}/${movieId}?api_key=${environment.apiKey}`;
    return this.http.get<Movie>(url).toPromise();
  }

  /**
   * Get list of trending movies
   *
   * @param {number} pageNumber
   * @returns {Promise<PagedResults<Movie>>}
   * @memberof MovieApiService
   */
  getTrendingMovies(pageNumber: number = null): Promise<PagedResults<Movie>> {
    let url = `${environment.trendingUrl}?api_key=${environment.apiKey}`;
    // if number of the page is specified, then add page parameter to the api url string
    if (pageNumber != null) {
      url += `&page=${pageNumber}`;
    }
    return this.http.get<PagedResults<Movie>>(url).toPromise();
  }
}
