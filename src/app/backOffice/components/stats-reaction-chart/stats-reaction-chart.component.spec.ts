import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsReactionChartComponent } from './stats-reaction-chart.component';

describe('StatsReactionChartComponent', () => {
  let component: StatsReactionChartComponent;
  let fixture: ComponentFixture<StatsReactionChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StatsReactionChartComponent]
    });
    fixture = TestBed.createComponent(StatsReactionChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
