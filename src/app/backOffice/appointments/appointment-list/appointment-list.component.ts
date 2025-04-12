import { Component, OnInit } from '@angular/core';
import { AppointmentService } from 'src/app/services/appointment.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(10px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ],
  providers: [DatePipe]
})
export class AppointmentListComponent implements OnInit {
  appointments: any[] = [];
  filteredAppointments: any[] = [];
  searchTerm = '';
  errorMessage = '';
  isLoading = true;

  constructor(
    private appointmentService: AppointmentService,
    private router: Router,
    private route: ActivatedRoute,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(() => {
      this.loadAppointments();
    });
  }

  loadAppointments(): void {
    this.appointmentService.getAllAppointments().subscribe({
      next: (data: any[]) => {
        this.appointments = data;
        this.filterAppointments();
        this.isLoading = false;
      },
      error: (err: any) => {
        this.errorMessage = 'Failed to load appointments';
        this.isLoading = false;
      }
    });
  }

  filterAppointments(): void {
    if (!this.searchTerm) {
      this.filteredAppointments = [...this.appointments];
      return;
    }

    const term = this.searchTerm.toLowerCase();
    this.filteredAppointments = this.appointments.filter(appt => {
      const formattedStart = this.datePipe.transform(appt.startTime, 'MMM d, yyyy, h:mm a') || '';
      const formattedEnd = this.datePipe.transform(appt.endTime, 'MMM d, yyyy, h:mm a') || '';
      
      return (
        appt.appointmentId.toString().includes(term) ||
        (appt.patient?.userId.toString() || '').toLowerCase().includes(term) ||
        (appt.professional?.userId.toString() || '').toLowerCase().includes(term) ||
        appt.status.toLowerCase().includes(term) ||
        formattedStart.toLowerCase().includes(term) ||
        formattedEnd.toLowerCase().includes(term)
      );
    });
  }

  deleteAppointment(id: number): void {
    this.appointmentService.deleteAppointment(id).subscribe({
      next: () => {
        this.appointments = this.appointments.filter(a => a.appointmentId !== id);
        this.filterAppointments(); // Update filtered list after deletion
      },
      error: (err: any) => {
        this.errorMessage = 'Failed to delete appointment';
      }
    });
  }

  editAppointment(id: number): void {
    this.router.navigate(['admin/appointments', id, 'edit']);
  }

  exportToExcel(): void {
    this.appointmentService.exportToExcel().subscribe(
      (blob: Blob) => {
        this.downloadFile(blob, 'appointments.xlsx');
      },
      (error) => {
        console.error('Error exporting appointments to Excel:', error);
      }
    );
  }

  private downloadFile(data: Blob, filename: string): void {
    const url = window.URL.createObjectURL(data);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }
  
}