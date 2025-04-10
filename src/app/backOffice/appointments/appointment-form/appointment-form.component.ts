import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { AppointmentService } from 'src/app/services/appointment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';
enum AppointmentStatus {
  SCHEDULED = 'SCHEDULED',
  COMPLETED = 'COMPLETED',
  CANCELED = 'CANCELED',
}

@Component({
  selector: 'app-appointment-form',
  templateUrl: './appointment-form.component.html',
  styleUrls: ['./appointment-form.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-in', style({ opacity: 1 }))
      ])
    ])
  ]
})

export class AppointmentFormComponent implements OnInit {
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
      endTime: ['', [Validators.required]],
      notes: [''],
      status: [AppointmentStatus.SCHEDULED, Validators.required]
    }, { validators: this.dateRangeValidator, updateOn: 'blur' });
  }

  getStatusDisplayName(status: AppointmentStatus): string {
    switch(status) {
      case AppointmentStatus.SCHEDULED: return 'Scheduled';
      case AppointmentStatus.COMPLETED: return 'Completed';
      case AppointmentStatus.CANCELED: return 'Canceled';
      default: return status;
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

  private toLocalDateTime(isoString: string): string {
    return isoString.slice(0, 16);
  }

  private futureDateValidator(control: AbstractControl): { [key: string]: any } | null {
    const selectedDate = new Date(control.value);
    return selectedDate < new Date() ? { pastDate: true } : null;
  }

  private dateRangeValidator(control: AbstractControl): { [key: string]: any } | null {
    const start = control.get('startTime')?.value;
    const end = control.get('endTime')?.value;
    return start && end && new Date(start) >= new Date(end) ? { dateRange: true } : null;
  }

  onSubmit(): void {
    // Convert string inputs to numbers
    this.appointmentForm.patchValue({
      patient: { 
        userId: Number(this.appointmentForm.value.patient?.userId) || null 
      },
      professional: { 
        userId: Number(this.appointmentForm.value.professional?.userId) || null 
      }
    });
  
    if (this.appointmentForm.invalid) {
      this.showError('Please fill in all required fields correctly.');
      this.appointmentForm.markAllAsTouched();
      return;
    }
  
    this.isLoading = true;
    const formValue = this.appointmentForm.value;
    
    try {
      const appointmentData = {
        patient: { userId: formValue.patient.userId },
        professional: { userId: formValue.professional.userId },
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
  
  private showError(message: string): void {
    this.errorMessage = message;
    setTimeout(() => this.errorMessage = '', 5000);
  }
  ngAfterViewInit() {
    console.log('Form Status:', this.appointmentForm.status);
    console.log('Patient ID Control:', this.appointmentForm.get('patient.userId'));
  }
}