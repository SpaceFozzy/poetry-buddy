import { TestBed, inject } from '@angular/core/testing';

import { RhymeService } from './rhyme.service';

describe('RhymeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RhymeService]
    });
  });

  it('should ...', inject([RhymeService], (service: RhymeService) => {
    expect(service).toBeTruthy();
  }));
});
