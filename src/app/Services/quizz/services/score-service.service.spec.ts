import { TestBed } from '@angular/core/testing';

import { ScoreServiceService } from './score-service.service';

describe('ScoreServiceService', () => {
  let service: ScoreServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScoreServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
