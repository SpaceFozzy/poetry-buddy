import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ApplicationRef,
  Output,
  EventEmitter
} from '@angular/core';
import { SwalComponent } from "@toverux/ngsweetalert2/dist/types+es2015-modules";

@Component({
  moduleId: module.id,
  selector: 'rhyme-suggestion',
  templateUrl: 'rhyme-suggestion.component.html',
  styleUrls: ['./rhyme-suggestion.component.css']
})

export class RhymeSuggestionComponent implements OnInit {
  @ViewChild('confirmAlert') private confirmAlert: SwalComponent;
  @Input() searchText: string = null;
  @Input() isLoading: boolean;
  @Input() searchError: boolean;
  @Input() rhymeHints: string[];
  @Output() onRhymeSelected: EventEmitter<string> = new EventEmitter<string>();

  selectedWord: string;

  constructor(private applicationRef: ApplicationRef) { }

  ngOnInit() { }

  onHintSelected(hint: string) {
    this.selectedWord = hint;
    this.applicationRef.tick();

    this.confirmAlert.show().then(() => {
      this.onRhymeSelected.emit(hint);
    }).catch(() => {
      /* confirmation dialogue canceled */
    });
  }

}