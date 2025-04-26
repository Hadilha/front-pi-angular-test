import { TestBed } from '@angular/core/testing';

import { ForumNotificationService } from './forum-notification.service';

describe('ForumNotificationService', () => {
  let service: ForumNotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ForumNotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
