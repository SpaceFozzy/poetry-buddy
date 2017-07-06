import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Injectable, ElementRef } from '@angular/core';
import { PoemCoupletComponent } from './poem-couplet.component';


@Injectable()
export class PoemCoupletFocusService {

  focusedCoupletIndex$: BehaviorSubject<number> = new BehaviorSubject(0);
  focusedCoupletElement$: BehaviorSubject<ElementRef> = new BehaviorSubject(null);

  constructor() { }

  // Used to shift focus to the next couplet in the poem on enter press.
  // The app root will create a new couplet if one is needed.
  // PoemCoupletComponents will subscribe to see if they have just received focus.
  focusCouplet(index: number) {
    this.focusedCoupletIndex$.next(index);
  }

  // Used when a PoemCoupletComponent accepts focus.
  // Indicates to others that they should lose focus.
  coupletFocussed(couplet: PoemCoupletComponent) {
    this.focusedCoupletElement$.next(couplet.element);
  }

}
