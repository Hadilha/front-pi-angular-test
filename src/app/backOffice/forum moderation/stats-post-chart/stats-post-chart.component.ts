import { Component, AfterViewInit, HostListener } from "@angular/core";
import { Chart, ChartConfiguration } from "chart.js";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: "app-stats-post-chart",
  templateUrl: "./stats-post-chart.component.html",
})
export class StatsPostChartComponent implements AfterViewInit {
  postsPerDayData: any[] = [];
  topUsersData: any[] = [];
  private postsPerDayChart: Chart | undefined;
  private topUsersChart: Chart | undefined;

  constructor(private http: HttpClient) {}

  ngAfterViewInit() {
    this.loadData();
  }

  private loadData() {
    this.http.get<any[]>('http://localhost:8089/forum/posts/stats/posts-per-day').subscribe(data => {
      this.postsPerDayData = data;
      this.renderPostsPerDayChart();
    });

    this.http.get<any[]>('http://localhost:8089/forum/posts/stats/top-users').subscribe(data => {
      this.topUsersData = data;
      this.renderTopUsersChart();
    });
  }

  private renderPostsPerDayChart() {
    const config: ChartConfiguration = {
      type: "line",
      data: {
        labels: this.postsPerDayData.map(d => d.label),
        datasets: [{
          label: 'Posts per Day',
          borderColor: "#4c51bf",
          backgroundColor: "rgba(76, 81, 191, 0.2)",
          data: this.postsPerDayData.map(d => d.value),
          fill: true,
          borderWidth: 2,
        }]
      },
      options: this.getCommonOptions()
    };

    this.postsPerDayChart = this.renderChart("posts-per-day-chart", config);
  }

  private renderTopUsersChart() {
    const config: ChartConfiguration = {
      type: "line",
      data: {
        labels: this.topUsersData.map(d => d.label),
        datasets: [{
          label: 'Top Active Users',
          borderColor: "#4c51bf",
          backgroundColor: "rgba(76, 81, 191, 0.2)",
          data: this.topUsersData.map(d => d.value),
          fill: true,
          borderWidth: 2,
        }]
      },
      options: this.getCommonOptions()
    };

    this.topUsersChart = this.renderChart("top-users-chart", config);
  }

  private getCommonOptions(): ChartConfiguration['options'] {
    return {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
          labels: {
            color: '#fff',
            font: {
              size: 14
            }
          }
        },
        tooltip: {
          mode: "index",
          intersect: false
        }
      },
      scales: {
        x: {
          ticks: {
            color: "rgba(255,255,255,.7)",
            font: {
              size: 12
            }
          },
          grid: {
            color: "rgba(255, 255, 255, 0.1)"
          }
        },
        y: {
          ticks: {
            color: "rgba(255,255,255,.7)",
            font: {
              size: 12
            }
          },
          grid: {
            color: "rgba(255, 255, 255, 0.1)"
          }
        }
      }
    };
  }

  private renderChart(chartId: string, config: ChartConfiguration): Chart | undefined {
    const canvas = document.getElementById(chartId) as HTMLCanvasElement;
    const ctx = canvas?.getContext('2d');
    
    if (!ctx) return undefined;

    // Destroy existing chart
    const existingChart = Chart.getChart(canvas);
    if (existingChart) existingChart.destroy();

    return new Chart(ctx, config);
  }

  @HostListener('window:resize')
  onWindowResize() {
    if (this.postsPerDayChart) this.postsPerDayChart.resize();
    if (this.topUsersChart) this.topUsersChart.resize();
  }
}