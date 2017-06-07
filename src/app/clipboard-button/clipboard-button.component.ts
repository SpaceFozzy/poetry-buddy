import { Component, OnInit, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'clipboard-button',
  templateUrl: './clipboard-button.component.html',
  styleUrls: ['./clipboard-button.component.css']
})
export class ClipboardButtonComponent implements OnInit {
  @Input() stanzas: any;
  constructor() { }

  ngOnInit() {
    
  }

  getClipboardText() {
    let poemText = "";
    this.stanzas.forEach((stanza)=>{
      poemText += stanza.line1;
      poemText += stanza.line2;
    });

    return poemText;
  }

  cbOnSuccess() {
    console.log("clipboard success!");
  }

  cbOnError() {
    console.log("clipboard error!");
  }
}
