import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-admin-sidebar",
  templateUrl: "./admin-sidebar.component.html",
})
export class AdminSidebarComponent implements OnInit {
  collapseShow = "hidden";
  constructor(private http: HttpClient,  private router: Router) { }

  ngOnInit() {}
  toggleCollapseShow(classes: string) {
    this.collapseShow = classes;
  }
  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
