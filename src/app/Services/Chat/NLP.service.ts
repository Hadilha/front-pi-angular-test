import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface AppUser {
  id: number;
  username: string;
  email: string;
  password: string;
}

export interface UserActivity {
  id?: number;
  mood: string;
  intensity: number;
  notes?: string;
  timestamp?: Date;
  appUser: { id: number; username?: string };
}

export interface Program {
  programId: number;
  coachId: number;
  description: string;
  endDate: string;
  participants: number;
  startDate: string;
  title: string;
  version: number;
}

export interface Goal {
  id: number;
  appUser: AppUser;
  description: string;
  createdAt: string;
  completedAt?: string;
  completed: boolean;
  priority: number;
}

export interface Achievement {
  id: number;
  appUser: AppUser;
  title: string;
  description: string;
  achievedAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class NLPService {

  private readonly API_URL = `${environment.apiUrl}`;


  constructor(private http: HttpClient) {}

  getMoodEntries(userId: number): Observable<UserActivity[]> {
    return this.http.get<UserActivity[]>(`${this.API_URL}/mood-tracker/${userId}`);
  }

  logMood(userActivity: UserActivity): Observable<UserActivity> {
    return this.http.post<UserActivity>(`${this.API_URL}/mood-tracker/log`, userActivity);
  }

  logMoodEntry(userId: number, mood: string, intensity: number, notes: string): Observable<UserActivity> {
    const params = { userId: userId.toString(), mood, intensity: intensity.toString(), notes };
    return this.http.post<UserActivity>(`${this.API_URL}/mood-tracker/log-entry`, null, { params });
  }

  getRecommendedProgram(userId: number): Observable<Program> {
    return this.http.get<Program>(`${this.API_URL}/mood-tracker/recommend/${userId}`);
  }

  setGoal(userId: number, description: string): Observable<Goal> {
    const params = { userId: userId.toString(), description };
    return this.http.post<Goal>(`${this.API_URL}/mood-tracker/goals`, null, { params });
  }

  getGoals(userId: number): Observable<Goal[]> {
    return this.http.get<Goal[]>(`${this.API_URL}/mood-tracker/goals/${userId}`);
  }

  completeGoal(goalId: number): Observable<Goal> {
    return this.http.put<Goal>(`${this.API_URL}/mood-tracker/goals/complete/${goalId}`, {});
  }

  getAchievements(userId: number): Observable<Achievement[]> {
    return this.http.get<Achievement[]>(`${this.API_URL}/mood-tracker/achievements/${userId}`);
  }
}
