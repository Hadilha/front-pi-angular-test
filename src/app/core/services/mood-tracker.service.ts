import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface UserActivity {
  id?: number;
  mood: string;
  intensity: number;
  notes?: string;
  timestamp?: Date;
  appUser: { id: number; username?: string };
}

@Injectable({
  providedIn: 'root',
})
export class MoodTrackerService {
  private readonly API_URL = 'http://localhost:8089/api/mood-tracker';

  constructor(private http: HttpClient) {}

  // Log a new mood entry for a user
  logMoodEntry(userId: number, mood: string, intensity: number, notes?: string): Observable<UserActivity> {
    const params = new URLSearchParams({
      userId: userId.toString(),
      mood,
      intensity: intensity.toString(),
      ...(notes && { notes }),
    });
    return this.http.post<UserActivity>(`${this.API_URL}/log?${params.toString()}`, {});
  }

  getUserMoodHistory(userId: number): Observable<UserActivity[]> {
    const params = new URLSearchParams({ userId: userId.toString() });
    return this.http.get<UserActivity[]>(`${this.API_URL}/history?${params.toString()}`);
  }

  getUserLogsForAdmin(userId: number): Observable<UserActivity[]> {
    return this.http.get<UserActivity[]>(`${this.API_URL}/admin/logs/${userId}`);
  }
}