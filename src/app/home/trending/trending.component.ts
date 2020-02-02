import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/shared/models/movie.model';
import { ActivatedRoute } from '@angular/router';
import { MovieApiService } from 'src/app/shared/services/movie-api.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-trending',
  templateUrl: './trending.component.html',
  styleUrls: ['./trending.component.scss']
})
export class TrendingComponent implements OnInit {
  query: string;
  results: Movie[] = [];
  totalResults: number;

  constructor(
    private movieApi: MovieApiService
  ) {
    this.showTrendingMovies(1);
  }

  ngOnInit() {}

  async showTrendingMovies(pageNumber: number) {
    const response = await this.movieApi.getTrendingMovies(pageNumber);
    this.results = response.results;
    this.totalResults = response.total_results;
  }

  async onPageChanged(event: PageEvent) {
    await this.showTrendingMovies(event.pageIndex + 1);
  }

}
