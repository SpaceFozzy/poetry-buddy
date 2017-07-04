//TODO: remove enter press check and bind to enterpress event on inputs
//TODO: see about removing inputObservable$

import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import { RhymeService } from "app/rhyme.service";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';

import { PoemCoupletFocusService } from "./poem-couplet-focus.service";
import { Stanza } from "../shared/stanza.model";

@Component({
  selector: 'poem-couplet',
  templateUrl: './poem-couplet.component.html',
  styleUrls: ['./poem-couplet.component.css']
})

export class PoemCoupletComponent implements OnInit {
  @ViewChild('coupletInput1') private coupletInput1;
  @ViewChild('coupletInput2') private coupletInput2;
  @Input() stanza: Stanza;
  @Input() coupletIndex: number; // Used to move focus between couplets on enter press
  @Input() showText: boolean;

  //Observable sources
  private inputSubject: BehaviorSubject<string> = new BehaviorSubject("");
  //Observable streams
  public inputObservable$ = this.inputSubject.asObservable();

  private rhymeHints: string[] = [];
  private searchFailed: boolean = false;
  private unchanged: boolean = true;
  private isLoading: boolean = false;

  public focus: boolean = false;
  public currentWord: string = "";
  public searchText: string = null;

  constructor(
    private service: RhymeService,
    private poemCoupletFocusService: PoemCoupletFocusService,
    // elementRef is used as a hook by the poem-couplet-focusservice to
    // manually shift focus to this element
    public elementRef: ElementRef
  ) { }

  ngOnInit() {
    // Subscribe to the focus service to allow enter presses to change focus
    // between poem-couplet components
    this.poemCoupletFocusService.focusedCouplet$.subscribe((index) => {
      if (index === this.coupletIndex) {
        this.setFocus();
      }
    });

    this.poemCoupletFocusService.focusedCoupletElement$.subscribe((element: ElementRef) => {
      if (element !== this.elementRef) {
        this.focus = false;
      }
    });

    //Subscribe to the input observable to fetch rhymes as the input text changes.
    this.inputObservable$
      .debounceTime(1000)
      .subscribe((words) => {
        this.getRhymesForLastWordInPhrase(words);
      });
  }

  setFocus(): void {
    if (this.coupletInput1) {
      this.coupletInput1.nativeElement.focus()
    } else {
      // If the user presses enter on the last line of the previous couplet, a
      // new couplet will be created. If this couplet is brand new and hasn't had
      // time to render, set a small delay to give it time to render before setting
      // focus to the input.
      setTimeout(() => { this.coupletInput1.nativeElement.focus() }, 10);
    }
  }

  getLastWordInPhrase(phrase: string): string {
    return phrase.split(" ").pop().replace(/[?.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
  }

  getRhymesForLastWordInPhrase(phrase: string): void {
    let lastWord = this.getLastWordInPhrase(phrase);
    this.currentWord = lastWord;
    this.isLoading = true;

    this.service.search(lastWord)
      .subscribe((response) => {
        this.updateRhymeHints(response);
      }, (error) => {
        this.onRhymeHintsFail(error);
      })
  }

  updateRhymeHints(hints: string[]): void {
    this.rhymeHints = hints;
    this.searchFailed = false;
    this.isLoading = false;
  }

  onRhymeHintsFail(error): void {
    this.searchFailed = true;
    this.isLoading = false;
  }

  inputUpdate1($event): boolean {
    let words = $event.target.value.trim();

    if (!words) {
      this.rhymeHints = [];
      this.searchText = "";
      return false;
    }

    // If the key pressed is enter, switch focus to the next couplet rather than
    // emitting a new input change. 
    if (this.checkForEnterPress($event)) {
      //this.focusNextInput($event);
    } else {
      let newSearch = this.getLastWordInPhrase(words);

      if (newSearch === this.searchText) {
        return false;
      }

      this.isLoading = true;
      this.unchanged = false;
      this.searchText = newSearch;
      this.inputSubject.next(words);
    }

  }

  focusNextInput($event): void {
    this.coupletInput2.nativeElement.focus();
  }

  focusNextCouplet() {
    this.poemCoupletFocusService.coupletFinished(this.coupletIndex);
  }

  onFocus($event): void {
    this.focus = true;
    this.poemCoupletFocusService.coupletFocussed(this);
  }

  checkForEnterPress($event): boolean {
    return ($event.keyCode === 13);
  }

  onRhymeSelected($event) {
    this.stanza.line2 += $event;
  }

}
