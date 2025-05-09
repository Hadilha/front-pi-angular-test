import { TestBed } from '@angular/core/testing';

import { ForumService } from './forum-space.service';

describe('ForumService', () => {
  let service: ForumService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ForumService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
