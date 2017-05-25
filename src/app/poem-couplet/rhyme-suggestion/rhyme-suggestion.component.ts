import { Component, OnInit, Input } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'rhyme-suggestion',
    templateUrl: 'rhyme-suggestion.component.html',
    styleUrls: ['./rhyme-suggestion.component.css']
})

export class RhymeSuggestionComponent implements OnInit {
    @Input() currentWord: string = null;
    @Input() isLoadingWord: boolean;
    @Input() rhymeHints: string[];

    constructor() { }

    ngOnInit() { }
}