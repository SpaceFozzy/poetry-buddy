import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule} from '@angular/http';

import { AppComponent } from './app.component';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { RhymeService } from "app/rhyme.service";
import { PoemLineComponent } from './poem-line/poem-line.component';

@NgModule({
  declarations: [
    AppComponent,
    PoemLineComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgbModule.forRoot(),
    JsonpModule
  ],
  providers: [RhymeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
