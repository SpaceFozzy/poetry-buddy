import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';

import { RhymeService } from "./poem-couplet/rhyme-service/rhyme.service";
import { PoemCoupletFocusService } from './shared/poem-couplet-focus.service';
import { Subscription } from "rxjs/Subscription";
import { Observable } from "rxjs/Observable";
import { ComponentFixture } from "@angular/core/testing";

/* Stub out the required services for testing */
const rhymeServiceStub = {
  search() { }
};

const poemCoupletFocusServiceStub = {
  focusedCoupletIndex$: Observable.create(observer => { }),
  focusedCoupletElement$: Observable.create(observer => { })
};

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [
        AppComponent
      ],
      providers: [{ provide: RhymeService, useValue: rhymeServiceStub }, { provide: PoemCoupletFocusService, useValue: poemCoupletFocusServiceStub }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', async(() => {
    fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('should render "Poetry Buddy" in a h1 tag', async(() => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Poetry Buddy');
  }));

  it('should show a poem-couplet component for every stanza', () => {
    component.poem = [
      {
        type: "couplet",
        line1: "",
        line2: ""
      },
      {
        type: "couplet",
        line1: "",
        line2: ""
      },
      {
        type: "couplet",
        line1: "",
        line2: ""
      }
    ]
    fixture.detectChanges();

    let coupletCount = fixture.debugElement.nativeElement.querySelectorAll('poem-couplet').length
    expect(coupletCount).toBe(3);
  });

  it('should create a new empty stanza properly when asked', () => {
    let stanza = component.createNewCouplet();
    expect(stanza.line1).toBe("");
    expect(stanza.line2).toBe("");
    expect(stanza.type).toBe("couplet");
  });

});
