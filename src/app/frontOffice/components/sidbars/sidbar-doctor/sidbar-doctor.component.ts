import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-sidbar-doctor',
  templateUrl: './sidbar-doctor.component.html',
  styleUrls: ['./sidbar-doctor.component.css']
})
export class SidbarDoctorComponent {
  collapseShow = "hidden";
  constructor(private Router:Router ) {}

  ngOnInit() {}
  toggleCollapseShow(classes: string) {
    this.collapseShow = classes;
  }
  logout() {
    localStorage.removeItem('token');
    this.Router.navigate(['/login']);
  }
}
