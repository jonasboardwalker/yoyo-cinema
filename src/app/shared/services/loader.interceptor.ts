import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { finalize } from "rxjs/operators";
import { LoaderService } from "./loader.service";

@Injectable()
export class LoaderInterceptor {
  constructor(private loader: LoaderService) {}

  /**
   * Interceptor which shows/hides loader
   *
   * @param {HttpRequest<any>} req The request object
   * @param {HttpHandler} next The http handler
   * @returns {Observable<HttpEvent<any>>}
   * @memberof LoaderInterceptor
   */
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Showing loader
    this.loader.showLoader();
    // When Observable terminates hides loader
    return next.handle(req).pipe(finalize(() => this.loader.hideLoader()));
  }
}
