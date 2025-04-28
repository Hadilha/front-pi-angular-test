import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./frontOffice/views/user/login/login.component";
import { RegisterComponent } from "./frontOffice/views/user/register/register.component";
import { ProfilePatientComponent } from "./frontOffice/views/user/profile-patient/profile-patient.component";
import { ForgotpwComponent } from "./frontOffice/views/user/forgotpw/forgotpw.component";
import { ResetpwComponent } from "./frontOffice/views/user/resetpw/resetpw.component";
import { DoctorComponent } from "./frontOffice/views/user/doctor/doctor.component";
import { AdminComponent } from "./backOffice/views/user/admin/admin.component";
import { ListusersComponent } from "./backOffice/views/user/listusers/listusers.component";
import { AdduserComponent } from "./backOffice/views/user/adduser/adduser.component";
import { AuthComponent } from "./frontOffice/views/user/auth/auth.component";
import { PatientspaceComponent } from "./frontOffice/views/user/patientspace/patientspace.component";
import { CredentialsPatientComponent } from "./frontOffice/views/user/credentials-patient/credentials-patient.component";
import { NotificationDropdownComponent } from "./frontOffice/components/user/dropdowns/notification-dropdown/notification-dropdown.component";
import { IndexNavbarComponent } from "./frontOffice/components/user/navbars/index-navbar/index-navbar.component";
import { TableDropdownComponent } from "./frontOffice/components/user/dropdowns/table-dropdown/table-dropdown.component";
import { UserDropdownComponent } from "./frontOffice/components/user/dropdowns/user-dropdown/user-dropdown.component";
import { FooterComponent } from "./frontOffice/components/user/footers/footer/footer.component";
import { HomeComponent } from "./frontOffice/views/user/home/home.component";
import { profileDoctorComponent } from "./frontOffice/views/user/profileDoctor/profileDoctor.component";
import { TablesDoctorComponent } from "./frontOffice/views/user/tablesDoctor/tablesDoctor.component";
import { StatisticsAdminComponent } from "./backOffice/views/user/statistics-admin/statistics-admin.component";
import { JournalComponent } from "./frontOffice/views/user/journal/journal.component";
import { RoleGuard } from "./shared/role.guard";
import { AdminForumComponent } from "./backOffice/views/forum/admin-forum/admin-forum.component";
import { ForumSpaceComponent } from "./frontOffice/views/forum/forum-space/forum-space.component";

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
      { path: "updateuser/:id", component: AdduserComponent },
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
      { path: 'forum', component: AdminForumComponent },
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
      {
        path: 'forum', component: ForumSpaceComponent,},
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
