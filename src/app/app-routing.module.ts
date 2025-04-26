import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// layouts
import { DoctorComponent } from './frontOffice/layouts/doctor/doctor.component';
import { AuthComponent } from './frontOffice/layouts/auth/auth.component';

// doctor views
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
import { PatientspaceComponent } from './frontOffice/layouts/patientspace/patientspace.component';
import { AdminComponent } from './backOffice/views/admin/admin.component';
import { ForumSpaceComponent } from './frontOffice/layouts/forum/components/forum-space/forum-space.component';
import { AdminForumComponent } from './backOffice/views/admin-forum/admin-forum.component';

const routes: Routes = [
  // Doctor Dashboard
  {
    path: 'doctor',
    component: DoctorComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'settings', component: SettingsComponent },
      { path: 'tables', component: TablesComponent },
      { path: 'maps', component: MapsComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },

  //Admin Dashboard
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      { path: 'forum', component: AdminForumComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },

  // auth views
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: '', redirectTo: 'login', pathMatch: 'full' },
    ],
  },

  // forum views
  {
    path: 'forum',
    component: ForumSpaceComponent,
  },

  { path: 'patientspace', component: PatientspaceComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'landing', component: LandingComponent },
  { path: '', component: IndexComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
