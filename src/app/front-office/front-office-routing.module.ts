import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FrontOfficeLayoutComponent } from './front-office-layout/front-office-layout.component';
import { HomeComponent } from './views/home/home.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { MoodTrackerComponent } from './views/mood-tracker/mood-tracker.component';

const routes: Routes = [
  {
    path: '',
    component: FrontOfficeLayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: ' ', component: DashboardComponent }, 
      { path: 'mood-tracker', component: MoodTrackerComponent }, 
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FrontOfficeRoutingModule {}