import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Score } from '../model/score';


@Injectable({
  providedIn: 'root'
})
export class ScoreServiceService {
  
  private apiUrl = 'http://localhost:8089/api/scores';
  private apiUrl2 = 'http://localhost:8089/api/scores/user';
  private aiApi = 'http://localhost:8089/ai';
  private emailApiGame ='http://localhost:8089/send_email_game'
  private emailApiQuiz ='http://localhost:8089/send_email_quiz'
  private headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient) { }

  getByDateRange(start: Date, end: Date): Observable<Score[]> {
    // Validate dates
    if (!start || !end) {
      throw new Error('Both start and end dates are required');
    }

    // Ensure end date is after start date
    if (end < start) {
      throw new Error('End date must be after start date');
    }

    // Format dates and create HTTP params
    const params = new HttpParams()
      .set('start', start.toISOString())
      .set('end', end.toISOString());

    return this.http.get<Score[]>(`${this.apiUrl}/date-range`, { params });
  }

  getResponse(prompt: string): Observable<string> {
    return this.http.post(
      this.aiApi,
      { model: "llama2", prompt },
      { responseType: 'text' } // Expect text, not JSON
    ).pipe(
      map(response => {
        // Split by newlines, filter empty lines, and parse each JSON
        const lines = response.split('\n').filter(line => line.trim());
        
        // Extract only the "response" field from each JSON object
        const responses = lines.map(line => {
          try {
            const json = JSON.parse(line);
            return json.response || ''; // Fallback to empty string if missing
          } catch (e) {
            console.error('Failed to parse line:', line);
            return '';
          }
        });
  
        // Combine all responses into a single string
        return responses.join('');
      }),
      catchError(error => {
        console.error('Error fetching AI response:', error);
        return throwError(() => new Error('Failed to get AI response'));
      })
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
