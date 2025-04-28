import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BackOfficeLayoutComponent } from './back-office-layout/back-office-layout.component';
import { ChatManagementComponent } from './views/chat-management/chat-management.component';
import { MoodTrackerManagementComponent } from './views/mood-tracker-management/mood-tracker-management.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';


const routes: Routes = [
  {
    path: '',
    component: BackOfficeLayoutComponent,
    children: [
      { path: 'chat-management', component: ChatManagementComponent },
      { path: 'mood-tracker-management', component: MoodTrackerManagementComponent },
      { path: '', redirectTo: 'chat-management', pathMatch: 'full' }, // Default route
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BackOfficeRoutingModule {}