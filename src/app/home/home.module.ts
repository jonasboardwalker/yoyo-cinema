import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { MaterialModule } from "../material.module";
import { SearchResultsComponent } from "./search-results/search-results.component";
import { DetailComponent } from "./detail/detail.component";
import { FavoritesComponent } from "./favorites/favorites.component";
import { MovieListComponent } from "./movie-list/movie-list.component";
import { TrendingComponent } from "./trending/trending.component";
import { HomeRoutingModule } from './home-routing.module';


@NgModule({
  declarations: [
    DetailComponent,
    SearchResultsComponent,
    MovieListComponent,
    FavoritesComponent,
    TrendingComponent
  ],
  imports: [CommonModule, HomeRoutingModule, MaterialModule],
  exports: [HomeRoutingModule]
})
export class HomeModule {}
