import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import { RhymeService } from "app/rhyme.service";
import { Observable } from "rxjs/Observable";

@Component({
  selector: 'poem-couplet',
  templateUrl: './poem-couplet.component.html',
  styleUrls: ['./poem-couplet.component.css']
})
export class PoemCoupletComponent implements OnInit {
  @Input() line1: string;
  @Input() line2: string;
  @Input() showText: boolean;
  @Output() hintsUpdated = new EventEmitter<string[]>();
  @Output() loading = new EventEmitter<string>();

  private inputSubject: BehaviorSubject<string> = new BehaviorSubject("");
  private searching = false;
  private mockWords = [];
  private rhymeHints = [];
  private searchFailed = false;

  private line1Array: string[];

  public focus = false;
  public inputObservable$ = this.inputSubject.asObservable();
  public currentWord = "";

  constructor(private _service: RhymeService) { }

  ngOnInit() {
    this.inputObservable$
      .debounceTime(300)
      .subscribe((words)=>{
        
        var lastWord = words.split(" ").pop().replace(/[?.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
        this.currentWord = lastWord;
        this.loading.emit(this.currentWord);
        console.log(this.currentWord);
        this._service.search(lastWord)
            .subscribe((response) => {
              this.rhymeHints = response;
              this.hintsUpdated.emit(response);
              this.searchFailed = false;
            }, (error) => {
              this.rhymeHints = this.mockWords;
              this.hintsUpdated.emit(this.mockWords);
              this.searchFailed = true;
            })
      });
  }

  hintSelected(hint){
    console.log("Hint selected", hint);
  }

  inputUpdate1($event){  
    let text = $event.target.value;
    this.inputSubject.next($event.target.value.trim());
    this.loading.emit($event.target.value.split(" ").pop());
  }

  onBlur() {
    this.focus = false;
  }

  onFocus1($event) {
    let text = $event.target.value;
    this.inputSubject.next($event.target.value.trim());
    this.loading.emit($event.target.value.split(" ").pop());
    this.focus = true;
  }

  onFocus2() {
    this.focus = true;
  }

}
