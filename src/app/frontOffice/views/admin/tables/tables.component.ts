import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/Services/user.service";

@Component({
  selector: "app-tables",
  templateUrl: "./tables.component.html",
})
export class TablesComponent implements OnInit {

  ngOnInit(): void {}
    constructor(private userService: UserService) { }
    showAddUser = false;

    toggleView() {
      this.showAddUser = !this.showAddUser;
    }

}
