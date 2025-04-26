import { Component, AfterViewInit } from '@angular/core';
import { Chart, ChartConfiguration } from 'chart.js';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-stats-reaction-chart',
  templateUrl: './stats-reaction-chart.component.html'
})
export class StatsReactionChartComponent implements AfterViewInit {
  reactionDistribution: any[] = [];
  mostReactedPosts: any[] = [];

  constructor(private http: HttpClient) {}

  ngAfterViewInit() {
    this.http.get<any[]>('http://localhost:8089/forum/reactions/stats/distribution').subscribe({
      next: data => {
        this.reactionDistribution = data;
        this.isLoadingDistribution = false;
        this.renderReactionDistribution();
      },
      error: () => this.isLoadingDistribution = false
    });

    this.http.get<any[]>('http://localhost:8089/forum/reactions/stats/most-reacted').subscribe({
      next: data => {
        this.mostReactedPosts = data;
        this.isLoadingMostReacted = false;
        this.renderMostReactedPosts();
      },
      error: () => this.isLoadingMostReacted = false
    });
  }

  private renderReactionDistribution() {
    const config: ChartConfiguration = {
      type: 'doughnut',
      data: {
        labels: this.reactionDistribution.map(d => d.reactionType),
        datasets: [{
          data: this.reactionDistribution.map(d => d.count),
          backgroundColor: ['#4CAF50', '#2196F3', '#FF5722', '#9C27B0'],
          hoverOffset: 4
        }]
      },
      options: {
        plugins: {
          legend: { 
            position: 'right', 
            labels: { color: 'white' } 
          },
          tooltip: { 
            enabled: true 
          }
        }
      }
    };
    this.renderChart('reaction-distribution-chart', config);
  }

  private renderMostReactedPosts() {
    const config: ChartConfiguration = {
      type: 'bar',
      data: {
        labels: this.mostReactedPosts.map(d => d.postTitle), // Changed from d.reactionType
        datasets: [{
          label: 'Reactions',
          data: this.mostReactedPosts.map(d => d.count),
          backgroundColor: '#FF4081'
        }]
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        scales: { 
          x: { 
            ticks: { color: 'white' } 
          }, 
          y: { 
            ticks: { color: 'white' } 
          } 
        }
      }
    };
    this.renderChart('most-reacted-posts-chart', config);
  }

  private renderChart(chartId: string, config: ChartConfiguration) {
    const canvas = document.getElementById(chartId) as HTMLCanvasElement;
    
    // Destroy existing chart
    const existingChart = Chart.getChart(canvas);
    if (existingChart) existingChart.destroy();
  
    const ctx = canvas.getContext('2d');
    if (ctx) {
      new Chart(ctx, {
        ...config,
        options: {
          ...config.options,
          maintainAspectRatio: false, // Add this
          responsive: true
        }
      });
    }
  }

  isLoadingDistribution = true;
  isLoadingMostReacted = true;

  
}
