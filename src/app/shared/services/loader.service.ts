import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class LoaderService {
  loaderShown = new Subject<boolean>();

  constructor() {}

  /**
   * Emit true
   *
   * @memberof LoaderService
   */
  showLoader() {
    this.loaderShown.next(true);
  }

  /**
   * Emit false
   *
   * @memberof LoaderService
   */
  hideLoader() {
    this.loaderShown.next(false);
  }
}
