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

  search(query: string, pageNumber: number = null): Promise<PagedResults<Movie>> {
    let url = `${environment.apiSearchUrl}?api_key=${environment.apiKey}&query=${query}`;

    if(pageNumber != null) {
      url += '&page=' + pageNumber;
    }

    return this.http.get<PagedResults<Movie>>(url).toPromise();
  }

  getMovieById(id: number): Promise<Movie> {
    let url = `${environment.movieDetailUrl}/${id}?api_key=${environment.apiKey}`;

    return this.http.get<Movie>(url).toPromise();
  }

  getTrendingMovies(pageNumber: number): Promise<PagedResults<Movie>>{
    let url = `${environment.trendingUrl}?api_key=${environment.apiKey}&page=${pageNumber}`;

    return this.http.get<PagedResults<Movie>>(url).toPromise();
  }
}
