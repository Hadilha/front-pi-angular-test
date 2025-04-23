import { Component, AfterViewInit } from "@angular/core";
import { Chart, ChartConfiguration, ChartDataset } from "chart.js";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: "app-stats-comment-chart",
  templateUrl: "./stats-comment-chart.component.html",
})
export class StatsCommentChartComponent implements AfterViewInit {
  commentsPerDayData: any[] = [];
  popularPostsData: any[] = [];

  constructor(private http: HttpClient) {}

  ngAfterViewInit() {
    this.http.get<any[]>('http://localhost:8089/forum/comments/stats').subscribe(data => {
      this.commentsPerDayData = data;
      this.renderCommentsPerDayChart();
    });

    this.http.get<any[]>('http://localhost:8089/forum/comments/stats/popular-posts').subscribe(data => {
      this.popularPostsData = data;
      this.renderPopularPostsChart();
    });
  }

  renderCommentsPerDayChart() {
    const labels = this.commentsPerDayData.map(d => d.period);
    const values = this.commentsPerDayData.map(d => d.count);

    const config: ChartConfiguration<'line'> = {
      type: "line",
      data: {
        labels: labels,
        datasets: [{
          label: 'Comments per Day',
          borderColor: "#4CAF50",
          backgroundColor: "rgba(76, 175, 80, 0.2)",
          data: values,
          fill: true,
          borderWidth: 2,
        } as ChartDataset<'line', number[]>],
      },
      options: { /* Same options structure as post chart */ }
    };

    this.renderChart("comments-per-day-chart", config);
  }

  renderPopularPostsChart() {
    const labels = this.popularPostsData.map(d => d.postTitle);
    const values = this.popularPostsData.map(d => d.commentCount);

    const config: ChartConfiguration<'bar'> = {
      type: "bar",
      data: {
        labels: labels,
        datasets: [{
          label: 'Most Commented Posts',
          backgroundColor: "#2196F3",
          borderColor: "#1976D2",
          data: values,
          borderWidth: 1,
        }]
      },
      options: { /* Similar to post chart options */ }
    };

    this.renderChart("popular-posts-chart", config);
  }

  private renderChart(chartId: string, config: ChartConfiguration) {
    const canvas = document.getElementById(chartId) as HTMLCanvasElement;
    const ctx = canvas?.getContext("2d");
    if (ctx) new Chart(ctx, config);
  }
}