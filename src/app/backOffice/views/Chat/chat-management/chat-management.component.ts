import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ChatService } from 'src/app/Services/Chat/chat.service';

@Component({
  selector: 'app-chat-management',
  templateUrl: './chat-management.component.html',
  styleUrls: ['./chat-management.component.css'],
})
export class ChatManagementComponent implements OnInit, OnDestroy {
  users: any[] = [];
  groups: string[] = [];
  selectedUserIds: number[] = [];
  selectedGroups: string[] = [];
  newGroupName: string = '';
  successMessage: string | null = null;
  groupMembers: Map<string, number[]> = new Map();
  private groupUpdateSubscription!: Subscription;
  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    this.loadUsers();
    this.loadGroups();
    this.loadGroupMembers();
    this.groupUpdateSubscription = this.chatService.getGroupUpdateObservable().subscribe(() => {
      this.loadGroups();
      this.loadGroupMembers();
    });
  }

  ngOnDestroy(): void {
    if (this.groupUpdateSubscription) {
      this.groupUpdateSubscription.unsubscribe();
    }
  }

  loadUsers(): void {
    this.chatService.getAllUsers().subscribe({
      next: (users) => {
        this.users = users;
        console.log('Loaded users:', users);
      },
      error: (err) => {
        console.error('Failed to load users', err);
      },
    });
  }

  loadGroups(): void {
    this.chatService.getAllGroups().subscribe({
      next: (groups) => {
        this.groups = Array.from(groups);
        console.log('Loaded groups:', this.groups);
      },
      error: (err) => {
        console.error('Failed to load groups', err);
      },
    });
  }

  loadGroupMembers(): void {
    this.chatService.getGroupMembers().subscribe({
      next: (members) => {
        this.groupMembers = new Map(Object.entries(members));
        console.log('Loaded group members:', this.groupMembers);
      },
      error: (err) => {
        console.error('Failed to load group members', err);
      },
    });
  }

  selectUser(userId: number): void {
    const index = this.selectedUserIds.indexOf(userId);
    if (index > -1) {
      this.selectedUserIds.splice(index, 1);
    } else {
      this.selectedUserIds.push(userId);
    }
    console.log('Selected user IDs:', this.selectedUserIds);
  }

  selectGroup(group: string): void {
    const index = this.selectedGroups.indexOf(group);
    if (index > -1) {
      this.selectedGroups.splice(index, 1);
    } else {
      this.selectedGroups.push(group);
    }
    console.log('Selected groups:', this.selectedGroups);
  }

  assignUsersToGroups(): void {
    if (this.selectedUserIds.length === 0 || this.selectedGroups.length === 0) {
      return;
    }

    const assignments: Observable<string>[] = [];
    this.selectedGroups.forEach(group => {
      this.selectedUserIds.forEach(userId => {
        assignments.push(this.chatService.assignUserToGroup(group, userId));
      });
    });

    import('rxjs').then(rxjs => {
      rxjs.forkJoin(assignments).subscribe({
        next: (responses) => {
          this.successMessage = `Successfully assigned ${this.selectedUserIds.length} user(s) to ${this.selectedGroups.length} group(s).`;
          this.selectedUserIds = [];
          this.selectedGroups = [];
          this.clearSuccessMessage();
        },
        error: (err) => {
          console.error('Failed to assign users to groups', err);
        },
      });
    });
  }

  removeUsersFromGroups(): void {
    if (this.selectedUserIds.length === 0 || this.selectedGroups.length === 0) {
      return;
    }

    const removals: Observable<string>[] = [];
    this.selectedGroups.forEach(group => {
      this.selectedUserIds.forEach(userId => {
        removals.push(this.chatService.removeUserFromGroup(group, userId));
      });
    });

    import('rxjs').then(rxjs => {
      rxjs.forkJoin(removals).subscribe({
        next: (responses) => {
          this.successMessage = `Successfully removed ${this.selectedUserIds.length} user(s) from ${this.selectedGroups.length} group(s).`;
          this.selectedUserIds = [];
          this.selectedGroups = [];
          this.clearSuccessMessage();
        },
        error: (err) => {
          console.error('Failed to remove users from groups', err);
        },
      });
    });
  }

  createGroup(): void {
    if (!this.newGroupName || this.newGroupName.trim() === '') {
      return;
    }

    this.chatService.createGroup(this.newGroupName).subscribe({
      next: (response) => {
        this.successMessage = response;
        this.newGroupName = '';
        this.clearSuccessMessage();
      },
      error: (err) => {
        console.error('Failed to create group', err);
      },
    });
  }

  deleteGroup(group: string): void {
    this.chatService.deleteGroup(group).subscribe({
      next: (response) => {
        this.successMessage = response;
        this.clearSuccessMessage();
      },
      error: (err) => {
        console.error('Failed to delete group', err);
      },
    });
  }

  private clearSuccessMessage(): void {
    setTimeout(() => {
      this.successMessage = null;
    }, 3000);
  }

  getUsername(userId: number): string {
    const user = this.users.find(u => u.id === userId);
    return user ? user.username : 'Unknown';
  }

  getGroupMemberNames(group: string): string {
    const memberIds = this.groupMembers.get(group) || [];
    if (memberIds.length === 0) {
      return 'No members';
    }
    return memberIds.map(id => this.getUsername(id)).join(', ');
  }
}
