import { async, ComponentFixture, TestBed } from '@angular/core/testing';

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
