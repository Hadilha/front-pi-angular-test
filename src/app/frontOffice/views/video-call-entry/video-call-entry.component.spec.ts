import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoCallEntryComponent } from './video-call-entry.component';

describe('VideoCallEntryComponent', () => {
  let component: VideoCallEntryComponent;
  let fixture: ComponentFixture<VideoCallEntryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VideoCallEntryComponent]
    });
    fixture = TestBed.createComponent(VideoCallEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
