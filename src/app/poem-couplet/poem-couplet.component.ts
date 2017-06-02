import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import { RhymeService } from "app/rhyme.service";
import { Observable } from "rxjs/Observable";
import { PoemCoupletFocusService } from "./poem-couplet-focus.service";

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';

@Component({
  selector: 'poem-couplet',
  templateUrl: './poem-couplet.component.html',
  styleUrls: ['./poem-couplet.component.css']
})
export class PoemCoupletComponent implements OnInit {
  @ViewChild('coupletInput1') private coupletInput1;
  @Input() stanza: object;
  @Input() coupletIndex: number;
  @Input() showText: boolean;

  private inputSubject: BehaviorSubject<string> = new BehaviorSubject("");
  public inputObservable$ = this.inputSubject.asObservable();
  
  private rhymeHints = [];
  private searchFailed = false;
  private unchanged = true;
  private isLoading = false;
  public focus = false;
  public currentWord: string = "";
  public searchText: string = null;

  constructor(private _service: RhymeService, private poemCoupletFocusService: PoemCoupletFocusService, public elementRef: ElementRef) { }

  ngOnInit() {

    this.poemCoupletFocusService.focusedCouplet$.subscribe((index) => {
      if (index === this.coupletIndex) {
        this.setFocusToThisCouplet();
      }
    });

    this.inputObservable$
      .debounceTime(300)
      .subscribe((words) => {
        this.getRhymesForLastWordInPhrase(words);
      });

  }

  setFocusToThisCouplet() {
    if (this.coupletInput1) {
      this.coupletInput1.nativeElement.focus()
    } else {
      setTimeout(() => { this.coupletInput1.nativeElement.focus() }, 10);
    }
  }

  getRhymesForLastWordInPhrase(phrase: string) {
    let lastWord = phrase.split(" ").pop().replace(/[?.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
    this.currentWord = lastWord;
    this.isLoading = true;
    this._service.search(lastWord)
      .subscribe((response) => {
        this.updateRhymeHints(response);
      }, (error) => {
        this.onRhymeHintsFail(error);
      })
  }

  updateRhymeHints(hints: string[]) {
    this.rhymeHints = hints;
    this.searchFailed = false;
    this.isLoading = false;
  }

  onRhymeHintsFail(error) {

    this.searchFailed = true;
    this.isLoading = false;
  }

  inputUpdate1($event) {
    let words = $event.target.value.trim();

    let newSearch = words.split(" ").pop().replace(/[?.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");

    this.searchText = newSearch;

    this.unchanged = false;
    if (this.checkForEnterPress($event)) {
      this.focusNextInput($event)
    } else {
      this.isLoading = true;
      this.inputSubject.next(words);
    }

  }

  focusNextInput($event) {
    let nextElement = $event.target.nextElementSibling;
    if (nextElement && 'type' in nextElement && nextElement.type === "text") {
      nextElement.focus();
    } else {
      this.poemCoupletFocusService.coupletFinished(this.coupletIndex);
    }
  }

  onCoupletBlur() {
    this.focus = false;
  }

  onFocus($event) {
    this.focus = true;
    this.poemCoupletFocusService.coupletFocussed(this);
  }

  onLine2Keyup($event) {
    if (this.checkForEnterPress($event)) {
      this.focusNextInput($event)
    }
  }

  checkForEnterPress($event) {
    return ($event.keyCode === 13)
  }

}
