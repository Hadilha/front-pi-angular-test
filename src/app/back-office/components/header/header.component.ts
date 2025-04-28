import { Component } from '@angular/core';

@Component({
  selector: 'app-back-office-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  toggleSidebar(): void {
    const sidebar = document.querySelector('#sidebar');
    sidebar?.classList.toggle('collapsed');
  }
}