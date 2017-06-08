import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

import { ClipboardButtonComponent } from './clipboard-button.component';

import { SwalComponent } from "@toverux/ngsweetalert2/dist/types+es2015-modules";
import { SweetAlert2Module } from '@toverux/ngsweetalert2';

import { ClipboardModule } from "ngx-clipboard";

describe('ClipboardButtonComponent', () => {
  let component: ClipboardButtonComponent;
  let fixture: ComponentFixture<ClipboardButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClipboardButtonComponent ],
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
});
