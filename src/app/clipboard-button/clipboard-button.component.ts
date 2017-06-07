import { Component, OnInit, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'clipboard-button',
  templateUrl: './clipboard-button.component.html',
  styleUrls: ['./clipboard-button.component.css']
})
export class ClipboardButtonComponent implements OnInit {
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
    console.log("success!");
  }

  cbOnError() {
    console.log("clipboard error!");
  }
}
