import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientspaceComponent } from './patientspace.component';

describe('PatientspaceComponent', () => {
  let component: PatientspaceComponent;
  let fixture: ComponentFixture<PatientspaceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PatientspaceComponent]
    });
    fixture = TestBed.createComponent(PatientspaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
