import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { QuestionResponse } from '../model/question-response';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionResponseService {

  private apiUrl = 'http://localhost:8089/api/question_response';

  constructor(private http: HttpClient) { }

  getAllQuestionResponses(): Observable<QuestionResponse[]> {
    return this.http.get<QuestionResponse[]>(this.apiUrl);
  }

  saveQuestionResponse(questionResponse: QuestionResponse): Observable<QuestionResponse> {
            return this.http.post<QuestionResponse>(this.apiUrl, questionResponse);
  }

  deleteQuestionResponse(id: number): Observable<QuestionResponse> {
        return this.http.delete<QuestionResponse>(`${this.apiUrl}/${id}`);
  }

  updateQuestionResponse(id: number, questionResponse: QuestionResponse): Observable<QuestionResponse> {
        return this.http.put<QuestionResponse>(`${this.apiUrl}/${id}`, questionResponse);
  }

  getQuestionResponseById(id: number): Observable<QuestionResponse> {
        return this.http.get<QuestionResponse>(`${this.apiUrl}/${id}`);
      }
}
