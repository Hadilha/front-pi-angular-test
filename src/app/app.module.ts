import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// layouts
import { DoctorComponent } from './frontOffice/layouts/doctor/doctor.component';
import { AuthComponent } from './frontOffice/layouts/auth/auth.component';

// admin views
import { DashboardComponent } from './frontOffice/views/admin/dashboard/dashboard.component';
import { MapsComponent } from './frontOffice/views/admin/maps/maps.component';
import { SettingsComponent } from './frontOffice/views/admin/settings/settings.component';
import { TablesComponent } from './frontOffice/views/admin/tables/tables.component';

// auth views
import { LoginComponent } from './frontOffice/views/auth/login/login.component';
import { RegisterComponent } from './frontOffice/views/auth/register/register.component';

// no layouts views
import { IndexComponent } from './frontOffice/views/index/index.component';
import { LandingComponent } from './frontOffice/views/landing/landing.component';
import { ProfileComponent } from './frontOffice/views/profile/profile.component';

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
import { FooterComponent } from './frontOffice/components/footers/footer/footer.component';
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
import { TestimonialCarouselComponent } from './frontOffice/testimonial-carousel/testimonial-carousel.component';
import { LocationFinderComponent } from './frontOffice/location-finder/location-finder.component';
import { FormsModule } from '@angular/forms';
import { LoginNavbarComponent } from './frontOffice/components/navbars/login-navbar/login-navbar.component';
import { PatientNavbarComponent } from './frontOffice/components/navbars/patient-navbar/patient-navbar.component';
import { PatientspaceComponent } from './frontOffice/layouts/patientspace/patientspace.component';
import { HomeComponent } from './frontOffice/views/home/home.component';
import { AdminDashboardComponent } from './backOffice/admin-dashboard/admin-dashboard.component';
import { AdminComponent } from './backOffice/admin/admin.component';
import { AdminTablesComponent } from './backOffice/admin-tables/admin-tables.component';
import { AdminNavbarComponent } from './backOffice/admin-navbar/admin-navbar.component';
import { AdminSidebarComponent } from './backOffice/admin-sidebar/admin-sidebar.component';
import { AdminHeaderStatsComponent } from './backOffice/admin-header-stats/admin-header-stats.component';
import { ForumSpaceComponent } from './frontOffice/layouts/forum/components/forum-space/forum-space.component';
import { ForumDropdownComponent } from './frontOffice/layouts/forum/dropdown/forum-dropdown/forum-dropdown.component';
import { AdminForumComponent } from './backOffice/forum moderation/admin-forum/admin-forum.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminPostViewModalComponent } from './backOffice/forum moderation/admin-post-view-modal/admin-post-view-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmDeleteDialogComponent } from './backOffice/forum moderation/confirm-delete-dialog/confirm-delete-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { HttpClientModule } from '@angular/common/http';
import { CategoryFilterPipe } from './frontOffice/layouts/forum/pipes/category-filter.pipe';
import { PostListComponent } from './frontOffice/layouts/forum/components/post-list/post-list.component';
import { PostItemComponent } from './frontOffice/layouts/forum/components/post-item/post-item.component';
import { PostCrudComponent } from './frontOffice/layouts/forum/components/post-crud/post-crud.component';
import { CommentListComponent } from './frontOffice/layouts/forum/components/comment-list/comment-list.component';
import { CommentCrudComponent } from './frontOffice/layouts/forum/components/comment-crud/comment-crud.component';
import { ReactionComponent } from './frontOffice/layouts/forum/components/reaction/reaction.component';

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
    ForumSpaceComponent,
    ForumDropdownComponent,
    AdminForumComponent,
    AdminPostViewModalComponent,
    ConfirmDeleteDialogComponent,
    CategoryFilterPipe,
    PostListComponent,
    PostItemComponent,
    PostCrudComponent,
    CommentListComponent,
    CommentCrudComponent,
    ReactionComponent,
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
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
