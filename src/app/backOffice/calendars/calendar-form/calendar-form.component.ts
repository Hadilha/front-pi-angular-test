import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Calendar, CalendarService } from 'src/app/services/calendar.service';
import { ActivatedRoute, Router } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-calendar-form',
  templateUrl: './calendar-form.component.html',
  styleUrls: ['./calendar-form.component.css'],
  encapsulation: ViewEncapsulation.None,
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
    // Initialize form with an owner group and events array
    this.calendarForm = this.fb.group({
      owner: this.fb.group({
        userId: [null, [Validators.required, Validators.min(1)]]
      }),
      eventsArray: this.fb.array([])
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
    } else {
      // Add an empty event for new calendars
      this.addEvent();
    }
  }

  // Getter for the events form array
  get eventsArray() {
    return this.calendarForm.get('eventsArray') as FormArray;
  }

  // Add a new event form group
  addEvent() {
    const eventForm = this.fb.group({
      dateTime: ['', Validators.required],
      description: ['', Validators.required]
    });
    this.eventsArray.push(eventForm);
  }

  // Remove an event at specified index
  removeEvent(index: number) {
    this.eventsArray.removeAt(index);
  }

  private loadCalendar(id: number): void {
    this.isLoading = true;
    this.calendarService.getCalendarById(id).subscribe({
      next: (cal) => {
        // Set the owner ID
        this.calendarForm.patchValue({
          owner: { userId: cal.owner.userId }
        });
        
        // Clear the events array
        while (this.eventsArray.length) {
          this.eventsArray.removeAt(0);
        }
        
        // Convert events object to array format and add to form
        if (cal.events) {
          Object.entries(cal.events).forEach(([dateTime, description]) => {
            this.eventsArray.push(
              this.fb.group({
                dateTime: [dateTime, Validators.required],
                description: [description, Validators.required]
              })
            );
          });
        }
        
        // Add one empty event if no events exist
        if (this.eventsArray.length === 0) {
          this.addEvent();
        }
        
        this.isLoading = false;
      },
      error: (err) => {
        this.showError('Failed to load calendar data');
        this.isLoading = false;
      }
    });
  }

  onSubmit(): void {
    // Convert string input to number for user ID
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
      // Convert events array to object format
      const eventsObject: {[key: string]: string} = {};
      formValue.eventsArray.forEach((event: {dateTime: string, description: string}) => {
        if (event.dateTime && event.description) {
          eventsObject[event.dateTime] = event.description;
        }
      });
      
      // Replace eventsArray with events object
      delete formValue.eventsArray;
      formValue.events = eventsObject;

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

  // Add example events
  addExampleEvents(): void {
    // Clear existing events
    while (this.eventsArray.length) {
      this.eventsArray.removeAt(0);
    }
    
    // Add example events
    this.eventsArray.push(
      this.fb.group({
        dateTime: ['2024-12-31T10:00:00', Validators.required],
        description: ['Consultation', Validators.required]
      })
    );
    
    this.eventsArray.push(
      this.fb.group({
        dateTime: ['2024-12-31T14:00:00', Validators.required],
        description: ['Meeting', Validators.required]
      })
    );
  }
}