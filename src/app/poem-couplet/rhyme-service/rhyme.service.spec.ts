import { TestBed, inject } from '@angular/core/testing';
import { Http, URLSearchParams } from '@angular/http';

import { RhymeService } from './rhyme.service';

/* Stub out the required services for testing */
const httpStub = {

};

const rhymeServiceStub = {

};

describe('RhymeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: RhymeService, useValue: rhymeServiceStub }, { provide: Http, useValue: httpStub }]
    });
  });

  it('should ...', inject([RhymeService], (service: RhymeService) => {
    expect(service).toBeTruthy();
  }));
});


