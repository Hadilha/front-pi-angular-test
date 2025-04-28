import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientPrescriptionComponent } from './patient-prescription.component';

describe('PatientPrescriptionComponent', () => {
  let component: PatientPrescriptionComponent;
  let fixture: ComponentFixture<PatientPrescriptionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PatientPrescriptionComponent]
    });
    fixture = TestBed.createComponent(PatientPrescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
