import { Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-cardprofiladmin',
  templateUrl: './cardprofiladmin.component.html',
  styleUrls: ['./cardprofiladmin.component.css']
})
export class CardprofiladminComponent implements OnInit, OnChanges {
  @Input() searchResults: User[] = [];
  users: User[] = [];
  private _color = 'light';
  isEditMode = false;
  currentUserId: number | null = null;

  @Input()
  get color(): string {
    return this._color;
  }
  set color(color: string) {
    this._color = color !== 'light' && color !== 'dark' ? 'light' : color;
  }

  @Output() viewToggled = new EventEmitter<void>();

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.loadUsers();
    this.userService.dataChanged$.subscribe(() => {
      this.loadUsers();
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['searchResults']) {
      if (this.searchResults && this.searchResults.length > 0) {
        this.users = this.searchResults;
      } else {
        this.loadUsers(); // fallback to loading all users if search is cleared
      }
    }
  }

  loadUsers(): void {
    const currentRole = this.userService.getCurrentUserRole();
    const currentUserId = this.userService.getCurrentUserId();

    this.userService.getAllUsers().subscribe({
      next: (users) => {
        const filteredUsers = users.filter(user => user.id !== currentUserId);
        if (currentRole === 'ADMIN') {
          this.users = filteredUsers;
        } else if (currentRole === 'DOCTOR') {
          this.users = filteredUsers.filter(user =>
            user.role !== 'ROLE_ADMIN' && user.role !== 'ROLE_DOCTOR'
          );
        } else {
          this.users = [];
        }
      },
      error: (err) => {
        console.error('Error loading users:', err);
      }
    });
  }

  toggleView() {
    this.viewToggled.emit();
  }

  editUser(user: User) {
    this.router.navigate(['/admin/updateuser', user.id]);
  }

  deleteUser(userId: number) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(userId).subscribe({
        next: () => {
          this.users = this.users.filter(u => u.id !== userId);
        },
        error: (error) => {
          console.error('Delete error:', error);
        }
      });
    }
  }
}
