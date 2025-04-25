import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/Services/user.service";

@Component({
  selector: "app-tablesDoctor",
  templateUrl: "./tablesDoctor.component.html",
})
export class TablesDoctorComponent implements OnInit {

  ngOnInit(): void {}
    constructor(private userService: UserService) { }
    showAddUser = false;

    toggleView() {
      this.showAddUser = !this.showAddUser;
    }

}
