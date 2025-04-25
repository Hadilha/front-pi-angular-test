import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticsAdminComponent } from './statistics-admin.component';

describe('StatisticsAdminComponent', () => {
  let component: StatisticsAdminComponent;
  let fixture: ComponentFixture<StatisticsAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StatisticsAdminComponent]
    });
    fixture = TestBed.createComponent(StatisticsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
