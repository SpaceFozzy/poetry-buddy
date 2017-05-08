import { Injectable } from "@angular/core";
import {Http, URLSearchParams} from '@angular/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class RhymeService {
  constructor(private http: Http) {}

  search(term: string) {
    if (term === '') {
      return Observable.of([]);
    }

    let rhymeUrl = `https://api.datamuse.com/words?rel_rhy=${term}`;
    let params = new URLSearchParams();
    
    return this.http
      .get(rhymeUrl, {search: params})
      .map(response => {
        let words = response.json().map((rhyme)=>{
          return rhyme.word;
        });
        return <string[]> words;
      });
  }
}