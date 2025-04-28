import { UserService } from 'src/app/Services/user/user.service';
import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-patient-navbar',
  templateUrl: './patient-navbar.component.html',
  styleUrls: ['./patient-navbar.component.css']
})
export class PatientNavbarComponent {
  navbarOpen = false;

  constructor(private router:Router, private UserService : UserService) {}

  ngOnInit(): void {}

  setNavbarOpen() {
    this.navbarOpen = !this.navbarOpen;
  }
  logout() {
    this.UserService.logout();  }
}
