import { Injectable } from "@angular/core";
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RhymeService {
	private cachedRhymes: any = {};	
	
	constructor(private http: Http) { }

	search(word: string): Observable<string[]> {
		if (word === '') {
			return Observable.of([]);
		}

		if (word in this.cachedRhymes) {
			return Observable.of(this.cachedRhymes[word]);
		}
		
		let rhymeUrl = `https://api.datamuse.com/words?rel_rhy=${word}`;

		return this.http.get(rhymeUrl).map(response => {			
			let rhymes = response.json().map((rhyme) => {
				return rhyme.word;
			});
			this.cachedRhymes[word] = rhymes;
			return <string[]>rhymes;
		});
	}
}