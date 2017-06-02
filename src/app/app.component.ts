import { Component, ViewChild } from '@angular/core';
import { RhymeService } from "app/rhyme.service";
import { PoemCoupletFocusService } from './poem-couplet/poem-couplet-focus.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showText: boolean = false;
  searchFailed: boolean = false;
  currentWord: boolean = null;
  stanzas = [
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
    this.poemCoupletFocusService.focusedCouplet$.subscribe((index) => {
      if (index > this.stanzas.length - 1) {
        this.insertCouplet();
        this.poemCoupletFocusService.coupletFinished(index - 1);
      }
    });
  }

  insertCouplet(): void {
    let newCouplet = {
      type: "couplet",
      line1: "",
      line2: ""
    }
    this.stanzas.push(newCouplet)
  }

  toggleShowText(): void {
    if (this.showText) {
      this.showText = false;
    } else {
      this.showText = true;
    }
  }

}