import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Quizz } from 'src/app/models/quizz/quizz';

@Injectable({
  providedIn: 'root'
})
export class QuizzServiceService {

  private apiUrl = 'http://localhost:8089/api/quizzes';

  constructor(private http: HttpClient) { }

  getAllQuizzes(): Observable<Quizz[]> {
    return this.http.get<Quizz[]>(this.apiUrl);
  }

  getQuizzById(id: number): Observable<Quizz> {
    return this.http.get<Quizz>(`${this.apiUrl}/${id}`);
  }

  addQuizz(quizz: Quizz): Observable<Quizz> {
    return this.http.post<Quizz>(this.apiUrl, quizz);
  }

  addQuiz(quizz: Quizz): Observable<Quizz> {
    return this.http.post<Quizz>(this.apiUrl, quizz, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  deleteQuizz(id: number): Observable<Quizz> {
    return this.http.delete<Quizz>(`${this.apiUrl}/${id}`);
  }

  updateQuizz(quizz: Quizz): Observable<Quizz> {
    return this.http.put<Quizz>(`${this.apiUrl}/${quizz.quizz_id}`, quizz);
  }

}
