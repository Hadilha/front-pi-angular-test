import { Injectable } from '@angular/core';
import { Question } from '../model/question';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuestionServiceService {

  private apiUrl = 'http://localhost:8080/api/questions';

  constructor(private http: HttpClient) { }

  
  getAllQuestions(): Observable<Question[]> {
    return this.http.get<Question[]>(this.apiUrl);
  }
  getQuestionById(id: number): Observable<Question> {
    return this.http.get<Question>(`${this.apiUrl}/${id}`);
  }
  createQuestion(question: Question): Observable<Question> {
      return this.http.post<Question>(this.apiUrl, question);
    }
  deleteQuestion(id: number): Observable<Question> {
    return this.http.delete<Question>(`${this.apiUrl}/${id}`);
  }
  
  updateQuestion(id: number, question: Question): Observable<Question> {
    return this.http.put<Question>(`${this.apiUrl}/${id}`, question);
  }

}
