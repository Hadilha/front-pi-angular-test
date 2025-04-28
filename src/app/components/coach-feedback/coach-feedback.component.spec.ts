import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachFeedbackComponent } from './coach-feedback.component';

describe('CoachFeedbackComponent', () => {
  let component: CoachFeedbackComponent;
  let fixture: ComponentFixture<CoachFeedbackComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoachFeedbackComponent]
    });
    fixture = TestBed.createComponent(CoachFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
