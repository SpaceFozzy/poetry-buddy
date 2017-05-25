import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import { RhymeService } from "app/rhyme.service";
import { Observable } from "rxjs/Observable";
import { PoemCoupletFocusService } from "./poem-couplet-focus.service";

@Component({
  selector: 'poem-couplet',
  templateUrl: './poem-couplet.component.html',
  styleUrls: ['./poem-couplet.component.css']
})
export class PoemCoupletComponent implements OnInit {
  @ViewChild('coupletInput1') private coupletInput1;
  @Input() line1: string;
  @Input() line2: string;
  @Input() coupletIndex: number;
  @Input() showText: boolean;

  @Output() hintsUpdated = new EventEmitter<string[]>();

  private inputSubject: BehaviorSubject<string> = new BehaviorSubject("");
  private mockWords = [];
  private rhymeHints = [];
  private searchFailed = false;
  private unchanged = true;
  private isLoading = false;

  private line1Array: string[];

  public focus = false;
  public inputObservable$ = this.inputSubject.asObservable();
  public currentWord = "";
  public searchText: string = null;

  constructor(private _service: RhymeService, private poemCoupletFocusService: PoemCoupletFocusService, public elementRef: ElementRef) { }

  ngOnInit() {

    this.poemCoupletFocusService.focusedCouplet$.subscribe((index) => {
      if (index === this.coupletIndex) {
        if (this.coupletInput1) {
          this.coupletInput1.nativeElement.focus()
        } else {
          setTimeout(()=>{this.coupletInput1.nativeElement.focus()},10); 
        }
      }
    });

    this.inputObservable$
      .debounceTime(300)
      .subscribe((words) => {
        let lastWord = words.split(" ").pop().replace(/[?.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
        this.currentWord = lastWord;
        this.isLoading = true;
        this._service.search(lastWord)
          .subscribe((response) => {
            this.rhymeHints = response;
            this.hintsUpdated.emit(response);
            
            this.searchFailed = false;
            this.isLoading = false;
          }, (error) => {
            this.rhymeHints = this.mockWords;
            this.hintsUpdated.emit(this.mockWords);
            
            this.searchFailed = true;
            this.isLoading = false;
          })
      });

  }

  hintSelected(hint) {
  }

  inputUpdate1($event) {
    let words = $event.target.value.trim();
    
    this.searchText = words.split(" ").pop().replace(/[?.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");

    this.isLoading = true;
    this.unchanged = false;

    this.checkForEnterPress(event);
    this.inputSubject.next(words);
    
  }

  onBlur() {
    this.focus = false;
  }

  onFocus1($event) {
    this.inputSubject.next($event.target.value.trim());
    this.focus = true;
    this.poemCoupletFocusService.coupletFocussed(this);
  }

  onFocus2() {
    this.focus = true;
    this.poemCoupletFocusService.coupletFocussed(this);
  }

  onLine2Keyup($event) {
    this.checkForEnterPress(event);
  }

  checkForEnterPress($event) {
    if ($event.keyCode === 13) {
      let nextElement = $event.target.nextElementSibling;
      if (nextElement && 'type' in nextElement && nextElement.type === "text") {
        nextElement.focus();
      } else {
        this.poemCoupletFocusService.coupletFinished(this.coupletIndex);
      }
      return false;
    }
  }

}
