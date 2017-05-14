import { TestBed, inject } from '@angular/core/testing';

import { PoemCoupletFocusService } from './poem-couplet-focus.service';

describe('PoemCoupletFocusService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PoemCoupletFocusService]
    });
  });

  it('should ...', inject([PoemCoupletFocusService], (service: PoemCoupletFocusService) => {
    expect(service).toBeTruthy();
  }));
});
