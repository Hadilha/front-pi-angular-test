import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoachStatisticsService {
  private apiUrl = 'http://localhost:8089/stats/coach-of-the-month';

  constructor(private http: HttpClient) {}

  getCoachOfTheMonth(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
