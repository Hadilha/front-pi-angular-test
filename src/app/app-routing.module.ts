import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DatePipe } from '@angular/common';
// Layouts
import { DoctorComponent } from "./frontOffice/views/doctor/doctor.component";
import { AdminComponent } from "./backOffice/views/admin/admin.component";

// Doctor Views
import { DashboardComponent } from "./frontOffice/views/admin/dashboard/dashboard.component";
import { MapsComponent } from "./frontOffice/views/admin/maps/maps.component";
import { SettingsComponent } from "./frontOffice/views/admin/settings/settings.component";
import { TablesComponent } from "./frontOffice/views/admin/tables/tables.component";

// Admin (Back Office) Views

import { AppointmentListComponent } from "./backOffice/views/appointment-list/appointment-list.component";
import { AppointmentFormComponent } from "./backOffice/components/appointments/appointment-form/appointment-form.component";
import { CalendarListComponent } from "./backOffice/views/calendar-list/calendar-list.component";
import { CalendarFormComponent } from "./backOffice/components/calendars/calendar-form/calendar-form.component";
import { AppointmentStatisticsComponent } from './backOffice/components/appointment-statistics/appointment-statistics.component';




// Standalone Views
import { HomeComponent } from "./frontOffice/views/home/home.component";
import { PatientspaceComponent } from "./frontOffice/views/patientspace/patientspace.component";
import { CalendarViewComponent } from './frontOffice/views/calendar-view/calendar-view.component';
import{ VideoCallComponent } from './frontOffice/views/video-call/video-call.component';
import { VideoCallEntryComponent } from './frontOffice/views/video-call-entry/video-call-entry.component';
import { PatientCalendarComponent } from "./frontOffice/views/patient-calendar/patient-calendar.component";

const routes: Routes = [
  // Doctor Dashboard
  {
    path: "doctor",
    component: DoctorComponent,
    children: [
      { path: "dashboard", component: DashboardComponent },
      { path: "settings", component: SettingsComponent },
      { path: "tables", component: TablesComponent },
      { path: "maps", component: MapsComponent },
      { path: 'calendar-view', component: CalendarViewComponent },
      {path: 'video-call/appointment/:appointmentId', component: VideoCallComponent},
      {path: 'video-call/:roomId', component: VideoCallComponent},
      { path: 'join-video-call', component: VideoCallEntryComponent },
  { path: ':role/video-call/:roomId', component: VideoCallComponent },
      { path: "", redirectTo: "dashboard", pathMatch: "full" },
    ],
  },
  // Admin (Back Office) Dashboard
  {
    path: "admin",
    component: AdminComponent,
    children: [
      
      { path: "appointments", component: AppointmentListComponent },
      { path: "appointments/new", component: AppointmentFormComponent },
      { path: "appointments/:id/edit", component: AppointmentFormComponent },
      { path: "calendars", component: CalendarListComponent },
      { path: "calendars/new", component: CalendarFormComponent },
      { path: "calendars/:id/edit", component: CalendarFormComponent },
      { path: 'appointment-statistics', component: AppointmentStatisticsComponent },
      { path: "", redirectTo: "dashboard", pathMatch: "full" },
    ],
  },
  // Authentication
 
  // Standalone Routes
  


  {
    path: 'patientspace',
    component: PatientspaceComponent,
    children: [
      { path: 'calendar/:patientId', component: PatientCalendarComponent },
      { path: 'join-video-call', component: VideoCallEntryComponent },
      { path: 'video-call/:roomId', component: VideoCallComponent },
      { path: '', redirectTo: 'join-video-call', pathMatch: 'full' }, // Requires patientId; adjust if needed
    ],
  },







  { path: "", component: HomeComponent },
  { path: "**", redirectTo: "", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}