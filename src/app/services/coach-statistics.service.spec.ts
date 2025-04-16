import { TestBed } from '@angular/core/testing';

import { CoachStatisticsService } from './coach-statistics.service';

describe('CoachStatisticsService', () => {
  let service: CoachStatisticsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoachStatisticsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
