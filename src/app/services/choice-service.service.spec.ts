import { TestBed } from '@angular/core/testing';

import { ChoiceServiceService } from './choice-service.service';

describe('ChoiceServiceService', () => {
  let service: ChoiceServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChoiceServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
