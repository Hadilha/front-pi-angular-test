import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoodTrackerManagementComponent } from './mood-tracker-management.component';

describe('MoodTrackerManagementComponent', () => {
  let component: MoodTrackerManagementComponent;
  let fixture: ComponentFixture<MoodTrackerManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MoodTrackerManagementComponent]
    });
    fixture = TestBed.createComponent(MoodTrackerManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
