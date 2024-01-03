import { TestBed } from '@angular/core/testing';

import { CheckboxconfirmationService } from './checkboxconfirmation.service';

describe('CheckboxconfirmationService', () => {
  let service: CheckboxconfirmationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckboxconfirmationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
