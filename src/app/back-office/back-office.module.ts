import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackOfficeRoutingModule } from './back-office-routing.module';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FooterComponent } from './components/footer/footer.component';
import { BackOfficeLayoutComponent } from './back-office-layout/back-office-layout.component';
import { ChatManagementComponent } from './views/chat-management/chat-management.component';
import { MoodTrackerManagementComponent } from './views/mood-tracker-management/mood-tracker-management.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';

@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    BackOfficeLayoutComponent,
    ChatManagementComponent,
    MoodTrackerManagementComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    BackOfficeRoutingModule,
    RouterModule,
  ],
  exports: [RouterModule],
})
export class BackOfficeModule {}