import { Component, OnInit } from "@angular/core";
import { Location } from '@angular/common';


@Component({
  selector: "app-profileDoctor",
  templateUrl: "./profileDoctor.component.html",
  styleUrls: ["./profileDoctor.component.css"],
})
export class profileDoctorComponent implements OnInit {
  constructor(private location: Location) {}

  ngOnInit(): void {}
  goBack(): void {
    this.location.back();
  }
}
