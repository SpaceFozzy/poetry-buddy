import { Component, Injectable, ViewChild } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import { RhymeService } from "app/rhyme.service";
import { PoemCoupletFocusService } from './poem-couplet/poem-couplet-focus.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('writingSpace') private writingSpace;
  model: any;
  searching = false;
  showText = false;
  searchFailed = false;
  currentWord = null;
  rhymeHints = [];
  lines = [];
  isLoadingWord = false;
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
         if (elementReference) {
          document.body.scrollTop = elementReference.nativeElement.offsetTop-80;
         }
         
          // console.log('body scrolltop, element offsetTop',document.body.scrollTop, elementReference.nativeElement.offsetTop);
          
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
      this.isLoadingWord = false;
    }

    onLoading(word: string) {
      if (word) {
        this.currentWord = word;
        this.isLoadingWord = true;
      }
    }

    toggleDone() {
      if (this.showText) {
        this.showText = false;
      } else {
        this.showText = true;
      }
    }

}