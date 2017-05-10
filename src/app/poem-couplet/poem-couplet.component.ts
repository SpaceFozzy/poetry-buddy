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
  @Output() onHintsUpdated = new EventEmitter<string[]>();

  private inputSubject: BehaviorSubject<string> = new BehaviorSubject("");
  private searching = false;
  private mockWords = ["splash","mash","ash"];
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
      .distinctUntilChanged()
      .subscribe((words)=>{
        var lastWord = words.split(" ").pop();
        this.currentWord = lastWord;
        this._service.search(lastWord)
            .subscribe((response) => {
              this.rhymeHints = response;
              this.onHintsUpdated.emit(response);
              this.searchFailed = false;
            }, (error) => {
              this.rhymeHints = this.mockWords;
              this.onHintsUpdated.emit(this.mockWords);
              this.searchFailed = true;
            })
      });
  }

  hintSelected(hint){
    console.log("Hint selected", hint);
  }

  inputUpdate1($event){  
    let text = $event.target.innerText;
    this.inputSubject.next($event.target.innerText);
    
  }

  onBlur() {
    this.focus = false;
  }

  onFocus() {
    this.focus = true;
  }

}
