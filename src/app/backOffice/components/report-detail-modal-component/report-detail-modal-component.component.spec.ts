import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportDetailModalComponentComponent } from './report-detail-modal-component.component';

describe('ReportDetailModalComponentComponent', () => {
  let component: ReportDetailModalComponentComponent;
  let fixture: ComponentFixture<ReportDetailModalComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReportDetailModalComponentComponent]
    });
    fixture = TestBed.createComponent(ReportDetailModalComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
