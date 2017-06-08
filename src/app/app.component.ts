import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { RhymeService } from "app/rhyme.service";
import { PoemCoupletFocusService } from './poem-couplet/poem-couplet-focus.service';

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
  poem: any[] = [
    {
      type: "couplet",
      line1: "",
      line2: ""
    }
  ]

  constructor(
    private _service: RhymeService,
    private poemCoupletFocusService: PoemCoupletFocusService
  ) { }

  ngOnInit() {
    this.poemCoupletFocusService.focusedCouplet$.subscribe((coupletToFocus) => {
      if (coupletToFocus > this.poem.length - 1) {
        this.poem.push(this.createNewCouplet());
        this.poemCoupletFocusService.coupletFinished(coupletToFocus - 1);
      }
    });
  }

  createNewCouplet(): any {
    let newCouplet = {
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

}