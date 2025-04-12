import { Component, Input, OnInit } from '@angular/core';
import { Calendar, CalendarService } from 'src/app/services/calendar.service';
import { Router } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-calendar-list',
  templateUrl: './calendar-list.component.html',
  styleUrls: ['./calendar-list.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(10px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class CalendarListComponent implements OnInit {
  calendars: Calendar[] = [];
  filteredCalendars: Calendar[] = [];
  searchTerm: string = '';
  errorMessage = '';
  isLoading: boolean = true;

  constructor(private calendarService: CalendarService, private router: Router) {}

  ngOnInit(): void {
    this.loadCalendars();
  }

  loadCalendars(): void {
    this.isLoading = true;
    this.errorMessage = '';
    
    this.calendarService.getCalendars().subscribe({
      next: (data) => {
        this.calendars = data;
        this.filteredCalendars = [...data];
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load calendars. Please try again later.';
        this.isLoading = false;
      }
    });
  }

  filterCalendars(): void {
    if (!this.searchTerm) {
      this.filteredCalendars = [...this.calendars];
      return;
    }

    const searchText = this.searchTerm.toLowerCase();
    this.filteredCalendars = this.calendars.filter(cal => {
      return (
        (cal.calendarId?.toString().includes(searchText)) ||
        (cal.owner?.userId?.toString().includes(searchText)) ||
        (cal.events && JSON.stringify(cal.events).toLowerCase().includes(searchText))
      );
    });
  }

  deleteCalendar(id?: number): void {
    if (id === undefined) {
      console.error('Calendar ID is undefined');
      this.errorMessage = 'Cannot delete calendar: ID is missing.';
      return;
    }
    
    if (confirm('Are you sure you want to delete this calendar?')) {
      this.isLoading = true;
      this.calendarService.deleteCalendar(id).subscribe({
        next: () => {
          this.loadCalendars();
          this.isLoading = false;
        },
        error: (err) => {
          console.error(err);
          this.errorMessage = 'Failed to delete calendar. Please try again.';
          this.isLoading = false;
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