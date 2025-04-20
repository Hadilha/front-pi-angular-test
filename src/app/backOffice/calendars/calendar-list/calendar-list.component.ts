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
        // Debug the structure
        if (data && data.length > 0 && data[0].events) {
          console.log('Sample event structure:', data[0].events);
        }
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
  
  // FIXED METHODS FOR FORMATTING EVENTS
  formatEvents(events: any): string {
    if (!events) {
      return 'No events';
    }
    
    const eventCount = Object.keys(events).length;
    return `${eventCount} event${eventCount !== 1 ? 's' : ''}`;
  }

  // Improved method to extract meaningful event information
  getEventTitles(events: any): string[] {
    if (!events) {
      return [];
    }
    
    const eventEntries = Object.entries(events);
    if (eventEntries.length === 0) return [];
    
    return eventEntries.slice(0, 2).map(([key, eventData]) => {
      // Try different possible paths to event title based on common structures
      if (typeof eventData === 'object' && eventData !== null) {
        const eventObj = eventData as Record<string, any>;
        
        // Check all possible properties that might contain the title
        if (eventObj['title']) return eventObj['title'];
        if (eventObj['name']) return eventObj['name'];
        if (eventObj['summary']) return eventObj['summary'];
        if (eventObj['description']) return eventObj['description'];
        if (eventObj['subject']) return eventObj['subject'];
        
        // If the event has a start time/date, use that as identifier
        if (eventObj['start']) {
          const start = eventObj['start'];
          if (typeof start === 'string') {
            // If it's a date string, format it nicely
            try {
              const date = new Date(start);
              return `Event on ${date.toLocaleDateString()}`;
            } catch (e) {
              return `Event: ${start}`;
            }
          }
          if (typeof start === 'object' && start !== null && 'dateTime' in start) {
            try {
              const date = new Date(start.dateTime);
              return `Event on ${date.toLocaleDateString()}`;
            } catch (e) {
              return 'Scheduled event';
            }
          }
        }
        
        // If we can't find a title, use the key as a fallback
        return `Event ${key}`;
      }
      
      // If eventData is a primitive, use the key
      return `Event ${key}`;
    });
  }
  
  getEventCount(events: any): number {
    if (!events) {
      return 0;
    }
    return Object.keys(events).length;
  }
}