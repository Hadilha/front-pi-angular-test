import { TestBed } from '@angular/core/testing';

import { CoachingProgramService } from './coaching-program.service';

describe('CoachingProgramService', () => {
  let service: CoachingProgramService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoachingProgramService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
