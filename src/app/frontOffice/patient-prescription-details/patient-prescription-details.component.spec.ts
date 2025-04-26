import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientPrescriptionDetailsComponent } from './patient-prescription-details.component';

describe('PatientPrescriptionDetailsComponent', () => {
  let component: PatientPrescriptionDetailsComponent;
  let fixture: ComponentFixture<PatientPrescriptionDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PatientPrescriptionDetailsComponent]
    });
    fixture = TestBed.createComponent(PatientPrescriptionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
