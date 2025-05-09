import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Choice } from 'src/app/models/quizz/choice';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChoiceServiceService {

  //private apiUrl = 'http://localhost:8089/api/choices';
  private readonly apiUrl = `${environment.apiUrl}/choices`;


  constructor(private http: HttpClient) { }

  createChoice(choice: Choice): Observable<Choice> {
        return this.http.post<Choice>(this.apiUrl, choice);
      }

  deleteChoice(id: number): Observable<Choice> {
    return this.http.delete<Choice>(`${this.apiUrl}/${id}`);
  }

  getAllChoices(): Observable<Choice[]> {
    return this.http.get<Choice[]>(this.apiUrl);
  }

  getChoiceById(id: number): Observable<Choice> {
    return this.http.get<Choice>(`${this.apiUrl}/${id}`);
  }

  updateChoice(id: number, choice: Choice): Observable<Choice> {
    return this.http.put<Choice>(`${this.apiUrl}/${id}`, choice);
  }

}
