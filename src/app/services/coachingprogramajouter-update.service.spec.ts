import { TestBed } from '@angular/core/testing';

import { CoachingprogramajouterUpdateService } from './coachingprogramajouter-update.service';

describe('CoachingprogramajouterUpdateService', () => {
  let service: CoachingprogramajouterUpdateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoachingprogramajouterUpdateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
