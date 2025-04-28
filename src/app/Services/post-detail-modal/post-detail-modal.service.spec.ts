import { TestBed } from '@angular/core/testing';

import { PostDetailModalService } from './post-detail-modal.service';

describe('PostDetailModalService', () => {
  let service: PostDetailModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostDetailModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
