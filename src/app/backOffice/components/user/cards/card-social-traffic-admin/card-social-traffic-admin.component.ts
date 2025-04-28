// src/app/admin/card-social-traffic-admin.component.ts
import { Component, OnInit } from '@angular/core';
import { UserStats } from 'src/app/models/user.service';
import { UserService } from 'src/app/Services/user/user.service';

@Component({
  selector: 'app-card-social-traffic-admin',
  templateUrl: './card-social-traffic-admin.component.html',
})
export class CardSocialTrafficAdminComponent implements OnInit {
  stats!: UserStats;
  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getUserStats().subscribe((s) => (this.stats = s));
  }

  percent(part: number, total: number) {
    return total > 0 ? Math.round((part / total) * 100) : 0;
  }
}
