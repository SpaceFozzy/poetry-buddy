import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PoemCoupletComponent } from './poem-couplet.component';

describe('PoemCoupletComponent', () => {
  let component: PoemCoupletComponent;
  let fixture: ComponentFixture<PoemCoupletComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoemCoupletComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoemCoupletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
