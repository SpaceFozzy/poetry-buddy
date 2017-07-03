import { Injectable } from "@angular/core";
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RhymeService {
	private rhymeCache: any = {};	
	private cacheLimit: number = 15;
	private cacheIndex: string[] = [];
	
	constructor(private http: Http) { }

	search(word: string): Observable<string[]> {
		if (word === '') {
			return Observable.of([]);
		}

		if (word in this.rhymeCache) {
			return Observable.of(this.rhymeCache[word]);
		}
		
		let rhymeUrl = `https://api.datamuse.com/words?rel_rhy=${word}`;

		return this.http.get(rhymeUrl).map(response => {	
			let rhymes = response.json().map((rhyme) => {
				return rhyme.word;
			});
			this.updateRhymeCache(word, rhymes);
			return <string[]>rhymes;
		});
	}

	updateRhymeCache(word: string, rhymes: string[]) : void {
		let isRoomInCache = (this.cacheIndex.length < this.cacheLimit);
		if (isRoomInCache) {
			this.pushWordToCache(word, rhymes);
		} else {
			this.removeCacheOldestWord();
			this.pushWordToCache(word, rhymes);
		}
	}

	pushWordToCache(word: string, rhymes: string[]) : void {
		this.cacheIndex.push(word);
		this.rhymeCache[word] = rhymes;
	}

	removeCacheOldestWord() : void {
		let oldestWordInCache = this.cacheIndex.shift();
		delete this.rhymeCache[oldestWordInCache];
	}
}