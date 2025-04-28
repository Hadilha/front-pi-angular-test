import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

// layouts

// admin views


// auth views
import { LoginComponent } from "./frontOffice/views/user/login/login.component";
import { RegisterComponent } from "./frontOffice/views/user/register/register.component";

// no layouts views
import { ProfilePatientComponent } from "./frontOffice/views/user/profile-patient/profile-patient.component";

// components for views and layouts

import { DoctorNavbarComponent } from "./frontOffice/components/user/navbars/doctor-navbar/doctor-navbar.component";
import { CardProfileDoctorComponent } from "./frontOffice/components/user/cards/card-profile-doctor/card-profile-doctor.component";
import { FooterComponent } from "./frontOffice/components/user/footers/footer/footer.component";
import { IndexNavbarComponent } from "./frontOffice/components/user/navbars/index-navbar/index-navbar.component";
import { TableDropdownComponent } from "./frontOffice/components/user/dropdowns/table-dropdown/table-dropdown.component";
import { NotificationDropdownComponent } from "./frontOffice/components/user/dropdowns/notification-dropdown/notification-dropdown.component";
import { UserDropdownComponent } from "./frontOffice/components/user/dropdowns/user-dropdown/user-dropdown.component";
import { Router, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LoginNavbarComponent } from './frontOffice/components/user/navbars/login-navbar/login-navbar.component';
import { PatientNavbarComponent } from './frontOffice/components/user/navbars/patient-navbar/patient-navbar.component';
import { HomeComponent } from './frontOffice/views/user/home/home.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RoleFormatPipe } from './shared/pipes/role-format.pipe';
import { CredentialsPatientComponent } from "./frontOffice/views/user/credentials-patient/credentials-patient.component";
import { StripHtmlPipe } from '../app/shared/pipes/strip-html.pipe';
import { TruncatePipe } from './shared/pipes/truncate.pipe';
import { LocationFinderComponent } from "./frontOffice/components/user/location-finder/location-finder.component";
import { TestimonialCarouselComponent } from "./frontOffice/components/user/testimonial-carousel/testimonial-carousel.component";

import { ResetpwComponent } from './frontOffice/views/user/resetpw/resetpw.component';
import { AdduserComponent } from "./backOffice/views/user/adduser/adduser.component";
import { AdminHeaderStatsComponent } from "./backOffice/components/user/admin-header-stats/admin-header-stats.component";
import { AdminComponent } from "./backOffice/views/user/admin/admin.component";
import { AuthComponent } from "./frontOffice/views/user/auth/auth.component";
import { PatientspaceComponent } from "./frontOffice/views/user/patientspace/patientspace.component";
import { DoctorComponent } from "./frontOffice/views/user/doctor/doctor.component";
import { AdminNavbarComponent } from "./backOffice/components/user/admin-navbar/admin-navbar.component";
import { AdminSidebarComponent } from "./backOffice/components/user/admin-sidebar/admin-sidebar.component";
import { ListusersComponent } from "./backOffice/views/user/listusers/listusers.component";
import { CardBarChartAdminComponent } from "./backOffice/components/user/cards/card-bar-chart-admin/card-bar-chart-admin.component";
import { CardLineChartAdminComponent } from "./backOffice/components/user/cards/card-line-chart-admin/card-line-chart-admin.component";
import { CardPageVisitsAdminComponent } from "./backOffice/components/user/cards/card-page-visits-admin/card-page-visits-admin.component";
import { CardSettingsDoctorComponent } from "./frontOffice/components/user/cards/card-settings-doctor/card-settings.-doctor.component";
import { CardSocialTrafficAdminComponent } from "./backOffice/components/user/cards/card-social-traffic-admin/card-social-traffic-admin.component";
import { CardStatsAdminComponent } from "./backOffice/components/user/cards/card-stats-admin/card-stats-admin.component";
import { profileDoctorComponent } from "./frontOffice/views/user/profileDoctor/profileDoctor.component";
import { TablesDoctorComponent } from "./frontOffice/views/user/tablesDoctor/tablesDoctor.component";
import { JournalComponent } from "./frontOffice/views/user/journal/journal.component";
import { EntriesListComponent } from "./frontOffice/views/user/entries-list/entries-list.component";
import { UpdateJournalComponent } from "./frontOffice/views/user/update-journal/update-journal.component";
import { AddJournalComponent } from "./frontOffice/views/user/add-journal/add-journal.component";
import { ShowJournalComponent } from "./frontOffice/views/user/show-journal/show-journal.component";
import { SidebarJournalComponent } from "./frontOffice/components/user/sidbars/sidebarJournal/sidebarJournal.component";
import { UserStatsComponent } from "./backOffice/views/user/user-stats/user-stats.component";
import { CardprofiladminComponent } from "./backOffice/components/user/cards/cardprofiladmin/cardprofiladmin.component";
import { StatisticsAdminComponent } from "./backOffice/views/user/statistics-admin/statistics-admin.component";
import { AuthInterceptor } from "./shared/http.interceptor";
import { CommonModule } from "@angular/common";
import { SidbarDoctorComponent } from "./frontOffice/components/user/sidbars/sidbar-doctor/sidbar-doctor.component";
import { ForgotpwComponent } from "./frontOffice/views/user/forgotpw/forgotpw.component";
import { ForumSpaceComponent } from "./frontOffice/views/forum/forum-space/forum-space.component";
import { AdminForumComponent } from "./backOffice/views/forum/admin-forum/admin-forum.component";
import { AdminPostViewModalComponent } from "./backOffice/components/forum/admin-post-view-modal/admin-post-view-modal.component";
import { ConfirmDeleteDialogComponent } from "./backOffice/components/forum/confirm-delete-dialog/confirm-delete-dialog.component";
import { ForumPostFormComponent } from "./frontOffice/components/forum/post-form/post-form.component";
import { PostListComponent } from "./frontOffice/components/forum/post-list/post-list.component";
import { PostDetailModalComponent } from "./frontOffice/components/forum/post-detail-modal/post-detail-modal.component";
import { ReportDetailModalComponentComponent } from "./backOffice/components/forum/report-detail-modal-component/report-detail-modal-component.component";
import { StatsPostChartComponent } from "./backOffice/components/forum/stats-post-chart/stats-post-chart.component";
import { StatsCommentChartComponent } from "./backOffice/components/forum/stats-comment-chart/stats-comment-chart.component";
import { StatsContainerComponent } from "./backOffice/components/forum/stats-container/stats-container.component";
import { StatsReactionChartComponent } from "./backOffice/components/forum/stats-reaction-chart/stats-reaction-chart.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { QuillModule } from 'ngx-quill';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgChartsModule } from 'ng2-charts';
import { ToastrModule } from 'ngx-toastr';
import { CardStatsComponent } from "./frontOffice/components/forum/card-stats/card-stats.component";
import { HeaderStatsComponent } from "./frontOffice/components/forum/headers/header-stats/header-stats.component";


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
    ForumSpaceComponent,
    AdminForumComponent,
    AdminPostViewModalComponent,
    ConfirmDeleteDialogComponent,
    ForumPostFormComponent,
    PostListComponent,
    PostDetailModalComponent,
    ReportDetailModalComponentComponent,
    StatsPostChartComponent,
    StatsCommentChartComponent,
    StatsContainerComponent,
    StatsReactionChartComponent,
    CardStatsComponent,
    HeaderStatsComponent

  ],
  imports: [
    BrowserModule,
     AppRoutingModule,
      FormsModule,
       HttpClientModule,
       ReactiveFormsModule,
       RouterModule,
       QuillModule.forRoot(),
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    NgChartsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      timeOut: 3000,
      closeButton: true,
    }),

  ],





  providers: [StripHtmlPipe, TruncatePipe,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }

  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
