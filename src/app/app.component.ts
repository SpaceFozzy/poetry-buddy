import { Component, Injectable, ViewChild } from '@angular/core';
import { RhymeService } from "app/rhyme.service";
import { PoemCoupletFocusService } from './poem-couplet/poem-couplet-focus.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('writingSpace') private writingSpace;
  showText = false;
  searchFailed = false;
  currentWord = null;
  rhymeHints = [];
  lines = [];
  stanzas = [
    {
      type: "couplet",
      line1: "",
      line2: ""
    }
  ]

  constructor(private _service: RhymeService, private poemCoupletFocusService: PoemCoupletFocusService,) {}

    ngOnInit() {
      this.poemCoupletFocusService.focusedCouplet$.subscribe((index) => {
        if (index > this.stanzas.length -1) {
          let newCouplet = this.insertCouplet();
          this.poemCoupletFocusService.coupletFinished(index-1);
        }
      });

       this.poemCoupletFocusService.focusedCoupletElement$.subscribe((elementReference) => {   
        //  if (elementReference) {
        //   document.body.scrollTop = elementReference.nativeElement.offsetTop-80;
        //  }
      });
    }

    insertCouplet() {
      let newCouplet = {
        type: "couplet",
        line1: "",
        line2: ""
      }
      this.stanzas.push(newCouplet)
      return newCouplet;
    }

    onHintsUpdated(hints: string[]){
      this.rhymeHints = hints;
    }

    toggleDone() {
      if (this.showText) {
        this.showText = false;
      } else {
        this.showText = true;
      }
    }

}