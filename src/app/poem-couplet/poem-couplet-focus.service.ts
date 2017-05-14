import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs/BehaviorSubject";

@Injectable()
export class PoemCoupletFocusService {

  private focusedCouplet: BehaviorSubject<number> = new BehaviorSubject(0);
  focusedCouplet$ = this.focusedCouplet.asObservable();

  constructor() { }

  coupletFinished(index: number) {
    this.focusedCouplet.next(index+1)
  }

}
