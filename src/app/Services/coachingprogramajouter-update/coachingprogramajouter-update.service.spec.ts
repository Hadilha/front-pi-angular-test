import { TestBed } from '@angular/core/testing';
import { CoachingProgramAjouterUpdateService } from './coachingprogramajouter-update.service';


describe('CoachingprogramajouterUpdateService', () => {
  let service: CoachingProgramAjouterUpdateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoachingProgramAjouterUpdateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
