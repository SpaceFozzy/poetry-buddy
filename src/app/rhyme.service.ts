import { Injectable } from "@angular/core";
import { Http, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RhymeService {

  constructor(private http: Http) { }

  cachedData: any = {};

  search(term: string): Observable<string[]> {
    if (term === '') {
      return Observable.of([]);
    }

    if (term in this.cachedData) {
      return Observable.of(this.cachedData[term]);
    }
    let rhymeUrl = `https://api.datamuse.com/words?rel_rhy=${term}`;
    let params = new URLSearchParams();

    return this.http
      .get(rhymeUrl, { search: params })
      .map(response => {
        let words = response.json().map((rhyme) => {
          return rhyme.word;
        });
        this.cachedData[term] = words;
        debugger;
        return <string[]>words;
      });
  }
}