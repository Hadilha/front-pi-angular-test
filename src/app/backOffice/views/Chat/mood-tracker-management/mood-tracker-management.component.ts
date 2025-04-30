import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/Services/Chat/chat.service';
import { MoodTrackerService, UserActivity } from 'src/app/Services/Chat/mood-tracker.service';

@Component({
  selector: 'app-mood-tracker-management',
  templateUrl: './mood-tracker-management.component.html',
  styleUrls: ['./mood-tracker-management.component.css'],
})
export class MoodTrackerManagementComponent implements OnInit {
  users: any[] = [];
  selectedUserId: number | null = null;
  moodEntries: UserActivity[] = [];

  constructor(
    private chatService: ChatService,
    private moodTrackerService: MoodTrackerService
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.chatService.getAllUsers().subscribe({
      next: (users) => {
        this.users = users;
      },
      error: (err) => {
        console.error('Failed to load users', err);
      },
    });
  }

  loadMoodEntries(): void {
    if (!this.selectedUserId) return;

    this.moodTrackerService.getUserLogsForAdmin(this.selectedUserId).subscribe({
      next: (entries) => {
        this.moodEntries = entries;
      },
      error: (err) => {
        console.error('Failed to load mood entries', err);
        this.moodEntries = [];
      },
    });
  }
}
