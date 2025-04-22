import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CoachingProgram } from '../models/coaching-program.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoachingProgramAjouterUpdateService {
  private baseUrl = 'http://localhost:8089/coaching-programs'; 
  private emailApi ='http://localhost:8089/send_email'; // Replace with your actual email API URL

  constructor(private http: HttpClient) {}

  sendEmail(emailData: any): Observable<any> {
    return this.http.get(this.emailApi);
  }

  create(program: CoachingProgram): Observable<any> {
    return this.http.post(`${this.baseUrl}`, program);
  }

  update(program: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/coachingProgram/${program.programId}`, program);
  }
  getById(id: number): Observable<CoachingProgram> {
    return this.http.get<CoachingProgram>(`${this.baseUrl}/coachingProgram/${id}`); // GET /coaching-programs/{id}
  }

  getPrograms(): Observable<CoachingProgram[]> {
    return this.http.get<CoachingProgram[]>(`${this.baseUrl}/coachingPrograms`);
  }
  delete(program:any): Observable<any> {
    return this.http.delete(`${this.baseUrl}/coachingProgram/${program.programId}`); // DELETE /coaching-programs/{id}
  }
  
}
