import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./frontOffice/views/login/login.component";
import { RegisterComponent } from "./frontOffice/views/register/register.component";
import { ProfilePatientComponent } from "./frontOffice/views/profile-patient/profile-patient.component";
import { ForgotpwComponent } from "./frontOffice/views/forgotpw/forgotpw.component";
import { ResetpwComponent } from "./frontOffice/views/resetpw/resetpw.component";
import { DoctorComponent } from "./frontOffice/views/doctor/doctor.component";
import { AdminComponent } from "./backOffice/views/admin/admin.component";
import { ListusersComponent } from "./backOffice/views/listusers/listusers.component";
import { AdduserComponent } from "./backOffice/views/adduser/adduser.component";
import { AuthComponent } from "./frontOffice/views/auth/auth.component";
import { PatientspaceComponent } from "./frontOffice/views/patientspace/patientspace.component";
import { CredentialsPatientComponent } from "./frontOffice/views/credentials-patient/credentials-patient.component";
import { NotificationDropdownComponent } from "./frontOffice/components/dropdowns/notification-dropdown/notification-dropdown.component";
import { IndexNavbarComponent } from "./frontOffice/components/navbars/index-navbar/index-navbar.component";
import { TableDropdownComponent } from "./frontOffice/components/dropdowns/table-dropdown/table-dropdown.component";
import { UserDropdownComponent } from "./frontOffice/components/dropdowns/user-dropdown/user-dropdown.component";
import { FooterComponent } from "./frontOffice/components/footers/footer/footer.component";
import { HomeComponent } from "./frontOffice/views/home/home.component";
import { profileDoctorComponent } from "./frontOffice/views/profileDoctor/profileDoctor.component";
import { TablesDoctorComponent } from "./frontOffice/views/tablesDoctor/tablesDoctor.component";
import { StatisticsAdminComponent } from "./backOffice/views/statistics-admin/statistics-admin.component";
import { JournalComponent } from "./frontOffice/views/journal/journal.component";
import { RoleGuard } from "./shared/role.guard";

//import { JournalComponent } from "./frontOffice/views/journal/journal.component";

const routes: Routes = [
  // Doctor Dashboard
  {
    path: "doctor",
    component: DoctorComponent,
    canActivate: [RoleGuard],
    data: { roles: ['DOCTOR'] },
    children: [
      { path: "profile", component: profileDoctorComponent },
      { path: "patientList", component: TablesDoctorComponent },
      { path: "", redirectTo: "patientList", pathMatch: "full" },
    ],
  },

  // Admin Dashboard
  {
    path: "admin",
    component: AdminComponent,
    canActivate: [RoleGuard],
    data: { roles: ['ADMIN'] },
    children: [
      { path: "usermanagment", component: ListusersComponent },
      { path: "adduser", component: AdduserComponent },
      { path: "updateuser/:id", component: AdduserComponent },
      { path: "statistics", component: StatisticsAdminComponent },
      { path: "", redirectTo: "usermanagment", pathMatch: "full" },
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
    canActivate: [RoleGuard],
    data: { roles: ['PATIENT'] },
    children: [
      { path: "profile", component: ProfilePatientComponent },
      { path: 'credentials', component: CredentialsPatientComponent },
      { path: 'journal', component: JournalComponent },
    ],
  },

  { path: "forgotpassword", component: ForgotpwComponent },
  { path: "reset-password", component: ResetpwComponent },
  { path: "", component: HomeComponent },
  { path: "**", redirectTo: "", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
