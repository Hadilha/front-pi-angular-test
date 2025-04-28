import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FrontOfficeRoutingModule } from './front-office-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FooterComponent } from './components/footer/footer.component';
import { FrontOfficeLayoutComponent } from './front-office-layout/front-office-layout.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { MoodTrackerComponent } from './views/mood-tracker/mood-tracker.component';

import { NoopAnimationsModule } from '@angular/platform-browser/animations'; // Add this import
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Add this import
@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    FrontOfficeLayoutComponent,
    DashboardComponent,
    MoodTrackerComponent, 
  ],
  imports: [
    CommonModule,
    FormsModule,
    FrontOfficeRoutingModule,
    SharedModule,
   // NoopAnimationsModule, 
   // BrowserAnimationsModule,
    RouterModule,
    
  ],
  exports: [RouterModule],
})
export class FrontOfficeModule {}