import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// layouts
import { DoctorComponent } from './frontOffice/layouts/doctor/doctor.component';
import { AuthComponent } from './frontOffice/layouts/auth/auth.component';

// admin views
import { DashboardComponent } from './frontOffice/view/admin/dashboard/dashboard.component';
import { MapsComponent } from './frontOffice/view/admin/maps/maps.component';
import { SettingsComponent } from './frontOffice/view/admin/settings/settings.component';
import { TablesComponent } from './frontOffice/view/admin/tables/tables.component';

// auth views
import { LoginComponent } from './frontOffice/view/auth/login/login.component';
import { RegisterComponent } from './frontOffice/view/auth/register/register.component';

// no layouts views
import { IndexComponent } from './frontOffice/view/index/index.component';
import { LandingComponent } from './frontOffice/view/landing/landing.component';
import { ProfileComponent } from './frontOffice/view/profile/profile.component';

// components for views and layouts

import { DoctorNavbarComponent } from './frontOffice/component/navbars/doctor-navbar/doctor-navbar.component';
import { CardBarChartComponent } from './frontOffice/component/cards/card-bar-chart/card-bar-chart.component';
import { CardLineChartComponent } from './frontOffice/component/cards/card-line-chart/card-line-chart.component';
import { CardPageVisitsComponent } from './frontOffice/component/cards/card-page-visits/card-page-visits.component';
import { CardProfileComponent } from './frontOffice/component/cards/card-profile/card-profile.component';
import { CardSettingsComponent } from './frontOffice/component/cards/card-settings/card-settings.component';
import { CardSocialTrafficComponent } from './frontOffice/component/cards/card-social-traffic/card-social-traffic.component';
import { CardStatsComponent } from './frontOffice/component/cards/card-stats/card-stats.component';
import { CardTableComponent } from './frontOffice/component/cards/card-table/card-table.component';
import { FooterAdminComponent } from './frontOffice/component/footers/footer-admin/footer-admin.component';
import { FooterComponent } from './frontOffice/component/footers/footer/footer.component';
import { FooterSmallComponent } from './frontOffice/component/footers/footer-small/footer-small.component';
import { HeaderStatsComponent } from './frontOffice/component/headers/header-stats/header-stats.component';
import { IndexNavbarComponent } from './frontOffice/component/navbars/index-navbar/index-navbar.component';
import { MapExampleComponent } from './frontOffice/component/maps/map-example/map-example.component';
import { IndexDropdownComponent } from './frontOffice/component/dropdowns/index-dropdown/index-dropdown.component';
import { TableDropdownComponent } from './frontOffice/component/dropdowns/table-dropdown/table-dropdown.component';
import { PagesDropdownComponent } from './frontOffice/component/dropdowns/pages-dropdown/pages-dropdown.component';
import { NotificationDropdownComponent } from './frontOffice/component/dropdowns/notification-dropdown/notification-dropdown.component';
import { SidebarComponent } from './frontOffice/component/sidebar/sidebar.component';
import { UserDropdownComponent } from './frontOffice/component/dropdowns/user-dropdown/user-dropdown.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TestimonialCarouselComponent } from './frontOffice/testimonial-carousel/testimonial-carousel.component';
import { LocationFinderComponent } from './frontOffice/location-finder/location-finder.component';
import { FormsModule } from '@angular/forms';
import { LoginNavbarComponent } from './frontOffice/component/navbars/login-navbar/login-navbar.component';
import { PatientNavbarComponent } from './frontOffice/component/navbars/patient-navbar/patient-navbar.component';
import { PatientspaceComponent } from './frontOffice/layouts/patientspace/patientspace.component';
import { HomeComponent } from './frontOffice/view/home/home.component';
import { AdminComponent } from './backOffice/views/admin/admin.component';
import { AdminNavbarComponent } from './backOffice/components/admin-navbar/admin-navbar.component';
import { AdminSidebarComponent } from './backOffice/components/admin-sidebar/admin-sidebar.component';
import { AdminHeaderStatsComponent } from './backOffice/components/admin-header-stats/admin-header-stats.component';
import { ForumSpaceComponent } from './frontOffice/layouts/forum/components/forum-space/forum-space.component';
import { ForumDropdownComponent } from './frontOffice/layouts/forum/dropdown/forum-dropdown/forum-dropdown.component';
import { AdminForumComponent } from './backOffice/views/admin-forum/admin-forum.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminPostViewModalComponent } from './backOffice/components/admin-post-view-modal/admin-post-view-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmDeleteDialogComponent } from './backOffice/components/confirm-delete-dialog/confirm-delete-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { HttpClientModule } from '@angular/common/http';

import { ForumPostFormComponent } from './frontOffice/layouts/forum/components/post-form/post-form.component';
import { PostListComponent } from './frontOffice/layouts/forum/components/post-list/post-list.component';
import { PostDetailModalComponent } from './frontOffice/layouts/forum/components/post-detail-modal/post-detail-modal.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ReportDetailModalComponentComponent } from './backOffice/components/report-detail-modal-component/report-detail-modal-component.component';
import { StatsPostChartComponent } from './backOffice/components/stats-post-chart/stats-post-chart.component';
import { NgChartsModule } from 'ng2-charts';
import { StatsCommentChartComponent } from './backOffice/components/stats-comment-chart/stats-comment-chart.component';
import { StatsContainerComponent } from './backOffice/components/stats-container/stats-container.component';
import { StatsReactionChartComponent } from './backOffice/components/stats-reaction-chart/stats-reaction-chart.component';
import { ToastrModule } from 'ngx-toastr';

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
    AdminComponent,
    AdminNavbarComponent,
    AdminSidebarComponent,
    AdminHeaderStatsComponent,
    ForumSpaceComponent,
    ForumDropdownComponent,
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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    HttpClientModule,
    MatSnackBarModule,
    NgChartsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      timeOut: 3000,
      closeButton: true,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
