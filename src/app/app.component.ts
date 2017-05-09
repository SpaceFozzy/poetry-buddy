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
  currentWord = "";
  rhymeHints = [];
  lines = [];
  stanzas = [
    {
      type: "couplet",
      line1: "",
      line2: ""
    }
  ]


  constructor(private _service: RhymeService) {}

    insertCouplet(line) {
      console.log('new line');
      let newCouplet = {
        type: "couplet",
        line1: "",
        line2: ""
      }
      this.stanzas.push(newCouplet)
    }

    onHintsUpdated(hints: string[]){
      console.log('updating hints', hints);
      this.rhymeHints = hints;
    }
}