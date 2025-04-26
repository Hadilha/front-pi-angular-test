import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Score } from '../model/score';
import { AiModel, AiModelR } from '../model/ai-model';

@Injectable({
  providedIn: 'root'
})
export class ScoreServiceService {
  
  private apiUrl = 'http://localhost:8089/api/scores';
  private apiUrl2 = 'http://localhost:8089/api/scores/user';
  private aiApi = 'http://127.0.0.1:11434/api/generate';
  private emailApiGame ='http://localhost:8089/send_email_game'
  private emailApiQuiz ='http://localhost:8089/send_email_quiz'
  private headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient) { }

  getResponse(): Observable<any> {
    return this.http.post<any>(
      this.aiApi,
      {
        model:"llama2",
        prompt:"hi"
      },
      {
        headers: this.headers,
        //responseType: 'json' 
        
       }
    );
  }


    sendEmailGame(email:any):Observable<any>{
      return this.http.get<any>(`${this.emailApiGame}`)
    }

    sendEmailQuiz(email:any):Observable<any>{
      return this.http.get<any>(`${this.emailApiQuiz}`)
    }

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

      getScoresByDateRange(start: Date, end: Date): Observable<Score[]> {
        const params = new HttpParams()
          .set('start', start.toISOString())
          .set('end', end.toISOString());
          
        return this.http.get<Score[]>(`${this.apiUrl}/date-range`, { params });
      }
}
