import { UserService } from 'src/app/Services/user.service';
import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-sidbar-doctor',
  templateUrl: './sidbar-doctor.component.html',
  styleUrls: ['./sidbar-doctor.component.css']
})
export class SidbarDoctorComponent {
  collapseShow = "hidden";
  constructor(private Router:Router, private UserService :UserService ) {}

  ngOnInit() {}
  toggleCollapseShow(classes: string) {
    this.collapseShow = classes;
  }
  logout() {
    this.UserService.logout();  }
}
