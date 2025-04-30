import { TestBed } from '@angular/core/testing';

import { AiDoctorNoteService } from './ai-doctor-note.service';

describe('AiDoctorNoteService', () => {
  let service: AiDoctorNoteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AiDoctorNoteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
