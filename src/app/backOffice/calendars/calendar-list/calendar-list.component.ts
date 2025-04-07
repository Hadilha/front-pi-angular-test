import { Component, OnInit } from '@angular/core';
import { Calendar, CalendarService } from 'src/app/services/calendar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-calendar-list',
  templateUrl: './calendar-list.component.html',
  styleUrls: ['./calendar-list.component.css']
})
export class CalendarListComponent implements OnInit {
  calendars: Calendar[] = [];
  errorMessage = '';

  constructor(private calendarService: CalendarService, private router: Router) {}

  ngOnInit(): void {
    this.loadCalendars();
  }

  loadCalendars(): void {
    this.calendarService.getCalendars().subscribe({
      next: (data) => this.calendars = data,
      error: (err) => this.errorMessage = 'Failed to load calendars. Please try again later.'
    });
  }

  deleteCalendar(id?: number): void {
    if (id === undefined) {
      console.error('Calendar ID is undefined');
      this.errorMessage = 'Cannot delete calendar: ID is missing.';
      return;
    }
    if (confirm('Are you sure you want to delete this calendar?')) {
      this.calendarService.deleteCalendar(id).subscribe({
        next: () => this.loadCalendars(),
        error: (err) => {
          console.error(err);
          this.errorMessage = 'Failed to delete calendar. Please try again.';
        }
      });
    }
  }

  editCalendar(calendar: Calendar): void {
    if (calendar.calendarId === undefined) {
      console.error('Calendar ID is undefined');
      this.errorMessage = 'Cannot edit calendar: ID is missing.';
      return;
    }
    this.router.navigate(['/admin/calendars', calendar.calendarId, 'edit']);
  }
}