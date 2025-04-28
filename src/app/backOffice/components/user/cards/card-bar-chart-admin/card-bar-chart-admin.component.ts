import { Component, AfterViewInit, Input } from '@angular/core';
import Chart from 'chart.js/auto';
import { UserService, RegistrationStats } from 'src/app/Services/user/user.service';


@Component({
  selector: 'app-card-bar-chart-admin',
  templateUrl: './card-bar-chart-admin.component.html',
  styleUrls: ['./card-bar-chart-admin.component.css']
})
export class CardBarChartAdminComponent implements AfterViewInit {
  @Input() daysBack: number = 7;
  stats!: RegistrationStats;

  constructor(private userService: UserService) {}

  ngAfterViewInit() {
    this.userService.getRegistrationStats(this.daysBack).subscribe(data => {
      this.stats = data;
      this.renderChart();
    });
  }

  private renderChart() {
    const labels = Object.keys(this.stats);
    const values = labels.map(d => this.stats[d]);

    const ctx = (document.getElementById('registration-chart') as HTMLCanvasElement)
      .getContext('2d')!;

    new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets: [{
          label: 'New Registrations',
          data: values,
          borderColor: '#008B8B',
          backgroundColor: '#3182ce',
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
