import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsPostChartComponent } from './stats-post-chart.component';

describe('StatsPostChartComponent', () => {
  let component: StatsPostChartComponent;
  let fixture: ComponentFixture<StatsPostChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StatsPostChartComponent]
    });
    fixture = TestBed.createComponent(StatsPostChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
