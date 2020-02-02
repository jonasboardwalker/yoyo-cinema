import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  loaderShown = new Subject<boolean>();

  constructor() { }

  showLoader() {
    this.loaderShown.next(true);
  }

  hideLoader() {
    this.loaderShown.next(false);
  }
}
