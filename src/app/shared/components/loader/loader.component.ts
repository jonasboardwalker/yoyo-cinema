import { Component, OnInit } from "@angular/core";

/**
 * Component which shows loader while calling API
 *
 * @export
 * @class LoaderComponent
 * @implements {OnInit}
 */
@Component({
  selector: "app-loader",
  templateUrl: "./loader.component.html",
  styleUrls: ["./loader.component.scss"]
})
export class LoaderComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
