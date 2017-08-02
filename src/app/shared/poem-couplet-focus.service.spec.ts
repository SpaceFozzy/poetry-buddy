import { TestBed, inject } from '@angular/core/testing';

import { FormsModule } from "@angular/forms";
import { PoemCoupletFocusService } from './poem-couplet-focus.service';

describe('PoemCoupletFocusService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PoemCoupletFocusService],
      imports: [FormsModule]
    });
  });

  it('should ...', inject([PoemCoupletFocusService], (service: PoemCoupletFocusService) => {
    expect(service).toBeTruthy();
  }));
});
