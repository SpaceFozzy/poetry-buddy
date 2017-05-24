import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { FormsModule }   from '@angular/forms';

import { RhymeService } from "app/rhyme.service";
import { PoemCoupletFocusService } from './poem-couplet/poem-couplet-focus.service';
import { Subscription } from "rxjs/Subscription";
import { Observable } from "rxjs/Observable";

/* Stub out the required services for testing */
const rhymeServiceStub = {
  search() {}
};

const poemCoupletFocusServiceStub = {
  focusedCouplet$: Observable.create(observer => {}),
  focusedCoupletElement$: Observable.create(observer => {})
};

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [
        AppComponent
      ],
      providers: [{provide: RhymeService, useValue: rhymeServiceStub }, {provide: PoemCoupletFocusService, useValue: poemCoupletFocusServiceStub }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('should render "Poetry Buddy" in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Poetry Buddy');
  }));
});
