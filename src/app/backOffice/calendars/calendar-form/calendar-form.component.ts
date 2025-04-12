import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Calendar, CalendarService } from 'src/app/services/calendar.service';
import { ActivatedRoute, Router } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-calendar-form',
  templateUrl: './calendar-form.component.html',
  styleUrls: ['./calendar-form.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-in', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class CalendarFormComponent implements OnInit {
  calendarForm!: FormGroup;
  calendarId?: number;
  isEditMode = false;
  errorMessage = '';
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private calendarService: CalendarService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Initialize form with an owner group
    this.calendarForm = this.fb.group({
      owner: this.fb.group({
        userId: [null, [Validators.required, Validators.min(1)]]
      }),
      events: [''] // Will be parsed to JSON on submit
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.calendarId = Number(id);
      if (isNaN(this.calendarId)) {
        this.showError('Invalid calendar ID');
        return;
      }
      this.isEditMode = true;
      this.loadCalendar(this.calendarId);
    }
  }

  private loadCalendar(id: number): void {
    this.isLoading = true;
    this.calendarService.getCalendarById(id).subscribe({
      next: (cal) => {
        this.calendarForm.patchValue({
          owner: { userId: cal.owner.userId },
          events: cal.events ? JSON.stringify(cal.events, null, 2) : ''
        });
        this.isLoading = false;
      },
      error: (err) => {
        this.showError('Failed to load calendar data');
        this.isLoading = false;
      }
    });
  }

  onSubmit(): void {
    // Convert string input to number
    this.calendarForm.patchValue({
      owner: { 
        userId: Number(this.calendarForm.value.owner?.userId) || null 
      }
    });
    
    if (this.calendarForm.invalid) {
      this.showError('Please fill in all required fields correctly.');
      this.calendarForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    const formValue = { ...this.calendarForm.value };
    
    try {
      if (formValue.events) {
        try {
          formValue.events = JSON.parse(formValue.events);
        } catch (e) {
          this.showError('Invalid JSON format for events. Please correct and try again.');
          this.isLoading = false;
          return;
        }
      } else {
        formValue.events = {}; // Default to empty object if not provided
      }

      const calendarPayload: Calendar = formValue;

      const operation = this.isEditMode && this.calendarId
        ? this.calendarService.updateCalendar({ ...calendarPayload, calendarId: this.calendarId })
        : this.calendarService.createCalendar(calendarPayload);

      operation.subscribe({
        next: () => {
          this.router.navigate(['/admin/calendars'], {
            queryParams: { refresh: new Date().getTime() },
            queryParamsHandling: 'merge'
          });
        },
        error: (err) => {
          this.showError(this.isEditMode 
            ? 'Failed to update calendar. Please try again.'
            : 'Failed to create calendar. Please try again.');
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

  useExampleJson(): void {
    const exampleJson = `{
  "2024-12-31T10:00:00": "Consultation",
  "2024-12-31T14:00:00": "Meeting"
}`;
    this.calendarForm.patchValue({
      events: exampleJson
    });
  }
  
  
}