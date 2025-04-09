import { Component, OnInit } from '@angular/core';
import { CalendarOptions, EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { CalendarService, Calendar as CalendarModel } from 'src/app/services/calendar.service';
import { AppointmentService } from 'src/app/services/appointment.service';

@Component({
  selector: 'app-calendar-view',
  templateUrl: './calendar-view.component.html',
  styleUrls: ['./calendar-view.component.css']
})
export class CalendarViewComponent implements OnInit {
  calendarOptions!: CalendarOptions;
  events: EventInput[] = [];
  isLoading: boolean = true;
  professionalId: number = 1;

  constructor(
    private calendarService: CalendarService,
    private appointmentService: AppointmentService
  ) {}

  ngOnInit(): void {
    this.loadAllEvents();
  }

  loadAllEvents(): void {
    const tempEvents: EventInput[] = [];

    this.calendarService.getCalendarsByProfessionalId(this.professionalId).subscribe({
      next: (calendars: CalendarModel[]) => {
        calendars.forEach(calendar => {
          if (calendar.events) {
            Object.entries(calendar.events).forEach(([dateTime, description]) => {
              tempEvents.push({
                title: description,
                start: dateTime,
                color: '#378006'
              });
              console.log('Added calendar event:', { title: description, start: dateTime });
            });
          }
        });
        console.log('Calendar events loaded:', tempEvents.length);

        this.appointmentService.getAllAppointments().subscribe({
          next: (appointments: any[]) => {
            appointments.forEach(appointment => {
              tempEvents.push({
                title: appointment.title || 'Appointment',
                start: appointment.startDate,
                end: appointment.endDate || undefined,
                color: '#ff9f89'
              });
              console.log('Added appointment:', {
                title: appointment.title || 'Appointment',
                start: appointment.startDate,
                end: appointment.endDate
              });
            });
            console.log('Total events loaded:', tempEvents.length);
            this.events = tempEvents;
            this.configureCalendar();
            this.isLoading = false;
          },
          error: err => {
            console.error('Error fetching appointments:', err);
            this.events = tempEvents;
            this.configureCalendar();
            this.isLoading = false;
            alert('Failed to load appointments. Displaying calendar events only.');
          }
        });
      },
      error: err => {
        console.error('Error fetching calendars:', err);
        this.isLoading = false;
        alert('Failed to load calendar events. Please try again later.');
      }
    });
  }

  configureCalendar(): void {
    this.calendarOptions = {
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      initialView: 'dayGridMonth',
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      },
      events: this.events,
      eventClick: this.handleEventClick.bind(this),
      height: 'auto'
    };
  }

  handleEventClick(arg: any): void {
    alert(`Event: ${arg.event.title}\nStart: ${arg.event.start}`);
    console.log('Event clicked:', arg.event);
  }
}