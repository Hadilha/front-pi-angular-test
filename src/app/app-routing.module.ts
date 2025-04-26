import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

// layouts
import { DoctorComponent } from "./frontOffice/layouts/doctor/doctor.component";
import { AuthComponent } from "./frontOffice/layouts/auth/auth.component";

// doctor views
import { DashboardComponent } from "./frontOffice/views/admin/dashboard/dashboard.component";
import { MapsComponent } from "./frontOffice/views/admin/maps/maps.component";
import { SettingsComponent } from "./frontOffice/views/admin/settings/settings.component";
import { TablesComponent } from "./frontOffice/views/admin/tables/tables.component";

// admin views
import { AdminDashboardComponent } from "./backOffice/admin-dashboard/admin-dashboard.component";


// auth views
import { LoginComponent } from "./frontOffice/views/auth/login/login.component";
import { RegisterComponent } from "./frontOffice/views/auth/register/register.component";

// no layouts views
import { IndexComponent } from "./frontOffice/views/index/index.component";
import { LandingComponent } from "./frontOffice/views/landing/landing.component";
import { ProfileComponent } from "./frontOffice/views/profile/profile.component";
import { PatientspaceComponent } from "./frontOffice/layouts/patientspace/patientspace.component";
import { AdminComponent } from "./backOffice/admin/admin.component";
import { AdminTablesComponent } from "./backOffice/admin-tables/admin-tables.component";
import { ListNotesComponent } from "./backOffice/note-management/list-notes/list-notes.component";
import { AddNoteComponent } from "./backOffice/note-management/add-note/add-note.component";
import { UpdateNoteComponent } from "./backOffice/note-management/update-note/update-note.component";
import { DetailsNoteComponent } from "./backOffice/note-management/details-note/details-note.component";
import { PatientNotesComponent } from "./backOffice/note-management/patient-notes/patient-notes.component";
import { ListPrescriptionsComponent } from "./backOffice/prescription-management/list-prescriptions/list-prescriptions.component";
import { AddPrescriptionComponent } from "./backOffice/prescription-management/add-prescription/add-prescription.component";
import { PatientPrescriptionComponent } from "./backOffice/prescription-management/patient-prescription/patient-prescription.component";
import { UpdatePrescriptionComponent } from "./backOffice/prescription-management/update-prescription/update-prescription.component";
import { DetailsPrescriptionComponent } from "./backOffice/prescription-management/details-prescription/details-prescription.component";
import { PatientNotesDetailsComponent } from "./frontOffice/patient-notes-details/patient-notes-details.component";
import { PatientPrescriptionDetailsComponent } from "./frontOffice/patient-prescription-details/patient-prescription-details.component";

const routes: Routes = [
  // Doctor Dashboard
  {
    path: 'doctor',
    component: DoctorComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'settings', component: SettingsComponent },
      { path: 'tables', component: TablesComponent },
      { path: 'maps', component: MapsComponent },
      

      { path: 'notes', component: ListNotesComponent },
      { path: 'add-note', component: AddNoteComponent },
     
      { path: 'update-note/:id', component: UpdateNoteComponent },
      { path: 'details-note/:id', component: DetailsNoteComponent },

      { path: 'prescriptions', component: ListPrescriptionsComponent },
      { path: 'add-prescription', component: AddPrescriptionComponent },
      {
        path: 'update-prescription/:id',
        component: UpdatePrescriptionComponent,
      },
      {
        path: 'details-prescription/:id',
        component: DetailsPrescriptionComponent,
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },

  {
    path: 'admin',
    component: AdminComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: AdminDashboardComponent },
      { path: 'tables', component: AdminTablesComponent },

    ],
  },

  // auth views
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: '', redirectTo: 'login', pathMatch: 'full' },
    ],
  },
  { path: 'patientspace', component: PatientspaceComponent },
  {
    path: 'patient-prescriptions',
    component: PatientPrescriptionComponent,
  },
  {
    path: 'details-prescription/:id',
    component: PatientPrescriptionDetailsComponent,
  },
  { path: 'details-note/:id', component: PatientNotesDetailsComponent },
  { path: 'patient-notes', component: PatientNotesComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'landing', component: LandingComponent },
  { path: '', component: IndexComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
