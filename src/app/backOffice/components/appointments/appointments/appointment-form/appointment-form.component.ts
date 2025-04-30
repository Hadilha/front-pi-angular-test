import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Component, OnInit, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { AppointmentService } from 'src/app/Services/appointment/appointment.service';


enum AppointmentStatus {
  SCHEDULED = 'SCHEDULED',
  COMPLETED = 'COMPLETED',
  CANCELED = 'CANCELED',
}

@Component({
  selector: 'app-appointment-form',
  templateUrl: './appointment-form.component.html',
  styleUrls: ['./appointment-form.component.css'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(10px)' }),
        animate('300ms ease-in', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class AppointmentFormComponent implements OnInit, AfterViewInit {
  public AppointmentStatus = AppointmentStatus;
  appointmentForm: FormGroup;
  isEditMode = false;
  errorMessage = '';
  isLoading = false;
  statusOptions = Object.values(AppointmentStatus);
  appointmentId?: number;

  constructor(
    private fb: FormBuilder,
    private appointmentService: AppointmentService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.appointmentForm = this.fb.group({
      patient: this.fb.group({
        userId: [null, [Validators.required, Validators.min(1)]]
      }),
      professional: this.fb.group({
        userId: [null, [Validators.required, Validators.min(1)]]
      }),
      startTime: ['', [Validators.required, this.futureDateValidator]],
      endTime: ['', [Validators.required, this.futureDateValidator]],
      notes: [''],
      status: [AppointmentStatus.SCHEDULED, Validators.required]
    }, { validators: this.dateRangeValidator, updateOn: 'blur' });
  }

  /**
   * Calculate form completion progress
   */
  calculateFormProgress(): number {
    const requiredControls = [
      this.appointmentForm.get('patient.userId'),
      this.appointmentForm.get('professional.userId'),
      this.appointmentForm.get('startTime'),
      this.appointmentForm.get('endTime'),
      this.appointmentForm.get('status')
    ];

    const filledControls = requiredControls.filter(control =>
      control?.value !== null &&
      control?.value !== undefined &&
      control?.value !== ''
    );

    return Math.round((filledControls.length / requiredControls.length) * 100);
  }

  /**
   * Get status display name
   */
  getStatusDisplayName(status: AppointmentStatus): string {
    switch(status) {
      case AppointmentStatus.SCHEDULED: return 'Scheduled';
      case AppointmentStatus.COMPLETED: return 'Completed';
      case AppointmentStatus.CANCELED: return 'Canceled';
      default: return status as string;
    }
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.appointmentId = Number(id);
      if (isNaN(this.appointmentId)) {
        this.showError('Invalid appointment ID');
        return;
      }
      this.isEditMode = true;
      this.loadAppointment(this.appointmentId);
    }
  }

  /**
   * Load appointment data for edit mode
   */
  private loadAppointment(id: number): void {
    this.isLoading = true;
    this.appointmentService.getAppointmentById(id).subscribe({
      next: (appointment) => {
        this.appointmentForm.patchValue({
          patient: { userId: appointment.patient.userId },
          professional: { userId: appointment.professional.userId },
          startTime: this.toLocalDateTime(appointment.startTime),
          endTime: this.toLocalDateTime(appointment.endTime),
          notes: appointment.notes,
          status: appointment.status
        });
        this.isLoading = false;
      },
      error: (err) => {
        this.showError('Failed to load appointment');
        this.isLoading = false;
      }
    });
  }

  /**
   * Convert ISO string to local datetime format
   */
  private toLocalDateTime(isoString: string): string {
    return isoString.slice(0, 16);
  }

  /**
   * Validate that date is in the future
   */
  private futureDateValidator(control: AbstractControl): { [key: string]: any } | null {
    const selectedDate = new Date(control.value);
    return selectedDate < new Date() ? { pastDate: true } : null;
  }

  /**
   * Validate that end time is after start time
   */
  private dateRangeValidator(control: AbstractControl): { [key: string]: any } | null {
    const start = control.get('startTime')?.value;
    const end = control.get('endTime')?.value;
    return start && end && new Date(start) >= new Date(end) ? { dateRange: true } : null;
  }

  /**
   * Handle form submission with confirmation
   */
  onSubmit(): void {
    if (this.appointmentForm.invalid) {
      this.showError('Please fill in all required fields correctly.');
      this.appointmentForm.markAllAsTouched();
      return;
    }

    // Optional: Add confirmation dialog
    if (confirm(`Are you sure you want to ${this.isEditMode ? 'update' : 'create'} this appointment?`)) {
      this.saveAppointment();
    }
  }

  /**
   * Save appointment data
   */
  private saveAppointment(): void {
    this.isLoading = true;
    this.errorMessage = '';
    const formValue = this.appointmentForm.value;

    try {
      const appointmentData = {
        patient: { userId: Number(formValue.patient.userId) },
        professional: { userId: Number(formValue.professional.userId) },
        startTime: new Date(formValue.startTime).toISOString(),
        endTime: new Date(formValue.endTime).toISOString(),
        notes: formValue.notes,
        status: formValue.status
      };

      const operation = this.isEditMode && this.appointmentId
        ? this.appointmentService.updateAppointment(this.appointmentId, appointmentData)
        : this.appointmentService.createAppointment(appointmentData);

      operation.subscribe({
        next: () => {
          this.router.navigate(['/admin/appointments'], {
            queryParams: { refresh: new Date().getTime() },
            queryParamsHandling: 'merge'
          });
        },
        error: (err) => {
          this.showError(this.isEditMode
            ? 'Failed to update appointment. Please try again.'
            : 'Failed to create appointment. Please try again.');
          this.isLoading = false;
        },
        complete: () => this.isLoading = false
      });
    } catch (error) {
      this.showError('An unexpected error occurred. Please try again.');
      this.isLoading = false;
    }
  }

  /**
   * Show error message with auto-dismiss
   */
  private showError(message: string): void {
    this.errorMessage = message;
    setTimeout(() => this.errorMessage = '', 5000);
  }

  /**
   * Mark all form controls as touched to trigger validation
   */
  markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  ngAfterViewInit() {
    console.log('Form Status:', this.appointmentForm.status);
    console.log('Patient ID Control:', this.appointmentForm.get('patient.userId'));
  }
}
