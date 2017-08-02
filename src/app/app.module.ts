import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';

import { SweetAlert2Module } from '@toverux/ngsweetalert2';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ClipboardModule } from 'ngx-clipboard';
import { AppComponent } from './app.component';

import { ClipboardButtonComponent } from './clipboard-button/clipboard-button.component';
import { PoemCoupletComponent } from './poem-couplet/poem-couplet.component';
import { PoemCoupletFocusService } from './shared/poem-couplet-focus.service';
import { RhymeService } from "./poem-couplet/rhyme-service/rhyme.service";
import { RhymeSuggestionComponent } from './poem-couplet/rhyme-suggestion/rhyme-suggestion.component';


@NgModule({
  declarations: [
    AppComponent,
    PoemCoupletComponent,
    RhymeSuggestionComponent,
    ClipboardButtonComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    NgbModule.forRoot(),
    JsonpModule,
    ClipboardModule,
    SweetAlert2Module.forRoot({
      buttonsStyling: false
    })
  ],
  providers: [RhymeService, PoemCoupletFocusService],
  bootstrap: [AppComponent]
})
export class AppModule { }
