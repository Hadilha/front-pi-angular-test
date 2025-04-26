import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsPrescriptionComponent } from './details-prescription.component';

describe('DetailsPrescriptionComponent', () => {
  let component: DetailsPrescriptionComponent;
  let fixture: ComponentFixture<DetailsPrescriptionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailsPrescriptionComponent]
    });
    fixture = TestBed.createComponent(DetailsPrescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
