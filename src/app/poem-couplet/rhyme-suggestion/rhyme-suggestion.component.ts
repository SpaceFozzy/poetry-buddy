import { Component, OnInit, Input } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'rhyme-suggestion',
    templateUrl: 'rhyme-suggestion.component.html',
    styleUrls: ['./rhyme-suggestion.component.css']
})

export class RhymeSuggestionComponent implements OnInit {
    @Input() currentWord: string = null;
    @Input() searchText: string = null;
    @Input() isLoading: boolean;
    @Input() rhymeHints: string[];

    constructor() { }

    ngOnInit() { }
}