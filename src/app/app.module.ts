import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ContentProgramComponent } from './frontOffice/content-program/content-program.component'; // ton composant

// layouts
import { DoctorComponent } from "./frontOffice/layouts/doctor/doctor.component";
import { AuthComponent } from "./frontOffice/layouts/auth/auth.component";

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
//Coaching

import { HttpClientModule } from '@angular/common/http';

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
import { RouterModule } from '@angular/router';
import { CommonModule } from "@angular/common";
import { TestimonialCarouselComponent } from './frontOffice/testimonial-carousel/testimonial-carousel.component';
import { LocationFinderComponent } from './frontOffice/location-finder/location-finder.component';
import { FormsModule } from "@angular/forms";
import { LoginNavbarComponent } from './frontOffice/components/navbars/login-navbar/login-navbar.component';
import { PatientNavbarComponent } from './frontOffice/components/navbars/patient-navbar/patient-navbar.component';
import { PatientspaceComponent } from "./frontOffice/layouts/patientspace/patientspace.component";
import { HomeComponent } from './frontOffice/views/home/home.component';
import { AdminDashboardComponent } from './backOffice/admin-dashboard/admin-dashboard.component';
import { AdminComponent } from './backOffice/admin/admin.component';
import { AdminTablesComponent } from './backOffice/admin-tables/admin-tables.component';
import { AdminNavbarComponent } from "./backOffice/admin-navbar/admin-navbar.component";
import { AdminSidebarComponent } from "./backOffice/admin-sidebar/admin-sidebar.component";
import { AdminHeaderStatsComponent } from "./backOffice/admin-header-stats/admin-header-stats.component";
import { CoachingprogramComponent } from './backOffice/coachingprogram/coachingprogram.component';
import { ContentprogramComponent } from './backOffice/contentprogram/contentprogram.component';
import { CoachingProgramAjouterUpdateComponent } from './backOffice/coachingprogramajouter-update/coachingprogramajouter-update.component';
import { ContentProgramAjouterupdateComponent } from './backOffice/content-program-ajouterupdate/content-program-ajouterupdate.component';
import { CoachOfTheMonthComponent } from './components/coach-of-the-month/coach-of-the-month.component';
import { CoachProgressComponent } from './components/coach-progress/coach-progress.component';
import { CoachComponent } from './frontOffice/layouts/coach/coach.component';


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
    LocationFinderComponent,
    LoginNavbarComponent,
    PatientNavbarComponent,
    PatientspaceComponent,
    LocationFinderComponent,
    FooterComponent,
    HomeComponent,
    AdminDashboardComponent,
    AdminComponent,
    AdminTablesComponent,
    AdminNavbarComponent,
    AdminSidebarComponent,
    AdminHeaderStatsComponent,
    CoachingprogramComponent,
    ContentprogramComponent,
    ContentProgramComponent,
    CoachingProgramAjouterUpdateComponent,
    ContentProgramAjouterupdateComponent,
    CoachOfTheMonthComponent,
    CoachProgressComponent,
    CoachComponent,
         

  ],
  imports: [BrowserModule, AppRoutingModule,CommonModule, FormsModule,HttpClientModule,ReactiveFormsModule, RouterModule.forRoot([])], // Ajout de HttpClientModule ici
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
