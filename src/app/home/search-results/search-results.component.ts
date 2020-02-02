import { Component, OnInit } from "@angular/core";
import { Movie } from "src/app/shared/models/movie.model";
import { environment } from "src/environments/environment";
import { ActivatedRoute } from "@angular/router";
import { MovieApiService } from "src/app/shared/services/movie-api.service";
import { PageEvent } from "@angular/material/paginator";

@Component({
  selector: "app-search-results",
  templateUrl: "./search-results.component.html",
  styleUrls: ["./search-results.component.scss"]
})
export class SearchResultsComponent implements OnInit {
  query: string;
  results: Movie[] = [];
  totalResults: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private movieApi: MovieApiService
  ) {
    this.activatedRoute.queryParamMap.subscribe(async paramsMap => {
      this.query = paramsMap.get("query");

      if (this.query != null && this.query != '') {
        this.search();
      }
    });
  }

  ngOnInit() {}

  async search(pageNumber: number = 1) {
    const response = await this.movieApi.search(this.query, pageNumber);
    this.results = response.results;
    this.totalResults = response.total_results;
  }

  async onPageChanged(event: PageEvent) {
    await this.search(event.pageIndex + 1);
  }
}
