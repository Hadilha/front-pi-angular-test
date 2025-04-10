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
        userId: ['', [Validators.required, Validators.min(1)]]
      }),
      events: [''] // Will be parsed to JSON on submit
    });

    this.calendarId = Number(this.route.snapshot.paramMap.get('id'));
    this.isEditMode = !!this.calendarId;

    if (this.isEditMode && this.calendarId) {
      this.calendarService.getCalendarById(this.calendarId).subscribe({
        next: (cal) => {
          this.calendarForm.patchValue({
            owner: { userId: cal.owner.userId },
            events: cal.events ? JSON.stringify(cal.events, null, 2) : ''
          });
        },
        error: (err) =>
          (this.errorMessage = 'Failed to load calendar data. Please try again.')
      });
    }
  }

  onSubmit(): void {
    if (this.calendarForm.invalid) {
      this.errorMessage = 'Please fill in all required fields correctly.';
      return;
    }

    const formValue = { ...this.calendarForm.value };
    if (formValue.events) {
      try {
        formValue.events = JSON.parse(formValue.events);
      } catch (e) {
        this.errorMessage = 'Invalid JSON format for events. Please correct and try again.';
        return;
      }
    } else {
      formValue.events = {}; // Default to empty object if not provided
    }

    const calendarPayload: Calendar = formValue;

    if (this.isEditMode && this.calendarId) {
      calendarPayload.calendarId = this.calendarId;
      this.calendarService.updateCalendar(calendarPayload).subscribe({
        next: () => this.router.navigate(['/admin/calendars']),
        error: (err) => (this.errorMessage = 'Failed to update calendar. Please try again.')
      });
    } else {
      this.calendarService.createCalendar(calendarPayload).subscribe({
        next: () => this.router.navigate(['/admin/calendars']),
        error: (err) => (this.errorMessage = 'Failed to create calendar. Please try again.')
      });
    }
  }
}
