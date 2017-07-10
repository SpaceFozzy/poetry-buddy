import { Component, Input, SimpleChanges, ViewChild, Output, EventEmitter } from '@angular/core';
import { SwalComponent } from "@toverux/ngsweetalert2/dist/types+es2015-modules";

@Component({
  selector: 'clipboard-button',
  templateUrl: './clipboard-button.component.html'
})

export class ClipboardButtonComponent {
  @ViewChild('successAlert') private successAlert: SwalComponent;
  @ViewChild('failureAlert') private failureAlert: SwalComponent;
  @Input() poem: any[];
  @Output() showText: EventEmitter<any> = new EventEmitter();

  public poemText: string = "";

  constructor() { }

  prepareText() {
    this.poemText = this.convertPoemToText(this.poem);
  }

  convertPoemToText(poem): string {
    let poemText = ""
    this.poem.forEach((couplet) => {
      poemText += couplet.line1 + "\n";
      poemText += couplet.line2 + "\n";
    })
    return poemText;
  }

  cbOnSuccess() {
    this.successAlert.show();
  }

  cbOnError() {
    this.failureAlert.show();
  }

  onShowText() {
    this.showText.emit();
  }
}
