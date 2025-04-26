import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// components for views and layouts

import { DoctorNavbarComponent } from './frontOffice/components/navbars/doctor-navbar/doctor-navbar.component';
import { CardBarChartComponent } from './frontOffice/components/cards/card-bar-chart/card-bar-chart.component';
import { CardLineChartComponent } from './frontOffice/components/cards/card-line-chart/card-line-chart.component';
import { CardPageVisitsComponent } from './frontOffice/components/cards/card-page-visits/card-page-visits.component';
import { CardProfileComponent } from './frontOffice/components/cards/card-profile/card-profile.component';
import { CardSettingsComponent } from './frontOffice/components/cards/card-settings/card-settings.component';
import { CardSocialTrafficComponent } from './frontOffice/components/cards/card-social-traffic/card-social-traffic.component';
import { CardStatsComponent } from './frontOffice/components/cards/card-stats/card-stats.component';
import { CardTableComponent } from './frontOffice/components/cards/card-table/card-table.component';
import { FooterAdminComponent } from './frontOffice/components/footers/footer-admin/footer-admin.component';
import { FooterComponent } from './frontOffice/components/footer/footer.component';
import { FooterSmallComponent } from './frontOffice/components/footers/footer-small/footer-small.component';
import { HeaderStatsComponent } from './frontOffice/components/headers/header-stats/header-stats.component';
import { IndexNavbarComponent } from './frontOffice/components/navbars/index-navbar/index-navbar.component';
import { MapExampleComponent } from './frontOffice/components/maps/map-example/map-example.component';
import { IndexDropdownComponent } from './frontOffice/components/dropdowns/index-dropdown/index-dropdown.component';
import { TableDropdownComponent } from './frontOffice/components/dropdowns/table-dropdown/table-dropdown.component';
import { PagesDropdownComponent } from './frontOffice/components/dropdowns/pages-dropdown/pages-dropdown.component';
import { NotificationDropdownComponent } from './frontOffice/components/dropdowns/notification-dropdown/notification-dropdown.component';
import { SidebarComponent } from './frontOffice/components/sidebar/sidebar.component';
import { UserDropdownComponent } from './frontOffice/components/dropdowns/user-dropdown/user-dropdown.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TestimonialCarouselComponent } from './frontOffice/components/testimonial-carousel/testimonial-carousel.component';
import { LocationFinderComponent } from './frontOffice/components/location-finder/location-finder.component';
import { FormsModule } from '@angular/forms';
import { LoginNavbarComponent } from './frontOffice/components/navbars/login-navbar/login-navbar.component';
import { PatientNavbarComponent } from './frontOffice/components/navbars/patient-navbar/patient-navbar.component';
import { PatientspaceComponent } from './frontOffice/views/patientspace/patientspace.component';
import { HomeComponent } from './frontOffice/views/home/home.component';
import { AdminComponent } from './backOffice/views/admin/admin.component';
import { AdminNavbarComponent } from './backOffice/components/admin-navbar/admin-navbar.component';
import { AdminSidebarComponent } from './backOffice/components/admin-sidebar/admin-sidebar.component';
import { AdminHeaderStatsComponent } from './backOffice/components/admin-header-stats/admin-header-stats.component';
import { ForumSpaceComponent } from './frontOffice/views/forum-space/forum-space.component';
import { AdminForumComponent } from './backOffice/views/admin-forum/admin-forum.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminPostViewModalComponent } from './backOffice/components/admin-post-view-modal/admin-post-view-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmDeleteDialogComponent } from './backOffice/components/confirm-delete-dialog/confirm-delete-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { HttpClientModule } from '@angular/common/http';

import { ForumPostFormComponent } from './frontOffice/components/post-form/post-form.component';
import { PostListComponent } from './frontOffice/components/post-list/post-list.component';
import { PostDetailModalComponent } from './frontOffice/components/post-detail-modal/post-detail-modal.component';
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
