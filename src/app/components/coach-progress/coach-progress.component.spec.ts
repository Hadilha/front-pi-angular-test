import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachProgressComponent } from './coach-progress.component';

describe('CoachProgressComponent', () => {
  let component: CoachProgressComponent;
  let fixture: ComponentFixture<CoachProgressComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoachProgressComponent]
    });
    fixture = TestBed.createComponent(CoachProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
