import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CoachingprogramComponent } from './backOffice/coachingprogram/coachingprogram.component'; // Chemin selon ta structure
import { ContentprogramComponent } from './backOffice/contentprogram/contentprogram.component';
import { ContentProgramAjouterupdateComponent } from './backOffice/content-program-ajouterupdate/content-program-ajouterupdate.component';
import { CoachingProgramAjouterUpdateComponent } from './backOffice/coachingprogramajouter-update/coachingprogramajouter-update.component';
import { ContentProgramComponent } from './frontOffice/content-program/content-program.component';
import { FeedbackFormComponent } from './components/feedback/feedback-form/feedback-form.component';
import { CoachFeedbackComponent } from './components/coach-feedback/coach-feedback.component';
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

const routes: Routes = [

  { path: 'backoffice/coachingprogram/programs', component: CoachingprogramComponent },
  { path: '', redirectTo: 'backoffice/coachingprogram/programs', pathMatch: 'full' },
  
  { path: 'backoffice/content-program', component: ContentprogramComponent }, // Define route for ContentProgramComponent
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'coaching-program',
    component: CoachingProgramAjouterUpdateComponent
  },
  { path: 'coaching-programs/coachingProgram/:id', component: CoachingProgramAjouterUpdateComponent },
  { path: 'feedback', component: CoachFeedbackComponent },
  //{
   // path: 'backoffice/coachingprogramajouter-update/:id',
    //component: CoachingProgramAjouterUpdateComponent
  //},
  { path: 'content-programs/programcontent', component: ContentProgramAjouterupdateComponent },
  { path: 'content-programs/programcontent/:id', component: ContentProgramAjouterupdateComponent },
  { path: 'frontOffice/content-program', component: ContentProgramComponent },

  { path: 'feedback/feedback', component: FeedbackFormComponent },
  { path: 'coach-feedback', component: CoachFeedbackComponent },
 // { path: '', redirectTo: '/patient-feedback', pathMatch: 'full' },
  

  
  // Doctor Dashboard
  {
    path: "doctor",
    component: DoctorComponent,
    children: [
      { path: "dashboard", component: DashboardComponent },
      { path: "settings", component: SettingsComponent },
      { path: "tables", component: TablesComponent },
      { path: "maps", component: MapsComponent },
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
      { path: "", redirectTo: "dashboard", pathMatch: "full" },
    ],
  },

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
