import { TestBed } from '@angular/core/testing';

import { DeleteconfirmationService } from './deleteconfirmation.service';

describe('DeleteconfirmationService', () => {
  let service: DeleteconfirmationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeleteconfirmationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
