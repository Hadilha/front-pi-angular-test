import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentStatisticsComponent } from './appointment-statistics.component';

describe('AppointmentStatisticsComponent', () => {
  let component: AppointmentStatisticsComponent;
  let fixture: ComponentFixture<AppointmentStatisticsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppointmentStatisticsComponent]
    });
    fixture = TestBed.createComponent(AppointmentStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
