import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { RhymeService } from "app/rhyme.service";

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
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
  @Input() coupletLines: Stanza;
  @Input() coupletIndex: number; // Used to move focus between couplets on enter press
  @Input() showText: boolean;

  private line1Input = new FormControl();
  private rhymeHints: string[] = [];
  private isLoading: boolean = false;
  private searchFailed: boolean = false;

  public currentWord: string = "";
  public searchText: string = null;
  public isFocused: boolean = false;

  constructor(
    private rhymeService: RhymeService,
    private focusService: PoemCoupletFocusService,
    public element: ElementRef
  ) { }

  ngOnInit() {
    this.subscribeToLine1InputChanges();
    this.subscribeToFocusService();
  }

  // Subscribe to the input for line 1 to fetch rhymes when needed
  subscribeToLine1InputChanges() {
    this.line1Input.valueChanges
      .do((words) => {
        this.coupletLines.line1 = words; // First update the line 1 data model from the form model
      })
      .map(words => this.getLastWordInPhrase(words).trim()) // Then pass on an observable of the last trimmed word
      .distinctUntilChanged()
      .do((word) => {
        this.isLoading = true;
        this.searchText = word;
      })
      .debounceTime(1000)
      .subscribe((word) => {
        this.getRhymes(word);
      });
  }

  subscribeToFocusService() {
    this.focusService.focusedCoupletIndex$.subscribe((index) => {
      if (index === this.coupletIndex) { this.setFocus(); }
    });

    this.focusService.focusedCoupletElement$.subscribe((element: ElementRef) => {
      if (element !== this.element) { this.isFocused = false; }
    });
  }

  getLastWordInPhrase(phrase: string): string {
    return phrase.split(" ").pop().replace(/[?.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
  }

  getRhymes(wordToRhyme: string): void {
    this.currentWord = wordToRhyme;
    this.isLoading = true;

    this.rhymeService.search(wordToRhyme)
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

  onRhymeSelected(rhyme: string) {
    this.coupletLines.line2 += rhyme;
  }

  focusSecondInput(): void {
    this.coupletInput2.nativeElement.focus();
  }

  focusNextCouplet(): void {
    this.focusService.focusCouplet(this.coupletIndex + 1);
  }

  setFocus(): void {
    if (this.coupletInput1) {
      this.coupletInput1.nativeElement.focus()
    } else {
      // If this couplet is new and hasn't had time to render, set a small
      // delay to give it time to render before setting focus to the input.
      setTimeout(() => { this.coupletInput1.nativeElement.focus() }, 10);
    }
  }

  onFocus(): void {
    this.isFocused = true;
    this.focusService.coupletFocussed(this);
  }

}
