import { Component,OnInit, OnDestroy } from '@angular/core';
import { ForumNotificationService } from './frontOffice/layouts/forum/service/forum-notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'piFont';
  constructor(private notificationService: ForumNotificationService) {}

  ngOnInit(): void {
    this.notificationService.connect();
  }

  ngOnDestroy(): void {
    this.notificationService.disconnect();
  }
}
