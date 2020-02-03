import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormGroup, FormControl } from "@angular/forms";
import { LoaderService } from "./shared/services/loader.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  /**
   * Field which specifies the visibility of loader
   *
   * @memberof AppComponent
   */
  isLoaderVisible = false;
  searchForm = new FormGroup({
    searchQuery: new FormControl("")
  });

  constructor(public router: Router, public loader: LoaderService) {}

  /**
   * Navigates to /search route and pass "query" parameter from searchQuery input
   *
   * @memberof AppComponent
   */
  search() {
    this.router.navigate(["/search"], {
      queryParams: {
        query: encodeURI(this.searchForm.get("searchQuery").value)
      }
    });
    // After executing clear searchQuery input
    this.searchForm.get("searchQuery").setValue("");
  }

  /**
   * Initialize loader
   *
   * @memberof AppComponent
   */
  ngOnInit(): void {
    this.loader.loaderShown.subscribe(isVisible => {
      setTimeout(() => (this.isLoaderVisible = isVisible), 0);
    });
  }
}
