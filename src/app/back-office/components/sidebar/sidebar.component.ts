import { Component } from '@angular/core';

@Component({
  selector: 'app-back-office-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  toggleSidebar(): void {
    const sidebar = document.querySelector('#sidebar');
    sidebar?.classList.toggle('collapsed');
  }
}