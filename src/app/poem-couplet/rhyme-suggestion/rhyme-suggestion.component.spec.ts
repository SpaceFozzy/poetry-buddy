import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { RhymeSuggestionComponent } from './rhyme-suggestion.component';

import { SweetAlert2Module } from '@toverux/ngsweetalert2';

describe('RhymeSuggestionComponent', () => {
  let component: RhymeSuggestionComponent;
  let fixture: ComponentFixture<RhymeSuggestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SweetAlert2Module.forRoot({
        buttonsStyling: false
      })],
      declarations: [RhymeSuggestionComponent],
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

  it('should show the rhyme list when not loading and hide it when it is loading', () => {
    component.isLoading = false;
    fixture.detectChanges();

    let element = fixture.debugElement.query(By.css('#rhyme-list'))
    expect(element).toBeTruthy();

    component.isLoading = true;
    fixture.detectChanges();

    element = fixture.debugElement.query(By.css('#rhyme-list'))
    expect(element).toBeFalsy();
  });

  it('should give the user feedback when loading rhymes', () => {
    component.searchText = "test";
    component.isLoading = true;
    fixture.detectChanges();

    let element = fixture.debugElement.query(By.css('#loading-rhymes'))
    expect(element).toBeTruthy();
  });

  it('should give the user feedback when no rhymes are found', () => {
    component.currentWord = "test"
    component.isLoading = false;
    component.rhymeHints = [];
    fixture.detectChanges();

    let element = fixture.debugElement.query(By.css('#no-rhymes-found'))
    expect(element).toBeTruthy();
  });

  it('should give the user feedback when rhymes are found', () => {
    component.currentWord = "test"
    component.isLoading = false;
    component.rhymeHints = ["best"];
    fixture.detectChanges();

    let element = fixture.debugElement.query(By.css('#rhymes-found'))
    expect(element).toBeTruthy();
  });

});
