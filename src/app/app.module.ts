import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

// layouts

// admin views
import { DashboardComponent } from "./frontOffice/views/admin/dashboard/dashboard.component";
import { MapsComponent } from "./frontOffice/views/admin/maps/maps.component";
import { SettingsComponent } from "./frontOffice/views/admin/settings/settings.component";
import { TablesComponent } from "./frontOffice/views/admin/tables/tables.component";

// auth views
import { LoginComponent } from "./frontOffice/views/auth/login/login.component";
import { RegisterComponent } from "./frontOffice/views/auth/register/register.component";

// no layouts views
import { IndexComponent } from "./frontOffice/views/index/index.component";
import { LandingComponent } from "./frontOffice/views/landing/landing.component";
import { ProfileComponent } from "./frontOffice/views/profile/profile.component";

// components for views and layouts

import { DoctorNavbarComponent } from "./frontOffice/components/navbars/doctor-navbar/doctor-navbar.component";
import { CardBarChartComponent } from "./frontOffice/components/cards/card-bar-chart/card-bar-chart.component";
import { CardLineChartComponent } from "./frontOffice/components/cards/card-line-chart/card-line-chart.component";
import { CardPageVisitsComponent } from "./frontOffice/components/cards/card-page-visits/card-page-visits.component";
import { CardProfileComponent } from "./frontOffice/components/cards/card-profile/card-profile.component";
import { CardSettingsComponent } from "./frontOffice/components/cards/card-settings/card-settings.component";
import { CardSocialTrafficComponent } from "./frontOffice/components/cards/card-social-traffic/card-social-traffic.component";
import { CardStatsComponent } from "./frontOffice/components/cards/card-stats/card-stats.component";
import { CardTableComponent } from "./frontOffice/components/cards/card-table/card-table.component";
import { FooterAdminComponent } from "./frontOffice/components/footers/footer-admin/footer-admin.component";
import { FooterComponent } from "./frontOffice/components/footers/footer/footer.component";
import { FooterSmallComponent } from "./frontOffice/components/footers/footer-small/footer-small.component";
import { HeaderStatsComponent } from "./frontOffice/components/headers/header-stats/header-stats.component";
import { IndexNavbarComponent } from "./frontOffice/components/navbars/index-navbar/index-navbar.component";
import { MapExampleComponent } from "./frontOffice/components/maps/map-example/map-example.component";
import { IndexDropdownComponent } from "./frontOffice/components/dropdowns/index-dropdown/index-dropdown.component";
import { TableDropdownComponent } from "./frontOffice/components/dropdowns/table-dropdown/table-dropdown.component";
import { PagesDropdownComponent } from "./frontOffice/components/dropdowns/pages-dropdown/pages-dropdown.component";
import { NotificationDropdownComponent } from "./frontOffice/components/dropdowns/notification-dropdown/notification-dropdown.component";
import { SidebarComponent } from "./frontOffice/components/sidebar/sidebar.component";
import { UserDropdownComponent } from "./frontOffice/components/dropdowns/user-dropdown/user-dropdown.component";
import { Router, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LoginNavbarComponent } from './frontOffice/components/navbars/login-navbar/login-navbar.component';
import { PatientNavbarComponent } from './frontOffice/components/navbars/patient-navbar/patient-navbar.component';
import { HomeComponent } from './frontOffice/views/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { RoleFormatPipe } from './shared/pipes/role-format.pipe';
import { CredentialsComponent } from "./frontOffice/views/credentials/credentials.component";
import { StripHtmlPipe } from '../app/shared/pipes/strip-html.pipe';
import { TruncatePipe } from './shared/pipes/truncate.pipe';
import { QuillModule } from 'ngx-quill';
import { LocationFinderComponent } from "./frontOffice/components/location-finder/location-finder.component";
import { TestimonialCarouselComponent } from "./frontOffice/components/testimonial-carousel/testimonial-carousel.component";
import { JournalComponent } from './frontOffice/views/journal/journal/journal.component';
import { EntriesListComponent } from './frontOffice/views/journal/entries-list/entries-list.component';
import { AddJournalComponent } from './frontOffice/views/journal/add-journal/add-journal.component';
import { UpdateJournalComponent } from './frontOffice/views/journal/update-journal/update-journal.component';
import { ShowJournalComponent } from './frontOffice/views/journal/show-journal/show-journal.component';
import { CommonModule } from '@angular/common';
import { SidebarJournalComponent } from './frontOffice/views/journal/sidebarJournal/sidebarJournal.component';
import { ForgotpwComponent } from './frontOffice/views/auth/forgotpw/forgotpw.component';
import { ResetpwComponent } from './frontOffice/views/auth/resetpw/resetpw.component';
import { UserStatsComponent } from "./backOffice/components/user-stats/user-stats.component";
import { AdduserComponent } from "./backOffice/views/adduser/adduser.component";
import { AdminHeaderStatsComponent } from "./backOffice/components/admin-header-stats/admin-header-stats.component";
import { AdminComponent } from "./backOffice/views/admin/admin.component";
import { AuthComponent } from "./frontOffice/views/auth/auth.component";
import { AdminTablesComponent } from "./backOffice/views/admin-tables/admin-tables.component";
import { PatientspaceComponent } from "./frontOffice/views/patientspace/patientspace.component";
import { DoctorComponent } from "./frontOffice/views/doctor/doctor.component";
import { AdminNavbarComponent } from "./backOffice/components/admin-navbar/admin-navbar.component";
import { AdminSidebarComponent } from "./backOffice/components/admin-sidebar/admin-sidebar.component";
import { ListusersComponent } from "./backOffice/views/listusers/listusers.component";
import { ReportsadminComponent } from "./backOffice/views/reportsadmin/reportsadmin.component";
import { CardprofiladminComponent } from "./backOffice/components/cardprofiladmin/cardprofiladmin.component";
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    CardBarChartComponent,
    CardLineChartComponent,
    IndexDropdownComponent,
    PagesDropdownComponent,
    TableDropdownComponent,
    NotificationDropdownComponent,
    UserDropdownComponent,
    SidebarComponent,
    FooterComponent,
    FooterSmallComponent,
    FooterAdminComponent,
    CardPageVisitsComponent,
    CardProfileComponent,
    CardSettingsComponent,
    CardSocialTrafficComponent,
    CardStatsComponent,
    CardTableComponent,
    HeaderStatsComponent,
    MapExampleComponent,
    DoctorNavbarComponent,
    IndexNavbarComponent,
    DoctorComponent,
    AuthComponent,
    MapsComponent,
    SettingsComponent,
    TablesComponent,
    LoginComponent,
    RegisterComponent,
    IndexComponent,
    LandingComponent,
    ProfileComponent,
    TestimonialCarouselComponent,
    LoginNavbarComponent,
    PatientNavbarComponent,
    PatientspaceComponent,
    LocationFinderComponent,
    FooterComponent,
    HomeComponent,
    AdminComponent,
    AdminTablesComponent,
    AdminNavbarComponent,
    AdminSidebarComponent,
    AdminHeaderStatsComponent,
    ListusersComponent,
    RoleFormatPipe,
    ReportsadminComponent,
    AdduserComponent,
    CredentialsComponent,
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


  ],
  imports: [BrowserModule, AppRoutingModule,CommonModule, FormsModule, HttpClientModule,ReactiveFormsModule,RouterModule, QuillModule.forRoot() // Single import here

  ],
  providers: [StripHtmlPipe, TruncatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
