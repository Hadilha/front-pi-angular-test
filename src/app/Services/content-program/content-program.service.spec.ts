import { TestBed } from '@angular/core/testing';

import { ProgramContentService } from './content-program.service';

describe('ProgramContentService', () => {
  let service: ProgramContentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProgramContentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
