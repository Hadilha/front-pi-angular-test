import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

// layouts

// admin views


// auth views
import { LoginComponent } from "./frontOffice/views/login/login.component";
import { RegisterComponent } from "./frontOffice/views/register/register.component";

// no layouts views
import { ProfilePatientComponent } from "./frontOffice/views/profile-patient/profile-patient.component";

// components for views and layouts

import { DoctorNavbarComponent } from "./frontOffice/components/navbars/doctor-navbar/doctor-navbar.component";
import { CardProfileDoctorComponent } from "./frontOffice/components/cards/card-profile-doctor/card-profile-doctor.component";
import { FooterComponent } from "./frontOffice/components/footers/footer/footer.component";
import { IndexNavbarComponent } from "./frontOffice/components/navbars/index-navbar/index-navbar.component";
import { TableDropdownComponent } from "./frontOffice/components/dropdowns/table-dropdown/table-dropdown.component";
import { NotificationDropdownComponent } from "./frontOffice/components/dropdowns/notification-dropdown/notification-dropdown.component";
import { UserDropdownComponent } from "./frontOffice/components/dropdowns/user-dropdown/user-dropdown.component";
import { Router, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LoginNavbarComponent } from './frontOffice/components/navbars/login-navbar/login-navbar.component';
import { PatientNavbarComponent } from './frontOffice/components/navbars/patient-navbar/patient-navbar.component';
import { HomeComponent } from './frontOffice/views/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { RoleFormatPipe } from './shared/pipes/role-format.pipe';
import { CredentialsPatientComponent } from "./frontOffice/views/credentials-patient/credentials-patient.component";
import { StripHtmlPipe } from '../app/shared/pipes/strip-html.pipe';
import { TruncatePipe } from './shared/pipes/truncate.pipe';
import { QuillModule } from 'ngx-quill';
import { LocationFinderComponent } from "./frontOffice/components/location-finder/location-finder.component";
import { TestimonialCarouselComponent } from "./frontOffice/components/testimonial-carousel/testimonial-carousel.component";

import { CommonModule } from '@angular/common';
import { ForgotpwComponent } from './frontOffice/views/forgotpw/forgotpw.component';
import { ResetpwComponent } from './frontOffice/views/resetpw/resetpw.component';
import { AdduserComponent } from "./backOffice/views/adduser/adduser.component";
import { AdminHeaderStatsComponent } from "./backOffice/components/admin-header-stats/admin-header-stats.component";
import { AdminComponent } from "./backOffice/views/admin/admin.component";
import { AuthComponent } from "./frontOffice/views/auth/auth.component";
import { PatientspaceComponent } from "./frontOffice/views/patientspace/patientspace.component";
import { DoctorComponent } from "./frontOffice/views/doctor/doctor.component";
import { AdminNavbarComponent } from "./backOffice/components/admin-navbar/admin-navbar.component";
import { AdminSidebarComponent } from "./backOffice/components/admin-sidebar/admin-sidebar.component";
import { ListusersComponent } from "./backOffice/views/listusers/listusers.component";
import { CardBarChartAdminComponent } from "./backOffice/components/cards/card-bar-chart-admin/card-bar-chart-admin.component";
import { CardLineChartAdminComponent } from "./backOffice/components/cards/card-line-chart-admin/card-line-chart-admin.component";
import { CardPageVisitsAdminComponent } from "./backOffice/components/cards/card-page-visits-admin/card-page-visits-admin.component";
import { CardSettingsDoctorComponent } from "./frontOffice/components/cards/card-settings-doctor/card-settings.-doctor.component";
import { CardSocialTrafficAdminComponent } from "./backOffice/components/cards/card-social-traffic-admin/card-social-traffic-admin.component";
import { CardStatsAdminComponent } from "./backOffice/components/cards/card-stats-admin/card-stats-admin.component";
import { profileDoctorComponent } from "./frontOffice/views/profileDoctor/profileDoctor.component";
import { TablesDoctorComponent } from "./frontOffice/views/tablesDoctor/tables.component";
import { JournalComponent } from "./frontOffice/views/journal/journal.component";
import { EntriesListComponent } from "./frontOffice/views/entries-list/entries-list.component";
import { UpdateJournalComponent } from "./frontOffice/views/update-journal/update-journal.component";
import { AddJournalComponent } from "./frontOffice/views/add-journal/add-journal.component";
import { ShowJournalComponent } from "./frontOffice/views/show-journal/show-journal.component";
import { SidebarJournalComponent } from "./frontOffice/components/sidbars/sidebarJournal/sidebarJournal.component";
import { UserStatsComponent } from "./backOffice/views/user-stats/user-stats.component";
import { CardprofiladminComponent } from "./backOffice/components/cards/cardprofiladmin/cardprofiladmin.component";
import { SidbarDoctorComponent } from "./frontOffice/components/sidbars/sidbar-doctor/sidbar-doctor.component";
import { StatisticsAdminComponent } from "./backOffice/views/statistics-admin/statistics-admin.component";

@NgModule({
  declarations: [
    AppComponent,
    CardBarChartAdminComponent,
    CardLineChartAdminComponent,
    TableDropdownComponent,
    NotificationDropdownComponent,
    UserDropdownComponent,
    FooterComponent,
    CardPageVisitsAdminComponent,
    CardProfileDoctorComponent,
    CardSettingsDoctorComponent,
    CardSocialTrafficAdminComponent,
    CardStatsAdminComponent,
    DoctorNavbarComponent,
    IndexNavbarComponent,
    DoctorComponent,
    AuthComponent,
    profileDoctorComponent,
    TablesDoctorComponent,
    LoginComponent,
    RegisterComponent,
    ProfilePatientComponent,
       TestimonialCarouselComponent,
    LoginNavbarComponent,
    PatientNavbarComponent,
    PatientspaceComponent,
    LocationFinderComponent,
    FooterComponent,
    HomeComponent,
    AdminComponent,
    AdminNavbarComponent,
    AdminSidebarComponent,
    AdminHeaderStatsComponent,
    ListusersComponent,
    RoleFormatPipe,
    AdduserComponent,
    CredentialsPatientComponent,
    TruncatePipe,
    JournalComponent,
    EntriesListComponent,
    AddJournalComponent,
    UpdateJournalComponent,
    ShowJournalComponent,
    SidebarJournalComponent,
    ForgotpwComponent,
    ResetpwComponent,
    UserStatsComponent,
    CardprofiladminComponent,
    SidbarDoctorComponent,
    StatisticsAdminComponent,


  ],
  imports: [BrowserModule, AppRoutingModule,CommonModule, FormsModule, HttpClientModule,ReactiveFormsModule,RouterModule, QuillModule.forRoot() // Single import here

  ],
  providers: [StripHtmlPipe, TruncatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
