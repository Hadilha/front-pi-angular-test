import { Component, OnInit } from '@angular/core';
import { ChartType } from 'angular-google-charts';
import { AppointmentService } from 'src/app/Services/appointment/appointment.service';


@Component({
  selector: 'app-appointment-statistics',
  templateUrl: './appointment-statistics.component.html',
  styleUrls: ['./appointment-statistics.component.css']
})
export class AppointmentStatisticsComponent implements OnInit {
  // Chart properties
  pieChartType = ChartType.PieChart;
  barChartType = ChartType.BarChart;
  pieChartData: any[] = [];
  barChartData: any[] = [];
  pieChartOptions: any = {
    title: 'Appointment Statistics by Status',
    height: 400,
    is3D: true,
    backgroundColor: 'transparent'
  };
  barChartOptions: any = {
    title: 'Appointment Statistics by Status',
    height: 400,
    bar: { groupWidth: '75%' },
    legend: { position: 'none' },
    backgroundColor: 'transparent'
  };
  chartColumnNames = ['Status', 'Count'];

  loading = true;
  error = false;

  constructor(private appointmentService: AppointmentService) { }

  ngOnInit(): void {
    this.loadStatistics();
  }

  loadStatistics(): void {
    this.loading = true;
    this.appointmentService.getAppointmentStatistics().subscribe({
      next: (stats) => {
        this.processStatistics(stats);
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching appointment statistics', error);
        this.error = true;
        this.loading = false;
      }
    });
  }

  processStatistics(stats: any): void {
    // Convert the stats object to array format for Google Charts
    this.pieChartData = [];
    this.barChartData = [];

    for (const [status, count] of Object.entries(stats)) {
      // Format status for display (replace underscores with spaces and capitalize)
      const formattedStatus = status.replace(/_/g, ' ')
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

      this.pieChartData.push([formattedStatus, count]);
      this.barChartData.push([formattedStatus, count]);
    }
  }

  refresh(): void {
    this.loadStatistics();
  }
}
