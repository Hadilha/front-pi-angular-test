import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CredentialsPatientComponent } from './credentials-patient.component';

describe('CredentialsPatientComponent', () => {
  let component: CredentialsPatientComponent;
  let fixture: ComponentFixture<CredentialsPatientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CredentialsPatientComponent]
    });
    fixture = TestBed.createComponent(CredentialsPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
