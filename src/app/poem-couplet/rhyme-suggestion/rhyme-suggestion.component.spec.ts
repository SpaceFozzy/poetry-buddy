import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { RhymeSuggestionComponent } from './rhyme-suggestion.component';

describe('RhymeSuggestionComponent', () => {
  let component: RhymeSuggestionComponent;
  let fixture: ComponentFixture<RhymeSuggestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ],
      declarations: [ RhymeSuggestionComponent ],
      providers: [],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RhymeSuggestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
});
