import { CalendarService, Calendar as CalendarModel } from 'src/app/Services/calendar.service';
import { CalendarOptions, EventApi, EventDropArg } from '@fullcalendar/core';
import { AppointmentService } from 'src/app/Services/appointment.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import dayGridPlugin from '@fullcalendar/daygrid';
import { DatePipe } from '@angular/common';
import { forkJoin } from 'rxjs';


interface Appointment {
  appointmentId: number;
  startTime: Date;
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
  events: any[] = [];
  appointments: Appointment[] = [];
  isLoading: boolean = true;
  isModalOpen: boolean = false;
  selectedAppointment: Appointment | null = null;
  errorMessage: string | null = null;
  successMessage: string | null = null;

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
      eventDidMount: (info) => this.styleEvent(info),
      
      // Enable drag and drop
      editable: true,
      eventDrop: (info) => this.handleEventDrop(info),
      
      // Enable resizing
      eventResizableFromStart: true, // Allow resizing from the start of the event
      eventResize: (info) => this.handleEventResize(info),
      droppable: false // We only need to reschedule existing events, not create new ones via drag and drop
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
      startTime: new Date(appt.startTime),
      endTime: new Date(appt.endTime)
    }));
  }

  private createCalendarEvents(calendars: CalendarModel[], appointments: Appointment[]): any[] {
    return [
      ...this.createCalendarTimeSlots(calendars),
      ...this.createAppointmentEvents(appointments)
    ];
  }

  private createCalendarTimeSlots(calendars: CalendarModel[]): any[] {
    return calendars.flatMap(calendar => 
      Object.entries(calendar.events || {}).map(([date, description]) => ({
        title: description,
        start: date,
        color: '#378006',
        extendedProps: {
          type: 'calendarSlot',
          description: description
        },
        editable: false // Make calendar slots non-draggable
      }))
    );
  }

  private createAppointmentEvents(appointments: Appointment[]): any[] {
    return appointments.map(appt => ({
      title: `Appt: ${appt.patient.firstName} ${appt.patient.lastName}`,
      start: appt.startTime,
      end: appt.endTime,
      color: '#ff9f89',
      extendedProps: {
        type: 'appointment',
        appointmentData: appt
      },
      editable: true // Make appointment events draggable
    }));
  }

  private styleEvent(info: any): void {
    if (info.event.extendedProps.type === 'appointment') {
      info.el.style.cursor = 'pointer';
      info.el.style.borderLeft = '4px solid ' + info.event.backgroundColor;
      
      // Add classes to make it visually apparent that it's draggable and resizable
      info.el.classList.add('draggable-event');
      info.el.classList.add('resizable-event');
    }
  }

  private updateCalendar(): void {
    // First update the options with the new events array
    this.calendarOptions = {
      ...this.calendarOptions,
      events: [...this.events] // Create a new array reference to trigger change detection
    };
    
    // Then force the calendar to refresh
    setTimeout(() => {
      const calendarEl = document.querySelector('full-calendar');
      if (calendarEl) {
        try {
          const calendarApi = (calendarEl as any).getApi();
          if (calendarApi) {
            calendarApi.removeAllEvents();
            calendarApi.addEventSource(this.events);
          }
        } catch (e) {
          console.error('Error refreshing calendar:', e);
        }
      }
    }, 0);
  }

 // Handle event drag and drop
handleEventDrop(info: EventDropArg): void {
  if (info.event.extendedProps['type'] === 'appointment') {
    const appointment = info.event.extendedProps['appointmentData'];
    
    // Get the new start and end times from the event
    const newStartTime = info.event.start || new Date();
    
    // Calculate new end time: either use the event's end time if available,
    // or calculate it based on the original duration
    let newEndTime: Date;
    if (info.event.end) {
      newEndTime = info.event.end;
    } else {
      const originalDuration = appointment.endTime.getTime() - appointment.startTime.getTime();
      newEndTime = new Date(newStartTime.getTime() + originalDuration);
    }
    
    // Show a temporary loading state
    this.isLoading = true;
    
    // Update the appointment with new times
    this.appointmentService.updateAppointmentTimes(appointment.appointmentId, newStartTime, newEndTime)
      .subscribe({
        next: (updatedAppointment) => {
          // Update the local appointment data
          appointment.startTime = newStartTime;
          appointment.endTime = newEndTime;
          
          // Find and update the event in the events array
          this.events = this.events.map(event => {
            if (event.extendedProps?.type === 'appointment' && 
                event.extendedProps?.appointmentData?.appointmentId === appointment.appointmentId) {
              return {
                ...event,
                start: newStartTime,
                end: newEndTime,
                extendedProps: {
                  ...event.extendedProps,
                  appointmentData: {
                    ...appointment,
                    startTime: newStartTime,
                    endTime: newEndTime
                  }
                }
              };
            }
            return event;
          });
          
          // Update the appointment in the appointments array
          this.appointments = this.appointments.map(apt => {
            if (apt.appointmentId === appointment.appointmentId) {
              return {
                ...apt,
                startTime: newStartTime,
                endTime: newEndTime
              };
            }
            return apt;
          });
          
          // Force refresh the calendar
          this.updateCalendar();
          
          // Show success message
          this.successMessage = 'Appointment rescheduled successfully';
          setTimeout(() => this.successMessage = null, 3000);
          
          this.isLoading = false;
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Failed to update appointment:', err);
          
          // Revert the drag
          info.revert();
          
          // Show error message
          this.errorMessage = 'Failed to reschedule appointment: ' + 
            (err.error && typeof err.error === 'string' ? err.error : 'Please try again');
          
          this.isLoading = false;
          this.cdr.detectChanges();
          
          // Auto-clear error after a few seconds
          setTimeout(() => {
            this.errorMessage = null;
            this.cdr.detectChanges();
          }, 5000);
        }
      });
  } else {
    // If it's not an appointment, revert the drag
    info.revert();
  }
}

handleEventResize(info: any): void {
  if (info.event.extendedProps['type'] === 'appointment') {
    const appointment = info.event.extendedProps['appointmentData'];
    
    // Get the new start and end times from the resized event
    const newStartTime = info.event.start || new Date();
    const newEndTime = info.event.end || new Date();
    
    // Show a temporary loading state
    this.isLoading = true;
    
    // Update the appointment with new times
    this.appointmentService.updateAppointmentTimes(appointment.appointmentId, newStartTime, newEndTime)
      .subscribe({
        next: (updatedAppointment) => {
          // Update the local appointment data
          appointment.startTime = newStartTime;
          appointment.endTime = newEndTime;
          
          // Find and update the event in the events array
          this.events = this.events.map(event => {
            if (event.extendedProps?.type === 'appointment' && 
                event.extendedProps?.appointmentData?.appointmentId === appointment.appointmentId) {
              return {
                ...event,
                start: newStartTime,
                end: newEndTime,
                extendedProps: {
                  ...event.extendedProps,
                  appointmentData: {
                    ...appointment,
                    startTime: newStartTime,
                    endTime: newEndTime
                  }
                }
              };
            }
            return event;
          });
          
          // Update the appointment in the appointments array
          this.appointments = this.appointments.map(apt => {
            if (apt.appointmentId === appointment.appointmentId) {
              return {
                ...apt,
                startTime: newStartTime,
                endTime: newEndTime
              };
            }
            return apt;
          });
          
          // Force refresh the calendar
          this.updateCalendar();
          
          // Show success message
          this.successMessage = 'Appointment duration updated successfully';
          setTimeout(() => this.successMessage = null, 3000);
          
          this.isLoading = false;
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Failed to update appointment duration:', err);
          
          // Revert the resize
          info.revert();
          
          // Show error message
          this.errorMessage = 'Failed to update appointment duration: ' + 
            (err.error && typeof err.error === 'string' ? err.error : 'Please try again');
          
          this.isLoading = false;
          this.cdr.detectChanges();
          
          // Auto-clear error after a few seconds
          setTimeout(() => {
            this.errorMessage = null;
            this.cdr.detectChanges();
          }, 5000);
        }
      });
  } else {
    // If it's not an appointment, revert the resize
    info.revert();
  }
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