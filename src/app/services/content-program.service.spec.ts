import { TestBed } from '@angular/core/testing';

import { ContentProgramService } from './content-program.service';

describe('ContentProgramService', () => {
  let service: ContentProgramService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContentProgramService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
