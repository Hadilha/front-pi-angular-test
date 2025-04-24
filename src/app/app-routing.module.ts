import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DashboardComponent } from "./frontOffice/views/admin/dashboard/dashboard.component";
import { MapsComponent } from "./frontOffice/views/admin/maps/maps.component";
import { SettingsComponent } from "./frontOffice/views/admin/settings/settings.component";
import { TablesComponent } from "./frontOffice/views/admin/tables/tables.component";
import { LoginComponent } from "./frontOffice/views/auth/login/login.component";
import { RegisterComponent } from "./frontOffice/views/auth/register/register.component";
import { IndexComponent } from "./frontOffice/views/index/index.component";
import { LandingComponent } from "./frontOffice/views/landing/landing.component";
import { ProfileComponent } from "./frontOffice/views/profile/profile.component";
import { JournalComponent } from "./frontOffice/views/journal/journal/journal.component";
import { ForgotpwComponent } from "./frontOffice/views/auth/forgotpw/forgotpw.component";
import { ResetpwComponent } from "./frontOffice/views/auth/resetpw/resetpw.component";
import { DoctorComponent } from "./frontOffice/views/doctor/doctor.component";
import { AdminComponent } from "./backOffice/views/admin/admin.component";
import { ListusersComponent } from "./backOffice/views/listusers/listusers.component";
import { AdduserComponent } from "./backOffice/views/adduser/adduser.component";
import { AdminTablesComponent } from "./backOffice/views/admin-tables/admin-tables.component";
import { ReportsadminComponent } from "./backOffice/views/reportsadmin/reportsadmin.component";
import { AuthComponent } from "./frontOffice/views/auth/auth.component";
import { PatientspaceComponent } from "./frontOffice/views/patientspace/patientspace.component";
import { CredentialsComponent } from "./frontOffice/views/credentials/credentials.component";
//import { JournalComponent } from "./frontOffice/views/journal/journal.component";

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
      { path: "", redirectTo: "dashboard", pathMatch: "full" },
    ],
  },

  //Admin Dashboard
  {
    path: "admin",
    component: AdminComponent,
    children: [
      { path: "dashboard", component: AdminComponent },
      { path: "usermanagment", component: ListusersComponent },
      { path: "adduser", component: AdduserComponent },
      { path: "updateuser/:id", component: AdduserComponent },
      { path: "tables", component: AdminTablesComponent },
      { path: "reports", component: ReportsadminComponent },
      { path: "", redirectTo: "dashboard", pathMatch: "full" },
    ],
  },

  {
    path: "auth",
    component: AuthComponent,
    children: [
      { path: "login", component: LoginComponent },
      { path: "register", component: RegisterComponent },
      { path: "", redirectTo: "login", pathMatch: "full" },
    ],
  },
  {
    path: "patientspace",
    component: PatientspaceComponent,
    children: [
      { path: "profile", component: ProfileComponent },
     { path: 'credentials',component: CredentialsComponent},
    {path: 'journal',component: JournalComponent},

    ],
  },

  { path: "landing", component: LandingComponent },
  {path:"forgotpassword", component:ForgotpwComponent},
  {path:"reset-password", component:ResetpwComponent},
  { path: "", component: IndexComponent },
  { path: "**", redirectTo: "", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
