import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule} from '@angular/http';

import { AppComponent } from './app.component';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { RhymeService } from "app/rhyme.service";
import { PoemCoupletComponent } from './poem-couplet/poem-couplet.component';
import { PoemCoupletFocusService } from './poem-couplet/poem-couplet-focus.service';

import { RhymeSuggestionComponent } from './poem-couplet/rhyme-suggestion/rhyme-suggestion.component';

@NgModule({
  declarations: [
    AppComponent,
    PoemCoupletComponent,
    RhymeSuggestionComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgbModule.forRoot(),
    JsonpModule
  ],
  providers: [RhymeService, PoemCoupletFocusService],
  bootstrap: [AppComponent]
})
export class AppModule { }
