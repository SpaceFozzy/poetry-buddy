import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

import { ClipboardButtonComponent } from './clipboard-button.component';

import { SweetAlert2Module } from '@toverux/ngsweetalert2';

import { ClipboardModule } from "ngx-clipboard";

describe('ClipboardButtonComponent', () => {
  let component: ClipboardButtonComponent;
  let fixture: ComponentFixture<ClipboardButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ClipboardButtonComponent],
      imports: [ClipboardModule,
        SweetAlert2Module.forRoot({
          buttonsStyling: false
        })],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClipboardButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should convert a poem to text object for clipboard properly', () => {
    component.poem = [{ line1: "line1", line2: 'line2' }, { line1: "line3", line2: 'line4' }]
    let convertedPoem = component.convertPoemToText(component.poem);
    expect(convertedPoem).toBe("line1\nline2\nline3\nline4\n");
  });

});
