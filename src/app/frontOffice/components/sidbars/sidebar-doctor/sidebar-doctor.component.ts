import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-sidbar-doctor",
  templateUrl: "./sidebar-doctor.component.html",
})
export class SidebarDoctorComponent implements OnInit {
  collapseShow = "hidden";
  constructor() {}

  ngOnInit() {}
  toggleCollapseShow(classes: string) {
    this.collapseShow = classes;
  }
}
