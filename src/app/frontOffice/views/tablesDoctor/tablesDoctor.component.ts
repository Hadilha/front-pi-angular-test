import { Component, OnInit } from "@angular/core";
import { User } from "src/app/models/user.model";
import { UserService } from "src/app/Services/user.service";

@Component({
  selector: "app-tablesDoctor",
  templateUrl: "./tablesDoctor.component.html",
  styleUrls: ['./tablesDoctor.css']

})
export class TablesDoctorComponent implements OnInit {

  ngOnInit(): void {}
    constructor(private userService: UserService) { }
    showAddUser = false;
    searchQuery = '';
      searchResults: User[] = [];
      isLoading = false;
      error = '';

    toggleView() {
      this.showAddUser = !this.showAddUser;
    }
    onSearch(event: Event): void {
        const input = event.target as HTMLInputElement;
        this.searchQuery = input.value.trim();

        if (event instanceof KeyboardEvent && event.key === 'Enter' && this.searchQuery) {
          this.isLoading = true;
          this.error = '';

          this.userService.searchUsers(this.searchQuery).subscribe({
            next: (results: User[]) => {
              this.searchResults = results;
              this.isLoading = false;
            },
            error: (err) => {
              this.error = 'Failed to load search results';
              console.error(err);
              this.searchResults = [];
              this.isLoading = false;
            }
          });
        } else if (!this.searchQuery) {
          this.searchResults = [];
          this.error = '';
        }
      }


}
