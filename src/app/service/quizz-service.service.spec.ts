import { TestBed } from '@angular/core/testing';

import { QuizzServiceService } from './quizz-service.service';

describe('QuizzServiceService', () => {
  let service: QuizzServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuizzServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
