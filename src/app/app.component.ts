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
  isLoaderVisible = false;
  searchForm = new FormGroup({
    searchQuery: new FormControl("")
  });

  constructor(public router: Router, public loader: LoaderService) {}

  search() {
    this.router.navigate(["/search"], {
      queryParams: {
        query: encodeURI(this.searchForm.get("searchQuery").value)
      }
    });

    this.searchForm.get("searchQuery").setValue("");
  }

  ngOnInit(): void {
    this.loader.loaderShown.subscribe(isVisible => {
      setTimeout(() => this.isLoaderVisible = isVisible, 0);
    });
  }
}
