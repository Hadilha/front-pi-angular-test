import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";


// components for views and layouts

import { DoctorNavbarComponent } from "./frontOffice/components/navbars/doctor-navbar/doctor-navbar.component";

import { FooterComponent } from "./frontOffice/components/footers/footer/footer.component";
import { IndexNavbarComponent } from "./frontOffice/components/navbars/index-navbar/index-navbar.component";
import { TableDropdownComponent } from "./frontOffice/components/dropdowns/table-dropdown/table-dropdown.component";
import { NotificationDropdownComponent } from "./frontOffice/components/dropdowns/notification-dropdown/notification-dropdown.component";
import { RouterModule } from '@angular/router';
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LoginNavbarComponent } from './frontOffice/components/navbars/login-navbar/login-navbar.component';
import { PatientNavbarComponent } from './frontOffice/components/navbars/patient-navbar/patient-navbar.component';
import { HomeComponent } from './frontOffice/views/home/home.component';

import { HttpClientModule } from "@angular/common/http";


import { PatientPrescriptionComponent } from "./backOffice/components/prescription-management/patient-prescription/patient-prescription.component";
import { DetailsPrescriptionComponent } from "./backOffice/components/prescription-management/details-prescription/details-prescription.component";
import { UpdatePrescriptionComponent } from "./backOffice/components/prescription-management/update-prescription/update-prescription.component";
import { AddPrescriptionComponent } from "./backOffice/components/prescription-management/add-prescription/add-prescription.component";
import { ListPrescriptionsComponent } from "./backOffice/components/prescription-management/list-prescriptions/list-prescriptions.component";
import { PatientNotesComponent } from "./backOffice/components/note-management/patient-notes/patient-notes.component";
import { DetailsNoteComponent } from "./backOffice/components/note-management/details-note/details-note.component";
import { UpdateNoteComponent } from "./backOffice/components/note-management/update-note/update-note.component";
import { AddNoteComponent } from "./backOffice/components/note-management/add-note/add-note.component";
import { ListNotesComponent } from "./backOffice/components/note-management/list-notes/list-notes.component";
import { AdminHeaderStatsComponent } from "./backOffice/components/admin-header-stats/admin-header-stats.component";
import { AdminSidebarComponent } from "./backOffice/components/admin-sidebar/admin-sidebar.component";
import { AdminNavbarComponent } from "./backOffice/components/admin-navbar/admin-navbar.component";
import { AdminComponent } from "./backOffice/views/admin/admin.component";
import { PatientspaceComponent } from "./frontOffice/views/patientspace/patientspace.component";
import { LocationFinderComponent } from "./frontOffice/components/location-finder/location-finder.component";
import { PatientNotesDetailsComponent } from "./frontOffice/components/patient-notes-details/patient-notes-details.component";
import { PatientPrescriptionDetailsComponent } from "./frontOffice/components/patient-prescription-details/patient-prescription-details.component";
import { TestimonialCarouselComponent } from "./frontOffice/components/testimonial-carousel/testimonial-carousel.component";
import { RegisterComponent } from "./frontOffice/views/register/register.component";
import { LoginComponent } from "./frontOffice/views/login/login.component";
import { AuthComponent } from "./frontOffice/views/auth/auth.component";
import { DoctorComponent } from "./frontOffice/views/doctor/doctor.component";
import { SidebarDoctorComponent } from "./frontOffice/components/sidbars/sidebar-doctor/sidebar-doctor.component";

@NgModule({
  declarations: [
    AppComponent,
    TableDropdownComponent,
    NotificationDropdownComponent,
    SidebarDoctorComponent,
    FooterComponent,
    DoctorNavbarComponent,
    IndexNavbarComponent,
    DoctorComponent,
    AuthComponent,
    LoginComponent,
    RegisterComponent,
    TestimonialCarouselComponent,
    LocationFinderComponent,
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
    ListNotesComponent,
    AddNoteComponent,
    UpdateNoteComponent,
    DetailsNoteComponent,
    PatientNotesComponent,
    ListPrescriptionsComponent,
    AddPrescriptionComponent,
    UpdatePrescriptionComponent,
    DetailsPrescriptionComponent,
    PatientPrescriptionComponent,
    PatientNotesDetailsComponent,
    PatientPrescriptionDetailsComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
