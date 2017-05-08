import {Component, Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import { RhymeService } from "app/rhyme.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  model: any;
  searching = false;
  searchFailed = false;
  mockWords = ["splash","mash","ash"];
  currentWord = "";
  rhymeHints = [];


  constructor(private _service: RhymeService) {}

  search = (text$: Observable<string>) =>
    text$
      .debounceTime(300)
      .distinctUntilChanged()
      .do(() => this.searching = true)
      .switchMap(words =>{
        var lastWord = words.split(" ").pop();
        this.currentWord = lastWord;
        return this._service.search(lastWord)
            .do(() => {
              this.searchFailed = false;
            })
            .catch(() => {
              this.rhymeHints = this.mockWords;
              this.searchFailed = true;
              return Observable.of(this.mockWords);
            })
        })
      .do(() => this.searching = false);

    newLine(line) {
      console.log('new line');
    }
}