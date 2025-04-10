import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CalendarOptions, EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { CalendarService, Calendar as CalendarModel } from 'src/app/services/calendar.service';
import { AppointmentService } from 'src/app/services/appointment.service';
import { forkJoin } from 'rxjs';
import { DatePipe } from '@angular/common';

interface Appointment {
  appointmentId: number;
  startTime: Date;  // Changed to Date type
  endTime: Date; 
  notes: string;
  status: string;
  patient: {
    firstName: string;
    lastName: string;
  };
  professional: {
    firstName: string;
    lastName: string;
  };
}

@Component({
  selector: 'app-calendar-view',
  templateUrl: './calendar-view.component.html',
  styleUrls: ['./calendar-view.component.css'],
  providers: [DatePipe]
})
export class CalendarViewComponent implements OnInit {
  calendarOptions!: CalendarOptions;
  events: EventInput[] = [];
  appointments: Appointment[] = [];
  isLoading: boolean = true;
  isModalOpen: boolean = false;
  selectedAppointment: Appointment | null = null;
  errorMessage: string | null = null;

  constructor(
    private calendarService: CalendarService,
    private appointmentService: AppointmentService,
    private datePipe: DatePipe,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.initializeCalendar();
    this.loadAllEvents();
  }

  private initializeCalendar(): void {
    this.calendarOptions = {
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      initialView: 'dayGridMonth',
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      },
      events: [],
      height: '700px',
      eventClick: (arg) => this.handleEventClick(arg),
      eventDidMount: (info) => this.styleEvent(info)
    };
  }

  public loadAllEvents(): void {
    this.isLoading = true;
    this.errorMessage = null;

    forkJoin([
      this.calendarService.getCalendarsByProfessionalId(5),
      this.appointmentService.getAllAppointments()
    ]).subscribe({
      next: ([calendars, appointments]) => {
        this.appointments = this.parseAppointments(appointments);
        this.events = this.createCalendarEvents(calendars, this.appointments);
        this.updateCalendar();
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Loading failed:', err);
        this.errorMessage = 'Failed to load calendar data. Please refresh the page.';
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  private parseAppointments(appointments: any[]): Appointment[] {
    return appointments.map(appt => ({
      ...appt,
      startTime: new Date(appt.startTime),  // Parse to Date
      endTime: new Date(appt.endTime)       // Parse to Date
    }));
  }

  private createCalendarEvents(calendars: CalendarModel[], appointments: Appointment[]): EventInput[] {
    return [
      ...this.createCalendarTimeSlots(calendars),
      ...this.createAppointmentEvents(appointments)
    ];
  }

  private createCalendarTimeSlots(calendars: CalendarModel[]): EventInput[] {
    return calendars.flatMap(calendar => 
      Object.entries(calendar.events || {}).map(([date, description]) => ({
        title: description,
        start: date,
        color: '#378006',
        extendedProps: {
          type: 'calendarSlot',
          description: description
        }
      }))
    );
  }

  private createAppointmentEvents(appointments: Appointment[]): EventInput[] {
    return appointments.map(appt => ({
      title: `Appt: ${appt.patient.firstName} ${appt.patient.lastName}`,
      start: appt.startTime,
      end: appt.endTime,
      color: '#ff9f89',
      extendedProps: {
        type: 'appointment',
        appointmentData: appt
      }
    }));
  }

  private styleEvent(info: any): void {
    if (info.event.extendedProps.type === 'appointment') {
      info.el.style.cursor = 'pointer';
      info.el.style.borderLeft = '4px solid ' + info.event.backgroundColor;
    }
  }

  private updateCalendar(): void {
    this.calendarOptions = {
      ...this.calendarOptions,
      events: this.events
    };
    
    setTimeout(() => {
      const calendarEl = document.querySelector('full-calendar');
      if (calendarEl) {
        const calendarApi = (calendarEl as any).getApi();
        calendarApi.refetchEvents();
      }
    }, 0);
  }

  handleEventClick(arg: any): void {
    if (arg.event.extendedProps.type === 'appointment') {
      this.selectedAppointment = arg.event.extendedProps.appointmentData;
      this.isModalOpen = true;
    }
    arg.jsEvent.preventDefault();
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.selectedAppointment = null;
  }

  formatDate(date: Date): string {
    return this.datePipe.transform(date, 'medium') || '';
  }
}