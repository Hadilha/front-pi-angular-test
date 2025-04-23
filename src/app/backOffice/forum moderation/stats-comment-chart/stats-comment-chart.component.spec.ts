import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsCommentChartComponent } from './stats-comment-chart.component';

describe('StatsCommentChartComponent', () => {
  let component: StatsCommentChartComponent;
  let fixture: ComponentFixture<StatsCommentChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StatsCommentChartComponent]
    });
    fixture = TestBed.createComponent(StatsCommentChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
