import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { PoemCoupletComponent } from './poem-couplet.component';
import { FormsModule } from "@angular/forms";

import { RhymeService } from "app/rhyme.service";
import { PoemCoupletFocusService } from './poem-couplet-focus.service';
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from "rxjs/Observable";

/* Stub out the required services for testing */
const rhymeServiceStub = {
  search() {}
};

const poemCoupletFocusServiceStub = {
  focusedCouplet$: Observable.create(observer => {}),
};

describe('PoemCoupletComponent', () => {
  let component: PoemCoupletComponent;
  let fixture: ComponentFixture<PoemCoupletComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [ PoemCoupletComponent ],
      providers: [{provide: RhymeService, useValue: rhymeServiceStub }, {provide: PoemCoupletFocusService, useValue: poemCoupletFocusServiceStub }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoemCoupletComponent);
    component = fixture.componentInstance;
    component.showText = false;
    component.stanza = {
          type: "couplet",
          line1: "",
          line2: ""
        }
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have two visible input elements when showText is false', () => {
    let inputCount = fixture.debugElement.nativeElement.querySelectorAll('input').length
    expect(inputCount).toBe(2);
  });

  it('should have no visible input elements when showText is true', () => {
    component.showText = true;
    fixture.detectChanges();

    let inputCount = fixture.debugElement.nativeElement.querySelectorAll('input').length
    expect(inputCount).toBe(0);
  });

  it('should have two visible paragraph elements when showText is true', () => {
    component.showText = true;
    fixture.detectChanges();

    let paragraphCount = fixture.debugElement.nativeElement.querySelectorAll('p').length
    expect(paragraphCount).toBe(2);
  });

  it('the rhyme-suggestion element does not exist when focus is false', () => {
    component.focus = false;
    fixture.detectChanges();
    
    let rhymeSuggestionCount = fixture.debugElement.nativeElement.querySelectorAll('rhyme-suggestion').length
    expect(rhymeSuggestionCount).toBe(0);
  });

});
