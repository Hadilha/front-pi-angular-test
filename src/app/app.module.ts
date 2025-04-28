import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgChartsModule } from 'ng2-charts';
// Layouts
import { DoctorComponent } from './frontOffice/layouts/doctor/doctor.component';
import { AuthComponent } from './frontOffice/layouts/auth/auth.component';
import { PatientspaceComponent } from './frontOffice/layouts/patientspace/patientspace.component';

// Admin Views
import { DashboardComponent } from './frontOffice/views/admin/dashboard/dashboard.component';
import { MapsComponent } from './frontOffice/views/admin/maps/maps.component';
import { SettingsComponent } from './frontOffice/views/admin/settings/settings.component';
import { TablesComponent } from './frontOffice/views/admin/tables/tables.component';

// Auth Views
import { LoginComponent } from './frontOffice/views/auth/login/login.component';
import { RegisterComponent } from './frontOffice/views/auth/register/register.component';

// No Layout Views
import { IndexComponent } from './frontOffice/views/index/index.component';
import { LandingComponent } from './frontOffice/views/landing/landing.component';
import { ProfileComponent } from './frontOffice/views/profile/profile.component';
import { HomeComponent } from './frontOffice/views/home/home.component';

// Components
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
import { TestimonialCarouselComponent } from './frontOffice/testimonial-carousel/testimonial-carousel.component';
import { LocationFinderComponent } from './frontOffice/location-finder/location-finder.component';
import { LoginNavbarComponent } from './frontOffice/components/navbars/login-navbar/login-navbar.component';
import { PatientNavbarComponent } from './frontOffice/components/navbars/patient-navbar/patient-navbar.component';

// BackOffice Components
import { AdminDashboardComponent } from './backOffice/admin-dashboard/admin-dashboard.component';
import { AdminComponent } from './backOffice/admin/admin.component';
import { AdminTablesComponent } from './backOffice/admin-tables/admin-tables.component';
import { AdminNavbarComponent } from './backOffice/admin-navbar/admin-navbar.component';
import { AdminSidebarComponent } from './backOffice/admin-sidebar/admin-sidebar.component';
import { AdminHeaderStatsComponent } from './backOffice/admin-header-stats/admin-header-stats.component';

// Admin Components
import { ChoiceFormComponent } from './component/admin/choice-form/choice-form.component';
import { QuizTestComponent } from './component/admin/quizz-test/quizz-test.component';
import { QuizListComponent } from './component/admin/quiz-list/quiz-list.component';
import { QuizFormComponent } from './component/admin/quiz-form/quiz-form.component';
import { QuestionFormComponent } from './component/admin/question-form/question-form.component';
import { QuestionResponseComponent } from './component/admin/question-response/question-response.component';
import { TestComponent } from './component/admin/test/test.component';
import { VisualisationComponent } from './component/admin/visualisation/visualisation.component';

// User Components
import { QuizListUserComponent } from './component/user/quiz-list-user/quiz-list-user.component';
import { HeaderComponent } from './component/user/header/header.component';
import { ScoreListUserComponent } from './component/user/score-list-user/score-list-user.component';
import { TakeTestComponent } from './component/user/take-test/take-test.component';
import { TestListComponent } from './component/user/test-list/test-list.component';

// Game Components
import { CombatGameComponent } from './game/combat-game/combat-game.component';
import { SlidingPuzzleComponent } from './game/sliding-puzzle/sliding-puzzle.component';

@NgModule({
  declarations: [
    AppComponent,
    DoctorComponent,
    AuthComponent,
    PatientspaceComponent,
    DashboardComponent,
    MapsComponent,
    SettingsComponent,
    TablesComponent,
    LoginComponent,
    RegisterComponent,
    IndexComponent,
    LandingComponent,
    ProfileComponent,
    HomeComponent,
    DoctorNavbarComponent,
    CardBarChartComponent,
    CardLineChartComponent,
    CardPageVisitsComponent,
    CardProfileComponent,
    CardSettingsComponent,
    CardSocialTrafficComponent,
    CardStatsComponent,
    CardTableComponent,
    FooterAdminComponent,
    FooterComponent,
    FooterSmallComponent,
    HeaderStatsComponent,
    IndexNavbarComponent,
    MapExampleComponent,
    IndexDropdownComponent,
    TableDropdownComponent,
    PagesDropdownComponent,
    NotificationDropdownComponent,
    SidebarComponent,
    UserDropdownComponent,
    TestimonialCarouselComponent,
    LocationFinderComponent,
    LoginNavbarComponent,
    PatientNavbarComponent,
    AdminDashboardComponent,
    AdminComponent,
    AdminTablesComponent,
    AdminNavbarComponent,
    AdminSidebarComponent,
    AdminHeaderStatsComponent,
    ChoiceFormComponent,
    QuizTestComponent,
    QuizListComponent,
    QuizFormComponent,
    QuestionFormComponent,
    QuestionResponseComponent,
    TestComponent,
    VisualisationComponent,
    QuizListUserComponent,
    HeaderComponent,
    ScoreListUserComponent,
    TakeTestComponent,
    TestListComponent,
    CombatGameComponent,
    SlidingPuzzleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    NgChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}