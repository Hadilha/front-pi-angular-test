import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Services/user/user.service';

@Component({
  selector: 'app-user-stats',
  templateUrl: './user-stats.component.html',
  styleUrls: ['./user-stats.component.css']
})
export class UserStatsComponent implements OnInit {
  stats: any = null;
  error: string = '';
  isLoading: boolean = true;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.fetchUserStats();
  }

  fetchUserStats(): void {
    this.userService.getUserStats().subscribe({
      next: (data) => {
        this.stats = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Failed to fetch user stats';
        console.error(err);
        this.isLoading = false;
      }
    });
  }
}
