import { TestBed } from '@angular/core/testing';

import { CopyconfirmationService } from './copyconfirmation.service';

describe('CopyconfirmationService', () => {
  let service: CopyconfirmationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CopyconfirmationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
