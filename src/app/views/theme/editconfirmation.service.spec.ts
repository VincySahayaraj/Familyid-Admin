import { TestBed } from '@angular/core/testing';

import { EditconfirmationService } from './editconfirmation.service';

describe('EditconfirmationService', () => {
  let service: EditconfirmationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditconfirmationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
