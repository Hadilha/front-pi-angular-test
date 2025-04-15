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
import {PrescriptionListComponent} from "./prescriptions/list/prescription-list.component";
import {NoteListComponent} from "./notes/list/note-list.component";
import {NoteFormComponent} from "./notes/form/note-form.component";
import {PrescriptionFormComponent} from "./prescriptions/form/prescription-form.component";
import {UpdateNoteComponent} from "./notes/update/update-note/update-note.component";
import {UpdatePrescriptionComponent} from "./prescriptions/update/update-prescription/update-prescription.component";

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
      {path: "prescriptions", component: PrescriptionListComponent},
      {path: "notes", component: NoteListComponent},
      {path:"addnotes",component: NoteFormComponent},
      { path: "", redirectTo: "dashboard", pathMatch: "full" },

    ],
  },

  //Admin Dashboard
  {
    path: "admin",
    component: AdminComponent,
    children: [
      { path: "dashboard", component: AdminDashboardComponent },
      { path: "tables", component: AdminTablesComponent },
      {path:"editnotes/:id" ,component: UpdateNoteComponent},
      {path:"editprescriptions/:id",component: UpdatePrescriptionComponent},
      { path: "", redirectTo: "dashboard", pathMatch: "full" },


    ],
  },
  {path:"addprescription", component:PrescriptionFormComponent},


  // auth views
  {
    path: "auth",
    component: AuthComponent,
    children: [
      { path: "login", component: LoginComponent },
      { path: "register", component: RegisterComponent },
      { path: "", redirectTo: "login", pathMatch: "full" },
    ],
  },
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
