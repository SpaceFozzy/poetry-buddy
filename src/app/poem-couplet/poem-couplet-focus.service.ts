import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Injectable, ElementRef } from '@angular/core';
import { PoemCoupletComponent } from './poem-couplet.component';

@Injectable()
export class PoemCoupletFocusService {

  // Observable sources
  private focusedCouplet: BehaviorSubject<number> = new BehaviorSubject(0);
  private focusedCoupletElement: BehaviorSubject<ElementRef> = new BehaviorSubject(null);

  // Observable streams
  focusedCoupletIndex$ = this.focusedCouplet.asObservable();
  focusedCoupletElement$ = this.focusedCoupletElement.asObservable();

  constructor() { }

  // Used to shift focus to the next couplet in the poem on enter press.
  // The app root will create a new couplet if one is needed.
  // PoemCoupletComponents will subscribe to see if they have just received focus.
  focusCouplet(index: number) {
    this.focusedCouplet.next(index);
  }

  // Used when a PoemCoupletComponent accepts focus.
  // Indicates to others that they should lose focus.
  coupletFocussed(couplet: PoemCoupletComponent) {
    this.focusedCoupletElement.next(couplet.element);
  }

}
