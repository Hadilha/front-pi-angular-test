import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  private currentUser: User = { 
    id: 1, 
    username: 'Current User',
    avatarUrl: '/assets/default-avatar.png'
  };

  getCurrentUser(): Observable<User> {
    return of(this.currentUser);
  }
}