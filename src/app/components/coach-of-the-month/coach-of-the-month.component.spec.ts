import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachOfTheMonthComponent } from './coach-of-the-month.component';

describe('CoachOfTheMonthComponent', () => {
  let component: CoachOfTheMonthComponent;
  let fixture: ComponentFixture<CoachOfTheMonthComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoachOfTheMonthComponent]
    });
    fixture = TestBed.createComponent(CoachOfTheMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
