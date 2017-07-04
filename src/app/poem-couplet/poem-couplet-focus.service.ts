import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Injectable, ElementRef } from '@angular/core';
import { PoemCoupletComponent } from './poem-couplet.component';

@Injectable()
export class PoemCoupletFocusService {

  //Observable sources
  private focusedCouplet: BehaviorSubject<number> = new BehaviorSubject(0);
  private focusedCoupletElement: BehaviorSubject<ElementRef> = new BehaviorSubject(null);

  //Observable streams
  focusedCoupletIndex$ = this.focusedCouplet.asObservable();
  focusedCoupletElement$ = this.focusedCoupletElement.asObservable();

  constructor() { }

  focusCouplet(index: number) {
    this.focusedCouplet.next(index);
  }

  coupletFocussed(couplet: PoemCoupletComponent) {
    this.focusedCoupletElement.next(couplet.element);
  }

}
