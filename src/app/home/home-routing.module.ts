import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { TrendingComponent } from "./trending/trending.component";
import { SearchResultsComponent } from "./search-results/search-results.component";
import { DetailComponent } from "./detail/detail.component";
import { FavoritesComponent } from "./favorites/favorites.component";

@NgModule({
  imports: [
    RouterModule.forRoot([
      // Trending route
      { path: "trending", component: TrendingComponent },
      // Search results route
      { path: "search", component: SearchResultsComponent },
      // Movie details route
      { path: "detail", component: DetailComponent },
      // Favorite movies route
      { path: "favorites", component: FavoritesComponent }
    ])
  ],
  exports: [RouterModule]
})
export class HomeRoutingModule {}
