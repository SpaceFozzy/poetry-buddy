import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PoemLineComponent } from './poem-line.component';

describe('PoemLineComponent', () => {
  let component: PoemLineComponent;
  let fixture: ComponentFixture<PoemLineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoemLineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoemLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
