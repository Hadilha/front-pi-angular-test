import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePrescriptionComponent } from './update-prescription.component';

describe('UpdatePrescriptionComponent', () => {
  let component: UpdatePrescriptionComponent;
  let fixture: ComponentFixture<UpdatePrescriptionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdatePrescriptionComponent]
    });
    fixture = TestBed.createComponent(UpdatePrescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
