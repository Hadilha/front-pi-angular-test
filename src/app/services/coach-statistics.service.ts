import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoachStatisticsService {
  private apiUrl = 'http://localhost:8089/stats';

  constructor(private http: HttpClient) {}

  getCoachWithMostPrograms(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/coach-of-the-month`); 
}
}
