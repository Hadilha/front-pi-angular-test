import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Score } from '../model/score';

@Injectable({
  providedIn: 'root'
})
export class ScoreServiceService {

  private apiUrl = 'http://localhost:8080/api/scores';
  private apiUrl2 = 'http://localhost:8080/api/scores/user';
    constructor(private http: HttpClient) { }

    saveScore(score: Score): Observable<Score> {
        return this.http.post<Score>(this.apiUrl, score);
      }

    getAllScores(): Observable<Score[]> {
        return this.http.get<Score[]>(this.apiUrl);
      }
    getScoreById(id: number): Observable<Score> {
        return this.http.get<Score>(`${this.apiUrl}/${id}`);
      }

    getScoreByUserId(userId: number): Observable<Score[]> {
        return this.http.get<Score[]>(`${this.apiUrl2}/${userId}`);
      }
}
