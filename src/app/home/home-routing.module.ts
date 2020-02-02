import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { TrendingComponent } from "./trending/trending.component";
import { SearchResultsComponent } from "./search-results/search-results.component";
import { DetailComponent } from "./detail/detail.component";
import { FavoritesComponent } from "./favorites/favorites.component";

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: "trending", component: TrendingComponent },
      { path: "search", component: SearchResultsComponent },
      { path: "detail", component: DetailComponent },
      { path: "favorites", component: FavoritesComponent }
    ])
  ],
  exports: [RouterModule]
})
export class HomeRoutingModule {}
