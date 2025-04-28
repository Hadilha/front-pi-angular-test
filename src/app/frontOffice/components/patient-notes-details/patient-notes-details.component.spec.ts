import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientNotesDetailsComponent } from './patient-notes-details.component';

describe('PatientNotesDetailsComponent', () => {
  let component: PatientNotesDetailsComponent;
  let fixture: ComponentFixture<PatientNotesDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PatientNotesDetailsComponent]
    });
    fixture = TestBed.createComponent(PatientNotesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
