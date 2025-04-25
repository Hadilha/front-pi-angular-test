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

  paginated = true;
  currentPage = 0;
  pageSize = 5;
  totalItems = 0;
  totalPages = 0;

  constructor(
    private appointmentService: AppointmentService,
    private router: Router,
    private route: ActivatedRoute,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['page']) {
        this.currentPage = +params['page'];
      }
      if (params['size']) {
        this.pageSize = +params['size'];
      }
      this.loadAppointments();
    });
  }

  loadAppointments(): void {
    this.isLoading = true;
    this.appointmentService.getAllAppointments(this.paginated, this.currentPage, this.pageSize).subscribe({
      next: (data: any) => {
        if (this.paginated) {
          // Handle paginated response
          this.appointments = data.content;
          this.totalItems = data.totalElements;
          this.totalPages = data.totalPages;
        } else {
          // Handle non-paginated response
          this.appointments = data;
        }
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
        
        // If this was the last item on the page, go back a page (unless we're on page 0)
        if (this.appointments.length === 0 && this.currentPage > 0) {
          this.goToPage(this.currentPage - 1);
        } else {
          // Otherwise, just reload the current page
          this.loadAppointments();
        }
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

  goToPage(page: number): void {
    if (page >= 0 && page < this.totalPages) {
      this.currentPage = page;
      // Update URL with new page
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { page: this.currentPage, size: this.pageSize },
        queryParamsHandling: 'merge'
      });
      this.loadAppointments();
    }
  }

  nextPage(): void {
    this.goToPage(this.currentPage + 1);
  }

  previousPage(): void {
    this.goToPage(this.currentPage - 1);
  }

  changePageSize(size: number): void {
    this.pageSize = size;
    this.currentPage = 0; // Reset to first page when changing page size
    // Update URL with new size
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: this.currentPage, size: this.pageSize },
      queryParamsHandling: 'merge'
    });
    this.loadAppointments();
  }

  togglePagination(): void {
    this.paginated = !this.paginated;
    this.currentPage = 0;
    this.loadAppointments();
  }

  getPaginationIndex(index: number): number {
    const maxPagesToShow = 5;
    
    // If total pages is less than maxPagesToShow, just return the index
    if (this.totalPages <= maxPagesToShow) {
      return index;
    }
    
    // Calculate the starting page number
    let startPage = Math.max(0, this.currentPage - Math.floor(maxPagesToShow / 2));
    
    // Adjust if we're near the end
    if (startPage + maxPagesToShow > this.totalPages) {
      startPage = this.totalPages - maxPagesToShow;
    }
    
    return startPage + index;

  }
  
}