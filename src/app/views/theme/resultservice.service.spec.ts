import { TestBed } from '@angular/core/testing';

import { ResultserviceService } from './result.service';

describe('ResultserviceService', () => {
  let service: ResultserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResultserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
