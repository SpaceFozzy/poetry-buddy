import { Component, OnInit, Input, SimpleChanges, ViewChild } from '@angular/core';
import { SwalComponent } from "@toverux/ngsweetalert2/dist/types+es2015-modules";

@Component({
  selector: 'clipboard-button',
  templateUrl: './clipboard-button.component.html',
  styleUrls: ['./clipboard-button.component.css']
})
export class ClipboardButtonComponent implements OnInit {
  @ViewChild('successAlert') private successAlert: SwalComponent;
  @ViewChild('failureAlert') private failureAlert: SwalComponent;
  @Input() stanzas: any[];
  poemText: string = "";
  constructor() { }

  ngOnInit() {
    
  }

  prepareText() {
    let poemText = ""
    this.stanzas.forEach((stanza)=>{
      poemText += stanza.line1 + "\n";
      poemText += stanza.line2 + "\n";
    })
    this.poemText = poemText;
  }

  cbOnSuccess() {
    this.successAlert.show()
  }

  cbOnError() {
    this.failureAlert.show()
  }
}
