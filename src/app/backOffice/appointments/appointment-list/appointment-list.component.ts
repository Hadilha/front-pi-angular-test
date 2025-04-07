import { Component, OnInit } from '@angular/core';
import { AppointmentService } from 'src/app/services/appointment.service';

import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css']
})
export class AppointmentListComponent implements OnInit {
  appointments: any[] = [];
  errorMessage = '';
  isLoading = true;

  constructor(
    private appointmentService: AppointmentService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(() => {
      this.loadAppointments();
    });
  }

  loadAppointments(): void {
    this.appointmentService.getAllAppointments().subscribe({
      next: (data: any) => {  // Add type
        this.appointments = data;
        this.isLoading = false;
      },
      error: (err: any) => {  // Add type
        this.errorMessage = 'Failed to load appointments';
        this.isLoading = false;
      }
    });
  }
  
  deleteAppointment(id: number): void {
    this.appointmentService.deleteAppointment(id).subscribe({
      next: () => {
        this.appointments = this.appointments.filter(a => a.appointmentId !== id);
      },
      error: (err: any) => {  // Add type
        this.errorMessage = 'Failed to delete appointment';
      }
    });
  }

  editAppointment(id: number): void {
    this.router.navigate(['admin/appointments', id, 'edit']);
  }
  

}