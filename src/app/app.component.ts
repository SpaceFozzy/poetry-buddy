import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { PoemCoupletFocusService } from './poem-couplet/poem-couplet-focus.service';
import { Stanza } from './shared/stanza.model'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class AppComponent {
  showText: boolean = false;
  searchFailed: boolean = false;
  currentWord: boolean = null;
  poem: Stanza[] = [
    {
      type: "couplet",
      line1: "",
      line2: ""
    }
  ]

  constructor(
    private poemCoupletFocusService: PoemCoupletFocusService
  ) { }

  ngOnInit() {
    this.poemCoupletFocusService.focusedCoupletIndex$.subscribe((coupletToFocus) => {
      if (coupletToFocus > this.poem.length - 1) {
        this.poem.push(this.createNewCouplet());
        this.poemCoupletFocusService.coupletFinished(coupletToFocus - 1);
      }
    });
  }

  insertCouplet() {
    this.poem.push(this.createNewCouplet());
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