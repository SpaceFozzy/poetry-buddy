import { TestBed, inject } from '@angular/core/testing';

import { PoemCoupletFocusService } from './poem-couplet-focus.service';
import { FormsModule } from "@angular/forms";

describe('PoemCoupletFocusService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PoemCoupletFocusService],
      imports: [ FormsModule ]
    });
  });

  it('should ...', inject([PoemCoupletFocusService], (service: PoemCoupletFocusService) => {
    expect(service).toBeTruthy();
  }));
});
