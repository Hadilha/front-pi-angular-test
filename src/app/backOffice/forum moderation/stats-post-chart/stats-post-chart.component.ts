import { Component, AfterViewInit } from "@angular/core";
import { Chart, ChartConfiguration, ChartDataset } from "chart.js";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: "app-stats-post-chart",
  templateUrl: "./stats-post-chart.component.html",
})
export class StatsPostChartComponent implements AfterViewInit {
  postsPerDayData: any[] = [];
  topUsersData: any[] = [];

  constructor(private http: HttpClient) {}

  ngAfterViewInit() {
    this.http.get<any[]>('http://localhost:8089/forum/posts/stats/posts-per-day').subscribe(data => {
      this.postsPerDayData = data;
      this.renderPostsPerDayChart();
    });

    this.http.get<any[]>('http://localhost:8089/forum/posts/stats/top-users').subscribe(data => {
      this.topUsersData = data;
      this.renderTopUsersChart();
    });
  }

  renderPostsPerDayChart() {
    const postsPerDayLabels = this.postsPerDayData.map(d => d.label);
    const postsPerDayValues = this.postsPerDayData.map(d => d.value);

    const config: ChartConfiguration<'line'> = {
      type: "line", // Change to line chart
      data: {
        labels: postsPerDayLabels,
        datasets: [
          {
            label: 'Posts per Day',
            borderColor: "#4c51bf",
            backgroundColor: "rgba(76, 81, 191, 0.2)", // Line chart background color with transparency
            data: postsPerDayValues,
            fill: true, // Fill the area under the line
            borderWidth: 2,
          } as ChartDataset<'line', number[]>,
        ],
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: false,
            text: "Posts per Day",
            color: "white",
          },
          legend: {
            labels: {
              color: "white",
            },
            align: "end",
            position: "bottom",
          },
          tooltip: {
            mode: "index",
            intersect: false,
          },
        },
        scales: {
          x: {
            ticks: {
              color: "rgba(255,255,255,.7)",
            },
            display: true,
            grid: {
              color: "rgba(33, 37, 41, 0.3)",
            },
          },
          y: {
            ticks: {
              color: "rgba(255,255,255,.7)",
            },
            display: true,
            grid: {
              color: "rgba(255, 255, 255, 0.15)",
            },
          },
        },
      },
    };

    const canvas = document.getElementById("posts-per-day-chart") as HTMLCanvasElement;
    const ctx = canvas?.getContext("2d");

    if (ctx) {
      new Chart(ctx, config);
    }
  }

  renderTopUsersChart() {
    const topUsersLabels = this.topUsersData.map(d => d.label);
    const topUsersValues = this.topUsersData.map(d => d.value);

    const config: ChartConfiguration<'line'> = {
      type: "line", // Change to line chart
      data: {
        labels: topUsersLabels,
        datasets: [
          {
            label: 'Top Active Users',
            borderColor: "#4c51bf",
            backgroundColor: "rgba(76, 81, 191, 0.2)", // Line chart background color with transparency
            data: topUsersValues,
            fill: true, // Fill the area under the line
            borderWidth: 2,
          } as ChartDataset<'line', number[]>,
        ],
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: false,
            text: "Top Active Users",
            color: "white",
          },
          legend: {
            labels: {
              color: "white",
            },
            align: "end",
            position: "bottom",
          },
          tooltip: {
            mode: "index",
            intersect: false,
          },
        },
        scales: {
          x: {
            ticks: {
              color: "rgba(255,255,255,.7)",
            },
            display: true,
            grid: {
              color: "rgba(33, 37, 41, 0.3)",
            },
          },
          y: {
            ticks: {
              color: "rgba(255,255,255,.7)",
            },
            display: true,
            grid: {
              color: "rgba(255, 255, 255, 0.15)",
            },
          },
        },
      },
    };

    const canvas = document.getElementById("top-users-chart") as HTMLCanvasElement;
    const ctx = canvas?.getContext("2d");

    if (ctx) {
      new Chart(ctx, config);
    }
  }
}
