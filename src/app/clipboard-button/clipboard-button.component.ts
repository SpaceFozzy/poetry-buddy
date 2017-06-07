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
}
