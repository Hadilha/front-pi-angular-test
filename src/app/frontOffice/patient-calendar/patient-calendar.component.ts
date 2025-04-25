import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { CalendarService, Calendar as CalendarModel } from 'src/app/services/calendar.service';
import { AppointmentService } from 'src/app/services/appointment.service';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

interface PatientAppointment {
  appointmentId: number;
  startTime: Date;
  endTime: Date;
  notes: string;
  status: string;
  videoStatus: string | null;
  reminderTime: string | null;
  reminderMessage: string | null;
  patient: {
    userId: number;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
  };
  professional: {
    userId: number;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
  };
}

@Component({
  selector: 'app-patient-calendar',
  templateUrl: './patient-calendar.component.html',
  styleUrls: ['./patient-calendar.component.css'],
  providers: [DatePipe]
})
export class PatientCalendarComponent implements OnInit {
  calendarOptions!: CalendarOptions;
  events: any[] = [];
  appointments: PatientAppointment[] = [];
  isLoading: boolean = true;
  isModalOpen: boolean = false;
  selectedAppointment: PatientAppointment | null = null;
  errorMessage: string | null = null;
  successMessage: string | null = null;
  patientId: number = 6;
  rescheduleReason: string = '';

  constructor(
    private calendarService: CalendarService,
    private appointmentService: AppointmentService,
    private route: ActivatedRoute,
    private datePipe: DatePipe,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('patientId');
    console.log('Route Parameter (patientId):', idParam);

    if (idParam === null || isNaN(+idParam)) {
      this.errorMessage = 'Invalid or missing Patient ID.';
      this.isLoading = false;
      this.cdr.detectChanges();
      return;
    }
    this.patientId = +idParam;
    this.initializeCalendar();
    this.loadPatientEvents();
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
      editable: false,
      eventResizableFromStart: false,
      droppable: false
    };
  }

  private loadPatientEvents(): void {
    this.isLoading = true;
    this.errorMessage = null;

    console.log('Loading events for patient ID:', this.patientId);

    forkJoin([
      this.calendarService.getCalendarsByPatientId(this.patientId),
      this.appointmentService.getAllAppointments()
    ]).subscribe({
      next: ([calendars, allAppointments]) => {
        console.log('Calendars received:', calendars);
        console.log('Raw appointments received:', JSON.stringify(allAppointments, null, 2));
        console.log('All appointments received:', allAppointments);

        const patientAppointments = allAppointments.filter((appt: { patient: { userId: number | undefined; }; appointmentId: any; }) => {
          if (!appt.patient) {
            console.warn('Appointment missing patient data:', appt);
            return false;
          }
          if (appt.patient.userId === undefined) {
            console.warn('Appointment has undefined patient userId:', appt);
            return false;
          }
          const matches = appt.patient.userId === this.patientId;
          console.log(`Appointment ID ${appt.appointmentId}: Patient userId ${appt.patient.userId} matches ${this.patientId}: ${matches}`);
          return matches;
        });

        console.log('Patient appointments filtered:', patientAppointments);

        if (patientAppointments.length === 0) {
          console.warn('No appointments found for patient ID:', this.patientId);
          const tomorrow = new Date();
          tomorrow.setDate(tomorrow.getDate() + 1);
          tomorrow.setHours(10, 0, 0, 0);

          const demoEnd = new Date(tomorrow);
          demoEnd.setHours(11, 0, 0, 0);

          const demoAppointment = {
            appointmentId: 999,
            startTime: tomorrow.toISOString(),
            endTime: demoEnd.toISOString(),
            notes: 'Regular check-up',
            status: 'SCHEDULED',
            videoStatus: null,
            reminderTime: null,
            reminderMessage: null,
            patient: {
              userId: this.patientId,
              firstName: 'Current',
              lastName: 'Patient',
              email: 'patient@example.com',
              role: 'PATIENT'
            },
            professional: {
              userId: 1,
              firstName: 'John',
              lastName: 'Smith',
              email: 'john.smith@clinic.com',
              role: 'DOCTOR'
            }
          };
          patientAppointments.push(demoAppointment);
        }

        this.appointments = this.parseAppointments(patientAppointments);
        console.log('Parsed appointments:', this.appointments);

        this.events = this.createCalendarEvents(calendars, this.appointments);
        console.log('Created events:', this.events);

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

  private getPatientAppointments(patientId: number): Observable<any[]> {
    return this.appointmentService.getAllAppointments().pipe(
      map((appointments: any[]) => {
        console.log('All appointments before filtering:', appointments);
        const filteredAppointments = appointments.filter(appt => {
          console.log('Checking appointment:', appt);
          console.log('Has patient property:', !!appt.patient);
          console.log('Patient userId:', appt.patient?.userId);
          console.log('Matches current patient:', appt.patient?.userId === patientId);
          return appt.patient && appt.patient.userId === patientId;
        });
        console.log('Filtered appointments:', filteredAppointments);
        return filteredAppointments;
      })
    );
  }

  private parseAppointments(appointments: any[]): PatientAppointment[] {
    return appointments.map(appt => ({
      appointmentId: appt.appointmentId,
      startTime: new Date(appt.startTime),
      endTime: new Date(appt.endTime),
      notes: appt.notes,
      status: appt.status,
      videoStatus: appt.videoStatus,
      reminderTime: appt.reminderTime,
      reminderMessage: appt.reminderMessage,
      patient: {
        userId: appt.patient.userId,
        firstName: appt.patient.firstName,
        lastName: appt.patient.lastName,
        email: appt.patient.email,
        role: appt.patient.role
      },
      professional: {
        userId: appt.professional.userId,
        firstName: appt.professional.firstName,
        lastName: appt.professional.lastName,
        email: appt.professional.email,
        role: appt.professional.role
      }
    }));
  }

  private createCalendarEvents(calendars: CalendarModel[], appointments: PatientAppointment[]): any[] {
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
        }
      }))
    );
  }

  private createAppointmentEvents(appointments: PatientAppointment[]): any[] {
    return appointments.map(appt => {
      let color = '#ff9f89'; // SCHEDULED
      if (appt.status === 'CANCELED') {
        color = '#cccccc';
      } else if (appt.status === 'COMPLETED') {
        color = '#8fbc8f';
      } else if (appt.status === 'RESCHEDULE_PENDING') {
        color = '#ffeb3b';
      }
      return {
        title: `Dr. ${appt.professional?.lastName || 'Unknown'}`,
        start: appt.startTime,
        end: appt.endTime,
        color: color,
        extendedProps: {
          type: 'appointment',
          appointmentData: appt
        }
      };
    });
  }

  private styleEvent(info: any): void {
    if (info.event.extendedProps.type === 'appointment') {
      info.el.style.cursor = 'pointer';
      info.el.style.borderLeft = '4px solid ' + info.event.backgroundColor;
      if (info.event.extendedProps.appointmentData?.status) {
        info.el.classList.add(`status-${info.event.extendedProps.appointmentData.status.toLowerCase()}`);
      }
    }
  }

  private updateCalendar(): void {
    console.log('Updating calendar with events:', this.events);
    if (this.events.length === 0) {
      console.warn('No events to display on calendar');
    }
    this.calendarOptions = { ...this.calendarOptions, events: [...this.events] };
    this.cdr.detectChanges();
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
    this.rescheduleReason = '';
  }

  formatDate(date: Date): string {
    return this.datePipe.transform(date, 'medium') || '';
  }

  requestReschedule(): void {
    if (!this.selectedAppointment) {
      this.errorMessage = 'No appointment selected for rescheduling.';
      setTimeout(() => this.errorMessage = null, 5000);
      return;
    }

    if (!this.rescheduleReason.trim()) {
      this.errorMessage = 'Please provide a reason for rescheduling.';
      setTimeout(() => this.errorMessage = null, 5000);
      return;
    }

    const startTime = this.datePipe.transform(this.selectedAppointment.startTime, 'yyyy-MM-dd\'T\'HH:mm:ss');
    const endTime = this.datePipe.transform(this.selectedAppointment.endTime, 'yyyy-MM-dd\'T\'HH:mm:ss');

    if (!startTime || !endTime) {
      this.errorMessage = 'Invalid date format for appointment times.';
      setTimeout(() => this.errorMessage = null, 5000);
      return;
    }

    const rescheduleData = {
      appointmentId: this.selectedAppointment.appointmentId,
      startTime,
      endTime,
      reason: this.rescheduleReason
    };

    console.log('Reschedule data:', rescheduleData);

    this.appointmentService.requestRescheduleAppointment(rescheduleData)
      .subscribe({
        next: () => {
          this.successMessage = 'Reschedule request sent successfully';
          this.closeModal();
          // Update appointment status to RESCHEDULE_PENDING
          this.appointments = this.appointments.map(apt => {
            if (apt.appointmentId === this.selectedAppointment?.appointmentId) {
              return { ...apt, status: 'RESCHEDULE_PENDING' };
            }
            return apt;
          });
          this.events = this.events.map(event => {
            if (event.extendedProps?.type === 'appointment' &&
                event.extendedProps?.appointmentData?.appointmentId === this.selectedAppointment?.appointmentId) {
              return {
                ...event,
                color: '#ffeb3b', // Yellow for RESCHEDULE_PENDING
                extendedProps: {
                  ...event.extendedProps,
                  appointmentData: {
                    ...event.extendedProps.appointmentData,
                    status: 'RESCHEDULE_PENDING'
                  }
                }
              };
            }
            return event;
          });
          this.updateCalendar();
          setTimeout(() => this.successMessage = null, 3000);
        },
        error: (err) => {
          console.error('Reschedule failed:', JSON.stringify(err, null, 2));
          this.errorMessage = 'Failed to request reschedule: ' +
            (err.error && typeof err.error === 'string' ? err.error : 'Please check the appointment details and try again');
          setTimeout(() => this.errorMessage = null, 5000);
        }
      });
  }

  cancelAppointment(): void {
    if (!this.selectedAppointment) return;

    this.appointmentService.cancelPatientAppointment(this.selectedAppointment.appointmentId)
      .subscribe({
        next: () => {
          this.successMessage = 'Appointment cancelled successfully';
          this.appointments = this.appointments.map(apt => {
            if (apt.appointmentId === this.selectedAppointment?.appointmentId) {
              return { ...apt, status: 'CANCELED' };
            }
            return apt;
          });
          this.events = this.events.map(event => {
            if (event.extendedProps?.type === 'appointment' &&
                event.extendedProps?.appointmentData?.appointmentId === this.selectedAppointment?.appointmentId) {
              return {
                ...event,
                color: '#cccccc',
                extendedProps: {
                  ...event.extendedProps,
                  appointmentData: {
                    ...event.extendedProps.appointmentData,
                    status: 'CANCELED'
                  }
                }
              };
            }
            return event;
          });
          this.updateCalendar();
          this.closeModal();
          setTimeout(() => this.successMessage = null, 3000);
        },
        error: (err) => {
          this.errorMessage = 'Failed to cancel appointment: ' +
            (err.error && typeof err.error === 'string' ? err.error : 'Please try again');
          setTimeout(() => this.errorMessage = null, 5000);
        }
      });
  }
}