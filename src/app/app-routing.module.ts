import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DatePipe } from '@angular/common';
// Layouts
import { DoctorComponent } from "./frontOffice/layouts/doctor/doctor.component";
import { AuthComponent } from "./frontOffice/layouts/auth/auth.component";
import { AdminComponent } from "./backOffice/admin/admin.component";

// Doctor Views
import { DashboardComponent } from "./frontOffice/views/admin/dashboard/dashboard.component";
import { MapsComponent } from "./frontOffice/views/admin/maps/maps.component";
import { SettingsComponent } from "./frontOffice/views/admin/settings/settings.component";
import { TablesComponent } from "./frontOffice/views/admin/tables/tables.component";

// Admin (Back Office) Views
import { AdminDashboardComponent } from "./backOffice/admin-dashboard/admin-dashboard.component";
import { AdminTablesComponent } from "./backOffice/admin-tables/admin-tables.component";
import { AppointmentListComponent } from "./backOffice/appointments/appointment-list/appointment-list.component";
import { AppointmentFormComponent } from "./backOffice/appointments/appointment-form/appointment-form.component";
import { CalendarListComponent } from "./backOffice/calendars/calendar-list/calendar-list.component";
import { CalendarFormComponent } from "./backOffice/calendars/calendar-form/calendar-form.component";

// Auth Views
import { LoginComponent } from "./frontOffice/views/auth/login/login.component";
import { RegisterComponent } from "./frontOffice/views/auth/register/register.component";

// Standalone Views
import { IndexComponent } from "./frontOffice/views/index/index.component";
import { LandingComponent } from "./frontOffice/views/landing/landing.component";
import { ProfileComponent } from "./frontOffice/views/profile/profile.component";
import { PatientspaceComponent } from "./frontOffice/layouts/patientspace/patientspace.component";
import { CalendarViewComponent } from './frontOffice/calendar-view/calendar-view.component';

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
      { path: "", redirectTo: "dashboard", pathMatch: "full" },
    ],
  },
  // Admin (Back Office) Dashboard
  {
    path: "admin",
    component: AdminComponent,
    children: [
      { path: "dashboard", component: AdminDashboardComponent },
      { path: "tables", component: AdminTablesComponent },
      { path: "appointments", component: AppointmentListComponent },
      { path: "appointments/new", component: AppointmentFormComponent },
      { path: "appointments/:id/edit", component: AppointmentFormComponent },
      { path: "calendars", component: CalendarListComponent },
      { path: "calendars/new", component: CalendarFormComponent },
      { path: "calendars/:id/edit", component: CalendarFormComponent },
      { path: "", redirectTo: "dashboard", pathMatch: "full" },
    ],
  },
  // Authentication
  {
    path: "auth",
    component: AuthComponent,
    children: [
      { path: "login", component: LoginComponent },
      { path: "register", component: RegisterComponent },
      { path: "", redirectTo: "login", pathMatch: "full" },
    ],
  },
  // Standalone Routes
  { path: "patientspace", component: PatientspaceComponent },
  { path: "profile", component: ProfileComponent },
  { path: "landing", component: LandingComponent },
  { path: "", component: IndexComponent },
  { path: "**", redirectTo: "", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}