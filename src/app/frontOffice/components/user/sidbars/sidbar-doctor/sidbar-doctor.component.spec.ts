import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidbarDoctorComponent } from './sidbar-doctor.component';

describe('SidbarDoctorComponent', () => {
  let component: SidbarDoctorComponent;
  let fixture: ComponentFixture<SidbarDoctorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SidbarDoctorComponent]
    });
    fixture = TestBed.createComponent(SidbarDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
