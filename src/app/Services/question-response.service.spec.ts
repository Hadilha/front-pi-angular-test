import { TestBed } from '@angular/core/testing';

import { QuestionResponseService } from './question-response.service';

describe('QuestionResponseService', () => {
  let service: QuestionResponseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuestionResponseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
