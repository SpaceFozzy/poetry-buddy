import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import { RhymeService } from "app/rhyme.service";
import { Observable } from "rxjs/Observable";

@Component({
  selector: 'poem-line',
  templateUrl: './poem-line.component.html',
  styleUrls: ['./poem-line.component.css']
})
export class PoemLineComponent implements OnInit {

  private inputSubject: BehaviorSubject<string> = new BehaviorSubject("");
  private searching = false;
  private mockWords = ["splash","mash","ash"];
  private rhymeHints = [];
  private searchFailed = false;

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
              this.searchFailed = false;
            }, (error) => {
              this.rhymeHints = this.mockWords;
              this.searchFailed = true;
            })
      });
  }

  hintSelected(hint){
    console.log("Hint selected", hint);
  }

  inputUpdate($event){
    this.inputSubject.next($event.target.value);
  }

}
