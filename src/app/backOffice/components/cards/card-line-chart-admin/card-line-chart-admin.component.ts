

import { Component, AfterViewInit, Input } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { UserService, AppointmentStats } from 'src/app/Services/user.service';

@Component({
  selector: 'app-card-line-chart-admin',
  templateUrl: './card-line-chart-admin.component.html',
})
export class CardLineChartAdminComponent implements AfterViewInit {
  @Input() daysAhead: number = 7;
  stats!: AppointmentStats;

  constructor(private userService: UserService) {}

  ngAfterViewInit() {
    this.userService.getUpcomingAppointments(this.daysAhead)
      .subscribe((data) => {
        this.stats = data;
        this.renderChart();
      });
  }

  private renderChart() {
    const labels = Object.keys(this.stats);
    const values = labels.map((d) => this.stats[d]);
    const ctx = (document.getElementById('appt-chart') as HTMLCanvasElement)
      .getContext('2d')!;
    new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets: [{
          label: 'Appointments',
          data: values,
          borderColor: '#EE204D',
          backgroundColor: '#ed8936',
          fill: false,
        }]
      },
      options: {
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { grid: { display: false } },
          y: { min: 0 }
        }
      }
    });
  }
}
