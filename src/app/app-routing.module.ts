import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// no layouts views
import { PatientspaceComponent } from './frontOffice/views/patientspace/patientspace.component';
import { AdminComponent } from './backOffice/views/admin/admin.component';
import { ForumSpaceComponent } from './frontOffice/views/forum-space/forum-space.component';
import { AdminForumComponent } from './backOffice/views/admin-forum/admin-forum.component';
import { HomeComponent } from './frontOffice/views/home/home.component';

const routes: Routes = [
  

  //Admin Dashboard
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      { path: 'forum', component: AdminForumComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },


  // forum views
  {
    path: 'forum',
    component: ForumSpaceComponent,
  },

  { path: 'patientspace', component: PatientspaceComponent },
  { path: '', component: HomeComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
