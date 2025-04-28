import { TestBed } from '@angular/core/testing';

import { ForumSpaceService } from './forum-space.service';

describe('ForumSpaceService', () => {
  let service: ForumSpaceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ForumSpaceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
