import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { PoemCoupletFocusService } from './shared/poem-couplet-focus.service';
import { Stanza } from './shared/stanza.model'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class AppComponent {
  showText: boolean = false;
  currentWord: boolean = null;
  poem: Stanza[] = [
    {
      type: "couplet",
      line1: "",
      line2: ""
    }
  ]

  constructor(
    private focusService: PoemCoupletFocusService
  ) { }

  ngOnInit() {
    this.focusService.focusedCoupletIndex$.subscribe((coupletIndex) => {
      this.addCoupletIfNone(coupletIndex);
    });
  }

  addCoupletIfNone(coupletIndex: number) {
    if (coupletIndex > this.poem.length - 1) {
      this.addCouplet();
      this.focusService.focusCouplet(coupletIndex);
    }
  }

  addCouplet() {
    let newCouplet = this.createNewCouplet()
    this.poem.push(newCouplet);
  }

  createNewCouplet(): Stanza {
    let newCouplet: Stanza = {
      type: "couplet",
      line1: "",
      line2: ""
    }
    return newCouplet;
  }

  toggleShowText(): void {
    if (this.showText) {
      this.showText = false;
    } else {
      this.showText = true;
    }
  }

  onShowText(): void {
    this.showText = true;
  }

}